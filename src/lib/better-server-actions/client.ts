import type { ZodObject, z } from 'zod'
import { zfd } from "zod-form-data";

type ExtendState<State> = State & { 
  errors?: {
    global: string | undefined,
    [key: string]: string | undefined
  }, 
  formData?: Record<string, string[]> 
}

/**
 * Next.js triggers redirects by throwing a special redirect error
 * We could import the function to check if this is a Next.js redirect,
 * but I want to publish this as it's own package agnostic to React meta framework
 */
function isNextjsRedirect(err?: object) {
  return err && 'message' in err && err.message === 'NEXT_REDIRECT';
}

const defaultErrorParser = async (props: {
  errorAsObject?: Record<any, any>,
  errorAsString?: string,
}): Promise<string | undefined | void> => {
  if (props.errorAsObject && typeof props.errorAsObject.message === "string") {
    return props.errorAsObject.message;
  }

  return props.errorAsString
}

function formDataToSearlizable(formData: FormData) {
  const output: Record<string, string[]> = {}

  for (const key of formData.keys()) {
    if (!key.startsWith('$')) {
      output[key] = formData.getAll(key).filter(v => typeof v === 'string')
    }
  }

  return output;
}

export function createFormAction<
  State extends Record<any, any>, 
  Schema extends ZodObject<any> = ZodObject<any>
>({
  input,
  parseError = defaultErrorParser, handler
}: { 
  input: Schema, 
  parseError?: typeof defaultErrorParser,
  handler: (state: ExtendState<State>, schema: z.infer<Schema>) => Promise<ExtendState<State>>
}) {
  return async function (state: State, formData: FormData): Promise<ExtendState<State>> {
    const searliableFormData = formDataToSearlizable(formData);

    const result = zfd.formData(input).safeParse(formData);

    if (result.error) {
      const errors = result.error.issues.reduce((acc, issue) => {
        const path = issue.path.join(".");
        acc[path] = issue.message;
        return acc;
      }, {} as Record<string, string>);

      return {
        ...state,
        formData: searliableFormData,
        errors: {
          ...errors,
          global: errors.global ?? undefined
        }
      }
    }

    try {
      const newState = await handler(state, result.data);

      return {
        ...newState,
        formData: searliableFormData,
        errors: {
          global: undefined
        }
      }
    } catch (err) {
      const errorAsObject = (typeof err === 'object' && err !== null) ? err : undefined
      const errorAsString = typeof err === 'string' ? err : undefined

      if (isNextjsRedirect(errorAsObject)) {
        throw err;
      }

      const message = await parseError({
        errorAsObject,
        errorAsString
      }) ?? await defaultErrorParser({
        errorAsObject,
        errorAsString
      }) ?? "Unknown error"

      return {
        ...state,
        formData: searliableFormData,
        errors: {
          global: message,
        }
      }
    }
  }
}

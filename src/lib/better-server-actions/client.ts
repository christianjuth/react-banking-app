import z, { ZodObject } from 'zod'
import { zfd } from "zod-form-data";

type ExtendState<State> = State & { 
  errors?: {
    global: string | undefined,
    [key: string]: string | undefined
  }, 
  formData?: Record<string, string[]> 
}

function formDataToSearlizable(formData: FormData) {
  const output: Record<string, string[]> = {}

  for (const key of formData.keys()) {
    if (key.indexOf('$') !== 0) {
      output[key] = formData.getAll(key).filter(v => typeof v === 'string')
    }
  }

  return output;
}

export function createFormAction<
  State extends Record<string, string> = {}, 
  Schema extends ZodObject<any> = ZodObject<any>
>({
  input,
  handler
}: { 
  input: Schema, 
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
      }
    } catch (err) {
      const errorMessage = (
        typeof err === 'object' && 
        err !== null && 
        'message' in err && 
        typeof err.message === 'string') 
          ? err.message 
          : "Unknown error"

      return {
        ...state,
        formData: searliableFormData,
        errors: {
          global: errorMessage
        }
      }
    }
  }
}

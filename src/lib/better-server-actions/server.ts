'use client';

import { useActionState as _useActionState } from 'react'

type FormDataInterface = {
  get: (key: string) => string | null
  getAll: (key: string) => string[]
}

export function useActionState<
  State extends {
    formData?: Record<string, string[]>,
  },
  Payload
>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string,
): [
  state: Omit<Awaited<State>, 'formData'> & { formData: FormDataInterface },
  dispatch: (payload: Payload) => void, 
  isPending: boolean
]  {
  const [state, a, last] = _useActionState(action, initialState, permalink)

  return [
    {
      ...state,
      formData: {
        get: (key) => state.formData?.[key]?.[0] ?? null,
        getAll: (key) => state.formData?.[key] ?? [],
      }
    },
    a,
    last,
  ];
}

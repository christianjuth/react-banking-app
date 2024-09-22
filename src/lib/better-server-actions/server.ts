'use client';

import { useActionState as _useActionState } from 'react'

type FormDataInterface = {
  get: (key: string) => string | null
  getAll: (key: string) => string[]
}

// export function useActionState<State>(
//     action: (state: Awaited<State>) => State | Promise<State>,
//     initialState: Awaited<State>,
//     permalink?: string,
// ): [state: Awaited<State>, dispatch: () => void, isPending: boolean];
// export function useActionState<State, Payload>(
//     action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
//     initialState: Awaited<State>,
//     permalink?: string,
// ): [state: Awaited<State>, dispatch: (payload: Payload) => void, isPending: boolean];

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
  state: Awaited<State> & { formData: FormDataInterface },
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

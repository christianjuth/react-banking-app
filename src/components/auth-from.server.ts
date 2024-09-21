"use server";

import z from 'zod'
import { createSession } from '@/lib/server/service/session'

import { createFormAction } from '@/lib/better-server-actions'

export const loginAction = createFormAction({
  input: z.object({
    email: z.string().email(),
    password: z.string().min(1, "Invalid password"),
  }),
  handler: async (state, formData) => {

    const sessio = await createSession(formData)
    
    return state;
  }
});

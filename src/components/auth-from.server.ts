"use server";

import z from 'zod'
import { createSession } from '@/lib/server/service/session'
import { createFormAction } from '@/lib/better-server-actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import * as routes from '@/lib/routes';

export const loginAction = createFormAction({
  input: z.object({
    email: z.string().email(),
    password: z.string().min(1, "Invalid password"),
  }),
  handler: async (state, formData) => {

    const session = await createSession(formData)

    if (!session) {
      throw new Error('Session not created')
    }

    cookies().set('session_id', session.session_id)

    redirect(routes.home);
  },
  parseError: async ({ errorAsObject }) => {
    if (errorAsObject?.code === 'SQLITE_ERROR') {
      return "Unknown error";
    }
  }
});

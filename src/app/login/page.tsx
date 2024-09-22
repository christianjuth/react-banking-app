import { AuthForm } from '@/components/auth-form.client'
import { getSessionFromCookie } from '@/lib/server/service/session'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSessionFromCookie()

  if (session) {
    redirect('/')
  }

  return (
    <AuthForm />
  )
}

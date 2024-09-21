'use client'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { FormItem } from './form-item'
import { useActionState } from '@/lib/better-server-actions'
import { loginAction } from './auth-from.server'
import * as routes from '@/lib/routes'
import StockImage from 'src/assets/auth-page-stock-photo.jpg'
import Image from 'next/image'
import Link from 'next/link'

export const AuthForm = () => {
  const [state, action] = useActionState(loginAction, {});

  return (
    <div className="min-h-[100svh] grid md:grid-cols-2">
      <div className="my-auto">
        <form action={action} className="space-y-4 p-8 md:mx-auto max-w-md flex flex-col items-stretch">
          <h1 className="font-black text-2xl">Wecome back!</h1>

          {state.errors?.global && <span className="text-destructive">{state.errors.global}</span>}

          <FormItem label="Email" error={state.errors?.email}>
            {({ id }) => 
              <Input 
                id={id} 
                name="email" 
                defaultValue={state.formData.get('email') ?? undefined} 
              />
            }
          </FormItem>

          <FormItem label="Password" error={state.errors?.password}>
            {({ id }) => 
              <Input 
                id={id} 
                type="password" 
                name="password" 
                defaultValue={state.formData.get('password') ?? undefined} 
              />
            }
          </FormItem>
          <Button type="submit">Submit</Button>

          <div>Don't have an account? <Link href={routes.signup}>Sign up</Link></div>
        </form>
      </div>

      <div className="max-md:hidden relative bg-slate-400">
        <Image src={StockImage} alt="Stock photo" fill className="object-cover" />
      </div>
    </div>
  )
}

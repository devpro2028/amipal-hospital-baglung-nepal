import { LoginForm } from '@/components/login-form'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { TypedLocale } from 'payload'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { LoginPage } from '@/payload-types'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise
  const loginPageData = (await getCachedGlobal('login-page', 1, locale)()) as LoginPage

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-end mb-4">
          <LocaleSwitcher />
        </div>
        <LoginForm data={loginPageData} />
      </div>
    </div>
  )
}

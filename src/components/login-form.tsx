import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'
import type { LoginPage } from '@/payload-types'

interface LoginFormProps extends React.ComponentProps<'div'> {
  data: LoginPage
}

export function LoginForm({ data, className, ...props }: LoginFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{data.emailLabel}</FieldLabel>
                <Input id="email" type="email" placeholder={data.emailPlaceholder} required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{data.passwordLabel}</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {data.forgotPassword}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder={data.passwordPlaceholder}
                  required
                />
              </Field>
              <Field>
                <Button type="submit">{data.loginButton}</Button>
                <Button variant="outline" type="button">
                  {data.loginWithGoogle}
                </Button>
                <FieldDescription className="text-center">
                  {data.noAccount} <a href="#">{data.signUp}</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

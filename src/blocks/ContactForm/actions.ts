'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type ContactFormState = {
  success?: boolean
  error?: string
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = ((formData.get('name') as string) || '').trim()
  const address = ((formData.get('address') as string) || '').trim()
  const phone = ((formData.get('phone') as string) || '').trim()
  const email = ((formData.get('email') as string) || '').trim()
  const message = ((formData.get('message') as string) || '').trim()

  if (!name || !address || !phone || !message) {
    return { error: 'Please fill in all required fields.' }
  }

  const sanitizedPhone = phone.replace(/\D/g, '')
  if (!/^\d{10}$/.test(sanitizedPhone)) {
    return { error: 'Please enter a valid mobile number (10 digits).' }
  }

  const phoneNumber = Number(sanitizedPhone)
  if (!Number.isFinite(phoneNumber)) {
    return { error: 'Please enter a valid mobile number.' }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-submissions',
      data: { name, address, phone: phoneNumber, email, message },
    })
    return { success: true }
  } catch (err) {
    console.error('Contact form submission error:', err)
    return { error: 'Something went wrong. Please try again.' }
  }
}

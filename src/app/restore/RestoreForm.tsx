'use client'
import { useFormState } from 'react-dom'
import { Input } from '@/components/Input'
import FormSubmitButton from '@/components/FormSubmitButton'
import { restoreAccount } from './actions'

const RestoreForm = () => {
    const [state, formAction] = useFormState(restoreAccount, null)
    return (
        <form action={formAction}>
            {state?.error && (
                <div className="bg-red-500 text-white p-3 my-2 rounded-lg shadow-lg text-lg">
                    Something went wrong. Please try again.
                </div>
            )}
            {state?.success ? (
                <div className="bg-green-500 text-white p-3 my-2 rounded-lg shadow-lg text-lg">
                    If an account with that email exists, a restore link has been sent. Please check your inbox.
                </div>
            ) : (
                <>
                    <div className="flex flex-col max-w-sm mt-2">
                        <label htmlFor="email">Email</label>
                        <Input type="email" id="email" name="email" required />
                    </div>
                    <div className="mt-5">
                        <FormSubmitButton>Restore account</FormSubmitButton>
                    </div>
                </>

            )}
        </form>
    )
}

export default RestoreForm

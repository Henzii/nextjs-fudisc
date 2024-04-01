'use client';

import { Input } from "@/components/Input"
import { handleLogin } from "./actions";
import { useFormState } from 'react-dom'
import FormSubmitButton from "@/components/FormSubmitButton";

const LoginForm = () => {
    const [state, formAction] = useFormState(handleLogin, {})
    return (
        <section className="m-auto max-w-5xl mt-5 p-8">
            <fieldset>
                <form action={formAction}>
                    {state?.error && (
                        <div className="bg-red-500 text-white p-3 my-2 rounded-lg shadow-lg text-lg">Wrong username or password</div>
                    )}
                    <div>
                        <label>Username:</label><br />
                        <Input name="user" type="text" />
                    </div>
                    <div className="mt-2">
                        <label>Password: </label><br />
                        <Input name="password" type="password" />
                    </div>
                    <div className="mt-5">
                        <FormSubmitButton>Login</FormSubmitButton>
                    </div>
                </form>
            </fieldset>
        </section>
    )
}

export default LoginForm
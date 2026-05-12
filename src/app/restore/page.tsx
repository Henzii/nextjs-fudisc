import RestoreForm from './RestoreForm'

const Page = () => {
    return (
        <section className="m-auto max-w-5xl mt-5 p-8">
            <h2 className="text-3xl mb-4">Restore account</h2>
            <p className="text-gray-600 mb-6 max-w-sm">
                Enter the email address associated with your account and we&apos;ll send you a one-time password.
                Note: this only works if you provided an email when you signed up.
            </p>
            <RestoreForm />
        </section>
    )
}

export default Page

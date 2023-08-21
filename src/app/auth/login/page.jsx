import CorbadoAuth from "@/components/CorbadoAuth"

export default function Login() {
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl mb-4">Work Sample Login</h1>

            <CorbadoAuth />
        </main>
    )
}
import  Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl mb-10">Corbado Work Sample</h1>
      <br />

      {/* Auth buttons */}
      <div className="flex">
        <Link href="/auth/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</Link>
      </div>
    </main>
  )
}

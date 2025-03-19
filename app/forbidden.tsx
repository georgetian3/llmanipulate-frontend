import Link from 'next/link'

export default function Forbidden() {
  return (
    <div className="flex flex-col h-full justify-center items-center text-2xl">
      <h2>Forbidden</h2>
      <p>You are not authorized to access this resource.</p>
      <div>
        <Link className='text-primary underline' href="/login">Login</Link> or return to <Link className='text-primary underline' href="/">Home</Link>
      </div>
    </div>
  )
}
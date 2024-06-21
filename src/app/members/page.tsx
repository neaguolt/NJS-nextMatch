import Link from "next/link";

export default function MembersPage() {
  return (
    <div>
        <h2 className='text-3xl'>This is the Members page</h2>
        <Link href='/'>Go back to home page</Link>
    </div>
  )
}

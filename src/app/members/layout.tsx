export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-green-600'>
        <h1 className='text-3xl'>War up it me</h1>
        {children}
    </div>
  )
}
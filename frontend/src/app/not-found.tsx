import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground'>
      <div className='text-center flex flex-col items-center gap-2'>
        <h1 className='text-8xl font-black text-primary'>404</h1>
        <h2 className='text-2xl font-bold tracking-wide'>Page Not Found</h2>
        <p className='text-muted text-sm mt-1'>This route doesn't exist. Head back to safety.</p>
      </div>
      <Link
        href='/dashboard'
        className='px-6 py-2.5 bg-primary rounded-xl font-semibold text-sm hover:opacity-90 transition'
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

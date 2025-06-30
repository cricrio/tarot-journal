export function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-3xl mx-auto h-[calc(100%-var(--spacing)*16)]'>
      {children}
    </div>
  );
}

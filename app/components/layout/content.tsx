export function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-[calc(100%-var(--spacing)*16)] bg-indigo-900 text-amber-50 overflow-auto'>
      {children}
    </div>
  );
}

function LoadingDots() {
  return (
    <div className='flex items-center justify-start gap-2'>
      <div className='h-1 w-1 animate-ping rounded-full bg-[rgb(28,28,28)] [animation-delay:-0.3s]' />
      <div className='h-1 w-1 animate-ping rounded-full bg-[rgb(28,28,28)] [animation-delay:-0.15s]' />
      <div className='h-1 w-1 animate-ping rounded-full bg-[rgb(28,28,28)]' />
    </div>
  )
}

export default LoadingDots

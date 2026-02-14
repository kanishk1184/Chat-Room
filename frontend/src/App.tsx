import { useState } from 'react'
import { useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function App() {
  const [inputVal, setInputVal] = useState<string>("");
  let navigate = useNavigate();

  const handleClick = ()=>{
    navigate("/chat", {state: {inputVal}});
  }

  return (
    <>
      <div className='flex flex-col w-screen h-screen justify-center items-center gap-10 bg-zinc-950'>
        <div className='flex flex-col items-center gap-6 p-8 rounded-lg bg-zinc-900 shadow-[0_0_50px_rgba(16,185,129,0.15)] border border-zinc-800'>
          <div className='flex flex-col items-center gap-3'>
            <div className='w-12 h-12 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center'>
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className='text-3xl font-semibold text-zinc-100 tracking-tight'>Join the conversation</h1>
            <p className='text-zinc-500 text-sm'>Enter your display name</p>
          </div>
          <div className="inputFields flex flex-col gap-3 w-80">
            <Input 
              type="text" 
              name="userName" 
              id="userName" 
              placeholder="Your name..." 
              className='h-11 text-base bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
              value={inputVal} 
              onChange={(e)=> setInputVal(e.target.value)}
            />
            <Button 
              onClick={handleClick} 
              className='h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-500/20 transition-all duration-200'
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
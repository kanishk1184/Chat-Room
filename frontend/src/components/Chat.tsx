import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface msg {
    userName: string,
    message: string,
};

const Chat = () => {
    const location = useLocation();
    const { state }: { state: { inputVal: string } | undefined } = location;
    const userName: string = state ? state.inputVal !== "" ? state.inputVal : "Unknown" : "Unknown";

    const [chats, setChats] = useState<Array<msg>>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [userCnt, setUserCnt] = useState<number>(0);
    const [inputMessage, setInputMessage] = useState<string>("");
    const bottomRef = useRef < HTMLDivElement | null> (null);

    const handleMessage = (event: MessageEvent) => {
        const data: {
            totalUsers?: number,
            userName?: string,
            message?: string
        } = JSON.parse(event.data);

        if (data.totalUsers !== undefined) {
            setUserCnt(data.totalUsers);
        }
        else if (data.userName && data.message) {
            setChats((prevChats) => [
                ...prevChats,
                {
                    userName: data.userName!,
                    message: data.message!,
                }
            ]);

        }
    }

    const handleMessageSend = () => {
        if (inputMessage === "") return;

        const newMessage: msg = {
            userName: userName,
            message: inputMessage,
        }

        ws?.send(JSON.stringify(newMessage));
        setInputMessage("");
    }

    const handleError = (event: Event) => {
        console.log("ERRORRRRRRR", event);
        alert("ERRORRRR AAGYAAAA RELOADDD KRLOO PLEASE!!!!! (console for error info)");
    }


    useEffect(() => {
        const websocket = new WebSocket("ws://localhost:8080");
        setWs(websocket);

        websocket.onmessage = handleMessage;
        websocket.onerror = handleError;

        return () => websocket.close();


    }, []);
    useEffect(()=>{
        bottomRef?.current?.scrollIntoView({behavior: 'smooth'})
    }, [chats])


    return (
        <div className='flex flex-col w-screen h-screen justify-center items-center gap-4 bg-zinc-950 p-4'>
            <div className='w-full max-w-4xl flex flex-col h-[90vh] bg-zinc-900 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-zinc-800 overflow-hidden'>
                {/* Header */}
                <div className='bg-zinc-800 border-b border-zinc-700 p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='w-9 h-9 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center'>
                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h1 className='text-lg font-semibold text-zinc-100'>Chat Room</h1>
                    </div>
                    <Badge variant="secondary" className='bg-zinc-700 text-zinc-300 border-zinc-600 hover:bg-zinc-600'>
                        <div className='w-2 h-2 rounded-full bg-emerald-400 mr-2'></div>
                        {userCnt} online
                    </Badge>
                </div>

                {/* Chat Box */}
                <div className="chatBox flex flex-col items-start justify-start flex-1 gap-3 p-6 overflow-auto bg-zinc-900">
                    {
                        chats.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col gap-1 max-w-[75%] ${msg.userName === userName ? 'self-end' : 'self-start'}`}>
                                <h1 className={`text-xs font-medium px-2 ${msg.userName === userName ? 'text-right text-emerald-400' : 'text-left text-zinc-400'}`}>
                                    {msg.userName}
                                </h1>
                                <div className={`rounded-lg px-4 py-2.5 ${
                                    msg.userName === userName 
                                        ? 'bg-emerald-600 text-white' 
                                        : 'bg-zinc-800 border border-zinc-700 text-zinc-100'
                                }`}>
                                    <p className='text-sm leading-relaxed wrap-break-words'>{msg.message}</p>
                                </div>
                            </div>
                        ))
                    }
                    <div ref={bottomRef} className='w-0 h-0'></div>
                </div>

                {/* Input Area */}
                <div className='flex gap-2 p-4 bg-zinc-800 border-t border-zinc-700'>
                    <Input 
                        placeholder='Type a message...' 
                        type="text" 
                        name="newMessage" 
                        id="newMessage" 
                        value={inputMessage} 
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
                        className='flex-1 h-11 text-base bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
                    />
                    <Button 
                        onClick={handleMessageSend} 
                        className='h-11 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-500/20 transition-all duration-200'
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Chat
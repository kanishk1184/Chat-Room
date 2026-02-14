import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.tsx'
import Chat from './components/Chat.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  // { </StrictMode>,}
)

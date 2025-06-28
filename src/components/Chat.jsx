import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useAuthStore } from '../hooks/useAuthStore'
import { TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getVarEnv } from '../helpers/getVarEnv'
import { useMessageStore } from '../hooks/useMessageStore'
import { addMessage } from '../store/messageSlice'
import ButtonCustom from './ButtonCustom'


const { VITE_SOCKET_URL_API } = getVarEnv()
const socket = io(VITE_SOCKET_URL_API, { transports: ['websocket'] });


export const Chat = () => {
  const dispatch = useDispatch(); 
  const { first_name, last_name } = useAuthStore(); 
  const { messages, startGetMessages } = useMessageStore();
  const [chatMessages, setChatMessages] = useState(""); 

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to socket
    socket.connect();
    
    // Handle successful connection
    const onConnect = () => {
      console.log("Socket connected");
      startGetMessages();
    };
    
    // Set up event listeners
    socket.on('connect', onConnect);
    socket.on("mensaje", receiveMessage);

    // Clean up on unmount
    return () => {
      socket.off('connect', onConnect);
      socket.off("mensaje", receiveMessage);
      socket.disconnect();
    };
  }, []);

  const receiveMessage = (message) => {
    dispatch(addMessage(message));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!chatMessages.trim()) return;

    const newMessage = {
      user: first_name + " " + last_name,
      message: chatMessages
    };

    socket.emit("mensaje", newMessage);

    setChatMessages("");
    startGetMessages();

    scrollToBottom()
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className='max-w-3xl items-center justify-center mx-auto mt-7 ' >
      <div
        style={{
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
        className='overflow-y-auto h-[700px] bg-gray-400 rounded-xl shadow-md items-center justify-center mb-4'
      >
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`flex  items-center mb-3 mx-2 ${msg.user === `${first_name} ${last_name}` ? 'justify-end' : 'justify-start'} `} ref={messagesEndRef} >
              <div
                className={`
                max-w-[80%] p-2.5 rounded-[20px] shadow-md break-words 
                ${msg.user === `${first_name} ${last_name}` ? 'bg-[#ff9a27] ml-2.5' : 'bg-white mr-2.5'}
                `}
              >
                <p className="text-m font-bold">
                  {msg.user}
                </p>
                <p className="text-sm font-normal">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className=' flex text-center justify-center items-center h-full'>
            <p className="text-sm font-normal">
              No hay mensajes
            </p>
          </div>
        )}
      </div>

      {/* Formulario para enviar mensaje */}
      <form onSubmit={handleSubmit} className='flex items-center justify-center'>
        <TextField
          label="Escribe tu mensaje"
          variant='filled'
          fullWidth
          value={chatMessages}
          onChange={(e) => setChatMessages(e.target.value)}
          style={{ marginRight: '10px', }}
        />
        <ButtonCustom onClick={handleSubmit} type='submit' text='Enviar' />
      </form>
    </div>
  );
};

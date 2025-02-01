/* import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useAuthStore } from '../hooks/useAuthStore'
import { TextField, Typography } from '@mui/material'
import { useMessageStore } from '../hooks/useMessageStore'
import { getVarEnv } from '../helpers/getVarEnv'
const { VITE_URL_API } = getVarEnv()


const socket = io(VITE_URL_API)

export const Chat = () => {

  const { first_name } = useAuthStore()
  const { messages } = useMessageStore()

  const [messagesChat, setMessages] = useState([])
  const [message, setMessage] = useState("")


  useEffect(() => {
    setMessages(messages)
    socket.on('message', receiveMessage)
    return () => {
      socket.off('mensaje', receiveMessage)
    }
  }, [])


  const receiveMessage = (message) =>
    setMessages(state => [message, ...state])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newMessage = {
      body: message,
      from: first_name,
    }
    setMessages(state => [newMessage, ...state])
    setMessage("")
    socket.emit('message', newMessage.body)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '5px' }}>
        <Typography variant='h3' >CHAT</Typography>
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: '50%', margin: 'auto', marginTop: 50, alignItems: 'center' }}>
        <TextField
          id="outlined-basic"
          label="Mensaje"
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          sx={{ width: '70%' }}
          style={{ margin: 'auto' }}
        />

        <ul className="h-80 overflow-y-auto">
          {messagesChat.map((message, index) => (
            <li key={index}>
              <b>{message.from}</b>:{message.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  )
}

 */

import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useAuthStore } from '../hooks/useAuthStore'
import { TextField, Typography, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getVarEnv } from '../helpers/getVarEnv'
import { useMessageStore } from '../hooks/useMessageStore'


const { VITE_SOCKET_URL_API } = getVarEnv()
const socket = io(VITE_SOCKET_URL_API);


export const Chat = () => {
  const dispatch = useDispatch(); // Usamos dispatch de Redux
  const { first_name, last_name } = useAuthStore(); // Extrae el nombre del usuario
  const { messages, startGetMessages } = useMessageStore();
  const [chatMessages, setChatMessages] = useState(""); // Estado local para el mensaje que escribe el usuario

  const messagesEndRef = useRef(null);
  useEffect(() => {
    startGetMessages();

    socket.on("connect", () => {
      console.log("Conectado al WebSocket con ID:", socket.id);
    });

    socket.on("mensaje", receiveMessage);

    return () => {
      socket.off("mensaje", receiveMessage);
      socket.disconnect();
    };
  }, []);

  const receiveMessage = (message) => {
    dispatch(startGetMessages(message));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!chatMessages.trim()) return;

    const newMessage = {
      user: first_name + " " + last_name,
      message: chatMessages
    };

    console.log("Enviando mensaje al servidor:", newMessage);

    socket.emit("mensaje", newMessage, (response) => {
      console.log("Respuesta del servidor:", response);
    });

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
    <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '20px', height: '80%' }}>
      <div
        style={{
          height: '700px',
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#f8f9fa',
        }}
      >
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '10px', justifyContent: msg.user === `${first_name} ${last_name}` ? 'flex-end' : 'flex-start' }} ref={messagesEndRef}>
              <div
                style={{
                  maxWidth: '80%',
                  padding: '10px',
                  borderRadius: '20px',
                  backgroundColor: msg.user === `${first_name} ${last_name}` ? '#dcf8c6' : '#ffffff',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  wordWrap: 'break-word',
                  marginLeft: msg.user === `${first_name} ${last_name}` ? '10px' : '0',
                  marginRight: msg.user !== `${first_name} ${last_name}` ? '10px' : '0',
                }}
              >
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  {msg.user}
                </Typography>
                <Typography variant="body2" style={{ marginTop: '5px' }}>
                  {msg.message}
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography>No messages yet</Typography>
          </div>
        )}
      </div>

      {/* Formulario para enviar mensaje */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Escribe tu mensaje"
          variant='filled'
          fullWidth
          value={chatMessages}
          onChange={(e) => setChatMessages(e.target.value)}
          style={{ marginRight: '10px', }}
        />
        <Button variant="contained" color="primary" type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
};

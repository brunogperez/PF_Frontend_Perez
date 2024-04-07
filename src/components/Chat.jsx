import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useAuthStore } from '../hooks/useAuthStore'
import { TextField, Typography } from '@mui/material'
import { useMessageStore } from '../hooks/useMessageStore'

const socket = io('/')

export const Chat = () => {

  const { first_name } = useAuthStore()
  //const { messages } = useMessageStore()

   const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  
  
  useEffect(() => {
    socket.on('mensaje', receiveMessage)
    
    return () => {
      socket.off('mensaje', receiveMessage)
    }
  }, [])
 
  
  console.log(messages)
  console.log(first_name)

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
    socket.emit('mensaje', newMessage.body)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '5px' }}>
        <Typography variant='h3' >CHAT</Typography>
      </div>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'green', maxWidth: '50%', margin: 'auto', marginTop: 50, alignItems: 'center' }}>
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
          {messages.map((message, index) => (
            <li key={index}>
              <b>{message.from}</b>:{message.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  )
}
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../api/requestApi'
import Swal from 'sweetalert2'
import { onMessages } from '../store/messageSlice'

export const useMessageStore = () => {

    const dispatch = useDispatch()
    const { messages } = useSelector(state => state.message)

    console.log({messages})

    const startGetMessages = async () => {
        const resp = await getMessages()
        if (resp.ok) {
            dispatch(onMessages(resp.messages))
            return
        }
        return Swal.fire({
            title: 'Ocurrió un error al obtener los mensajes',
            html: 'Por favor, intenta nuevamente',
            icon: 'error',
        })
    }
    return {
        messages,
        startGetMessages
    }
}
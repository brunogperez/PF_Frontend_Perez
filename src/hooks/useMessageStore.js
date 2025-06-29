import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getMessages } from '../api/requestApi';
import Swal from 'sweetalert2';
import { onMessages } from '../store/messageSlice';

export const useMessageStore = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.messages);

  const startGetMessages = async () => {
    const resp = await getMessages();
    if (resp.ok) {
      dispatch(onMessages(resp.messages));
      return;
    }
    return Swal.fire({
      title: 'Ocurrió un error al obtener los mensajes',
      html: 'Por favor, intenta nuevamente',
      icon: 'error',
    });
  };

  const startMessageActive = product => {
    dispatch(onMessages(product));
    return true;
  };

  const startCreateMessage = async message => {
    const resp = await createMessage(message);
    if (resp.ok) {
      return true;
    } else {
      Swal.fire({
        title: 'Ocurrió un error al enviar el mensaje',
        html: 'Por favor, intenta nuevamente',
        icon: 'error',
      });
    }
    return false;
  };

  return {
    messages,
    startGetMessages,
    startMessageActive,
    startCreateMessage,
  };
};

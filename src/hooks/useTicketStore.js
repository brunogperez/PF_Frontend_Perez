import { useDispatch, useSelector } from "react-redux"
import { getTickets } from "../api/requestApi"
import Swal from "sweetalert2"
import { onTickets } from "../store/ticketSlice"


export const useTicketStore = () => {

    const dispatch = useDispatch()
    const { tickets } = useSelector(state => state.ticket)

    const startGetTickets = async () => {
        const resp = await getTickets()
        if (resp.ok) {
            dispatch(onTickets(resp.tickets))
            return
        }

        return Swal.fire({
            title: 'Uhh ocurrio un error al obtener los productos',
            html: 'Por favor intenta mas tarte',
            icon: 'error',
        })
    }

    return {
        tickets,
        startGetTickets
    }
}
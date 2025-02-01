import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../api/requestApi";
import Swal from "sweetalert2";
import { onTickets } from "../store/ticketSlice";

export const useTicketStore = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.ticket);

  const startGetTickets = async () => {
    const resp = await getTickets();
    if (resp.ok) {
      dispatch(onTickets(resp.tickets));
      return;
    } else {
      return Swal.fire({
        title: "Ocurrió un error al obtener los tickets",
        html: "Por favor, intenta nuevamente",
        icon: "error",
      });
    }
  };

  return {
    tickets,
    startGetTickets,
  };
};

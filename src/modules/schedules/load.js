import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { hoursLoad } from "../form/hours-load.js"
import { schedulesShow } from "./show.js"

const selectedDate = document.getElementById("date")

// Função de carregamento.
export async function schedulesDay(){
  // Obtém a data do input.
  const date = selectedDate.value

  // Busca na API os agendamentos para carregar do lado direito da tela.
  const dailySchedules = await scheduleFetchByDay({ date })

  // Exibe os agendamentos.
  schedulesShow({ dailySchedules })

  // Os horários disponíveis (horário futuro + não agendado) do lado esquerdo (form)
  // Rederiza as horas disponíveis. E também os agendamentos já realizados.
  hoursLoad({ date, dailySchedules })
}
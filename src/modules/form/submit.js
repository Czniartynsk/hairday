import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Data atual para o input.
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual. Para o HTML tem que ser esse formato: "YYYY-MM-DD"
selectedDate.value = inputToday

// Define a data mínima como sendo a data atual para agendamento.
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  // Previne o comportamento padrão de carregar a página.
  event.preventDefault()

  try {
    // Recuperando o nome do cliente.
    const name = clientName.value.trim()

    // return para encerrar a função e não seguir fazendo o restante.
    if (!name) {
      return alert("Informe o nome do cliente!")
    }

    // Recupera o horário selecionado.
    const hourSelected = document.querySelector(".hour-selected")

    // Verificação para ter certeza de que um horário foi agendado e não retornar nulo.
    if (!hourSelected) {
      return alert("Selecione a hora.")
    }

    // Recuperar somente a hora.
    const [hour] = hourSelected.innerText.split(":")

    // Insere a hora na data.
    const when = dayjs(selectedDate.value).add(hour, "hour")
    console.log(when)

    // Gera um ID para ter um identificador.
    const id = new Date().getTime()

    // console.log({
    //   id, name, when,
    // })

    // Faz o agendamento.
    await scheduleNew({
       id, name, when,
    })

    // Recarrega os agendamentos.
    await schedulesDay()
    clientName.value = ""

  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }

}
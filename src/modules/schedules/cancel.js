import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"

const periods = document.querySelectorAll(".period")
//console.log(periods)
/* 
  0: ul#period-morning.period
   1: ul#period-afternoon.period
   2: ul#period-night.period
  length: 3 
*/

// Gera evento de clique para cada lista (manhã, tarde e noite).
periods.forEach((period) => {
  // Captura o evento de clique na lista.
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      // Obtém a li pai do elemento clicado.
      const item = event.target.closest("li")
      /* 
      console.log(item.dataset)
      // {id: '1731898478175'}
      */

      // Pega o id do agendamento para remover.
      const { id } = item.dataset
      /*
      console.log(id)
      // 1731898478175
      */

      // Confirma que o id foi selecionado.
      if(id){
        // Confirma se o usuário que remover ou cancelar.
        const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?")

        if(isConfirm) {
          // Faz a requisição na API para cancelar.
          await scheduleCancel({ id })

          // Recarrega os agendamentos.
          schedulesDay()
        }
      }
    }
  })
})
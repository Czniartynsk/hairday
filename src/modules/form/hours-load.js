import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"
import { hoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }) {
  // Limpa a lista de horários.
  hours.innerHTML = ""
  
  // Obtém a lista de horários ocupados.
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

  //console.log(unavailableHours)
  // 0: "20:00"


  // Utiliza a lista de horários ocupados aqui dentro.
  const opening = openingHours.map((hour) => {
    // Recupera somente a hora.
    /*
      const scheduleHour = hour.split(":")
    
      console.log(scheduleHour)
      // ["9", "00"]
      // ["10", "00"]
      // ["11", "00"]
      // ["12", "00"]
      // ["13", "00"]...
    */

    // pegando o primeiro valor do array e omitindo o segundo ele guarda somente a hora na variável.
    const [scheduleHour] = hour.split(":")

    // Adiciona a hora na data e verifica se está no passado.
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())
    // console.log(scheduleHour, isHourPast)

    /*
    console.log({
      hour,
      available: isHourPast,
    })
    */
   
    // Verifica se o horário que está sendo percorrido está ocupado.
    const available = !unavailableHours.includes(hour) && !isHourPast
   
    // Retorna o horário e a disponibilidade.
    return { 
      hour,
      available, 
    }
  })
  // Como está fazendo o return, o resultado também está no opening.
  //console.log(opening)

  /* 
    Renderiza os horários.
    opening é a hora e se está disponível ou não. Ex.:
    0: {hour: '9:00', available: false} 
  */
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li")

    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")

    li.textContent = hour

    if (hour === "9:00"){
      hourHeaderAdd("Manhã")
    }else if (hour === "13:00"){
      hourHeaderAdd("Tarde")
    }else if (hour === "18:00"){
      hourHeaderAdd("Noite")
    }

    hours.append(li)
  })

  hoursClick()
}

function hourHeaderAdd(title) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}

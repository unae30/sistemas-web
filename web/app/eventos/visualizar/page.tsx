"use client"

import { useEffect, useState } from "react"
import { getAllEvents } from "@/services/api"
import type { EventType } from "@/types/event"
import "../../../styles/globals.css"

export default function VisualizarEventosPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents()
        setEvents(data)
        setLoading(false)
      } catch (err) {
        setError("Erro ao carregar eventos. Por favor, tente novamente.")
        setLoading(false)
        console.error(err)
      }
    }

    fetchEvents()
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && events.length > 0) {
      const calendarEl = document.getElementById("calendar")

      if (calendarEl) {
        import("@fullcalendar/core").then(({ Calendar }) => {
          import("@fullcalendar/daygrid").then((dayGridPlugin) => {
            import("@fullcalendar/timegrid").then((timeGridPlugin) => {
              import("@fullcalendar/interaction").then((interactionPlugin) => {
                import("@fullcalendar/core/locales/pt-br").then((ptBrLocale) => {
                  const calendar = new Calendar(calendarEl, {
                    plugins: [dayGridPlugin.default, timeGridPlugin.default, interactionPlugin.default],
                    headerToolbar: {
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    },
                    initialView: "dayGridMonth",
                    events: events.map((event) => {
                      let backgroundColor = "#962038";
                      let borderColor = "#962038"; 
                    
                      switch (event.tipo_evento) {
                        case "Workshop":
                          backgroundColor = "#1E90FF"; // Azul
                          borderColor = "#1E90FF";
                          break;
                        case "Extensão":
                          backgroundColor = "#32CD32"; // Verde
                          borderColor = "#32CD32";
                          break;
                        case "Acadêmico":
                          backgroundColor = "#FFD700"; // Amarelo
                          borderColor = "#FFD700";
                          break;
                        case "Entretenimento":
                          backgroundColor = "#FF4500"; // Laranja
                          borderColor = "#FF4500";
                          break;
                        case "Saúde/Social":
                          backgroundColor = "#8A2BE2"; // Roxo
                          borderColor = "#8A2BE2";
                          break;
                        default:
                          backgroundColor = "#962038"; // Cor padrão (vermelho)
                          borderColor = "#962038";
                          break;
                      }
                    
                      return {
                        id: String(event.id),
                        title: event.titulo,
                        start: event.data_inicio,
                        end: event.data_fim,
                        backgroundColor,
                        borderColor,
                        extendedProps: {
                          descricao: event.descricao,
                          tipo: event.tipo_evento,
                          local: event.local,
                        },
                      };
                    }),
                    editable: false,
                    selectable: true,
                    selectMirror: true,
                    dayMaxEvents: true,
                    locale: ptBrLocale.default,
                    buttonText: {
                      today: "Hoje",
                      month: "Mês",
                      week: "Semana",
                      day: "Dia",
                    },
                    eventTimeFormat: {
                      hour: "2-digit",
                      minute: "2-digit",
                      meridiem: false,
                      hour12: false,
                    },
                    eventClick: (info) => {
                      alert(
                        `Evento: ${info.event.title}\nTipo: ${info.event.extendedProps.tipo}\nLocal: ${info.event.extendedProps.local}\nDescrição: ${info.event.extendedProps.descricao}`,
                      )
                    },
                  })

                  calendar.render()
                })
              })
            })
          })
        })
      }
    }
  }, [isMounted, events])

  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-medium">Visualizar Eventos</h1>
      <p className="mb-8 text-lg">Confira os eventos agendados no calendário abaixo.</p>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <p>Carregando calendário...</p>
          </div>
        ) : error ? (
          <div className="flex h-96 items-center justify-center text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div id="calendar" className="fc-theme-standard"></div>
        )}
      </div>
    </div>
  )
}


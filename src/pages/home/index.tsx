import { HandPalm, Play } from 'phosphor-react'
import React, { createContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  StoptCountdownButton,
} from './styles'

import NewCycleForm from './components/NewCycleForm'
import Countdown from './components/Countdown'
import { zodResolver } from '@hookform/resolvers/zod'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPass: number
  markCurrentCyclesAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe a Tarefa'),
  minutesAmount: z
    .number()
    .min(1, 'O ciclo precisa ser de no Mínimo 05 minutos')
    .max(90, 'O ciclo precisa ser de no Máximo 90 minutos'),
})

type newCycleFormData = z.infer<typeof newCycleFormSchema>

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = React.useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = React.useState<string | null>(null)
  const [amountSecondsPass, setAmountSecondsPass] = React.useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset, watch } = newCycleForm

  // eslint-disable-next-line react-hooks/incompatible-library
  const task = watch('task')
  const isSubmitDisabled = !task

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPass(seconds)
  }

  function markCurrentCyclesAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleCreateNewCycle(data: newCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPass(0)
    reset()
  }

  function handleInterruptNewCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCyclesAsFinished,
            amountSecondsPass,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StoptCountdownButton onClick={handleInterruptNewCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StoptCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

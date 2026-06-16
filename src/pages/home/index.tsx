import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  StoptCountdownButton,
} from './styles'

import { CyclesContext } from '../../context/CycleContext'

import NewCycleForm from './components/NewCycleForm'
import Countdown from './components/Countdown'
import { zodResolver } from '@hookform/resolvers/zod'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe a Tarefa'),
  minutesAmount: z
    .number()
    .min(1, 'O ciclo precisa ser de no Mínimo 05 minutos')
    .max(90, 'O ciclo precisa ser de no Máximo 90 minutos'),
})
type newCycleFormData = z.infer<typeof newCycleFormSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)
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

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StoptCountdownButton onClick={interruptCurrentCycle} type="button">
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

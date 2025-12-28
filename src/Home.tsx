import { useState, createContext, useContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CyclesContext = createContext({} as any)

function NewCycleForm() {
  const { activeCycles, setActiveCycles } = useContext(CyclesContext)
  return (
    <>
      <h3>NewCycleForm: {activeCycles} </h3>
      <button
        onClick={() => {
          setActiveCycles(2)
        }}
      >
        Alterar ciclo ativo
      </button>
    </>
  )
}

function Countdown() {
  const { activeCycles } = useContext(CyclesContext)
  return <h3>Countdown: {activeCycles}</h3>
}

export default function Home() {
  const [activeCycles, setActiveCycles] = useState(0)
  return (
    <CyclesContext.Provider value={{ activeCycles, setActiveCycles }}>
      <h1>Minha Home</h1>
      <NewCycleForm />
      <Countdown />
    </CyclesContext.Provider>
  )
}

import { createContext, useContext, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Cycle = createContext({} as any)

function NewCycleForms() {
  const { count, setCount } = useContext(Cycle)
  return (
    <>
      <h1>newCyleForm: {count}</h1>
      <button onClick={() => setCount(count + 3)}>Alterar Ciclo ativo</button>
    </>
  )
}
function Countdown() {
  const { count } = useContext(Cycle)
  return (
    <>
      <h1>countdown: {count} </h1>
    </>
  )
}

export default function Home() {
  const [count, setCount] = useState(1)
  return (
    <Cycle.Provider value={{ count, setCount }}>
      <h1>Home</h1>
      <Countdown />
      <NewCycleForms />
    </Cycle.Provider>
  )
}

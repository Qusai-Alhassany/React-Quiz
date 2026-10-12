import { useState } from 'react'
import Header from './components/Header'
import Quiz from './components/Quiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Quiz />
    <p className="flex justify-center border-0 items-center mt-4 text-white">
        © 2026 Qusai Alhassany. All rights reserved.
    </p>
    </>
  )
}

export default App

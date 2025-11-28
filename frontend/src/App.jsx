import { useEffect, useState } from 'react'
import Orgs from './components/Orgs'

function App() {
  const [showOrgs, setShowOrgs] = useState(false)

  // initially delay for the blank page
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOrgs(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showOrgs && <Orgs />}
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import Orgs from './components/Orgs'

function App() {
  const [showOrgs, setShowOrgs] = useState(false)

  // initially delay for the blank page
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOrgs(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (

    <div>
      {showOrgs && <Orgs />}
    </div>
  )
}

export default App

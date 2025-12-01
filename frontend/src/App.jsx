import { useEffect, useState } from 'react'
import Orgs from './components/Orgs'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrgPage from './page/OrgPage'

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

      <BrowserRouter>
        <Routes>
          <Route path='/' element={showOrgs && <Orgs />} />
          <Route path='/org/:id' element={<OrgPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

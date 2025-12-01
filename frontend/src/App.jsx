import { useEffect, useState } from 'react'
import Orgs from './components/Orgs'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrgPage from './page/OrgPage'
import CreditPage from './page/CreditPage'

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
          <Route path='/org/:id/credits' element={<CreditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

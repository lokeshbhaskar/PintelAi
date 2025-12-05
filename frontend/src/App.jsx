import { useEffect, useState } from 'react'
import Orgs from './components/Orgs'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrgPage from './page/OrgPage'
import CreditPage from './page/CreditPage'
import AdminPage from './page/AdminPage'

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
          <Route path='/orgs/:id' element={<OrgPage />} />
          {/* <Route path='/org/:id/credits' element={<CreditPage />} /> */}
          <Route path='/admin-page' element={<AdminPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

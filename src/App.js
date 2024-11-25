import React from 'react'
import admin from './pages/admin'
import history from './pages/history'
import resolvecomplaint from './pages/resolvecomplaint'
import viewcomplaint from './pages/viewcomplaint'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/viewcomplaint' element={<viewcomplaint/>}/>
        <Route path='/resolvecomplaint' element={<resolvecomplaint/>}/>
        <Route path='/history' element={<history/>}/>
        <Route path='/admin' element={<admin/>}/>
      </Routes>
      </BrowserRouter>
    
  )
}

export default App

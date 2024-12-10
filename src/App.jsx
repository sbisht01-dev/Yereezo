import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/SignIn'
import SignIn from './pages/SignIn'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='signin' element={<SignIn />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

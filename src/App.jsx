import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

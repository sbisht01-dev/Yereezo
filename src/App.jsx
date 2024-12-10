import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

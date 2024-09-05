import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingLayout from "./layouts/LandingLayout"
import Home from "./pages/landing/home/home"
import Contact from "./pages/landing/contact/contact"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />}/>
          <Route path="contact" element={<Contact />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

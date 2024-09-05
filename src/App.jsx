import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingLayout from "./layouts/LandingLayout"
import Landing from "./pages/landing/Landing"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

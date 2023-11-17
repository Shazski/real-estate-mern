import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Profile } from "./pages/Profile"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { Navbar } from "./components/Navbar"
function App() {
  const { currentUser } = useSelector((state:any) => state.user)
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={currentUser === null ? <Navigate to='/sign-in'/>: <Profile/>}/>
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

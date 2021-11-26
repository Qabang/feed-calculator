import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

import Footer from './components/footer/Footer.js'
import Index from './components/index/Index.js'
import Calculator from './components/calculator/Calculator.js'
import { ReactComponent as ReactLogo } from './assets/images/logo.svg'

import { FaBars, FaRegWindowClose } from 'react-icons/fa'
import './App.scss'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleClass = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="App">
      <Router>
        <header>
          <section />
          <nav>
            <FaBars id="mobile-nav-icon" onClick={toggleClass} />
            <ul className={isOpen ? 'open' : 'closed'}>
              <FaRegWindowClose
                onClick={toggleClass}
                id="mobile-nav-close-icon"
              />
              <li>
                <NavLink exact to="/">
                  Start
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/calculation">
                  Calculator
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <ReactLogo />
          </nav>
          {/* </section> */}
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<Index />}></Route>
            <Route exact path="/calculation" element={<Calculator />}></Route>
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  )
}

export default App

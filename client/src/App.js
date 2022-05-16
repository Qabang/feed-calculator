import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom'

import Footer from './components/footer/Footer.js'
import Index from './components/index/Index.js'
import Calculator from './components/calculator/Calculator.js'
import About from './components/about/About.js'
import { ReactComponent as EfeLogo } from './assets/images/logo.svg'

import { FaBars, FaRegWindowClose, FaAngleRight, FaTimes } from 'react-icons/fa'
import { MdOutlineClose } from 'react-icons/md'
import './App.scss'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleClass = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="App">
      <div
        id="overlay"
        className={isOpen ? '' : 'hidden'}
        onClick={toggleClass}
      ></div>
      <Router>
        <header>
          <section />
          <nav>
            <FaBars id="mobile-nav-icon" onClick={toggleClass} />
            <ul className={isOpen ? 'open' : 'closed'}>
              <span className="menu-grid-item navigation-header">
                <h2>Menu</h2>
                <MdOutlineClose
                  onClick={toggleClass}
                  id="mobile-nav-close-icon"
                />
              </span>
              <li onClick={toggleClass}>
                <NavLink className="menu-grid-item" exact="true" to="/">
                  <span className="link-active-marker"></span>
                  <span className="link-name">Start</span>
                  <FaAngleRight className="link-arrow-icon" />
                </NavLink>
              </li>
              <li onClick={toggleClass}>
                <NavLink
                  className="menu-grid-item"
                  exact="true"
                  to="/calculation"
                >
                  <span className="link-active-marker"></span>
                  <span className="link-name">Calculator</span>
                  <FaAngleRight className="link-arrow-icon" />
                </NavLink>
              </li>
              <li onClick={toggleClass}>
                <NavLink className="menu-grid-item" exact="true" to="/about">
                  <span className="link-active-marker"></span>
                  <span className="link-name">About</span>
                  <FaAngleRight className="link-arrow-icon" />
                </NavLink>
              </li>
            </ul>
            <Link to="/">
              <EfeLogo />
            </Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<Index />}></Route>
            <Route exact path="/calculation" element={<Calculator />}></Route>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  )
}

export default App

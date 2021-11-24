import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

import Footer from './components/footer/Footer.js'
import Index from './components/index/Index.js'
import Calculator from './components/calculator/Calculator.js'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <section>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/">
                  Start
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/calc">
                  Calc
                </NavLink>
              </li>
            </ul>
          </nav>
        </section>
        <Routes>
          <Route exact path="/" element={<Index />}></Route>
          <Route exact path="/calc" element={<Calculator />}></Route>
        </Routes>
      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{!data ? 'Loading...' : data.work.mj}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Footer />
    </div>
  )
}

export default App

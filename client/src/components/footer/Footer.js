import {
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa'
import {
  MdOutlineMailOutline,
} from 'react-icons/md'
import { ReactComponent as EfeLogo } from '../../assets/images/logo.svg'

import './Footer.scss'

function Footer() {
  return (
    <footer>
      <section id="tilted-section">
        <div className="footer-wrapper">
          <div className="footer-content">
            <section className="footer-block">
              <h3>Information</h3>
              <ul>
                <li>
                  The program is only an aid and is not designed to detect toxic
                  overdoses or dosages that can cause disturbances.{' '}
                  <strong>You</strong> as the owner bear the sole responsibility
                  for your horse to have a correct feed state.
                </li>
              </ul>
            </section>
            <section className="footer-block link-block">
              <a href="/">
                <EfeLogo />
              </a>
            </section>
            <section className="footer-block">
              <h3 className="visibly-hidden">Contact</h3>
              <ul>
                <li>
                  <a id="first-icon" href="mailto:hello@sandralindstrom.com">
                    <MdOutlineMailOutline />
                    <span className="visibly-hidden">
                      hello@sandralindstrom.com
                    </span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sandra-lindstr%C3%B6m-b11903153/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                    <span className="visibly-hidden">
                      Visit my Linkedin profile
                    </span>
                  </a>
                  <a
                    id="last-icon"
                    href="https://github.com/Qabang"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FaGithub />
                    <span className="visibly-hidden">
                      Visit my Github profile
                    </span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
      <div className="framing-div"></div>
    </footer>
  )
}

export default Footer

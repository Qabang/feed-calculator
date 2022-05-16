import { MdEmail } from 'react-icons/md'
import { FaLinkedin, FaGithubSquare, FaEnvelope } from 'react-icons/fa'
import './Footer.scss'

function Footer() {
  return (
    <footer>
      <section id="tilted-section">
        <div className="footer-wrapper">
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
            <h3>Recomended Reading</h3>
            <ul>
              <li>
                <a
                  href="https://www.slu.se/institutioner/husdjurens-utfodring-vard/Verktyg/utfodringsrekommendationer-for-hast/"
                  target="_blank"
                >
                  Feed recomendations for horses (Swedish)
                </a>
              </li>
              <li>
                <a
                  href="http://www2.freefarm.se/fodertabell/fodtab.pl?djur=hast"
                  target="_blank"
                >
                  Horse feed nutrition table (Swedish)
                </a>
              </li>
            </ul>
          </section>
          <section className="footer-block">
            <h3 className="visibly-hidden">Contact</h3>
            <ul>
              <li>
                <a href="mailto:hello@sandralindstrom.com">
                  <FaEnvelope id="first-icon" />
                  <span className="visibly-hidden">
                    hello@sandralindstrom.com
                  </span>
                </a>
                <a href="mailto:hello@sandralindstrom.com">
                  <FaLinkedin />
                  <span className="visibly-hidden">
                    Visit my Linkedin profile
                  </span>
                </a>
                <a href="mailto:hello@sandralindstrom.com">
                  <FaGithubSquare id="last-icon" />
                  <span className="visibly-hidden">
                    Visit my Github profile
                  </span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </footer>
  )
}

export default Footer

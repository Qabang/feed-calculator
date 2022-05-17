import {
  FaLinkedin,
  FaGithubSquare,
  FaEnvelope,
  FaExternalLinkAlt,
} from 'react-icons/fa'
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
                  <FaExternalLinkAlt />
                </a>
              </li>
              <li>
                <a
                  href="http://www2.freefarm.se/fodertabell/fodtab.pl?djur=hast"
                  target="_blank"
                >
                  Horse feed nutrition table (Swedish)
                  <FaExternalLinkAlt />
                </a>
              </li>
            </ul>
          </section>
          <section className="footer-block">
            <h3 className="visibly-hidden">Contact</h3>
            <ul>
              <li>
                <a id="first-icon" href="mailto:hello@sandralindstrom.com">
                  <FaEnvelope />
                  <span className="visibly-hidden">
                    hello@sandralindstrom.com
                  </span>
                </a>
                <a href="">
                  <FaLinkedin />
                  <span className="visibly-hidden">
                    Visit my Linkedin profile
                  </span>
                </a>
                <a id="last-icon" href="">
                  <FaGithubSquare />
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

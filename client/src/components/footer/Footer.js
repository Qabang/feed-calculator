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

          <section className="footer-block">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="mailto:hello@sandralindstrom.com">
                  hello@sandralindstrom.com
                </a>
              </li>
            </ul>
          </section>
          <section className="footer-block">
            <h3>Recomended Reading</h3>
            <ul>
              <li>
                <a
                  href="https://www.slu.se/institutioner/husdjurens-utfodring-vard/Verktyg/utfodringsrekommendationer-for-hast/"
                  target="_blank"
                >
                  SLU - Feed recomendations for horses (Swedish)
                </a>
              </li>
              <li>
                <a
                  href="http://www2.freefarm.se/fodertabell/fodtab.pl?djur=hast"
                  target="_blank"
                >
                  SLU - Horse feed nutrition table (Swedish)
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

import { useState } from 'react'
import { FaQuestion, FaTimes, FaExternalLinkAlt } from 'react-icons/fa'

import './HelpBox.scss'

function HelpBox({ children }) {
  const [isVisisble, setIsVisible] = useState(false)

  let handleClick = (e) => {
    e.preventDefault()
    setIsVisible(!isVisisble)
  }
  return (
    <div className="help-wrapper">
      <button className="btn-circle btn-primary" onClick={handleClick}>
        <FaQuestion />
        <span>Help</span>
      </button>
      {isVisisble && (
        <>
          <div id="overlay"></div>
          <section id="help-box">
            <div className="flex-row">
              <h4>Im a help box</h4>
              <button className="btn-circle btn-primary" onClick={handleClick}>
                <FaTimes />
                <span>Close</span>
              </button>
            </div>
            {children}
            {/* <p>
              This form is where you fill in the values of the feed you have
              intended to use in your calculation. Empty fields will not be
              included.
            </p>
            <p>
              Solids: If this field is left blank, the program assumes that the
              feed has a dry matter of 100%.
            </p>
            <p>
              Calcium, Phosphorus, Magnesium and Sodium should be stated in
              grams. Iron, Copper, Zinc, Managan and Selenium should be stated
              in milligrams.
            </p>
            <p>
              You can add how many different types of feed you want. As well as
              edit or delete a feed entry from the list. All values are
              calculated and displayed in the table below the calculator.
            </p>

            <p>
              It is also possible to print or download the calculation as a pdf.
              If you click on download the button, you can choose whether it
              should be saved on your computer or if you want to print it
              directly. Not sure what your feed is worth? check out this list
              from SLU with many of the most common feed materials listed.
            </p>
            <a
              href="http://www2.freefarm.se/fodertabell/fodtab.pl?djur=hast"
              target="_blank"
              rel="noreferrer"
            >
              Horse feed nutrition table (Swedish)
              <FaExternalLinkAlt />
            </a>
            <p>
              Remember that the program is not designed to discover all of the
              dangerous overdoses. There, it is you as the user who bears the
              responsibility to not poison your horse.
            </p> */}
          </section>
        </>
      )}
    </div>
  )
}

export default HelpBox

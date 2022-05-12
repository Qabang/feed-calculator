import { useState } from 'react'
import { FaQuestion, FaTimes } from 'react-icons/fa'

import './HelpBox.scss'

function HelpBox() {
  const [isVisisble, setIsVisible] = useState(false)

  let handleClick = (e) => {
    e.preventDefault()
    setIsVisible(!isVisisble)
  }
  return (
    <div class="help-wrapper">
      <button className="btn-circle btn-primary" onClick={handleClick}>
        <FaQuestion />
        <span>Help</span>
      </button>
      {isVisisble && (
        <>
          <div id="overlay"></div>
          <section id="help-box">
            <div className="flex-row">
              <h2>Im a help box</h2>
              <button className="btn-circle btn-primary" onClick={handleClick}>
                <FaTimes />
                <span>Close</span>
              </button>
            </div>
            <p>
              Praesent massa nisi, condimentum non scelerisque vitae, hendrerit
              id sem. Aliquam et bibendum nunc. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos. Duis
              vel ultrices nunc. Morbi ut turpis vel ligula finibus lacinia ac
              in orci. Nulla finibus rhoncus arcu, vel ullamcorper dui
              pellentesque vitae. Aliquam vel fringilla arcu. Aenean ut lacus
              maximus, vestibulum nisi quis, ornare eros. Vestibulum condimentum
              facilisis velit non fringilla. Integer eu justo semper, tempor dui
              sit amet, condimentum nisi. In molestie odio velit, tristique
              commodo massa consectetur ut. Mauris facilisis mollis facilisis.
              In at molestie eros.
            </p>
          </section>
        </>
      )}
    </div>
  )
}

export default HelpBox

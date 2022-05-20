import './Spinner.scss'
const Spinner = ({ msg, isVisible }) => (
  <div className="loader-wrapper">
    {isVisible && (
      <>
        <div id="overlay" className={isVisible ? 'visible' : 'hidden'}></div>
        <div className="wrapper">
          <div className="loader"></div>
          <div className="spinner-message">{msg}</div>
        </div>
      </>
    )}
  </div>
)

export default Spinner

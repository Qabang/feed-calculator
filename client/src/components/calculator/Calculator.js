import { useEffect, useState, useRef } from 'react'
import HorseForm from './HorseForm.js'
import FeedForm from './FeedForm.js'
import './Calculator.scss'

function Calculator() {
  const [horseBaseData, setHorseBaseData] = useState('')
  const [horseWorkData, setHorseWorkData] = useState('')
  const [horseResultData, setHorseResultData] = useState('')
  const [showCalculator, setShowCalculator] = useState(false)
  const myRef = useRef(null)

  let handleHorseForm = (childData) => {
    setHorseBaseData(childData.base)
    setHorseWorkData(childData.work)
    setShowCalculator(true)
  }

  let handleFeedForm = (feedData) => {
    setHorseResultData(feedData)
    myRef.current.scrollIntoView()
  }

  return (
    <section>
      <HorseForm calculatorCallback={handleHorseForm} />

      {horseBaseData && (
        <section id="feed-needs" ref={myRef}>
          <ul id="feed-labels">
            <div className="feed-clearfix"></div>
            {horseBaseData &&
              Object.keys(horseBaseData).map((key, index) => (
                <li key={key + index}>{key}</li>
              ))}
          </ul>
          <ul id="basic-need">
            <h3 className="feed-clearfix">Basic needs:</h3>
            {horseBaseData &&
              Object.keys(horseBaseData).map((key, index) => (
                <li key={key + index}>{horseBaseData[key]}</li>
              ))}
          </ul>
          <ul id="work-need">
            <h3 className="feed-clearfix">Work needs:</h3>
            {horseWorkData &&
              Object.keys(horseWorkData).map((key, index) => (
                <li key={key + index}>{horseWorkData[key]}</li>
              ))}
          </ul>

          {horseResultData && (
            <ul id="feed-total">
              <h3 className="feed-clearfix">Total given:</h3>
              {horseResultData &&
                Object.keys(horseResultData).map((key, index) => (
                  <li key={key + index}>{horseResultData[key]}</li>
                ))}
            </ul>
          )}

          {horseResultData && (
            <ul id="feed-result">
              <h3 className="feed-clearfix">Result:</h3>
              {horseResultData &&
                Object.keys(horseResultData).map((key, index) => (
                  <li key={key + index}>
                    {parseInt(
                      (horseResultData[key] /
                        (horseBaseData[key] + horseWorkData[key])) *
                        100
                    )}
                    %
                  </li>
                ))}
            </ul>
          )}
        </section>
      )}
      <section id="feeding-calculator-wrapper">
        {showCalculator && <FeedForm calculatorCallback={handleFeedForm} />}
      </section>
    </section>
  )
}
export default Calculator

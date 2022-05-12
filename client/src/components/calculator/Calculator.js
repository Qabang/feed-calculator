import { useEffect, useState, useRef } from 'react'
import HorseForm from './HorseForm.js'
import FeedForm from './FeedForm.js'
import FeedRow from './FeedRow.js'
import axios from 'axios'

import './Calculator.scss'

function Calculator() {
  const [horseBaseData, setHorseBaseData] = useState('')
  const [horseWorkData, setHorseWorkData] = useState('')
  const [feedRows, setFeedRows] = useState([])
  const [horseResultData, setHorseResultData] = useState('')
  const [showCalculator, setShowCalculator] = useState(false)
  const [showCardMessage, setShowCardMessage] = useState(false)
  const [cardMessage, setCardMessage] = useState('')
  const myRef = useRef(null)

  let handleHorseForm = (childData) => {
    setHorseBaseData(childData.base)
    setHorseWorkData(childData.work)
    setShowCalculator(true)
  }

  let handleAddFeedRow = (row) => {
    let list = feedRows
    list.push(row)
    let msg = 'Added ' + row.name + ' to list'
    calculateValues(list)
    updateFeedList(list, msg)
  }

  let handleEditFeedCard = (key, values) => {
    let list = feedRows
    list[key] = values
    calculateValues(list)
    updateFeedList(
      list,
      'Successfully updated the value(s) for ' + list[key].name
    )
  }

  let handleDeleteFeedCard = (key) => {
    let list = feedRows
    let msg = 'Successfully deleted ' + list[key].name + ' from list'
    list.splice(key, 1)
    calculateValues(feedRows)
    updateFeedList(list, msg)
  }

  function updateFeedList(list, msg) {
    setFeedRows(list)
    setShowCardMessage(true)
    setCardMessage(msg)
    setTimeout(() => {
      setShowCardMessage(false)
      setCardMessage('')
    }, 5000)
  }

  let calculateValues = (values) => {
    axios({
      method: 'post',
      url: '/calculate',
      data: {
        values,
      },
    }).then(
      (response) => {
        if (response.status === 200) {
          setHorseResultData(response.data)
          myRef.current.scrollIntoView()
        }
      },
      (error) => {
        // TODO log error somewhere.
        console.log(error)
      }
    )
  }

  return (
    <section>
      <HorseForm calculatorCallback={handleHorseForm} />

      {horseBaseData && (
        <div>
          <h2>Need results:</h2>
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
            {(horseBaseData || horseResultData) && (
              <ul id="feed-total">
                <h3 className="feed-clearfix">Total given:</h3>
                {horseResultData &&
                  Object.keys(horseResultData).map((key, index) => (
                    <li key={key + index}>{horseResultData[key]}</li>
                  ))}
              </ul>
            )}
            {(horseBaseData || horseResultData) && (
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
        </div>
      )}
      {showCalculator && (
        <section id="feeding-calculator-wrapper" className="form-wrapper">
          <FeedForm addFeedRowCallback={handleAddFeedRow} />
        </section>
      )}
      {showCardMessage && <div>{cardMessage}</div>}
      {feedRows && (
        <ul id="feedrow-wrapper" className="form-wrapper">
          {feedRows.map((row, index) => (
            <FeedRow
              key={index}
              index={index}
              feedData={row}
              editFeedCard={handleEditFeedCard}
              deleteFeedCard={handleDeleteFeedCard}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
export default Calculator

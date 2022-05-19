import { useEffect, useState, useRef } from 'react'
import * as React from 'react'
import ReactToPrint from 'react-to-print'
import { useReactToPrint } from 'react-to-print'
import HorseForm from './HorseForm.js'
import FeedForm from './FeedForm.js'
import FeedRow from './FeedRow.js'
import { FunctionalComponentToPrint } from './ComponentToPrint'
import axios from 'axios'
import {
  FaDownload,
  FaExclamationCircle,
  FaExclamationTriangle,
} from 'react-icons/fa'

import './Calculator.scss'
import ResultColumn from './ResultColumn.js'
import FeedWarningsList from './FeedWarningsList.js'

function Calculator() {
  const [profile, setProfile] = useState('')
  const [feedWarningList, setFeedWarningList] = useState({})
  const [toxicValues, setToxicValues] = useState([])
  const [horseWorkAmount, setHorseWorkAmount] = useState('')
  const [horseBaseData, setHorseBaseData] = useState('')
  const [horseWorkData, setHorseWorkData] = useState('')
  const [feedRows, setFeedRows] = useState([])
  const [horseResultData, setHorseResultData] = useState('')
  const [showCalculator, setShowCalculator] = useState(false)
  const [showCardMessage, setShowCardMessage] = useState(false)
  const [cardMessage, setCardMessage] = useState('')
  const myRef = useRef(null)
  const calculatorRef = useRef(null)

  let handleHorseForm = (childData) => {
    setHorseBaseData(childData.base)
    setHorseWorkData(childData.work)
    setShowCalculator(true)
    calculatorRef.current.scrollIntoView()
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

  const getToxicValues = async (resultData) => {
    console.log('val: ', profile.weight)
    let values = { profile, resultData }
    axios({
      method: 'post',
      url: '/tolerance',
      data: { values },
    }).then(
      (response) => {
        if (response.status === 200) {
          console.log(response.data)
          setToxicValues(response.data)
        }
      },
      (error) => {
        // TODO log error somewhere.
        console.log(error)
      }
    )
  }

  let handleFeedWarnings = (result) => {
    let feedWarnings = {}
    Object.keys(result).map((key) => {
      let percent =
        (result[key] / (horseBaseData[key] + horseWorkData[key])) * 100

      if (!(key in toxicValues)) {
        if (result[key] < horseBaseData[key]) {
          feedWarnings[key] =
            "This value is too low and does not cover your horse's minimum needs!"
        } else if (percent > 105) {
          feedWarnings[key] =
            "This value is a bit high. If your horse dosen't get fat it's probably not dangerous"
        } else if (percent < 95) {
          feedWarnings[key] =
            "This value is a bit low. If your horse dosen't get to skinny it's probably not dangerous"
        }
      }
    })

    setFeedWarningList(feedWarnings)
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
          getToxicValues(response.data)
          handleFeedWarnings(response.data)
        }
      },
      (error) => {
        // TODO log error somewhere.
        console.log(error)
      }
    )
  }

  // React-to-print print component.
  const componentRef = React.useRef(null)

  const onBeforeGetContentResolve = React.useRef(null)

  const [loading, setLoading] = React.useState(false)
  const [text, setText] = React.useState('')

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log('`onBeforeGetContent` called')
    setLoading(true)
    setText('Loading Document...')

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve

      setTimeout(() => {
        setLoading(false)
        setText('Document is ready!')
        resolve()
      }, 2000)
    })
  }, [setLoading, setText])

  React.useEffect(() => {
    if (
      text === 'Document is ready!' &&
      typeof onBeforeGetContentResolve.current === 'function'
    ) {
      onBeforeGetContentResolve.current()
    }
  }, [onBeforeGetContentResolve.current, text])

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, [componentRef.current])

  const reactToPrintTrigger = React.useCallback(() => {
    return (
      <button id="print-trigger" className="btn-slim btn-cta">
        <FaDownload />
        <span>Print Feed Calculation</span>
      </button>
    )
  }, [])

  return (
    <section id="calculator-section-wrapper">
      <HorseForm
        calculatorCallback={handleHorseForm}
        setProfile={setProfile}
        setHorseWorkAmount={setHorseWorkAmount}
      />

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
            <ResultColumn title="Basic needs" data={horseBaseData} />
            <ResultColumn title="Work needs" data={horseWorkData} />
            <ResultColumn title="Total given" data={horseResultData} />
            {(horseBaseData || horseResultData) && (
              <ul id="feed-result">
                <h3 className="feed-clearfix">Result:</h3>
                {horseResultData &&
                  Object.keys(horseResultData).map((key, index) => (
                    <li
                      key={key + index}
                      className={
                        (key in toxicValues ? 'error-danger' : '') +
                        ' ' +
                        (key in feedWarningList ? 'error-warning' : '')
                      }
                    >
                      {parseInt(
                        (horseResultData[key] /
                          (horseBaseData[key] + horseWorkData[key])) *
                          100
                      )}
                      %
                      {key in toxicValues && (
                        <span className="error-icon danger">
                          <FaExclamationCircle />
                        </span>
                      )}
                      {!(key in toxicValues) && key in feedWarningList && (
                        <span className="error-icon warning">
                          <FaExclamationTriangle />
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </section>
          <FeedWarningsList
            feedWarningList={feedWarningList}
            toxicValues={toxicValues}
          />
          {horseResultData && (
            <div id="print-section">
              <ReactToPrint
                content={reactToPrintContent}
                documentTitle={'feed-caculation-' + profile}
                onBeforeGetContent={handleOnBeforeGetContent}
                removeAfterPrint
                trigger={reactToPrintTrigger}
              />
              {loading && <p className="indicator">Preparing document...</p>}
              <div style={{ display: 'none' }}>
                <FunctionalComponentToPrint
                  ref={componentRef}
                  feedData={feedRows}
                  profileName={profile.name}
                  work={horseWorkAmount}
                  calculations={[horseBaseData, horseWorkData, horseResultData]}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {showCalculator && (
        <section
          id="feeding-calculator-wrapper"
          className="form-wrapper"
          ref={calculatorRef}
        >
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

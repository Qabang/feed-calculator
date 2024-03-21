import { useState, useRef } from 'react'
import * as React from 'react'
import ReactToPrint from 'react-to-print'
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

import FeedWarningsList from './FeedWarningsList.js'
import Quotas from './Quotas.js'
import CollapsibleWidget from '../widgets/CollapsibleWidget.js'
import SimpleWidget from '../widgets/SimpleWidget.js'
import { FeedModel } from '../../Models/FeedModel.js'

function Calculator() {
  const feedModel = new FeedModel();
  const [profile, setProfile] = useState('')
  const [feedWarningList, setFeedWarningList] = useState({})
  const [toxicValues, setToxicValues] = useState([])
  const [horseWorkAmount, setHorseWorkAmount] = useState('')
  const [horseBaseData, setHorseBaseData] = useState('')
  const [horseWorkData, setHorseWorkData] = useState('')
  const [feedRows, setFeedRows] = useState([])
  const [horseResultData, setHorseResultData] = useState('')
  const [showCalculator, setShowCalculator] = useState(false)
  const myRef = useRef(null)
  const calculatorRef = useRef(null)
  const labels = feedModel.feedModelLabels

  let handleHorseForm = (childData) => {
    setHorseBaseData(childData.base)
    setHorseWorkData(childData.work)
    setShowCalculator(true)

    if (calculatorRef !== null && calculatorRef.current !== null) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  let handleAddFeedRow = (row) => {
    let list = feedRows
    list.push(row)
    calculateValues(list)
    setFeedRows(list)
  }

  let handleEditFeedCard = (key, values) => {
    let list = feedRows
    list[key] = values
    calculateValues(list)
    setFeedRows(list)
  }

  let handleDeleteFeedCard = (key) => {
    let list = feedRows
    list.splice(key, 1)
    calculateValues(feedRows)
    setFeedRows(list)
  }

  const getToxicValues = async (resultData) => {
    let values = { profile, resultData }
    axios({
      method: 'post',
      url: '/tolerance',
      data: { values },
    }).then(
      (response) => {
        if (response.status === 200) {
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
      let percent = (result[key] / (horseBaseData[key] + horseWorkData[key])) * 100
      if (!(key in toxicValues)) {
        if (result[key] < horseBaseData[key] && percent < 99.5) {
          feedWarnings[key] =
            "This value is too low and does not cover your horse's minimum needs!"
        } else if (percent > 105) {
          feedWarnings[key] =
            "This value is a bit high. If your horse dosen't get fat it's probably not dangerous"
        }
      }
      return feedWarnings
    })

    setFeedWarningList(feedWarnings)
  }

  let calculateValues = async (values) => {
    console.log(values)
    await axios({
      method: 'post',
      url: '/calculate',
      data: {
        values,
      },
    }).then(
      (response) => {
        if (response.status === 200) {
          const result = response.data
          // myRef.current.scrollIntoView()
          getToxicValues(result)
          handleFeedWarnings(result)
          setHorseResultData(result)
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
  }, [text])

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, [])

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
      <h2>The Calculator</h2>
      <HorseForm
        calculatorCallback={handleHorseForm}
        setProfile={setProfile}
        setHorseWorkAmount={setHorseWorkAmount}
      />

      {horseResultData && (
        <div id="print-section">
          <ReactToPrint
            content={reactToPrintContent}
            documentTitle={'feed-caculation-' + profile.name || '[null]'}
            onBeforeGetContent={handleOnBeforeGetContent}
            removeAfterPrint
            trigger={reactToPrintTrigger}
          />
          {loading && (<div className='flex-wrapper'><p className="indicator">Preparing document</p><span className='dots'></span></div>)}
          <div style={{ display: 'none' }}>
            <FunctionalComponentToPrint
              ref={componentRef}
              feedData={feedRows}
              profileName={profile.name}
              work={horseWorkAmount}
              calculations={{ horseBaseData: horseBaseData, horseWorkData: horseWorkData, horseResultData: horseResultData }}
              quotas={<Quotas data={horseResultData} />}
              warnings={(Object.keys(feedWarningList).length > 0 || Object.keys(toxicValues).length > 0) ? <FeedWarningsList feedWarningList={feedWarningList} toxicValues={toxicValues} /> : null
              }
            />
          </div>
        </div>
      )}

      {showCalculator && (
        <>
          <h3>Add Feed</h3>
          <SimpleWidget>
            <section
              id="feeding-calculator-wrapper"
              className="form-wrapper"
              ref={calculatorRef}
            >
              <FeedForm addFeedRowCallback={handleAddFeedRow} />
            </section>
          </SimpleWidget>
        </>

      )}

      {feedRows && (
        <section id="feedrow-section" className='calculator-section'>
          {feedRows.map((row, index) => (

            <FeedRow
              key={index}
              index={index}
              feedData={row}
              editFeedCard={handleEditFeedCard}
              deleteFeedCard={handleDeleteFeedCard}
              feedLabels={labels}
            />

          ))}
        </section>
      )}

      {horseBaseData && (
        <section className='calculator-section'>
          <h3>Feedstate result:</h3>
          <SimpleWidget title="Result:">
            <table className="feed-table-result" ref={myRef} cellSpacing="1" cellPadding="0">
              <thead>
                <tr>
                  <th></th>
                  <th>Basic need</th>
                  <th>Work need</th>
                  <th>Total given</th>
                  <th>Summary</th>
                </tr>
              </thead>
              {horseBaseData &&
                Object.keys(horseBaseData).map((key, index) => (
                  <tbody key={key + index} className='table-row-section'>
                    <tr>
                      <th title={labels[key].full} className={`row-header ${toxicValues[key] && 'danger'} ${feedWarningList[key] && 'warning'}`}>{labels[key].short}</th>
                      <td>{horseBaseData[key]}</td>
                      <td>{horseWorkData[key]}</td>
                      <td>{horseResultData[key] ?? '-'}</td>
                      <td className='summary-cell'>
                        {(isNaN(parseInt(horseResultData[key] / (horseBaseData[key] + horseWorkData[key])))) ?
                          '-'
                          :
                          parseInt(parseFloat(horseResultData[key]) / (parseFloat(horseBaseData[key]) + parseFloat(horseWorkData[key])) * 100) + '%'
                        }

                        <span className="icon">
                          {key in toxicValues && (
                            <span className="error-icon danger">
                              <FaExclamationCircle />
                            </span>
                          )}
                          {key in feedWarningList && (
                            <span className="error-icon warning">
                              <FaExclamationTriangle />
                            </span>
                          )}
                        </span>
                      </td>
                    </tr>
                    {(toxicValues[key] || feedWarningList[key]) &&
                      <tr className='error-row'>
                        <td className={`row-header ${toxicValues[key] && 'danger'}`}></td>
                        <td className='error-cell' colSpan={4}>{toxicValues[key] ? <span className='toxic'>This amount is toxic for your horse (values above {toxicValues[key]}mg per 100kg, are dangerous) You need to adjust the
                          feedstate or this could potentially kill your horse</span> : feedWarningList[key]} </td>
                      </tr>
                    }
                  </tbody>
                ))}

            </table>
          </SimpleWidget>
        </section>
      )}

      {horseResultData &&
        <section className='calculator-section'>
          <CollapsibleWidget title={<h3>Quotas:</h3>}>
            {horseResultData && <Quotas data={horseResultData} />}
          </CollapsibleWidget>
        </section>
      }
    </section>

  )
}
export default Calculator

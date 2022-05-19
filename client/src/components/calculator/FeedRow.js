import {
  FaPen,
  FaTrashAlt,
  FaChevronDown,
  FaSave,
  FaTimes,
} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import FeedForm from './FeedForm.js'

import './FeedRow.scss'

function FeedRow(props) {
  let [feedRow, setFeedRow] = useState()
  let [isExpanded, setIsExpanded] = useState(false)
  let [editRow, setEditRow] = useState(false)

  let toggleFeedCard = () => {
    return setIsExpanded(!isExpanded)
  }

  let toggleEditRow = () => {
    toggleFeedCard()
    return setEditRow(true)
  }

  let handleEditFeedRow = (values) => {
    props.editFeedCard(props.index, values)
    setEditRow(false)
  }

  useEffect(() => {
    setFeedRow(props.feedData)
  }, [props])

  return (
    <>
      {feedRow && (
        <li
          className={(isExpanded || editRow ? 'open ' : 'closed ') + 'feedrow'}
        >
          <div className="feedrow-header">
            <p className="feedrow-title">
              {feedRow.name || ' - '}:<span> {feedRow.amount} kg</span>
            </p>
            <button
              className="btn-slim btn-small btn-edit"
              onClick={toggleEditRow}
            >
              <FaPen />
              <span>Edit</span>
            </button>
            <button
              className="btn-slim btn-small btn-delete"
              onClick={() => props.deleteFeedCard(props.index)}
            >
              <FaTrashAlt />
              <span>Delete</span>
            </button>
            <FaChevronDown
              className={(editRow ? 'disabled ' : '') + 'toggle-arrow'}
              onClick={toggleFeedCard}
              title={
                editRow
                  ? 'Close the edit box before you can collapse this card'
                  : 'Toggle visibility of the data in the card'
              }
            />
          </div>
          <div className={(editRow ? 'edit ' : '') + 'feedrow-content'}>
            {!editRow && (
              <>
                <ul>
                  <li>
                    <label htmlFor="list-mj">mj</label>
                    <span id="list-mj">{feedRow.mj}</span>
                  </li>
                  <li>
                    <label htmlFor="list-smrp">smrp</label>
                    <span id="list-smrp">{feedRow.smrp}</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <label htmlFor="list-ca">ca</label>
                    <span id="list-ca">{feedRow.ca}</span>
                  </li>
                  <li>
                    <label htmlFor="list-p">p</label>
                    <span id="list-p">{feedRow.p}</span>
                  </li>
                  <li>
                    <label htmlFor="list-mg">mg</label>
                    <span id="list-mg">{feedRow.mg}</span>
                  </li>
                  <li>
                    <label htmlFor="list-selenium">selenium</label>
                    <span id="list-selenium">{feedRow.selenium}</span>
                  </li>
                </ul>
              </>
            )}
            {editRow && (
              <>
                <FeedForm
                  addFeedRowCallback={handleEditFeedRow}
                  defaultValues={feedRow}
                  edit={true}
                  buttonIcon={<FaSave />}
                  buttonText="Save"
                />
                <button
                  className="btn-cancel btn-slim btn-small btn-edit"
                  onClick={(e) => {
                    e.preventDefault()
                    setEditRow(false)
                  }}
                >
                  <FaTimes />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        </li>
      )}
    </>
  )
}

export default FeedRow

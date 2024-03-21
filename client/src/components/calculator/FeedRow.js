import {
  FaPen,
  FaSave,
  FaTimes,
} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import FeedForm from './FeedForm.js'

import './FeedForm.scss'
import './FeedRow.scss'
import CollapsibleWidget from '../widgets/CollapsibleWidget.js'
import WidgetButtons from '../widgets/WidgetButtons.js'
import { FeedModel } from '../../Models/FeedModel.js'

function FeedRow(props) {
  const feedModel = new FeedModel(props.feedData)
  let [feedRow, setFeedRow] = useState(feedModel.feedModelData)
  let [isExpanded, setIsExpanded] = useState(false)
  let [editRow, setEditRow] = useState(false)
  let [units] = useState(feedModel.feedModelUnits)

  let toggleFeedCard = () => {
    return setIsExpanded(true)
  }

  let toggleEditRow = async () => {
    await setIsExpanded(false)
    toggleFeedCard()
    return setEditRow(true)
  }

  let handleEditFeedRow = (values) => {
    props.editFeedCard(props.index, values)
    setEditRow(false)
  }

  useEffect(() => {
    setFeedRow(props.feedData)
  }, [props, isExpanded])

  return (
    <>
      {feedRow && (
        <WidgetButtons onAction={toggleEditRow} onDelete={() => props.deleteFeedCard(props.index)} onActionIcon={<FaPen />} onActionBtnType={"edit"} onActionTitle={"Edit"}>
          <CollapsibleWidget title={<>{feedRow.name || ' - '} : <span> {feedRow.amount || ' 0 '} kg</span></>} slim={true} collapseWidget={!isExpanded} textAlignLeft={true}>
            <section
              className={(isExpanded || editRow ? 'open ' : 'closed ') + 'feedrow'}
            >
              <div className={(editRow ? 'edit ' : '') + 'feedrow-content form-wrapper'}>
                {!editRow && (
                  <>
                    {props.feedLabels &&
                      <table cellSpacing={0} cellPadding={3}>
                        <tbody>
                          {Object.keys(props.feedLabels).map((key, index) => (
                            <tr key={key + index}>
                              <th>{props.feedLabels[key].full}</th>
                              <td className='text-align-right'>{feedRow[key] || '-'}</td>
                              <td>{units[key] && `${units[key]} / Kg`}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    }
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
                    <hr />
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
            </section>
          </CollapsibleWidget>
        </WidgetButtons>
      )}

    </>
  )
}

export default FeedRow

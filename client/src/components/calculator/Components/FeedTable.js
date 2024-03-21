import { FeedModel } from "../../../Models/FeedModel"
import {
    FaExclamationCircle,
    FaExclamationTriangle,
} from 'react-icons/fa'

export default function FeedTable({ horseBaseData, horseWorkData, horseResultData, feedWarningList, toxicValues }) {

    const feedModel = new FeedModel();
    const labels = feedModel.feedModelLabels
    //ref={myRef}
    return (
        <table className="feed-table-result" cellSpacing="1" cellPadding="0">
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
    )
}
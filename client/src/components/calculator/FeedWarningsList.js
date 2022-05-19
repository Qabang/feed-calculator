import { useEffect, useState } from 'react'
import { FaExclamationCircle, FaExclamationTriangle } from 'react-icons/fa'

function FeedWarningsList({ feedWarningList, toxicValues }) {
  const labels = {
    mj: 'Energi (Mj)',
    smrp: 'Smältbart råprotein (smrp)',
    ca: 'Calcium (Ca)',
    p: 'Phosophor (P)',
    mg: 'Magnesium (Mg)',
    na: 'Natrium (Na)',
    fe: 'Iron (Fe)',
    cu: 'Copper (Cu)',
    zn: 'Zink (Zn)',
    mn: 'Mangan (Mn)',
    selenium: 'Selenium (Se)',
  }

  const [toxicDangerList, setToxicDangerList] = useState({})

  useEffect(() => {
    if (toxicValues) {
      let list = {}
      Object.keys(toxicValues).map((key) => {
        list[
          key
        ] = `This amount is toxic for your horse (values above: ${toxicValues[key]} are dangerous) You need to adjust the
                feedstate or this could potentially kill your horse`
      })

      setToxicDangerList(list)
    }
  }, [toxicValues])

  function ListElement({ title, list, icon, listType }) {
    return (
      <ul>
        <h3>{title}</h3>
        {Object.keys(list).map((key, index) => (
          <li key={index + '-' + listType + '-values'}>
            <span className={'error-icon ' + listType}>{icon}</span>
            <span className="list-label">{labels[key]}</span>: {list[key]}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <>
      {(Object.entries(feedWarningList).length > 0 ||
        Object.entries(toxicDangerList).length > 0) && (
        <section id="calculation-errors">
          {Object.keys(feedWarningList).length > 0 && (
            <ListElement
              title="Warnings:"
              list={feedWarningList}
              icon={<FaExclamationTriangle />}
              listType="warning"
            />
          )}
          {Object.keys(toxicDangerList).length > 0 && (
            <ListElement
              title="Toxic values:"
              list={toxicDangerList}
              icon={<FaExclamationCircle />}
              listType="danger"
            />
          )}
        </section>
      )}
    </>
  )
}

export default FeedWarningsList

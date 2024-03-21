import { useEffect, useState } from 'react'
import { FaHorseHead, FaPen, FaCalculator } from 'react-icons/fa'
import sanitizeHtml from 'sanitize-html';

import CollapsibleWidget from '../../widgets/CollapsibleWidget.js'
import WidgetButtons from '../../widgets/WidgetButtons.js'
import HorseProfileData from './HorseProfileData.js'


import './HorseProfileCard.scss'

export default function HorseProfileCard({ data, onSelect, onDelete, onEdit, active }) {
  const [isSelected, setIsSelected] = useState(active)

  useEffect(() => {
    setIsSelected(active)
  }, [active])

  function handleSelect(data) {
    onSelect(data)
  }

  return (
    <section className={`horse-profile-card ${(isSelected ? "active-profile" : "")}`}>
      <WidgetButtons onAction={() => handleSelect(data)} onDelete={onDelete.bind(this, data.name)} onActionIcon={<FaCalculator />} onActionTitle={"Select"}>
        <CollapsibleWidget title={<h3>{sanitizeHtml(data.name)}</h3>} icon={<span className={isSelected ? "active" : "not-active"}><FaHorseHead /></span>} collapseWidget={true} slim={true}>
          <div className='profile'>
            <HorseProfileData data={data} />
            {onEdit && (
              <button className="btn-icon btn edit" onClick={onEdit.bind(this, data)}> <FaPen />Edit</button>
            )}
          </div>
        </CollapsibleWidget>
      </WidgetButtons>
    </section>
  )
}

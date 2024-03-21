import { FaChevronDown } from 'react-icons/fa'
import * as React from 'react'

import { useState, useEffect } from 'react'

import './CollapsibleWidget.scss'

function CollapsibleWidget({ children, title, amount, icon, collapseWidget, slim, textAlignLeft }) {
    const [isCollapsed, setIsCollapsed] = useState(collapseWidget || false)

    useEffect((e) => {
        return setIsCollapsed(collapseWidget)

    }, [collapseWidget])

    return (
        <>
            <div className="collapsible-widget-wrapper">
                <div className={`widget-header ${slim && "slim"} ${textAlignLeft && "left"}`} onClick={() => setIsCollapsed(!isCollapsed)}>
                    <div className='header-title'>
                        <span className='widget-icon'>{icon}</span>
                        <span className="title-text">{title}</span>
                    </div>
                    <FaChevronDown />
                </div>
                <div className={`widget-body ${isCollapsed ? "collapsed" : "open"}`}>
                    {children}
                </div>
            </div>
        </>)
}

export default CollapsibleWidget
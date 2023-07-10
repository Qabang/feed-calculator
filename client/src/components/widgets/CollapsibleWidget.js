import { FaChevronDown } from 'react-icons/fa'
import * as React from 'react'

import { useState, useEffect } from 'react'

import './CollapsibleWidget.scss'

function CollapsibleWidget({ children, title, amount }) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        return;
    }, [isCollapsed])
    return (
        <>
            <div className="collapsible-widget-wrapper">
                <div className="widget-header" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <h3>{title}</h3>
                    <FaChevronDown />
                </div>
                <div className={`widget-body ${isCollapsed ? "collapsed" : "open"}`}>
                    {children}
                </div>
            </div>
        </>)
}

export default CollapsibleWidget
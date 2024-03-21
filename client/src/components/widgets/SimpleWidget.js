import * as React from 'react'
import sanitizeHtml from 'sanitize-html';

import './SimpleWidget.scss'

function SimpleWidget({ children, title, icon }) {
    return (
        <>
            <div className="widget-wrapper">
                <div className={`widget-header`}>
                    <div className='header-title'>
                        <span className='widget-icon'>{icon}</span>
                        <h3 dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}></h3>
                    </div>
                </div>
                <div className={`widget-body`}>
                    {children}
                </div>
            </div>
        </>)
}

export default SimpleWidget
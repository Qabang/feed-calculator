import { FaTrash } from 'react-icons/fa'
import * as React from 'react'

import { useState, useEffect } from 'react'

import './WidgetButtons.scss'

function WidgetButtons({ children, onAction, disableOnAction, onActionIcon, onActionTitle, onActionBtnType, onDelete, disableOnDelete }) {
    const [btnType, setBtnType] = useState(onActionBtnType)

    useEffect(() => {
        switch (onActionBtnType) {
            case "cta":
                setBtnType("btn-cta")
                break;
            case "edit":
                setBtnType("btn-edit")
                break;
            case "delete":
                setBtnType("btn-delete")
                break;
            default:
                setBtnType("btn-primary")
                break;
        }
        return;
    }, [onActionBtnType])


    return (
        <>
            <section className={`widget-button-wrapper`}>
                {onAction && (
                    <button className={`btn-icon btn ${btnType}`} onClick={onAction} disabled={disableOnAction ? true : false}>{onActionIcon}{onActionTitle}</button>
                )}
                {children}
                {onDelete && (
                    <button className="btn delete btn-icon" onClick={onDelete} disabled={disableOnDelete ? true : false}><FaTrash /> <span>Delete</span></button>
                )}
            </section>
        </>)
}

export default WidgetButtons
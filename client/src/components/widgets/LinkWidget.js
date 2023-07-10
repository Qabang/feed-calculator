import { FaExternalLinkAlt, FaRegPaperPlane } from 'react-icons/fa'
import './LinkWidget.scss'

function LinkWidget({ href, title }) {
    let actionLink = ''

    if (!href) {
        throw Error("LinkWidget: Href can't be null or empty")
    }

    actionLink = <a href={href}>{title}</a>

    if (href.includes("http")) {
        actionLink = <a href={href} target="_blank" rel="noreferrer">{title} <FaExternalLinkAlt /></a>
    }

    if (href.includes("mailto:")) {
        actionLink = <a href={href}>{title} <FaRegPaperPlane /></a>
    }

    return (<span className="link-wrapper">{actionLink}<span className="hover-border"></span></span>)
}

export default LinkWidget
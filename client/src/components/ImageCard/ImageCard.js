import './ImageCard.scss'
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function ImageCard(props) {

  let actionLink;
  let imageUrl = props.image && `url(/images/${props.image})`

  if (props.link && props.link.url.includes("https")) {

    actionLink = <a href={props.link.url} target="_blank" rel="noreferrer" title={props.link.text}>{props.link.text} <FaExternalLinkAlt /></a>
  }
  else if (props.link) {
    actionLink = <Link to={props.link.url}>{props.link.text} <FaArrowRight /></Link>
  }

  return (
    <section className={props.cta ? "cta image-card" : "image-card"} style={{ marginLeft: props.right ? "auto" : 0, marginRight: props.right ? 0 : "auto" }}>
      <div className={`image-container ${props.right ? '' : 'inverted'}`} style={{ backgroundImage: imageUrl, marginLeft: props.right ? "auto" : 0, marginRight: props.right ? 0 : "auto" }}></div>

      <section className={`image-card-text-box ${props.right ? '' : 'inverted'} ${props.cta ? 'cta' : ''}`}>
        <div className="textbox-content">
          <h3>{props.title}</h3>
          <div className="text">
            <p>{props.text ||
              `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
              hic suscipit. In itaque blanditiis perspiciatis, eveniet facilis eaque
              cupiditate vel exercitationem, ad, expedita et fuga facere distinctio
              rerum aliquid veritatis?`}</p>
            {props.link && (
              <div className="action-link">
                {actionLink}
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}

export default ImageCard

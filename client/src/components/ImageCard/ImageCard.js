import './ImageCard.scss'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function ImageCard(props) {
  return (
    <section className="image-card">
      {props.image && (
        <img
          className={props.right ? 'right' : 'left'}
          sizes="(max-width: 1400px) 480px, 1400px"
          srcSet={`
            /horses-srcset/${props.image}_1400.jpg 1400w,
            /horses-srcset/${props.image}_1200.jpg 1200w,
            /horses-srcset/${props.image}_1000.jpg 1000w,
            /horses-srcset/${props.image}_800.jpg 800w,
            /horses-srcset/${props.image}_600.jpg 600w,
            /horses-srcset/${props.image}_400.jpg 400w,
      
          `}
          src={`/horses-srcset/${props.image}_400.jpg`}
          alt={props.alt || ''}
        />
      )}
      <section
        className={`image-card-text-box ${props.right ? 'right' : 'left'}`}
      >
        <div className="text">
          {props.text ||
            `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
          hic suscipit. In itaque blanditiis perspiciatis, eveniet facilis eaque
          cupiditate vel exercitationem, ad, expedita et fuga facere distinctio
          rerum aliquid veritatis?`}
          {props.link && (
            <div>
              <Link to={props.link.url}>
                {props.link.text} <FaArrowRight />
              </Link>
            </div>
          )}
        </div>
      </section>
    </section>
  )
}

export default ImageCard

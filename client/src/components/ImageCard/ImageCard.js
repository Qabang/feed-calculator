import './ImageCard.scss'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function ImageCard(props) {
  // /horses-srcset/${props.image}_c_scale,w_442.jpg 442w,
  // /horses-srcset/${props.image}_c_scale,w_617.jpg 617w,
  // /horses-srcset/${props.image}_c_scale,w_783.jpg 783w,
  // /horses-srcset/${props.image}_c_scale,w_908.jpg 908w,
  // /horses-srcset/${props.image}_c_scale,w_1027.jpg 1027w,
  // /horses-srcset/${props.image}_c_scale,w_1131.jpg 1131w,
  // /horses-srcset/${props.image}_c_scale,w_1239.jpg 1239w,
  // /horses-srcset/${props.image}_c_scale,w_1280.jpg 1280w,
  // /horses-srcset/${props.image}_c_scale,w_1378.jpg 1378w,
  return (
    <section className="image-card">
      {props.image && (
        <img
          className={props.right ? 'right' : 'left'}
          sizes="(max-width: 1400px) 100vw, 1400px"
          srcset={`
                /horses-srcset/${props.image}_c_scale,w_200.jpg
                /horses-srcset/${props.image}_c_scale,w_200.jpg 200w,
  
                /horses-srcset/${props.image}_c_scale,w_1400.jpg 1400w
                `}
          src={`/horses-srcset/${props.image}_c_scale,w_1400.jpg`}
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

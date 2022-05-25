import ImageCard from '../ImageCard/ImageCard.js'
import './Index.scss'

function Index() {
  return (
    <section>
      <h1>Equine Feed Estimation</h1>
      <ImageCard
        right={true}
        image="feeding"
        text="
          There is a lot to think about as a horse owner. But the most important thing is our responsibility to ensure that the horse gets as good conditions as possible to feel safe, happy and be healthy. It craves daily food, water, care and nursing. But what you get back is a best friend who is always there for you."
        alt="horse and foal gracing"
      />
      <div id="quote">
        <span>No hour of life is lost that is spent in the saddle</span>
        <br />— Winston Churchill
      </div>
      <ImageCard
        image="draft"
        link={{ url: '/calculation', text: 'Go to the calculator' }}
        text="This program was created to give you an overview of what your horse needs nutritionally to be able to perform the work that you desire. Explore the calculator and use it as an aid when calculating your horse's feed state."
      />
    </section>
  )
}
export default Index

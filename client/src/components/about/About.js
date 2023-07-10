import ContactForm from './ContactForm'
import { FaExternalLinkAlt } from 'react-icons/fa'
import './About.scss'
import LinkWidget from '../widgets/LinkWidget'

function Index() {
  return (
    <section id="about-wrapper">
      <h2>About</h2>
      <section id="about" className="about-section">
        <section className="about-section">
          <h3>Who am I?</h3>
          <p>
            My name is Sandra and I am from Sweden. I have created this
            application to facilitate the calculation of a correct feed state
            for my horse and thought to share it if anyone else wants to try it.
            But also because I think it's fun to program.
          </p>
          <p>
            My current horse is an Polish warm blood born in 2005. He has always
            been a picky eater and a hard keeper. But a very energetic and happy
            guy, that is afraid of almost everything... He is the reason that my
            interest in balancing and calculating feedstates has grown. It's a
            bit tricky to feed rocket fuel to a ticking bomb without
            consequences. 😅
          </p>
        </section>
        <section className="about-section">
          <h3>What is this?</h3>
          <p>
            The purpose of the application is to provide an overview of your
            horse's basic needs for Energy, Protein, Calcium, Phosphorus,
            Magnesium and Selenium. You also get an overview of how much more
            your horse needs from these based on the work it does.
          </p>

          <p>
            The program uses the formulas and values recommended by SLU,
            Department of Animal Nutrition and Management. The document with all
            information is listed under recommended reading below if you feel
            like geeking out just like I did and don't know where to start.
            Unfortunatly the document is only available in swedish.
          </p>

          <p>
            At present, the application is not designed to be able to make a
            correct assessment for horses / foals under the age of 1 year. It is
            also not designed to keep track of all the toxic overdoses. There,
            it is you as the user and care giver who bears the ultimate responsibility that
            your horse has a correct feed state.
          </p>
        </section>
      </section>
      <h2>Contact</h2>
      <section id="contact">
        <section id="contact-info">
          <div className="image-container"></div>
          <p>
            You can use the form below to get in touch with me. If you do not
            want to use the form, you can also reach me via:
          </p>
          <ul>
            <li>
              <LinkWidget href={`mailto:${process.env.REACT_APP_EMAIL}`} title={process.env.REACT_APP_EMAIL} />
            </li>
          </ul>
          <p>
            If you are interested in my other coding projects, you are welcome to visit
            my github to see what I am working on right now.
          </p>
          <LinkWidget href={"https://github.com/Qabang"} title={"Qabang @ Github"} />
        </section>
        <section id="contact-form">
          <ContactForm />
        </section>
      </section>
    </section>
  )
}
export default Index

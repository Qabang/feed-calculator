import './About.scss'

function Index() {
  return (
    <section>
      <h2>About</h2>
      <section id="about">
        <p>
          My name is Sandra and I am from Sweden. I have created this
          application to facilitate the calculation of a correct feed state for
          my horse and thought to share it if anyone else wants to try it. But
          also because I think it's fun to program.
        </p>

        <p>
          The purpose of the application is to provide an overview of your
          horse's basic needs for Energy, Protein, Calcium, Phosphorus,
          Magnesium and Selenium. You also get an overview of how much more your
          horse needs from these based on the work it does.
        </p>

        <p>
          The program uses the formulas and values ​​recommended by SLU,
          Department of Animal Nutrition and Management, The document with all
          values ​​can be listed under recommended reading below if you feel
          like geeking out just like I did. Unfortunatly the document is only
          available in swedish.
        </p>

        <p>
          At present, the application is not designed to be able to make a
          correct assessment for horses / foals under 3 years. It is also not
          designed to keep track of toxic overdoses. There, it is you as the
          owner who bears the ultimate responsibility that your horse has a
          correct feed state.
        </p>
      </section>
    </section>
  )
}
export default Index

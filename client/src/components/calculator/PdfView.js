import { ReactComponent as EfeLogo } from '../../assets/images/logo.svg'

import './PdfView.scss'

function PdfView({
  feedData,
  profileName,
  work,
  calculations,
  quotas,
  warnings,
}) {
  let year = new Date().getFullYear()
  let month = ('0' + new Date().getMonth()).slice(-2)
  let day = ('0' + new Date().getDate()).slice(-2)
  let caPQuota = null

  if (
    calculations &&
    parseFloat(calculations[2].ca) !== 0 &&
    parseFloat(calculations[2].p) !== 0
  ) {
    caPQuota = parseFloat(calculations[2].ca) / parseFloat(calculations[2].p)
  }

  const date = year + '-' + month + '-' + day

  return (
    <article id="pdf">
      <section className="pdf-header">
        <section className="pdf-section text-content">
          <h1 id="pdf-title">
            Feed Calculation:
            <br /> <span>{profileName}</span>
          </h1>
          <p>Date: {date}</p>
        </section>
        <section className="pdf-section logo">
          <EfeLogo />
        </section>
      </section>
      <hr />
      <section className="pdf-content-column first">
        <section className="pdf-content headings">
          <h2>Maintenance needs:</h2>
          <h2>Work needs:</h2>
          <h2>Result:</h2>
        </section>

        <section className="pdf-content">
          {calculations && calculations.length > 0 && (
            <>
              <ul className="labels">
                {Object.keys(calculations[0]).map((key, index) => (
                  <li key={index + '-label'}>{key}</li>
                ))}
              </ul>

              {calculations.map((items, index) => (
                <ul className="pdf-section" key={index + '-pdf-section'}>
                  {Object.keys(items).map((key, index) => (
                    <li key={key + index}>{items[key]}</li>
                  ))}
                </ul>
              ))}
            </>
          )}
        </section>
        <hr />
        {quotas}
      </section>
      <hr />
      <section className="pdf-content">
        <section className="pdf-section feed-list">
          <h2>Feed List:</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {feedData &&
                feedData.map((item, index) => (
                  <tr key={index + '-tr'}>
                    <td>{item.name}</td>
                    <td>{item.amount} Kg</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <div className="vertical-line"></div>
        <section className="pdf-section work-list">
          <h2>Work / Day:</h2>
          <table>
            <thead>
              <tr>
                <th>Work</th>
                <th>Time</th>
              </tr>
            </thead>
            {work && (
              <tbody>
                <tr>
                  <td>Walk</td>
                  <td>{work.walk || 0} minutes</td>
                </tr>
                <tr>
                  <td>Trot / Canter</td>
                  <td>{work.trot || 0} Minutes</td>
                </tr>
              </tbody>
            )}
          </table>
        </section>
      </section>
      <hr />
      <div className="clearfix"></div>
      {warnings}
    </article>
  )
}

export default PdfView

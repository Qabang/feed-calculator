import { Formik } from 'formik'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa'
import './CalculatorForm.scss'
import HelpBox from './HelpBox'

function FeedForm(props) {
  const btnIcon = props.buttonIcon || <FaPlus />
  const btnText = props.buttonText || 'Add to feed result'
  let defaultValues = props.defaultValues
    ? props.defaultValues
    : {
        name: '',
        amount: '',
        mj: '',
        smrp: '',
        solids: '',
        ca: '',
        p: '',
        mg: '',
        selenium: '',
      }

  const FormRows = ({ change, blur, values }) => (
    <div className={`feed-row`}>
      <div className="feeding-calculator-flex-wrap">
        <label className="" htmlFor="feed-name">
          <span>Name</span>
          <input
            id="feed-name"
            className="form-feed-input input-amount"
            type="text"
            placeholder="Feed's name"
            name={`name`}
            onBlur={blur}
            onChange={change}
            value={values[`name`]}
          />
        </label>
        <HelpBox />
        {/* ADD BUTTON HERE */}
      </div>
      <div className="feeding-calculator-flex-wrap">
        <label htmlFor="feed-amount">
          <span>
            Amount <br /> / Kg
          </span>
          <input
            id="feed-amount"
            step="0.01"
            className="form-feed-input input-amount"
            type="number"
            placeholder=""
            name={`amount`}
            onBlur={blur}
            onChange={change}
            value={values[`amount`]}
          />
        </label>
        <label htmlFor="feed-solids">
          <span>
            Solids <br /> / %
          </span>
          <input
            id="feed-solids"
            step="0.01"
            className="form-feed-input input-solids"
            type="number"
            placeholder=""
            name={`solids`}
            onBlur={blur}
            onChange={change}
            value={values[`solids`]}
          />
        </label>
        <label htmlFor="feed-mj">
          <span>
            Mj <br /> / Kg
          </span>
          <input
            id="feed-mj"
            step="0.01"
            className="form-feed-input input-mj"
            type="number"
            placeholder=""
            name={`mj`}
            onBlur={blur}
            onChange={change}
            value={values[`mj`]}
          />
        </label>
        <label htmlFor="feed-smrp">
          <span>
            g smrp <br /> / Kg
          </span>
          <input
            id="feed-smrp"
            step="0.01"
            className="form-feed-input input-smrp"
            type="number"
            placeholder=""
            name={`smrp`}
            onBlur={blur}
            onChange={change}
            value={values[`smrp`]}
          />
        </label>
      </div>
      <span className="caption unit-label">Unit: grams</span>
      <div className="feeding-calculator-flex-wrap">
        <label htmlFor="feed-mj">
          <span>Calcium</span>
          <input
            id="feed-ca"
            step="0.01"
            className="form-feed-input input-ca"
            type="number"
            placeholder=""
            name={`ca`}
            onBlur={blur}
            onChange={change}
            value={values[`ca`]}
          />
        </label>
        <label htmlFor="feed-p">
          <span>Phosphor</span>
          <input
            id="feed-p"
            step="0.01"
            className="form-feed-input input-p"
            type="number"
            placeholder=""
            name={`p`}
            onBlur={blur}
            onChange={change}
            value={values[`p`]}
          />
        </label>
        <label htmlFor="feed-mg">
          <span>Magnesium</span>
          <input
            id="feed-mg"
            step="0.01"
            className="form-feed-input input-mg"
            type="number"
            placeholder=""
            name={`mg`}
            onBlur={blur}
            onChange={change}
            value={values[`mg`]}
          />
        </label>
        <label htmlFor="feed-se">
          <span>Selenium</span>
          <input
            id="feed-se"
            step="0.01"
            className="form-feed-input input-selen"
            type="number"
            placeholder=""
            name={`selenium`}
            onBlur={blur}
            onChange={change}
            value={values[`selenium`]}
          />
        </label>
      </div>
    </div>
  )

  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values, formData) => {
        props.addFeedRowCallback(values)
        formData.resetForm({ values: '' })
      }}
    >
      {({ handleBlur, handleChange, handleSubmit, values }) => (
        <form className="form-feed" onSubmit={handleSubmit}>
          <FormRows change={handleChange} blur={handleBlur} values={values} />
          <button
            className="form-feed-submit btn-slim btn-primary"
            type="submit"
          >
            {btnIcon}
            <span>{btnText}</span>
          </button>
        </form>
      )}
    </Formik>
  )
}

export default FeedForm

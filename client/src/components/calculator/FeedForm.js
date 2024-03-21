import { Formik } from 'formik'
import { FaPlus, FaExternalLinkAlt } from 'react-icons/fa'
import './CalculatorForm.scss'
import HelpBox from './HelpBox'
import { FeedModel } from '../../Models/FeedModel'
import InputComponent from '../FormComponents/InputComponent'

function FeedForm(props) {

  const feedModel = new FeedModel(props.defaultValues)
  const labels = feedModel.feedModelLabels
  const units = feedModel.feedModelUnits
  const btnIcon = props.buttonIcon || <FaPlus />
  const btnText = props.buttonText || 'Add to feed result'
  let defaultValues = props.defaultValues
    ? props.defaultValues
    : feedModel.feedModelData

  const FormRows = ({ change, blur, values }) => (
    <table className='feed-form-table'>
      <thead>
        <tr>
          <td colSpan={3}><HelpBox> <p>
            This form is where you fill in the values of the feed you have
            intended to use in your calculation. Empty fields will not be
            included.
          </p>
            <p>
              Solids: If this field is left blank, the program assumes that the
              feed has a dry matter of 100%.
            </p>
            <p>
              Calcium, Phosphorus, Magnesium and Sodium should be stated in
              grams. Iron, Copper, Zinc, Managan and Selenium should be stated
              in milligrams.
            </p>
            <p>
              You can add how many different types of feed you want. As well as
              edit or delete a feed entry from the list. All values are
              calculated and displayed in the table below the calculator.
            </p>

            <p>
              It is also possible to print or download the calculation as a pdf.
              If you click on download the button, you can choose whether it
              should be saved on your computer or if you want to print it
              directly. Not sure what your feed is worth? check out this list
              from SLU with many of the most common feed materials listed.
            </p>
            <a
              href="http://www2.freefarm.se/fodertabell/fodtab.pl?djur=hast"
              target="_blank"
              rel="noreferrer"
            >
              Horse feed nutrition table (Swedish)
              <FaExternalLinkAlt />
            </a>
            <p>
              Remember that the program is not designed to discover all of the
              dangerous overdoses. There, it is you as the user who bears the
              responsibility to not poison your horse.
            </p></HelpBox></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Feed's Name</th>
          <td>
            <InputComponent
              name={`name`}
              type="text"
              title={"Feed's name"}
              handleBlur={blur}
              handleChange={change}
              value={values.name}
            />
          </td>
          <td className='unit-cell'></td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th>Amount of feed</th>
          <td>
            <InputComponent
              name={`amount`}
              type="number"
              title={"Amount / Kg"}
              handleBlur={blur}
              handleChange={change}
              value={values.amount}
            />
          </td>
          <td className='unit-cell'>Kg</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th>Solids per kg</th>
          <td>
            <InputComponent
              name={`solids`}
              type="number"
              title={"Solids / %"}
              handleBlur={blur}
              handleChange={change}
              value={values.solids}
            />
          </td>
          <td className='unit-cell'>%</td>
        </tr>
      </tbody>
      {Object.keys(labels).map((key, index) => {
        return (
          <tbody key={`${key}-${index}`}>
            <tr>
              <th>{labels[key].full}</th>
              <td>
                <InputComponent
                  name={key}
                  type="number"
                  title={labels[key].short}
                  handleBlur={blur}
                  handleChange={change}
                  value={values[key]}
                />
              </td>
              <td className='unit-cell'>{units[key]}</td>
            </tr>
          </tbody>
        )
      })}
    </table>
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

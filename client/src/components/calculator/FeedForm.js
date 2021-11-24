import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import axios from 'axios'

function FeedForm(props) {
  // const [formRows, setFormRows] = useState([])
  // const [rowIndex, setRowIndex] = useState(formRows.length)

  let defaultValues = {
    amount1: null,
    amount2: null,
    amount3: null,
    amount4: null,
    amount5: null,
    amount6: null,
    amount7: null,
    amount8: null,
    amount9: null,
    amount10: null,
    mj1: null,
    mj2: null,
    mj3: null,
    mj4: null,
    mj5: null,
    mj6: null,
    mj7: null,
    mj8: null,
    mj9: null,
    mj10: null,
    smrp1: null,
    smrp2: null,
    smrp3: null,
    smrp4: null,
    smrp5: null,
    smrp6: null,
    smrp7: null,
    smrp8: null,
    smrp9: null,
    smrp10: null,
    solids1: null,
    solids2: null,
    solids3: null,
    solids4: null,
    solids5: null,
    solids6: null,
    solids7: null,
    solids8: null,
    solids9: null,
    solids10: null,
    ca1: null,
    ca2: null,
    ca3: null,
    ca4: null,
    ca5: null,
    ca6: null,
    ca7: null,
    ca8: null,
    ca9: null,
    ca10: null,
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    p5: null,
    p6: null,
    p7: null,
    p8: null,
    p9: null,
    p10: null,
    mg1: null,
    mg2: null,
    mg3: null,
    mg4: null,
    mg5: null,
    mg6: null,
    mg7: null,
    mg8: null,
    mg9: null,
    mg10: null,
    selenium1: null,
    selenium2: null,
    selenium3: null,
    selenium4: null,
    selenium5: null,
    selenium6: null,
    selenium7: null,
    selenium8: null,
    selenium9: null,
    selenium10: null,
  }

  const FormRows = ({ change, blur, values }) => {
    const rows = []
    console.log(values['amount1'])
    for (let index = 1; index <= 10; index++) {
      rows.push(
        <>
          <div className={`feed-row feed-row-${index}`}>
            <input
              step="0.01"
              className="form-feed-input input-amount"
              type="number"
              placeholder=""
              name={`amount${index}`}
              onBlur={blur}
              onChange={change}
              value={values[`amount${index}`]}
            />
            <input
              step="0.01"
              className="form-feed-input input-solids"
              type="number"
              placeholder=""
              name={`solids${index}`}
              onBlur={blur}
              onChange={change}
              value={values[`solids${index}`]}
            />
            <input
              step="0.01"
              className="form-feed-input input-mj"
              type="number"
              placeholder=""
              name={`mj${index}`}
              onBlur={blur}
              onChange={change}
              value={values[`mj${index}`]}
            />
            <input
              step="0.01"
              className="form-feed-input input-smrp"
              type="number"
              placeholder=""
              name={`smrp${index}`}
              onBlur={blur}
              onChange={change}
              value={values[`smrp${index}`]}
            />
            <input
              step="0.01"
              className="form-feed-input input-ca"
              type="number"
              placeholder=""
              name={`ca${index}`}
              onBlur={blur}
              onChange={change}
              value={values[`ca${index}`]}
            />
            <input
              step="0.01"
              className="form-feed-input input-p"
              type="number"
              placeholder=""
              name={`p${index}`}
              onBlur={blur}
              onChange={change}
              value={values[`p${index}`]}
            />
            <input
              step="0.01"
              className="form-feed-input input-mg"
              type="number"
              placeholder=""
              name={`mg${index}`}
              onBlur={blur}
              onChange={change}
              value={values[`mg${index}`]}
            />
            <input
              step="0.01"
              className="form-feed-input input-selen"
              type="number"
              placeholder=""
              name={`selenium${index}`}
              onBlur={blur}
              onChange={change}
              value={values[`selenium${index}`]}
            />
          </div>
        </>
      )
    }
    return rows
  }

  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values, formData) => {
        console.log(values)
        axios({
          method: 'post',
          url: '/calculate',
          data: {
            values,
          },
        }).then(
          (response) => {
            console.log(response)
            if (response.status === 200) {
              props.calculatorCallback(response.data)
            }
          },
          (error) => {
            console.log(error)
          }
        )
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        values,
      }) => (
        <form className="form-feed" onSubmit={handleSubmit}>
          <div className="feeding-calculator-flex-wrap">
            <div className="calculator-labels">
              <label>Antal kg</label>
              <label>
                TS <span>%</span>
              </label>
              <label>MJ / kg</label>
              <label>gr smrp / kg</label>
              <label>
                Ca <span>(g)</span>
              </label>
              <label>
                p <span>(g)</span>
              </label>
              <label>
                mg <span>(g)</span>
              </label>
              <label>
                selen <span>(mg)</span>
              </label>
            </div>
          </div>
          <FormRows change={handleChange} blur={handleBlur} values={values} />
          <input
            className="form-feed-submit"
            type="submit"
            value="Get result"
          />
        </form>
      )}
    </Formik>
  )
}

export default FeedForm

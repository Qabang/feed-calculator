import { useEffect, useState } from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import './HorseForm.scss'

function HorseForm({ calculatorCallback, setProfile, setHorseWorkAmount }) {
  const [weightOptions, setweightOptions] = useState([])

  let defaultValues = {
    name: '',
    born: '',
    sex: '',
    bodyType: '',
    weight: 0,
    hull: '',
    walkTime: 0,
    trotTime: 0,
  }
  useEffect(() => {
    let weight_opt = []
    for (let i = 100; i <= 1000; i = i + 50) {
      weight_opt.push(i)
    }
    setweightOptions(weight_opt)
  }, [])

  const thisYear = new Date().getFullYear()
  const minValueYear = thisYear - 60

  const ProfileSchema = Yup.object().shape({
    name: Yup.string(),
    born: Yup.number()
      .required()
      .positive('Required, 4 digits')
      .integer()
      .min(minValueYear, `Must be a year after ${minValueYear}`)
      .max(thisYear - 1, `Can't be younger than one year`),
    sex: Yup.string().required('Required'),
    weight: Yup.number().required('Required').positive('Required'),
    bodyType: Yup.string().required('Required'),
    hull: Yup.string().required('Required'),
    walkTime: Yup.number()
      .moreThan(-1, 'Value must be a positive number or 0')
      .integer(),
    trotTime: Yup.number()
      .moreThan(-1, 'Value must be a positive number or 0')
      .integer(),
  })

  return (
    <section className="horse-form">
      <Formik
        initialValues={defaultValues}
        validationSchema={ProfileSchema}
        onSubmit={(values, formData) => {
          values.weight = parseInt(values.weight)
          axios({
            method: 'post',
            url: '/profile',
            data: {
              values,
            },
          }).then(
            (response) => {
              if (response.status === 200) {
                setProfile(values)
                setHorseWorkAmount({
                  walk: values.walkTime,
                  trot: values.trotTime,
                })
                calculatorCallback(response.data)
              }
            },
            (error) => {
              // TODO Log errors to something useful.
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
          isValid,
          dirty,
          touched,
          values,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="profile-basics">
              <div className="profile-section">
                <label>Name</label>
                <input
                  className="name"
                  name="name"
                  type="text"
                  placeholder="Name..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                />
                <br />
                <label>Born</label>
                <input
                  className={
                    (errors.born && touched.born ? 'error ' : '') + 'born'
                  }
                  name="born"
                  type="number"
                  placeholder="YYYY"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    e.preventDefault()
                    const { value } = e.target
                    // Only accept digits.
                    // Can't start with leading 0.
                    if (/^[1-9][0-9]*$/.test(value) || value === '') {
                      // Maximum 4 digits.
                      if (value.length <= 4) {
                        setFieldValue('born', value)
                      }
                    }
                  }}
                  value={values.born}
                />
                {errors.born && touched.born ? (
                  <div className="error-message">{errors.born}</div>
                ) : null}
                <br />
                <label>Gender</label>
                <select
                  id="sex"
                  className={
                    (errors.sex && touched.sex ? 'error ' : '') + 'sex'
                  }
                  name="sex"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sex}
                >
                  <option value="null">-</option>
                  <option value="stallion">Hingst</option>
                  <option value="gelding/mare">Valack/Sto</option>
                </select>
                {errors.sex && touched.sex ? (
                  <div className="error-message">{errors.sex}</div>
                ) : null}
              </div>
              <div className="profile-section">
                <label>Weight</label>
                <Field
                  as="select"
                  name="weight"
                  type="number"
                  className={errors.weight && touched.weight ? 'error ' : ''}
                >
                  <option value="null">-</option>
                  {weightOptions &&
                    weightOptions.map((option, index) => (
                      <option key={index} value={parseInt(option)}>
                        {option}kg
                      </option>
                    ))}
                </Field>
                {errors.weight && touched.weight ? (
                  <div className="error-message">{errors.weight}</div>
                ) : null}
                <br />
                <label>Body Type</label>
                <select
                  id="type"
                  className={
                    (errors.bodyType && touched.bodyType ? 'error ' : '') +
                    'type'
                  }
                  name="bodyType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bodyType}
                >
                  <option value="null">-</option>
                  <option value="type-easy">Easy Keep</option>
                  <option value="type-normal">Normal</option>
                  <option value="type-hard">Hard Keep</option>
                </select>
                {errors.bodyType && touched.bodyType ? (
                  <div className="error-message">{errors.bodyType}</div>
                ) : null}
                <label>Body Condition</label>
                <select
                  className={
                    (errors.hull && touched.hull ? 'error ' : '') + 'hull'
                  }
                  name="hull"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hull}
                >
                  <option value="null">-</option>
                  <option value="normal">Normal</option>
                  <option value="thin">Thin</option>
                  <option value="fat">Fat</option>
                </select>
                {errors.hull && touched.hull ? (
                  <div className="error-message">{errors.hull}</div>
                ) : null}
              </div>
            </div>
            <div className="profile-section">
              <label id="work-label">Work load in minutes per day</label>
              <div className="profile-work">
                <label>Walk</label>
                <input
                  className={
                    (errors.walkTime && touched.walkTime ? 'error ' : '') +
                    'walk'
                  }
                  name="walkTime"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.walkTime}
                  type="number"
                />
                {errors.walkTime && touched.walkTime ? (
                  <div className="error-message">{errors.walkTime}</div>
                ) : null}
                <label>Trot / Canter</label>
                <input
                  className={
                    (errors.trotTime && touched.tro ? 'error ' : '') + 'trot'
                  }
                  name="trotTime"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.trotTime}
                  type="number"
                />
                {errors.trotTime && touched.trotTime ? (
                  <div className="error-message">{errors.trotTime}</div>
                ) : null}
              </div>
            </div>
            <input
              type="submit"
              value="Calculate Horse's need"
              disabled={!(isValid && dirty)}
            />
          </form>
        )}
      </Formik>
    </section>
  )
}

export default HorseForm

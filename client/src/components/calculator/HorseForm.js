import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

import './HorseForm.scss'

function HorseForm(props) {
  const [horseData, setHorseData] = useState({})
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
      console.log(i)
      weight_opt.push(i)
    }
    setweightOptions(weight_opt)
  }, [])

  return (
    <section className="horse-form">
      <Formik
        initialValues={defaultValues}
        onSubmit={(values, formData) => {
          console.log(values)
          values.weight = parseInt(values.weight)
          axios({
            method: 'post',
            url: '/profile',
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
                  className="born"
                  name="born"
                  type="number"
                  placeholder="YYYY"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.born}
                />
                <br />
                <label>Gender</label>
                <select
                  id="sex"
                  className="sex"
                  name="sex"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sex}
                >
                  <option value="null">-</option>
                  <option value="stallion">Hingst</option>
                  <option value="gelding/mare">Valack/Sto</option>
                </select>
              </div>
              <div className="profile-section">
                <label>Weight</label>
                <Field as="select" name="weight" type="number">
                  <option value="null">-</option>
                  {weightOptions &&
                    weightOptions.map((option, index) => (
                      <option key={index} value={parseInt(option)}>
                        {option}kg
                      </option>
                    ))}
                </Field>
                <br />
                <label>Body Type</label>
                <select
                  id="type"
                  className="type"
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
                <label>Body Condition</label>
                <select
                  className="hull"
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
              </div>
            </div>
            <div className="profile-section">
              <label id="work-label">Work load in minutes per day</label>
              <div className="profile-work">
                <label>Walk</label>
                <input
                  className="walk"
                  name="walkTime"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.walkTime}
                  type="number"
                />
                <label>Trot / Canter</label>
                <input
                  className="trot"
                  name="trotTime"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.trotTime}
                  type="number"
                />
              </div>
            </div>
            <input type="submit" value="Submit Horse profile" />
          </form>
        )}
      </Formik>
    </section>
  )
}

export default HorseForm

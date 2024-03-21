import { useEffect, useState, useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import sanitizeHtml from 'sanitize-html';

import './HorseForm.scss'
import InputComponent from '../FormComponents/InputComponent'
import SelectComponent from '../FormComponents/SelectComponent'
import HorseProfileCard from './HorseProfile/HorseProfileCard'


function HorseForm({ calculatorCallback, setProfile, setHorseWorkAmount }) {
  const formInitials = {
    name: '',
    born: '',
    sex: '',
    bodyType: '',
    weight: 0,
    walkTime: 0,
    trotTime: 0,
  }
  const FormScrollRef = useRef(null)
  const [weightOptions, setweightOptions] = useState([])
  const [lSProfiles] = useState(localStorage.getItem(process.env.REACT_APP_LS_HORSE_PROFILES_KEY))
  const [profiles, setProfiles] = useState(lSProfiles != null ? JSON.parse(lSProfiles) : {})
  const [noProfile] = useState(lSProfiles === null || Object.keys(profiles).length < 1)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showProfiles, setShowProfiles] = useState(true)
  const [defaultValues, setDefaultValues] = useState(formInitials)
  const [activeProfile, setActiveProfile] = useState(false)
  const [submitText, setSubmitText] = useState("Calculate Horse's need")

  useEffect(() => {
    let weight_opt = []
    for (let i = 100; i <= 1000; i = i + 50) {
      weight_opt.push(i)
    }
    setweightOptions(weight_opt)
  }, [lSProfiles, defaultValues])

  const thisYear = new Date().getFullYear()
  const minValueYear = thisYear - 60

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    born: Yup.number()
      .required('Required')
      .integer()
      .positive('Required, 4 digits')
      .min(minValueYear, `should be 4 digits and must be a year after ${minValueYear}`)
      .max(thisYear - 1, `Can't be younger than one year`),
    sex: Yup.string().required('Required'),
    weight: Yup.number().required('Required').positive('Required'),
    bodyType: Yup.string().required('Required'),
    walkTime: Yup.number()
      .moreThan(-1, 'Value must be a positive number or 0')
      .integer(),
    trotTime: Yup.number()
      .moreThan(-1, 'Value must be a positive number or 0')
      .integer(),
  })

  function saveDataToLocalStorage(horse) {
    let profiles = localStorage.getItem(process.env.REACT_APP_LS_HORSE_PROFILES_KEY)

    if (!profiles) {
      profiles = {}
    }
    else {
      profiles = JSON.parse(profiles)
    }

    profiles[horse.name] = JSON.stringify(horse)
    localStorage.setItem(process.env.REACT_APP_LS_HORSE_PROFILES_KEY, JSON.stringify(profiles));
    setProfiles(JSON.parse(localStorage.getItem(process.env.REACT_APP_LS_HORSE_PROFILES_KEY)))
    setActiveProfile(horse.name)
  }

  let handleSelectedHorse = (horse) => {
    setActiveProfile(horse.name)
    postHorseProfile(horse)
  }

  let handleEditHorse = (horse) => {
    setShowCreateForm(false)
    setSubmitText("Save")
    setShowProfiles(false)
    setDefaultValues({
      name: horse.name,
      born: horse.born,
      sex: horse.sex,
      bodyType: horse.bodyType,
      weight: horse.weight,
      walkTime: horse.walkTime,
      trotTime: horse.trotTime,
    })
    setShowCreateForm(true)
    FormScrollRef.current.scrollIntoView({ behavior: 'smooth' })

  }

  let handleCancelEdit = () => {
    setDefaultValues(formInitials)
    setShowProfiles(true)
    setShowCreateForm(false)
    setSubmitText("Calculate Horse's need")
  }

  let handleDeleteFromLocalStorage = (key) => {
    let proceed = window.confirm(`Are you sure you wan't to delete this horse? \n ${key}`);
    if (!proceed) {
      return
    }

    let HorseProfiles = JSON.parse(localStorage.getItem(process.env.REACT_APP_LS_HORSE_PROFILES_KEY))

    if (!HorseProfiles || Object.keys(HorseProfiles).indexOf(key) === -1) {
      return;
    }

    delete HorseProfiles[key]

    localStorage.setItem(process.env.REACT_APP_LS_HORSE_PROFILES_KEY, JSON.stringify(HorseProfiles))
    setProfiles(HorseProfiles)
  }

  function handleCreateNewProfile() {
    setDefaultValues(formInitials)
    setShowCreateForm(true)
    setSubmitText("Calculate Horse's need")
    FormScrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  function postHorseProfile(horseModelValues) {
    axios({
      method: 'post',
      url: '/profile',
      data: {
        "values": horseModelValues,
      },
    }).then(
      (response) => {
        if (response.status === 200) {
          setProfile(horseModelValues)
          setHorseWorkAmount({
            walk: horseModelValues.walkTime,
            trot: horseModelValues.trotTime,
          })
          calculatorCallback(response.data)

          saveDataToLocalStorage(horseModelValues)
          setShowCreateForm(false)
          setShowProfiles(true)
          setSubmitText("Calculate Horse's need")
        }
      },
      (error) => {
        // TODO Log errors.
        console.log(error)
      }
    )
  }

  return (
    <section className="horse-form">
      <h3>Your Horse{Object.keys(profiles).length > 1 && 's'}</h3>
      {(Object.keys(profiles).length > 0 && showProfiles) && (
        <>
          {
            Object.keys(profiles).map(keyValue => {

              if (activeProfile === keyValue) {
                return (<HorseProfileCard key={keyValue} data={JSON.parse(profiles[keyValue])} onSelect={handleSelectedHorse} onDelete={handleDeleteFromLocalStorage} onEdit={handleEditHorse} active={true} />)
              }
              else {
                return (<HorseProfileCard key={keyValue} data={JSON.parse(profiles[keyValue])} onSelect={handleSelectedHorse} onDelete={handleDeleteFromLocalStorage} onEdit={handleEditHorse} active={false} />)
              }

            })
          }

          <button className='btn-slim btn-cta btn-show-form' onClick={handleCreateNewProfile}> Create new profile</button>
        </>
      )
      }
      <span ref={FormScrollRef}>
        {
          (noProfile || showCreateForm) && (
            <Formik

              initialValues={defaultValues}
              validationSchema={ProfileSchema}
              onSubmit={(values, formData) => {
                values.name = sanitizeHtml(values.name)
                values.weight = parseInt(values.weight)
                postHorseProfile(values)
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="profile-section">
                    <span className="horse-form-label">Who is your horse?</span>
                    <InputComponent
                      name="name"
                      type="text"
                      title="Name"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      value={values.name}
                      errors={errors}
                      touched={touched}
                      ShouldValidate={true}
                    />
                    <br />
                    <InputComponent name="born"
                      type="number"
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      title="Born"
                      ShouldValidate={true}
                      handleChange={(e) => {
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
                      value={values.born} />

                    <br />
                    <SelectComponent
                      name="sex"
                      title="Gender"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                      ShouldValidate={true}
                      value={values.sex}>
                      <option value=""></option>
                      <option value="gelding/mare">Gelding / Mare</option>
                      <option value="stallion">Stallion</option>
                    </SelectComponent>
                    <br />
                    <SelectComponent
                      name={"weight"}
                      title={"Weight"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      value={values.weight}
                      errors={errors}
                      touched={touched}
                      ShouldValidate={true}
                    >
                      <option value=""></option>

                      {weightOptions &&
                        weightOptions.map((option, index) => (
                          <option key={index} value={parseInt(option)}>
                            {option} kg
                          </option>
                        ))}
                    </SelectComponent>

                    <br />

                    <SelectComponent
                      name={"bodyType"}
                      title={"Body Type"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      value={values.bodyType}
                      errors={errors}
                      touched={touched}
                      ShouldValidate={true}>
                      <option value=""></option>
                      <option value="type-normal">Normal</option>
                      <option value="type-easy">Easy Keep</option>
                      <option value="type-hard">Hard Keep</option>
                    </SelectComponent>

                  </div>
                  <div className="profile-section">
                    <span className="horse-form-label">What kind of work does it do?</span>
                    <span className="info-text">Work load in minutes per day</span>
                    <br />
                    <div className="profile-work">
                      <InputComponent
                        name="walkTime"
                        title="Walk"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        value={values.walkTime}
                        type="number"
                        errors={errors}
                        touched={touched}
                        ShouldValidate={true} />
                      <br />
                      <InputComponent
                        name="trotTime"
                        title="Trot / Canter"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        value={values.trotTime}
                        type="number"
                        errors={errors}
                        touched={touched}
                        ShouldValidate={true} />
                    </div>
                  </div>
                  <div>

                    <input
                      type="submit"
                      value={submitText}
                    />


                  </div>
                </form>
              )}
            </Formik>

          )
        }
      </span>
      {(showCreateForm && !showProfiles && Object.keys(profiles).length > 0) &&
        <button className='btn-slim btn-edit btn-edit-form-cancel' onClick={handleCancelEdit}> Cancel</button>
      }
    </section >
  )
}

export default HorseForm

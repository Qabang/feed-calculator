import { useState } from 'react'
import { Formik } from 'formik'
import Spinner from '../spinner/Spinner.js'
import * as Yup from 'yup'
import axios from 'axios'

import './ContactForm.scss'

function ContactForm() {
  const [loadingMessage, setLoadingMessage] = useState('Loading...')
  const [isVisible, setIsVisible] = useState(false)
  const [emailMessageResponse, setEmailMessageResponse] = useState('')
  const [emailMessageResponseIsError, setEmailMessageResponseIsError] = useState(false)

  const emailSuccessMsg = 'Thank you for your email!'
  const emailErrorMsg = `Oops seems like the server run in to an error, please try again later. If the error still occurs send me an email at <span class="link-wrapper"><a href="mailto:${process.env.REACT_APP_EMAIL}"> ${process.env.REACT_APP_EMAIL} </a><span class="hover-border"></span></span>`

  function handleEmailResult(isSuccess) {
    setIsVisible(false)
    if (isSuccess) {
      setEmailMessageResponseIsError(false)
      setEmailMessageResponse(emailSuccessMsg)
    }
    else {
      setEmailMessageResponseIsError(true)
      setEmailMessageResponse(emailErrorMsg)
    }

  }

  let defaultValues = {
    subject: '',
    email: '',
    message: '',
  }

  const ProfileSchema = Yup.object().shape({
    subject: Yup.string()
      .required('Your message needs a subject'),
    email: Yup.string()
      .email('Invalid email format')
      .required('I need to know where to send my reply.'),
    message: Yup.string()
      .required('Your message can not be empty')
      .min(5, 'The message is a bit to short to be informative.'),
  })

  return (
    <section className="contact-form">
      <Formik
        initialValues={defaultValues}
        validationSchema={ProfileSchema}
        onSubmit={(values, formData) => {
          setIsVisible(true)
          setLoadingMessage('Prepearing email...')
          axios({
            method: 'post',
            url: '/contact',
            data: {
              values,
            },
          }).then(
            (response) => {
              if (response.status === 200 && response.data.status === 200) {
                setLoadingMessage('Email was successfully sent.')
                formData.resetForm({ values: '' })

                setTimeout(() => {
                  setLoadingMessage('')
                  handleEmailResult(true)
                }, 3000)
              } else {
                handleEmailResult(false)
              }
            },
            (error) => {
              handleEmailResult(false)
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Spinner msg={loadingMessage} isVisible={isVisible} />
            <div className="input-wrapper">
              <div className="input-effect-container">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder=" "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subject}
                  className="input-effect"
                />
                <label htmlFor="subject">Subject</label>
                <span className="focus-border"></span>
                <span className={`focus-bg ${(errors.subject && touched.subject ? 'error ' : '')}`}></span>
              </div>

              {errors.subject && touched.subject ? (
                <div className="error-message">{errors.subject}</div>
              ) : null}
            </div>

            <div className="input-wrapper">
              <div className="input-effect-container">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder=" "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  className="input-effect"
                />
                <label htmlFor="email">Your Email</label>
                <span className="focus-border"></span>
                <span className={`focus-bg ${(errors.email && touched.email ? 'error ' : '')}`}></span>
              </div>
              {errors.email && touched.email ? (
                <div className="error-message">{errors.email}</div>
              ) : null}
            </div>

            <div className="input-wrapper">
              <div className="input-effect-container">
                <textarea
                  id="message"
                  rows={5}
                  className="input-effect"
                  name="message"
                  type="text"
                  placeholder=" "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.message}
                />
                <label htmlFor="message">Message</label>
                <span className="focus-border"></span>
                <span className={`focus-bg ${(errors.message && touched.message ? 'error ' : '')}`}></span>
              </div>
              {errors.message && touched.message ? (
                <div className="error-message">{errors.message}</div>
              ) : null}
            </div>
            <br />
            <input
              type="submit"
              value="Send message"
              disabled={!(isValid && dirty)}
              className="btn-cta btn-slim"
            />
            {emailMessageResponse && (
              <p className={emailMessageResponseIsError && "error"} dangerouslySetInnerHTML={{ __html: emailMessageResponse }} />
            )}
          </form>
        )}
      </Formik>
    </section>
  )
}

export default ContactForm

import { useEffect, useState } from 'react'
import { Formik, Field } from 'formik'
import Spinner from '../spinner/Spinner.js'
import * as Yup from 'yup'
import axios from 'axios'

import './ContactForm.scss'

function ContactForm() {
  const [loadingMessage, setLoadingMessage] = useState('Hello woeld')
  const [isVisible, setIsVisible] = useState(false)
  const [emailMessageResponse, setEmailMessageResponse] = useState('')

  let defaultValues = {
    subject: '',
    email: '',
    message: '',
  }

  const ProfileSchema = Yup.object().shape({
    subject: Yup.string()
      .required('Your message needs a subject')
      .min(5, 'The subject needs to be atleast five characters long.'),
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
          // TODO Post data and email results.
          axios({
            method: 'post',
            url: '/contact',
            data: {
              values,
            },
          }).then(
            (response) => {
              if (response.status === 200) {
                setLoadingMessage('Email was successfully sent.')
                formData.resetForm({ values: '' })

                setTimeout(() => {
                  setIsVisible(false)
                  setLoadingMessage('')
                  setEmailMessageResponse('Thank you for your email!')
                }, 3000)
              } else {
                setEmailMessageResponse(
                  'Oops seems like the server run in to an error, please try again later. If the error still occurs send me an email at feed.estimation@gmail.com'
                )
              }
            },
            (error) => {
              setEmailMessageResponse(
                'Oops seems like the server run in to an error, please try again later or send me an email at feed.estimation@gmail.com'
              )
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
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject goes here."
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.subject}
              className={
                (errors.subject && touched.subject ? 'error ' : '') + 'subject'
              }
            />
            {errors.subject && touched.subject ? (
              <div className="error-message">{errors.subject}</div>
            ) : null}
            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Your email goes here."
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              className={
                (errors.email && touched.email ? 'error ' : '') + 'email'
              }
            />
            {errors.email && touched.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={8}
              className={
                (errors.message && touched.message ? 'error ' : '') + 'message'
              }
              name="message"
              type="text"
              placeholder="Your message goes here..."
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.message}
            />
            {errors.message && touched.message ? (
              <div className="error-message">{errors.message}</div>
            ) : null}
            <br />
            <input
              type="submit"
              value="Send message"
              disabled={!(isValid && dirty)}
              className="btn-cta btn-slim"
            />
            {emailMessageResponse && (
              <p>
                <br />
                {emailMessageResponse}
              </p>
            )}
          </form>
        )}
      </Formik>
    </section>
  )
}

export default ContactForm

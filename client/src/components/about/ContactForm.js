import { useEffect, useState } from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import './ContactForm.scss'

function ContactForm() {
  const [weightOptions, setweightOptions] = useState([])

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
                // TODO Handle message response here
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
        }) => (
          <form onSubmit={handleSubmit}>
            <label for="subject">Subject</label>
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
            <label for="email">Your Email</label>
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
            {errors.subject && touched.subject ? (
              <div className="error-message">{errors.subject}</div>
            ) : null}
            <label for="message">Message</label>
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
          </form>
        )}
      </Formik>
    </section>
  )
}

export default ContactForm

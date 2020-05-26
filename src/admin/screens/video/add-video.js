import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";

import { VideoPicker } from 'admin/screens/video/video-picker';

const SnapRow = props => (
  <div className={'rows ' + props.className}>
    {props.children}
  </div>
);

const SnapInput = props => {
  return (
    <div className="input-field col">
      <input id={props.id} type="text" placeholder={props.placeholder} spellCheck="false" />            
      <label className="active capitalise" htmlFor={props.id}>{props.label}</label>
    </div>);
}

const SnapButton = props => (
  <button class="{props.name} btn">{props.value}</button>
);

const SnapLink = props => (
  <div className={'underline-link ' + props.className}>{props.value}</div>
);

export const addVideo = () => {

  const VideoForm = () => (
    <Formik
    initialValues={{ 
        title: '',
        presenter: '',
    }}
    validate={values => {
      const errors = {};
      if (!values.title) {
        errors.title = 'Required';
      }
      if (!values.presenter) {
        errors.presenter = 'Required';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
    >
        {({ isSubmitting }) => (
          <Form>
            <SnapRow className={"standard-block centred-block justify-space-between"}>
              <Field type="text" name="title" placeholder="title" id="title" label="title" component={SnapInput} />
              <ErrorMessage name="title" component="div" />
              <Field type="text" name="presenter" placeholder="presenter" id="presenter" label="presenter" component={SnapInput} />
              <ErrorMessage name="presenter" component="div" />
              <Field type="text" name="videoId" placeholder="Video Id" id="id" label="Video Id" component={SnapInput} />
              <ErrorMessage name="videoId" component="div" />
              <Field type="text" name="videoLink" value="View on YouTube" className="extra-small-text" component={SnapLink}></Field>
              <ErrorMessage name="videoLink" component="div" />
            </SnapRow>
            <button type="submit" disabled={isSubmitting}>
              Create video
            </button>
          </Form>
       )}
    </Formik>
  );

  let container = document.querySelector("#content-container");

  const Video = () => {
    useEffect(()=>{
      let otherTabs = document.querySelectorAll('.non-react');
          otherTabs.forEach(otherTab => {
            otherTab.addEventListener('click', e => {
              ReactDOM.unmountComponentAtNode(container);
            });
          });
    });
    return (
    <div>
      <div>
        <VideoPicker></VideoPicker>
      </div>

      <div>
        <VideoForm>

        </VideoForm>
      </div>
    </div>
  )};

  ReactDOM.render(<Video />, container);

};
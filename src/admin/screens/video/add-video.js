import React, { useState, useEffect, Profiler } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form } from 'formik';
import { SnapInput } from 'admin/react/snap-html-elements';
import { SnapPicker } from 'admin/screens/video/item-picker';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'admin/react/snap-theme';
import * as Yup from 'yup';

export const addVideo = () => {

  const items = [
    {
      id: 1,
      presenter: 'dan',
      value: 'Great video!',
      owner: 'Snapdragon',
      ownerUrl: 'www.learn-the-planet.com',
      src: 'https://media-exp1.licdn.com/dms/image/C4E03AQFAu1DpOa0Ygg/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=OMuPVka96Cm-QNBGVphv4W9UXQDFahsEkhLkpbYiFVM',
      location: 'Lisbon',
      startsAt: 0,
    }
    ,{
      id: 2,
      presenter: 'dan',
      value: 'Rubbish!',
      owner: 'Snapdragon',
      ownerUrl: 'www.learn-the-planet.com',
      src: 'https://media-exp1.licdn.com/dms/image/C4E03AQFAu1DpOa0Ygg/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=OMuPVka96Cm-QNBGVphv4W9UXQDFahsEkhLkpbYiFVM',
      location: 'Lisbon',
      startsAt: 0,
    }
    ,{
      id: 3,
      presenter: 'dan',
      value: 'Rubbish and some!',
      owner: 'Snapdragon',
      ownerUrl: 'www.learn-the-planet.com',
      src: 'https://media-exp1.licdn.com/dms/image/C4E03AQFAu1DpOa0Ygg/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=OMuPVka96Cm-QNBGVphv4W9UXQDFahsEkhLkpbYiFVM',
      location: 'Lisbon',
      startsAt: 0,
    }
  ];

  const VideoForm = props => {
    
    return (
      <>
        <Formik
          initialValues={{
            title: props.selectedItem.value || '',
            presenter: props.selectedItem.presenter || '',
            id: props.selectedItem.id || '',
            owner: props.selectedItem.owner || '',
            ownerUrl: props.selectedItem.ownerUrl || '',
            src: props.selectedItem.src || '',
            location: props.selectedItem.location || '',
            startsAt: props.selectedItem.startsAt || 0,
          }}
          enableReinitialize={true}
          validationSchema={Yup.object({
            title: Yup.string()
              .max(5, 'Must be 5 characters or less')
              .required('Required'),
            presenter: Yup.string()
              .max(5, 'Must be 5 characters or less')
              .required('Required'),            
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <SnapInput label="Title" name="title" type="text" placeholder="Enter title" />
            <SnapInput label="Presenter" name="presenter" type="text" placeholder="Enter presenter"/>
            <SnapInput label="Video Id" name="id" type="text" placeholder="Enter video Id"/>
            {/* video link */}
            <SnapInput label="Owner" name="owner" type="text" placeholder="Enter owner"/>
            <SnapInput label="Owner URL" name="ownerUrl" type="text" placeholder="Enter owner URL"/>
            <SnapInput label="Onwer logo" name="src" type="text" placeholder="Enter owner logo URL"/>
            <SnapInput label="Location" name="location" type="text" placeholder="Enter location"/>
            <SnapInput label="Lesson starts at" name="startsAt" type="number" placeholder="Enter lesson start time"/>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </>
    );
  };

  let container = document.querySelector("#content-container");

  function onRenderSnapPickerCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    console.log('actualDuration: ', actualDuration);
  }

  const Video = () => {
    const [selectedItem, setSelectedItem] = useState({});
    useEffect(()=>{
      let otherTabs = document.querySelectorAll('.non-react');
          otherTabs.forEach(otherTab => {
            otherTab.addEventListener('click', e => {
              ReactDOM.unmountComponentAtNode(container);
            });
          });
    });
    return (
    <ThemeProvider theme={theme}>
      <div>        
          <div className="centred-block one-and-half-standard-block">
            <Profiler id="SnapPicker" onRender={onRenderSnapPickerCallback}>
              <SnapPicker items={items} onChange={setSelectedItem} label={'Search for video by title'}></SnapPicker>
            </Profiler>
          </div>
          <VideoForm selectedItem={selectedItem}></VideoForm>          
      </div>
    </ThemeProvider>
  )};

  ReactDOM.render(<Video />, container);

};
import React from 'react';
import { Auth, API } from 'aws-amplify';
import style from './App.module.css';
import Amplify from '@aws-amplify/core';
import { withAuthenticator, AmplifyAuthenticator, AmplifySignIn, AmplifySignOut, AmplifySignUp, AmplifyForgotPassword, AmplifyConfirmSignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
import telemedicineLogo from './images/telemedicineLogo2.png';
import userIcon from './images/userIcon1.png'
import reportsIcon from './images/Reports.png'
import appointmentIcon from './images/appointmentIcon.png'
import meetingIcon from './images/meetingIcon.png'
import chatIcon from './images/chatIcon.png'
import addUserIcon from './images/addUserIcon.png'
import removeUserIcon from './images/removeUserIcon.png'
import editUserIcon from './images/editUserIcon.png'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import PatientReport from './components/reports/PatientReport';
import ListOfPatientReports from './components/reports/ListOfPatientReports';
import DoctorRecordings from './components/recordings/DoctorRecordings';
import PatientRecordings from './components/recordings/PatientRecordings';
import Patient2Recordings from './components/recordings/Patient2Recordings';
import PatientReport2 from './components/reports/reportpatient2';
import Appointments from './components/appointments/Appointments';
import Profile from './components/Profile';
import ListUsers from './listusers';
// import DeleteUsers from './deleteusers';
import CreateUser from './createUser';
import NewReports from './components/reports/newReports.js';

import ChatApp from "./components/chat/cApp";

Amplify.configure(awsconfig);

const App = () => {

  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  window.$user = user;
  window.$recording = "/recordings/patient";


  React.useEffect(() => {

    return onAuthUIStateChange((nextAuthState, authData) => {

      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  var patientBucketConditional = "/recordings/patient";
  var reportBucketConditional = '/report/patient';

  

  function Home() {
    if ((user['signInUserSession']['accessToken']['payload']['cognito:groups'] === undefined) || (user['signInUserSession']['accessToken']['payload']['cognito:groups'] === 0)) {
      return (
        <div className={`position-absolute top-0 start-50 translate-middle-x ${style['square-unauthorized']} ${style['h1-unauthorized']}`}>
          <h1 className={style.h1}>Welcome, {user.attributes.given_name}</h1>
          <br />
          You have not been authorized. Please wait 24 to 48 hours to be able to access data.
          <br /> <br />Sorry for the inconvenience.
          <br /> <br />
          <AmplifySignOut />
        </div>
      )
    }
    else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'patients') {
      if(user.attributes.sub == '8d01e787-f734-440b-b23a-ed3da9c3bc6c') { 
        console.log('yes');
        patientBucketConditional = "/recordings/patient2";
        reportBucketConditional = "/report/patient2";
        window.$recording = patientBucketConditional;
        window.$bucketPath = "/report/patient2"; }
      // if(user.attributes.sub == '8814cfec-5190-4d0c-b5c4-9ba12f08856e'){
      //   console.log('This is for patient Taylor Swift');
      //   patientReportBucketConditional = '/reports/patient1reports'
      // }
      return (
        <div className="App">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className={`navbar-brand ${style.a} ${style['brand-text']}`} href="/">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Health-T
              </a>
              <div className="btn-group">
                <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" " + user.attributes.given_name}</button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li><a className="dropdown-item" href="/">Home</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className={`d-flex justify-content-evenly navbar ${style['primary-color']}`}>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href={reportBucketConditional}>Reports</a>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/chat" >Chat</a>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/appointments">Appointments</a>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href={patientBucketConditional}>Recordings</a>
            <span className={`navbar-brand mb-0 ${style.h1}`}></span>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['welcome-box']}`}>
            <div className={style['welcome-textbox']}>
              <h1 className={style.h1}>Welcome, {user.attributes.given_name}</h1>
            </div>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons1']} src={reportsIcon} alt="" width="130" height="100" />
              </div>
              <div className={style.textbox}>
                <a href={reportBucketConditional}><h3 className={style['h3']}>View Your Reports</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons2']} src={appointmentIcon} alt="" width="105" height="100" />
              </div>
              <div className={style.textbox}>
                <a href="/appointments"><h3 className={style.h3}>Schedule an Appointment</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons2']} src={meetingIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className={style.textbox}>
                <a onClick={createVideoChatRoom}><h3 className={style.h3}>Join a Meeting</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons2']} src={chatIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className={style.textbox}>
                <a href="/chat"><h3 className={style.h3}>Chat with a Doctor</h3></a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'doctors') {
      return (
        <div className="App">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className={`navbar-brand ${style.a} ${style['brand-text']}`} href="/">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Health-T
              </a>
              <div className="btn-group">
                <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" Dr. " + user.attributes.family_name}</button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className={`d-flex justify-content-evenly navbar ${style['primary-color']}`}>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/reports">Reports</a>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/chat">Chat</a>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/appointments">Appointments</a>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/recordings">Recordings</a>
            <span className={`navbar-brand mb-0 ${style.h1}`}></span>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['welcome-box']}`}>
            <div className={style['welcome-textbox']}>
              <h1 className={style.h1}>Welcome, {"Dr. " + user.attributes.given_name}</h1>
            </div>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons1']} src={reportsIcon} alt="" width="130" height="100" />
              </div>
              <div className={style.textbox}>
                <a href="/reports"><h3 className={style.h3}>View Patient Reports</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons2']} src={appointmentIcon} alt="" width="105" height="100" />
              </div>
              <div className={style.textbox}>
                <a href="/appointments"><h3 className={style.h3}>View Appointments</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons2']} src={meetingIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className={style.textbox}>
                <a onClick={createVideoChatRoom} target="_blank"><h3 className={style.h3}>Start a Meeting</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons2']} src={chatIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className={style.textbox}>
                <a href="/chat"><h3 className={style.h3}>Chat with Patient</h3></a>
              </div>
            </div>
          </div>
          
        </div>
      )
    }
    else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'nurses') {
      return (
        <div className="App">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className={`navbar-brand ${style.a} ${style['brand-text']}`} href="/">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Health-T
              </a>
              <div className="btn-group">
                <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" Nurse " + user.attributes.given_name}</button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li><a className="dropdown-item" href="/">Home</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className={`d-flex justify-content-evenly navbar ${style['primary-color']}`}>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/newReports">Reports</a>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/chat">Chat</a>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/appointments">Appointments</a>
            <span className={`navbar-brand mb-0 ${style.h1}`}></span>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['welcome-box']}`}>
            <div className={style['welcome-textbox']}>
              <h1 className={style.h1}>Welcome, {"Nurse " + user.attributes.given_name}</h1>
            </div>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons1']} src={reportsIcon} alt="" width="130" height="100" />
              </div>
              <div className={style.textbox}>
                <a href="/newReports"><h3 className={style.h3}>Add Patient Reports</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons2']} src={appointmentIcon} alt="" width="105" height="100" />
              </div>
              <div className={style.textbox}>
                <a href="/appointments"><h3 className={style.h3}>View Appointments</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons2']} src={chatIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className={style.textbox}>
                <a href="/chat"><h3 className={style.h3}>Chat with Patient</h3></a>
              </div>
            </div>
          </div>
          {/* <div className={style['lower-buttons-container']}>
            <button type="button" className={`btn btn-secondary ${style['lower-buttons']}`}>View Patients</button>
            <button type="button" className={`btn btn-secondary ${style['lower-buttons']}`}>View Staff</button>
          </div> */}
        </div>
      )
    }
    else if (user['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'admin') {
      return (
        <div className="App">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className={`navbar-brand ${style.a} ${style['brand-text']}`} href="/">
                <img src={telemedicineLogo} alt="" width="25" height="25" className="d-inline-block align-text-top" />
                Health-T
              </a>
              <div className="btn-group">
                <button type="button" className="btn btn-light"><img className="d-inline-block align-text-top" src={userIcon} alt="" width="20" height="20" />{" " + user.attributes.given_name}</button>
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li><a className="dropdown-item" href="/">Home</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#"><AmplifySignOut /></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className={`d-flex justify-content-evenly navbar ${style['primary-color']}`}>
            <a href="/createuser"><button type="button" className={`btn btn-secondary ${style['btn-sm']}`} >Add</button></a>
            <a href="/reports"><button type="button" className={`btn btn-secondary ${style['btn-sm']}`}>Reports</button></a>
            <a href="/listusers"><button type="button" className={`btn btn-secondary ${style['btn-sm']}`}>View All</button></a>
            <a type="button" className={`btn btn-secondary ${style['btn-sm']}`} href="/chat">Chat</a>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['welcome-box']}`}>
            <div className={style['welcome-textbox']}>
              <h1 className={style.h1}>Welcome, {" " + user.attributes.given_name}</h1>
            </div>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons1']} src={addUserIcon} alt="" width="105" height="100" />
              </div>
              <div className={style.textbox}>
                <a href="/listusers"><h3 className={style.h3}>View All User</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons1']} src={removeUserIcon} alt="" width="105" height="100" />
              </div>
              <div className={style.textbox}>
              <a href="/reports"><h3 className={style.h3}>View Patient Reports</h3></a>
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons1']} src={removeUserIcon} alt="" width="105" height="100" />
              </div>
              <div className={style.textbox}>
              {/* <a href="/deleteusers"><h3 className={style.h3}>Delete User</h3></a> */}
              </div>
            </div>
          </div>
          <div className={`d-flex justify-content-evenly flex-column ${style['primary-color']} ${style['info-box']}`}>
            <div className={style.beside}>
              <div className={style.dot}><img id={style['center-icons1']} src={editUserIcon} alt="" width="110" height="100" className="d-inline-block align-text-top" />
              </div>
              <div className={style.textbox}>
                <a href="/createuser"><h3 className={style.h3}>Add A User</h3></a>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }


  console.log('USER', user)
  var userGroup = '';
  return authState === AuthState.SignedIn && user ? (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/recordings">
            <DoctorRecordings userData={user.attributes} currentUser={user}></DoctorRecordings>
          </Route>
          <Route exact path="/recordings/patient">
            <PatientRecordings userData={user.attributes} currentUser={user}></PatientRecordings>
          </Route>
          <Route exact path="/recordings/patient2">
            <Patient2Recordings userData={user.attributes} currentUser={user}></Patient2Recordings>
          </Route>
          <Route path="/report/patient/">
            <PatientReport currentUser={user} patientData={user.attributes} />
          </Route>
          <Route path="/report/patient2">
            <PatientReport2 currentUser={user} patientData={user.attributes} />
          </Route>
          {/* <Route path="/reports">
            <ListOfPatientReports currentUser={user} />
          </Route> */}
          <Route path="/appointments">
            <Appointments currentUser={user} patientData={user.attributes} />
          </Route>
          <Route path="/profile">
            <Profile currentUser={user} userData={user.attributes} />
          </Route>
           <Route path="/listusers">
            <ListUsers currentUser={user} patientData={user.attributes} />
          </Route>
          {/*<Route path="/deleteusers">
            <DeleteUsers currentUser={user} patientData={user.attributes} />
  </Route> */}
          <Route path="/createuser" >
            <CreateUser currentUser={user} patientData={user.attributes} />
          </Route> 
          <Route path="/newReports" >
            <NewReports currentUser={user} patientData={user.attributes} />
          </Route>
          <Route exact path="/chat" component={ChatApp} />
        </Switch>
      </div>
    </Router>

  ) : (
    <AmplifyAuthenticator>
      <AmplifyForgotPassword
        headerText="Forgot Password?"
        slot="forgot-password"
        >
      </AmplifyForgotPassword>
      <AmplifySignUp headerText="To create an account, fill out all of the slots on this page." slot="sign-up"
        
        formFields={[
          {
            type: "username",
            label: "Enter your Username: ",
            placeholder: "Enter your Username",
            inputProps: { required: true},
          },
          {
            type: "given_name",
            label: "Enter your First Name: ",
            placeholder: "Enter your first name",
            inputProps: { required: true }
          },
          {
            type: "middle_name",
            label: "Enter your Middle Name (optional): ",
            placeholder: "Enter your middle name"
          },
          {
            type: "family_name",
            label: "Enter your Last Name: ",
            placeholder: "Enter your last name",
            inputProps: { required: true }
          },
          {
            type: "address",
            label: "Enter your Address:  ",
            placeholder: "Enter your address",
            inputProps: { required: true }
          },
          {
            type: "custom:city",
            label: "Enter City: ",
            placeholder: "Enter city",
            inputProps: { required: true },
          },
          {
            type: "custom:state",
            label: "Enter State: ",
            placeholder: "Enter state",
            inputProps: { required: true },
          },
          {
            type: "custom:zc",
            label: "Enter Zipcode: ",
            placeholder: "Enter zipcode",
            inputProps: { required: true },
          },
          {
            type: "birthdate",
            label: "Enter your Birthdate: ",
            placeholder: "MM/DD/YYYY",
            inputProps: { required: true }
          },
          {
            type: "email",
            label: "Enter your Email Address: ",
            placeholder: "Enter your email address",
            inputProps: { required: true},
          },
          {
            type: "gender",
            label: "Enter Gender: ",
            placeholder: "Female, Male, or Other",
            inputProps: { required: true },
          },
          {
            type: "custom:ethnicity",
            label: "Enter your Ethnicity: ",
            placeholder: "White, Hispanic, Asian, or Black/African American",
            inputProps: { required: true },
          },
          {
            type: "custom:marital-status",
            label: "Enter your Marital Status: ",
            placeholder: "Married, Single, Widowed, or Divorced",
            inputProps: { required: true },
          },
          {
            type: "password",
            label: "Enter Password:",
            placeholder: "Enter password",
            inputProps: { required: true, autocomplete: "new-password" },
          },
          {
            type: "phone_number",
            label: "Enter your Phone Number: ",
            inputProps: { required: true }
          },
          {
            type: "custom:provider",
            label: "Enter your Insurance Provider: ",
            placeholder: "e.g. Blue Shield or 'none'",
            inputProps: { required: true },
          }
        ]} />
      <AmplifySignIn headerText="Welcome to Health-T!" slot="sign-in"  />
      <AmplifySignOut buttonText="LOGOUT" />
      <AmplifyConfirmSignUp 
        headerText="Custom confirm Sign Up"
        slot="confirm-sign-up">
      </AmplifyConfirmSignUp>
    </AmplifyAuthenticator>
  )

}

function createVideoChatRoom () {
  const roomName = prompt('Enter the name of the room you would like to create or join.');
  var roomNameNoSpaces = roomName.replace(/\s/g, "-");
  roomNameNoSpaces = roomNameNoSpaces.toLowerCase();
  var url = `https://telemedicine-video-call.herokuapp.com/${roomNameNoSpaces}`
  
  window.open(url, '_blank');

}

export default App;
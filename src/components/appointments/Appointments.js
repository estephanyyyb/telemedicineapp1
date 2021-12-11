// import logo from './logo.svg';
import apptStyle from './Appointments.module.css';
import appointments from './appt.json';
import parse from 'html-react-parser';
import PageHeader from '../page-header/PageHeader';
import Form from './Form';
import drs from './drs.json';
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import FormFunction from './FormFunction';

const listAppointments = `query listAppointments {
  listAppointments{
    items{
      id
      patient
      doctor
      date
      reason
      notes
      approval
    }
  }
}`;

var users;

const initialState = { id: '', patient: '', doctor: '', date: '', reason: '', notes: '', approval: ''};
var currentIndex = 0;

function Appointments(props){
  const email = props.patientData.email;

  const [formState, setFormState] = useState(initialState);
  const [appts, setUsers] = useState([]);
  useEffect(() => {
      fetchUsers();
  }, []);

  async function fetchUsers() {
      try {
        const userData = await API.graphql(graphqlOperation(listAppointments));
        users = userData.data.listAppointments.items;

        console.log(users);
        setUsers(users);
      } catch (err) {
        console.log(err);
        console.log('error fetching appointments');
      }
  }

  function setidx() {
    for(var i = 0; i < appts.length; i++) {
      if(appts[i].id > currentIndex) {
        currentIndex = parseInt(appts[i].id);
      }
    }
  }

  // render (){
    if(props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'patients') {
      setidx();
      return (
        <div className="App">

          <div><PageHeader currentUser={props.currentUser}></PageHeader></div>

          <div className={apptStyle.mainContent} style={{position: 'absolute', width: "94%", overflow: 'hidden'}}>
                  <div className={apptStyle.mainContentBar}>
                      <h3 className={apptStyle.contentTitle}>VIEW APPOINTMENTS</h3>
                  </div>
              <div style={{display: 'flex', flexWrap: 'nowrap', height: '100%'}}>
                  <div className={apptStyle.subContent}>
                      <div className={apptStyle.mainContentBar}>
                          <h3 className={apptStyle.contentTitle}>Your Upcoming Appointments</h3>
                      </div>

                      <div style={{height: '83%', overflowY: 'scroll'}}>
                        <div className="appt" id="appt1">
                            {/* <div className="appt" id="appt1" style="display: flex; flex-wrap: wrap; border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;"> */}
                            <CreateApptList appts={appts} email={email} userType="patient"/>
                            {/* </div> */}
                        </div>
                      </div>
                  </div>

                  <div className={apptStyle.subContent}>
                      <div className={apptStyle.mainContentBar}>
                        <h3 id="year" className={apptStyle.contentTitle}>Request an Appointment</h3>
                      </div>
                      <div>
                        <FormFunction patientEmail={email} currentIndex={currentIndex}/>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      );
    } else if (props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'doctors') {
      setidx();
      return (
        <div className="App">

          <div><PageHeader currentUser={props.currentUser}></PageHeader></div>

          <div className={apptStyle.mainContent} style={{position: 'absolute', width: "94%", overflow: 'hidden'}}>
                  <div className={apptStyle.mainContentBar}>
                      <h3 className={apptStyle.contentTitle}>VIEW APPOINTMENTS</h3>
                  </div>
              <div style={{display: 'flex', flexWrap: 'nowrap', height: '100%'}}>
                  <div className={apptStyle.subContent}>
                      <div className={apptStyle.mainContentBar}>
                          <h3 className={apptStyle.contentTitle}>Your Upcoming Appointments</h3>
                      </div>

                      <div style={{height: '83%', overflowY: 'scroll'}}>
                        <div className="appt" id="appt1">
                            {/* <div className="appt" id="appt1" style="display: flex; flex-wrap: wrap; border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;"> */}
                            <CreateApptList appts={appts} email={email} userType="doctor"/>
                            {/* </div> */}
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      );
    } else if(props.currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'][0] === 'nurses') {
      setidx();
      return (
        <div className="App">

          <div><PageHeader currentUser={props.currentUser}></PageHeader></div>

          <div className={apptStyle.mainContent} style={{position: 'absolute', width: "94%", overflow: 'hidden'}}>
                  <div className={apptStyle.mainContentBar}>
                      <h3 className={apptStyle.contentTitle}>VIEW APPOINTMENTS</h3>
                  </div>
              <div style={{display: 'flex', flexWrap: 'nowrap', height: '100%'}}>
                  <div className={apptStyle.subContent}>
                      <div className={apptStyle.mainContentBar}>
                          <h3 className={apptStyle.contentTitle}>Appointments Requested</h3>
                      </div>

                      <div style={{height: '83%', overflowY: 'scroll'}}>
                        <div className="appt" id="appt1">
                            {/* <div className="appt" id="appt1" style="display: flex; flex-wrap: wrap; border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;"> */}
                            <CreateNurseApptList appts={appts} email={email} userType="doctor"/>
                            {/* </div> */}
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      );
    } 
  // }

  
}

function CreateApptList(props) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  let ampm = "AM";

  var appointment = props.appts;
  // console.log(drs[1]);

  appointment.sort(function(ax, bx) {
    ax = parseDate(ax);
    bx = parseDate(bx);

    let compareYr = ax.year - bx.year;
    let compareMo = ax.month - bx.month;
    let compareDay = ax.day - bx.day;
    let compareHr = ax.hour - bx.hour;
    let compareMin = ax.minute - bx.minute;

    if(compareYr === 0) {
      if(compareMo === 0) {
        if(compareDay === 0) {
          if(compareHr === 0) {
            if(compareMin === 0) {
              return 0;
            } else {
              return compareMin;
            }
          } else {
            return compareHr;
          }
        } else {
          return compareDay;
        }
      } else {
        return compareMo;
      }
    } else {
      return compareYr;
    }
  });
  
  replaceEmailWithName(appointment);
  
  // var y, mo, d, ho, min = '';
  var str = "";
  for(var i = 0; i < appointment.length; i++) {
    var a = parseDate(appointment[i]);
    if( ((props.email === appointment[i].patient) || (props.email === appointment[i].doctor)) && appointment[i].approval) {
      str += '<div style=" border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;">' +
      "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>";
      str += months[a.month - 1] + " " + a.day + ", " + a.year + "</h4></div>";
      str += "<div style='margin-left:30px'><h4>";
      if(a.hour >= 12) {
        if(a.hour !== 12) {
          a.hour = a.hour - 12;
        }
        ampm = "PM";
      } else {
        ampm = "AM";
      }
      str += a.hour + ":" + a.minute;
      if(a.minute === 0) str += "0";
      str += " " + ampm + "</h4></div></div>";
      
      if(props.userType === 'doctor') {
        str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>" + appointment[i].patient + "</h4></div><div style='width:100%'></div></div>";
      } else if (props.userType === 'patient') {
        str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>" + appointment[i].doctor + "</h4></div><div style='width:100%'></div></div>";
      }
      
      str += "<div style='display: flex; flex-wrap: wrap;'><h4 style='margin-left:10px'>Reason: " + appointment[i].reason + "</h4><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><p style='margin-left:10px'> Notes: " + appointment[i].notes + "</p></div></div>"
    }
  }
  
  return(
      <div>{parse (str)}</div>
  );
}

function replaceEmailWithName(appointment) {
  for(let appt = 0; appt < appointment.length; appt++) {
    var dremail = appointment[appt].doctor;
    // console.log(dremail);
    for(let dr = 0; dr < drs.length; dr++) {
      if(drs[dr].email === dremail) {
        appointment[appt].doctor = drs[dr].name;
        break;
      }
    }
  }
}

function parseDate(appointment) {
  var s = "2021-12-21T17:42";
  if(appointment) {
    // console.log(appointment);
    var y = appointment.date.substring(0, 4);
    var mo = appointment.date.substring(5, 7);
    var d = appointment.date.substring(8, 10);
    var h = appointment.date.substring(11, 13);
    var min = appointment.date.substring(14, 16);
    // console.log(min);
    h = parseInt(h);
    mo = parseInt(mo);
    y = parseInt(y);
    d = parseInt(d);
    min = parseInt(min);
  }

  return {year: y, month: mo, day: d, hour: h, minute: min};
}

function CreateNurseApptList(props) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  let ampm = "AM";

  var appointment = props.appts;
  // console.log(drs[1]);

  appointment.sort(function(a, b) {
    let compareYr = a.year - b.year;
    let compareMo = a.month - b.month;
    let compareDay = a.day - b.day;
    let compareHr = a.hour - b.hour;
    let compareMin = a.minute - b.minute;

    if(compareYr === 0) {
      if(compareMo === 0) {
        if(compareDay === 0) {
          if(compareHr === 0) {
            if(compareMin === 0) {
              return 0;
            } else {
              return compareMin;
            }
          } else {
            return compareHr;
          }
        } else {
          return compareDay;
        }
      } else {
        return compareMo;
      }
    } else {
      return compareYr;
    }
  });
  
  replaceEmailWithName(appointment);
  
  var y, mo, d, ho, min = '';
  var str = "";
  for(var i = 0; i < appointment.length; i++) {
    var a = parseDate(appointment[i], y, mo, d, ho, min);
    if(!appointment[i].approval) {
      str += '<div style=" border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;">' +
      "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>";
      str += months[a.month - 1] + " " + a.day + ", " + a.year + "</h4></div>";
      str += "<div style='margin-left:30px'><h4>";
      if(a.hour >= 12) {
        if(a.hour !== 12) {
          a.hour = a.hour - 12;
        }
        ampm = "PM";
      } else {
        ampm = "AM";
      }
      str += a.hour + ":" + a.minute;
      if(a.minute === 0) str += "0";
      str += " " + ampm + "</h4></div></div>";
      
      str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>Patient: " + appointment[i].patient + "</h4></div><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>Doctor: " + appointment[i].doctor + "</h4></div><div style='width:100%'></div></div>";
      
      str += "<div style='display: flex; flex-wrap: wrap;'><h4 style='margin-left:10px'>Reason: " + appointment[i].reason + "</h4><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><p style='margin-left:10px'> Notes: " + appointment[i].notes + "</p></div>";
      str += "<div style='display:flex; flex-wrap: wrap;'><button id=" + appointment[i].id +">Approve</button><button id=" + appointment[i].id + ">Deny</button></div></div>";
    }
  }
  
  return(
      <div>{parse(str, {
        replace: domNode => {
          if (domNode.attribs && domNode.name === 'button' ) {
          	delete domNode.attribs.onclick;
            console.log(domNode)
            return (
              <button
                {...domNode.attribs}
                onClick={() => { approve(domNode) }}
                style={{backgroundColor:'#7EC4E8', border:'none', margin:5, padding:5, borderRadius:5, width:75}}
              >{domNode.children[0].data}</button>
            );
          }
        }
      })}</div>
  );
}

function approve(mess) {
  if(mess.children[0].data === 'Approve') {
    const appointmentToUpdate = users.find(element => element.id === mess.attribs.id);
    console.log(appointmentToUpdate);
    const apptUpdate = {id: appointmentToUpdate.id, patient: appointmentToUpdate.patient, doctor: appointmentToUpdate.doctor, approval: true, date: appointmentToUpdate.date, reason: appointmentToUpdate.reason, notes: appointmentToUpdate.notes}

    const mutation = `
    mutation MyMutation {
      updateAppointments(input: {approval: true, id:\"` + apptUpdate.id + `\", date:\"` +  apptUpdate.date + `\", doctor: \"` + apptUpdate.doctor + `\", notes: \"`+ apptUpdate.notes + `\", patient: \"`+ apptUpdate.patient + `\", reason: \"`+ apptUpdate.reason +`\"}) {
        id
      }
    }
    `;

    API.graphql(graphqlOperation(mutation));

    alert('Approved');
  } else {
    alert('Denied');
  }
}

export default Appointments;
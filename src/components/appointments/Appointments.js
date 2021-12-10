// import logo from './logo.svg';
import styles from './Appointments.module.css';
import React from 'react';
import appointments from './appt.json';
import parse from 'html-react-parser';
import PageHeader from '../page-header/PageHeader';
import Form from './Form'

function Appointments(props){
  const email = props.patientData.email;
  // constructor (){
    // super();
    
    // var jsonData;
  // }

  // componentDidMount() {
  // }

  // render (){
    return (
      <div className="App">
        {/* <div className="heading">
          <h3 className="title">Telemedicine</h3>
          <div style={{width: "75%"}}></div>
          <h3 className="title">User Name</h3>
          <img src={user} style={{width: 30, height: 30, marginLeft: 5}} alt=""></img>
        </div>
        <div className="menuBar">
            <div className="menuButton"><button className="menBut">Reports</button></div>
            <div className="menuButton"><button className="menBut">Messages</button></div>
            <div className="menuButton"><button className="menBut">Appointments</button></div>
            <div className="menuButton"><button className="menBut">Recordings</button></div>
        </div> */}

        <div><PageHeader currentUser={props.currentUser}></PageHeader></div>

        <div className={styles['main-content']} style={{position: 'absolute', width: "94%", overflow: 'hidden'}}>
                <div className={styles['main-content-bar']}>
                    <h3 className={styles['content-title']}>VIEW APPOINTMENTS</h3>
                </div>
            <div style={{display: 'flex', flexWrap: 'nowrap', height: '100%'}}>
                <div className={styles['sub-content']}>
                    <div className={styles['main-content-bar']}>
                        <h3 className={styles['content-title']}>Your Upcoming Appointments</h3>
                    </div>

                    <div style={{height: '83%', overflowY: 'scroll'}}>
                      <div className={styles['appt']} id="appt1">
                          {/* <div className="appt" id="appt1" style="display: flex; flex-wrap: wrap; border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;"> */}
                          <CreateApptList email={email}></CreateApptList>
                          {/* </div> */}
                      </div>
                    </div>
                </div>

                <div className={styles['sub-content']}>
                    <div className={styles['main-content-bar']}>
                      <h3 id="year" className={styles['content-title']}>Request an Appointment</h3>
                    </div>
                    <div>
                      {/* <form style={{margin:15, display:'flex', flexWrap:'wrap'}}>
                        <div><label>Date: </label>
                        <input type="date"></input></div><div style={{width:'100%'}}></div>
                        <div style={{marginTop:15}}><label>Time: </label>
                        <input type="time"></input></div><div style={{width:'100%'}}></div>
                        <div style={{marginTop:15}}><label>Reason: </label>
                        <input type="text"></input></div><div style={{width:'100%'}}></div>
                        <div style={{marginTop:15}}><label>Notes: </label>
                        <input type="text"></input></div><div style={{width:'100%'}}></div>
                      </form> */}
                      <Form/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  // }

  /*setUpCalendar() {
    document.getElementById('month').innerHTML = this.months[this.month - 1];
    document.getElementById('year').innerHTML = this.year;
  
    var table = "<table><tr>";
    for (var i=0; i < this.daysOfWeek.length; i++){
        table += "<th className='dayOfWeek'>"+ this.daysOfWeek[i]+"</th>";
    }
    table += "</tr><tr>";
  
    var days = 30; // How many days we need?
    var appendEmptyDays = 7 - (days+7) % 7 - this.startDay; // How many empty cells we miss?
  
    for(var j=0; j < this.startDay; j++){
        table += "<td className='calendarDay'></td>";
    }
  
    for(var k=1; k <= days; k++){
        table += "<td className='calendarDay'>"+ k +"</td>";
        if((k + this.startDay) %7===0) table += "</tr><tr>"; // Add a new week row?
    }
  
    for(var l=0; l < appendEmptyDays; l++){
        table += "<td className='calendarDay'></td>";
    }
    document.getElementById('calendar').innerHTML = table;
  
    // var appointments = [];
    
  }*/
}

function CreateApptList(props) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const month = 9;
  // const day = 6;
  // const year = 2021;
  // const startDay = 3;
  // const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  let ampm = "AM";

  // appointments[0].year = 2020;

  appointments.sort(function(a, b) {
    let compareYr = a.year - b.year;
    let compareMo = a.month - b.month;
    let compareDay = a.day - b.day;
    let compareHr = a.hour - b.hour;
    let compareMin = a.minute - b.minute;

    if(compareYr == 0) {
      if(compareMo == 0) {
        if(compareDay == 0) {
          if(compareHr == 0) {
            if(compareMin == 0) {
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

  var str = "";
  for(var i = 0; i < appointments.length; i++) {
    if(props.email === appointments[i].email) {
      var h = appointments[i].hour;
      str += '<div style=" border: solid; margin: 15px; border-radius: 5px; border-width: 1.5px; border-color: gray;">' +
      "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>";
      str += months[appointments[i].month - 1] + " " + appointments[i].day + ", " + appointments[i].year + "</h4></div>";
      str += "<div style='margin-left:30px'><h4>";
      if(appointments[i].hour >= 12) {
        if(h != 12) {
          h = h - 12;
        }
        ampm = "PM";
      } else {
        ampm = "AM";
      }
      str += h + ":" + appointments[i].minute;
      if(appointments[i].minute == 0) str += "0";
      str += " " + ampm + "</h4></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><div style='margin-left:10px'><h4>" + appointments[i].doctor + "</h4></div><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><h4 style='margin-left:10px'>Reason: " + appointments[i].reason + "</h4><div style='width:100%'></div></div>";
      str += "<div style='display: flex; flex-wrap: wrap;'><p style='margin-left:10px'> Notes: " + appointments[i].notes + "</p></div></div>"
    }
  }
  // appointments.array.forEach(element => {
  //     str += element.month;
  // });
  
  return(
      <div>{parse (str)}</div>
  );
}

export default Appointments;

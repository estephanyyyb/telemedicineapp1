import React , {useState, useEffect, Component} from 'react';
import telemedicineLogo from '../../images/telemedicineLogo2.png';
import userIcon from '../../images/userIcon1.png';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import firebase from "firebase/app";
import 'firebase/storage';
import { Link } from 'react-router-dom';
import PageHeader from '../page-header/PageHeader';

const firebaseConfig = {
  apiKey: "AIzaSyAwxvSMHLyXiEKTBn4D-L8llyoYu-K8Yqw",
  authDomain: "telemedicine-c0afa.firebaseapp.com",
  projectId: "telemedicine-c0afa",
  storageBucket: "gs://telemedicine-c0afa-patient2",
  messagingSenderId: "404118376728",
  appId: "1:404118376728:web:500e4dca21d7d18f62ce6d",
  measurementId: "G-4WQP69JN8X"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
var storage = firebase.app().storage("gs://telemedicine-c0afa-patient2");

const PatientRecordings = (props) => { 

  const heading = ['#', 'File', 'Time Created', 'Size(bytes)', 'File URL'];
  const [name, setNameArray] = useState([]); //declare name array
  const [time, setTimeArray] = useState([]); //declare time array
  const [size, setSizeArray] = useState([]); //declare size array
  const [URL, setURLArray] = useState([]); //declare URL array

  
//  List Items in Storage
  useEffect(() => {
    storage.ref().child('images/').listAll()
    .then(res => {
      res.items.forEach((item) => {
        setNameArray(name => [...name, item.name]);
        item.getMetadata()
        .then(res3 => {
          setTimeArray(time => [...time, res3.timeCreated]);
          setSizeArray(size => [...size, res3.size]);
        })
      })
    })
    .catch(err=> {
      alert(err.message);
    })

  }, [])


  // DOWNLOAD URLS
  useEffect(() => {
    storage.ref().child('images/').listAll()
    .then(res => {
        res.items.forEach(item => {
            item.getDownloadURL()
            .then(url => {
                setURLArray(URL => [...URL, url]);
            })
        })
    })
  }, [])

// Build Dynamic Table
const buildTable = () => {
    console.log('patient2');
  const tableID = document.querySelector('.recordings');
  var tableRows = tableID.getElementsByTagName('tr');
  var rowCount = tableRows.length;
  for (var x=rowCount-1; x>0; x--) {
    tableID.removeChild(tableRows[x]);
  }
  for(var i=0; i < name.length; i++){
    let recordingsRow = document.createElement('tr');
    recordingsRow.className = 'recordingsRow';
    let numColumn = document.createElement('td');
    numColumn.innerText = i;
    let fileNameColumn = document.createElement('td');
    fileNameColumn.innerText = name[i];
    let timeCreatedColumn = document.createElement('td');
    timeCreatedColumn.innerText = time[i];
    let sizeColumn = document.createElement('td');
    sizeColumn.innerText = size[i];
    let urlColumn = document.createElement('a');
    urlColumn.textContent = 'download';
    urlColumn.href = URL[i];
    // let urlColumn = document.createElement('td');
    // urlColumn.innerText = URL[i];

    recordingsRow.append(numColumn, fileNameColumn, timeCreatedColumn, sizeColumn, urlColumn);
    tableID.append(recordingsRow);
  }

}
  

    return (
      <div className="App">
      {/* <PageHeader currentUser={props.currentUser}></PageHeader> */}
      <PageHeader currentUser={props.currentUser}></PageHeader>
   <br/><br/>
   <h1><strong>Video Recordings</strong></h1>
        <center>
        <br/> <br/>
     
          <button onClick={buildTable}> Load Recordings </button>

          <table className='recordings'>
                  <thead>
                      <tr>
                          {heading.map(head => <th>{head}</th>)}
                      </tr>
                  </thead>
                  <tbody>

                  </tbody>
          </table>
        <br></br>
        </center>
      
      </div>
      
    );


}
  export {
    storage, firebase, PatientRecordings as default
  }
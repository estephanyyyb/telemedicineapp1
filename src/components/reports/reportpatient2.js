import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import PageHeader from '../page-header/PageHeader';
import { initializeApp } from '@firebase/app';
import style from './Reports.module.css';
import styles from '../dynamic-table/dynamic-table.module.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const firebaseConfig = {
    apiKey: "AIzaSyAwxvSMHLyXiEKTBn4D-L8llyoYu-K8Yqw",
  authDomain: "telemedicine-c0afa.firebaseapp.com",
  projectId: "telemedicine-c0afa",
  storageBucket: "gs://telemedicine-c0afa-reports2",
  messagingSenderId: "404118376728",
  appId: "1:404118376728:web:500e4dca21d7d18f62ce6d",
  measurementId: "G-4WQP69JN8X"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else {
    firebase.app();
}

var storage = firebase.app().storage("gs://telemedicine-c0afa-reports2");

const PatientReport = (props) => {
    // const [URL2, setURL2] = useState("");
    const [URL, setURLArray] = useState([]); //declare URL array



    // const getFromFirebase = () => {
    //     let storageRef = storage.ref();

    //     storageRef.listAll().then(function (res) {
    //         res.items.forEach((URLRef) => {
    //             URLRef.getDownloadURL().then((url) => {
    //                 setURLArray((URL) => [...URL,url]);
    //             });
    //         });
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     });
    // };

    // storage.ref().listAll().then(function(result){
    //     result.items.forEach(function(URLRef){
    //         console.log(result.items);
    //     displayURL(imageRef);
    //     });
    // }) 
    // useEffect(() => {
    //     const fetchImages = async () => {

    //     let result = await storageRef.child('images').listAll();
    //         let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());

    //         return Promise.all(urlPromises);

    //     }

    //     const loadImages = async () => {
    //         const urls = await fetchImages();
    //         setFiles(urls);
    //     }
    //     loadImages();
    //     }, []);






    // useEffect(() => {
    //     storage.ref().child('images/').listAll()
    //     .then(res => {
    //       res.items.forEach((item) => {
    //        setNameArray(name => [...name, item.name])
    //       })
    //     })
    //     .catch(err=> {
    //       alert(err.message);
    //     })

    //   }, [])


    //DOWNLOAD URLS
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



    const fullName = props.patientData.given_name + " " + (props.patientData.middle_name ? props.patientData.middle_name + " " : " ") + props.patientData.family_name;
    const age = calculate_age(props.patientData.birthdate);
    const id = props.patientData.sub;


    return (
        <div>

            <PageHeader currentUser={props.currentUser}></PageHeader>
            <div className={style['name2']}>
                Reports
            </div>

            <TableContainer component={Paper}>
                <Table style={{ marginTop: '30px' }} aria-label="simple table">
                    <TableHead className="tbHead">
                        <TableRow  >
                            <TableCell style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} className={style['tablecell1']} >Patient Name</TableCell>
                            <TableCell style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} className={style['tablecell1']} >Date of Birth</TableCell>
                            <TableCell style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} className={style['tablecell1']} >Age</TableCell>
                            <TableCell style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} className={style['tablecell1']}>Sex</TableCell>
                            <TableCell style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} className={style['tablecell1']} >Ethnicity</TableCell>
                            <TableCell style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} className={style['tablecell1']}>Marital Status</TableCell>
                            <TableCell style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} className={style['tablecell1']}>Phone Number</TableCell>
                            <TableCell style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} className={style['tablecell1']}>Provider</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="tBody">
                        <TableRow >
                            <TableCell style={{ textAlign: 'center' }} >{fullName}</TableCell>
                            <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
                                {props.patientData.birthdate}
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
                                {age}
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
                                {props.patientData.gender}
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
                                {props.patientData["custom:ethnicity"]}
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
                                {props.patientData["custom:marital-status"]}
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
                                {props.patientData.phone_number}
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }} component="th" scope="row">
                                {props.patientData["custom:provider"]}
                            </TableCell>

                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
            <br />



            <div style={{ marginLeft: '170px', marginRight: '170px', marginTop: '30px', marginBottom: '30px' }} className="home__table">
                <div className={styles['columnsMain1']}>
                    <TableContainer style={{ boxShadow: 'none',  }} component={Paper}>

                        <TableHead className="tbHead">
                            <TableRow >
                                <TableCell style={{fontSize: '35px', textAlign:'center', fontWeight:'bold'}} className="tablecell1" >
                                    <div className={styles['columns1']}>{fullName}'s Reports</div></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tBody">
                            {URL.map((URL) => (
                                <TableRow key={URL}>
                                    <TableCell ><div className={styles['rows1']}><a href={URL}>{URL}</a></div></TableCell>
                                </TableRow>
                            ))}
                            
                            </TableBody>
                    </TableContainer>
                </div>
            </div>

        </div>

    );
}

function calculate_age(dateofBirth) {
    var birthYear = dateofBirth.substring(dateofBirth.length - 4),
        currentYear = new Date().getFullYear(),
        age = currentYear - birthYear;

    return age;
}

PatientReport.propTypes = {};

PatientReport.defaultProps = {};

export default PatientReport;
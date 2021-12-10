import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import PageHeader from '../page-header/PageHeader';
import { initializeApp } from '@firebase/app';
import styles from './Reports.module.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const firebaseConfig = {
	apiKey: "AIzaSyDgxKxiGZv8nLVb-w6bYIHTlGy6aQDJp9g",
	authDomain: "telemedicine-report.firebaseapp.com",
	projectId: "telemedicine-report",
	storageBucket: "telemedicine-report.appspot.com",
	messagingSenderId: "725043276876",
	appId: "1:725043276876:web:0623c4d48dacf249aa58e9",
	measurementId: "G-9JBVMYYDV3"
}

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
else {
	firebase.app();
}

var storage = firebase.storage();

const ListOfPatientReports = (props) => {
	const [URL, setURLArray] = useState([]);

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

	const linkURLs = () =>{
		let url2 = document.createElement('a');
		url2.textContent = URL;
		url2.href=URL;
	}
	return (
		<div className="App">
			<PageHeader currentUser={props.currentUser}></PageHeader>

			<div style={{ marginLeft: '40px', marginRight: '30px', marginTop: '30px', marginBottom: '30px' }} className="home__table">
                <div className={styles['columnsMain1']}>
                    <TableContainer style={{ boxShadow: 'none' }} component={Paper}>

                        <TableHead className="tbHead">
                            <TableRow >
                                <TableCell style={{fontSize: '35px', textAlign:'center', fontWeight:'bold', width: '1350px'}} className="tablecell1" ><div className={styles['columns1']}>All Patient's Reports</div></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody  className="tBody">
                            {URL.map((URL) => (
                                <TableRow key={URL}>
                                    <TableCell style={{textAlign:'center'}} > <a href={URL}>{URL}</a></TableCell>
                                </TableRow>
                            ))}
							{/* {
                                <TableRow>
                                    <TableCell>
                            <a href="https://firebasestorage.googleapis.com/v0/b/telemedicine-report.appspot.com/o/images%2FReport2_TaylorSwift.pdf?alt=media&token=9333daeb-a229-4739-8afc-13867cce342">link</a>
                            </TableCell>
                            </TableRow>} */}
                        </TableBody>
                        
                    </TableContainer>
                </div>
            </div>
		</div>
	);
}

ListOfPatientReports.propTypes = {};

ListOfPatientReports.defaultProps = {};

export default ListOfPatientReports;
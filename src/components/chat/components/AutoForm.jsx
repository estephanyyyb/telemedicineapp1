import { useState } from 'react';
import axios from 'axios';
import '../../../App.js';
import user from '../../../App.js';
const AutoForm = (props) => {

	//Setting up the user	
	var username = window.$user.attributes.email;
	var aname = window.$user.attributes.given_name;
	var family_name = window.$user.attributes.family_name;

	const authObject = {'Private-Key': 'b19b8dc6-88bd-4f94-8595-30e34aa3cc2b'}
	
	// post request to create user
	try {
		axios.post( "https://api.chatengine.io/users/",
			{'username': username,  
			 'first_name': aname, 
			 'last_name': family_name,
			 'secret': "12345678"
			}, 
			{'headers': authObject}).then(r => console.log(r))
			// login the user
			
			localStorage.setItem('username', username)
			localStorage.setItem('password', "12345678")

            window.location.reload()
         } catch (error) {
             console.log(error)
             //setError('Incorrect credentials, try again')
        } 
	return (
		<div>Loading...</div>
	);
}

export default AutoForm
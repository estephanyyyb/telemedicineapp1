import { ChatEngine } from 'react-chat-engine';
import { Button, Navbar, Nav } from 'react-bootstrap'
import styles from './cApp.module.css';
import ChatFeed from './components/ChatFeed';
import Container from 'react-bootstrap/Container'
import AutoForm from './components/AutoForm';
import telemedicineLogo from '../../images/telemedicineLogo2.png';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import userIcon from '../../images/userIcon1.png';
import { Auth, Amplify } from 'aws-amplify'
import user from '../../App.js'
import PageHeader from '../page-header/PageHeader';

const ChatApp = (props) => {
	var username = window.$user.attributes.email;
  const currentUser = window.$user;
	if (!localStorage.getItem('username')) return <AutoForm />
	if (localStorage.getItem('username') != username) return <AutoForm />
	return (


<div>
	<center>
    <PageHeader currentUser={currentUser}></PageHeader>
</center>
	<br />

		<ChatEngine 
			height="80vh"
			projectID="5d047ac1-31af-4d94-89c9-e1db8f373e59"
			userName={username}
			userSecret={localStorage.getItem('password')}
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
		/>
</div>
	);
};

export default ChatApp;
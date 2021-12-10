import styles from '../cApp.module.css';

const MyMessage = ({ message}) => {
	if (message?.attachments.length > 0) {
		return (
			<img 
				src={message.attachments[0].file}
				alt="message-attachment"
				className={styles['message-image']}
				style={{ float: 'right' }}
			/>
		)
	}
	return (
		<div className={styles['message']} style={{ float: 'right', marginRight: '18px', color: 'black', backgroundColor: '#e7edf5' }}>
			{message.text}
		</div>
	)
}

export default MyMessage; 
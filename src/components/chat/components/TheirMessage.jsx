import styles from '../cApp.module.css';

const TheirMessage = ({lastMessage, message}) => {
	const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
	return (
		<div className={styles['message-row']}>
			{isFirstMessageByUser && (
				<div 
					className={styles['message-avatar']}
				/>
			)}
			{message?.attachments.length > 0 
				? (
				<img 
					src={message.attachments[0].file}
					alt="message-attachment"
					className={styles['message-image']}
					style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px'}}
				/>
		) :(
			<div className={styles['message']} style={{ float: 'left', backgroundColor: '#7ec4e8', marginLeft: isFirstMessageByUser ? '4px' : '48px'}}>
				{message.text}
			</div>
	)
	}
		</div>
	)
}

export default TheirMessage; 
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import styles from '../cApp.module.css';


const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];


  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className={styles['message-block']}>
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className={styles['chat-feed']}>
      <div className={styles['chat-title-container']}>
        <div className={styles['chat-subtitle']}>
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className={styles['message-form-container']}>
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
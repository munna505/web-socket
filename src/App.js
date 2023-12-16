import logo from './logo.svg';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';
import {useCallback } from 'react';

function App() {
  const WS_URL = 'wss://copyapi.jksconsultants.com/ws?symbol=AVXUSD';

  const { sendMessage, lastJsonMessage,lastMessage, readyState } = useWebSocket(WS_URL,
    {onOpen: () => console.log('opened'),
  //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
}
    
    );
  
  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  console.log(lastMessage)
  console.log(lastJsonMessage)
  ;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      </header>
    </div>
  );
}

export default App;

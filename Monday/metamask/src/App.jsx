import './App.css';
import { connectToMetaMask } from './connectToMetaMask';
import { sendEth } from './sendETH';

function App() {
  return (
    <div className="App">
      <button onClick={connectToMetaMask}>Connect</button>
      <button onClick={sendEth}>Send</button>
    </div>
  );
}

export default App;

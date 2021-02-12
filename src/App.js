import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './features/dashboard/dashboard';
import Navbar from './features/navbar/navbar';
import Settings from './features/settings/settings';

function App() {

  const config = {
    devices: [
      {
        ipaddress: '192.168.1.10',
        type: 'Quadcore',
        notes: 'Receives UDP from IOCore, runs lighting scenes',
        short: 'Q'
      },
      {
        ipaddress: '192.168.1.11',
        type: 'IOCore',
        notes: 'Received data from 5 sensors and sends to Quadcore as UDP',
        short: 'I'
      },
    ],
      notes: ''
    }


  return (
    <BrowserRouter>
      <div className='App darkGradient'>
        <Navbar devices = {config.devices} />
        <Switch>
          <Route path='/' exact component = {Dashboard} />
          <Route path='/device:id' component = {Dashboard} />
          <Route path='/settings'  component = {Settings} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

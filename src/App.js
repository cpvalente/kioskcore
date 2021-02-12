import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { config } from './config';
import Dashboard from './features/dashboard/dashboard';
import Navbar from './features/navbar/navbar';
import Settings from './features/settings/settings';

function App() {

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

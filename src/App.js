import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { config, SLEEP_TIME } from './config';
import Dashboard from './features/dashboard/dashboard';

import Navbar from './features/navbar/navbar';
import Settings from './features/settings/settings';

function App() {
  const defaultRoute = '/device/1';
  const [sleeping, setSleeping] = useState(false);

  // Sleeping state
  const handleClick = () => {
    setSleeping(false);
    setTimeout(stopQuerying, SLEEP_TIME);
  };

  function stopQuerying() {
    setSleeping(true);
  }

  useEffect(() => {
    setTimeout(stopQuerying, SLEEP_TIME);
  }, []);


  return (
    <BrowserRouter>
      <div className='App darkGradient' onClick={handleClick}>
        <Navbar devices={config.devices} />
        <Switch>
          <Route exact path='/'>
            <Redirect to={defaultRoute} />
          </Route>

          <Route path='/device/:id'>
            <Dashboard sleeping={ sleeping } />
          </Route>
          <Route path='/settings' component={Settings} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
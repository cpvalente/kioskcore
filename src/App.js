import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './features/dashboard/dashboard';

import Navbar from './features/navbar/navbar';
import Settings from './features/settings/settings';

import { fetchGeneralData } from './data/fetchAPI';
import { FETCH_INTERVAL, SLEEP_TIME } from './appSettings';
import { iterateSaveToStorage } from './data/sessionData';


// declare a timeout placeholder
let timeout;

function App() {
  const defaultRoute = '/device/1';
  const [sleeping, setSleeping] = useState(false);
  const isMountedRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // import config
  const config = window.config;

  // set sleeping flag
  const sleep = () => {
    setSleeping(true);
  };

  // Start countdown
  const stopQuerying = () => {
    if (isMountedRef) {
      // check if it is running and clear it
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(sleep, SLEEP_TIME);
    }
  };

  // Sleeping state
  const handleClick = () => {
    if (isMountedRef.current) {
      setSleeping(false);
      stopQuerying();
    }
  };

  async function getGeneralData() {
    // fetch data
    const d = await fetchGeneralData(config.devices);

    // save to local storage
    iterateSaveToStorage(d);
  }

  useEffect(() => {
    isMountedRef.current = true;

    // populate with initial data
    setLoading(true);
    getGeneralData();
    setLoading(false);

    // start sleep countdown
    stopQuerying();

    return function cleanup() {
      isMountedRef.current = false;
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (isMountedRef.current && !loading) {
      setLoading(true);
      getGeneralData();
      setLoading(false);
    }
  }, FETCH_INTERVAL);

  return (
    <BrowserRouter>
      <div
        className={sleeping ? 'App darkGradient sleeping' : 'App darkGradient'}
        onClick={handleClick}
      >
        <Navbar devices={config.devices} />
        <Switch>
          <Route exact path='/'>
            <Redirect to={defaultRoute} />
          </Route>
          <Route exact path='/device'>
            <Redirect to={defaultRoute} />
          </Route>

          <Route path='/device/:id'>
            <Dashboard sleeping={sleeping} />
          </Route>
          <Route path='/settings' component={Settings} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

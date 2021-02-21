import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { config, SLEEP_TIME } from './config';
import { checkResponse } from './data/utils';
import Dashboard from './features/dashboard/dashboard';

import Navbar from './features/navbar/navbar';
import Settings from './features/settings/settings';

import { getDummyData } from './data/dummyData';

async function fetchGeneralData() {
  let arr = [];
  await Promise.all(
    config.devices.map(d =>
      fetch(`${d.ipaddress}ajax/get/index/status`)
      .then(response => checkResponse(response))
      .then(json => {
        // inject ID
        json.id = d.id;
        // inject timestamp
        json.lastSeen = new Date();
        arr.push(json)
      })
    ))
  return(arr);
}

function App() {
  const defaultRoute = '/device/1';
  const [sleeping, setSleeping] = useState(false);
  const isMountedRef = useRef(null);
  const [genData, setGenData] = useState(getDummyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  // Sleeping state
  const handleClick = () => {
    if (isMountedRef.current) {
      setSleeping(false);
      setTimeout(stopQuerying, SLEEP_TIME);
    }
  };

  function stopQuerying() {
    if (isMountedRef.current) {
      setSleeping(true);
    }
  }

  async function getGeneralData() {
    const d = await fetchGeneralData();
    // keep getting an object here (the promise)
    setGenData(await d);
  }

  useEffect(() => {
    isMountedRef.current = true;

    // populate with initial data
    setLoading(true);
    getGeneralData();
    setLoading(false);

    // start sleep countdown
    setTimeout(stopQuerying, SLEEP_TIME);

    return function cleanup() {
      isMountedRef.current = false;
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

  }, 1500);

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
            <Dashboard sleeping={sleeping} genData={genData}/>
          </Route>
          <Route path='/settings' component={Settings} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

import './components.css';
import './heatmap.css';

import Heatmap from '../../features/dashboard/heatmap';
import { useEffect, useRef, useState } from 'react';
import { getDummyDMX } from '../../data/dummyData';
import { checkResponse } from '../../data/utils';

export default function DashboardHeatmap({ url, sleeping }) {
  const [data, setData] = useState(getDummyDMX);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [select, setSelect] = useState('DMX A');
  const isMountedRef = useRef(null);

  async function getDMXData() {
    Promise.all([
      fetch(`${url}ajax/get/monitor/channels/0`).then(checkResponse),
      fetch(`${url}ajax/get/monitor/channels/256`).then(checkResponse),
    ])

      .then((data) => {
        if (isMountedRef.current) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(function (err) {
        if (isMountedRef.current) {
          setError(true);
          console.log(err.message);
        }
        setLoading(false);
      });
  }

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

  useEffect(() => {
    isMountedRef.current = true;
    getDMXData();

    return function cleanup() {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    if (isMountedRef.current && !loading && !sleeping) {
      getDMXData();
    }
  }, 1500);

  return (
    <div className='card card-heatmap'>
      <h3 className='cardTitle'>DMX Output</h3>
      <div className='cardContent'>
        <div className='selectors'>
          <div className='selector active'>DMX A</div>
          <div className='selector'>DMX B</div>
          <div className='selector'>DMX C</div>
          <div className='selector'>DMX D</div>
        </div>
        <Heatmap
          heatmapData={[...data[0].channels.data, ...data[1].channels.data]}
        />
      </div>
    </div>
  );
}

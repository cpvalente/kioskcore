import './components.css';
import './heatmap.css';

import Heatmap from '../../features/dashboard/heatmap';
import { useEffect, useRef, useState } from 'react';
import { getDummyDMX } from '../../data/dummyData';

export default function DashboardHeatmap({ url, sleeping }) {
  const [data, setData] = useState(getDummyDMX);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMountedRef = useRef(null);

  async function getDMXData() {
    Promise.all([
      fetch(`${url}ajax/get/monitor/channels/0`).then((response) => response.json()),

      fetch(`${url}ajax/get/monitor/channels/256`).then((response) => response.json())
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
      <h3 className='cardTitle'>DMX Output A</h3>
      <Heatmap heatmapData={[...data[0].channels.data, ...data[1].channels.data]} />
    </div>
  );
}

import './components.css';
import './heatmap.css';

import Heatmap from '../../features/dashboard/heatmap';
import { useEffect, useRef, useState } from 'react';
import { getDummyDMX } from '../../data/dummyData';
import { fetchDMXData, setDMXUniverse } from '../../data/fetchAPI';
import { DMX_INTERVAL } from '../../appSettings';

export default function DashboardHeatmap({ ipaddress, type, sleeping }) {
  const [data, setData] = useState(getDummyDMX);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [select, setSelect] = useState(0);
  const isMountedRef = useRef(null);

  async function getDMXData() {
    fetchDMXData(ipaddress)
      .then((data) => {
        if (isMountedRef.current) {
          setData(data);
        }
      })
      .catch(function (err) {
        if (isMountedRef.current) {
          setError(true);
          console.log(err.message);
        }
      });
    setLoading(false);
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
  }, DMX_INTERVAL);

  const handleSelect = async (univSelect) => {
    // ask controller tochange universe
    setDMXUniverse(ipaddress, univSelect).then((response) => {
      if (response.ok) {
        // set select
        setSelect(univSelect);
      }
    });
  };

  return (
    <div className='card card-heatmap'>
      <h3 className='cardTitle'>DMX Output</h3>
      <div className='cardContent'>
        <div className='selectors'>
          <div
            className={select === 0 ? 'selector active' : 'selector'}
            onClick={() => handleSelect(0)}
          >
            DMX A
          </div>
          <div
            className={select === 1 ? 'selector active' : 'selector'}
            onClick={() => handleSelect(1)}
          >
            DMX B
          </div>
          {type === 'Quadcore' && (
            <>
              <div
                className={select === 2 ? 'selector active' : 'selector'}
                onClick={() => handleSelect(2)}
              >
                DMX C
              </div>

              <div
                className={select === 3 ? 'selector active' : 'selector'}
                onClick={() => handleSelect(3)}
              >
                DMX D
              </div>
            </>
          )}
        </div>
        <Heatmap
          heatmapData={[...data[0].channels.data, ...data[1].channels.data]}
        />
      </div>
    </div>
  );
}

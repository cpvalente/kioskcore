import { useEffect, useRef, useState } from 'react';
import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardHeatmap from '../../common/components/dashboardHeatmap';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import DashboardPlaybacks from '../../common/components/dashboardPlaybacks';
import Error from '../../common/components/error';
import { getDummyData } from '../../data/dummyData';
import { checkResponse } from '../../data/utils';

export default function QuadDashboard({ device, sleeping }) {
  const [data, setData] = useState(getDummyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMountedRef = useRef(null);


  async function getQuadcoreData() {
    const url = device.ipaddress;
    Promise.all([
      fetch(`${url}ajax/get/index/status`).then(checkResponse),
      fetch(`${url}ajax/get/playback/playback`).then(checkResponse),
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
    getQuadcoreData();

    return function cleanup() {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    if (isMountedRef.current && !loading && !sleeping) {
      getQuadcoreData();
    }
  }, 1500);

  if (loading && !error)
    return (
      <div className='loadingSkeleton quad'>
        <div className='card dashboardGeneralSkeleton' />
        <div className='card dashboardInputsSkeleton' />
        <div className='card dashboardPlaybacksSkeleton' />
        <div className='card dashboardMessagesSkeleton' />
        <div className='card dashboardHeatmapSkeleton' />
      </div>
    );

  // if (error) return <Error />;

  return (
    <div className='dashboard quad'>
      <DashboardGeneral data={data[0]} />
      <DashboardInputs data={data[0].receiving} />
      <DashboardPlaybacks data={data[1].playbacks} />
      <DashboardMessages url={device.ipaddress} type={device.type} sleeping={sleeping} />
      <DashboardHeatmap url={device.ipaddress} sleeping={sleeping} />
    </div>
  );
}

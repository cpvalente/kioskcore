import { useEffect, useRef, useState } from 'react';
import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardGPI from '../../common/components/dashboardGPI';
import DashboardGPO from '../../common/components/dashboardGPO';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import Error from '../../common/components/error';
import { getDummyData } from '../../data/dummyData';

export default function IODashboard({ device }) {
  const [data, setData] = useState(getDummyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMountedRef = useRef(null);

  async function getIOCoreData() {
    const url = device.ipaddress;
    Promise.all([
      fetch(`${url}ajax/get/index/status`).then((response) => response.json()),
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
    getIOCoreData();

    return function cleanup() {
      isMountedRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    if (isMountedRef.current && !loading) getIOCoreData();
  }, 1500);

  if (loading && !error)
    return (
      <div className='loadingSkeleton io'>
        <div className='card dashboardGeneralSkeleton' />
        <div className='card dashboardInputsSkeleton' />
        <div className='card dashboardMessagesSkeleton' />
        <div className='card dashboardGPISkeleton' />
        <div className='card dashboardGPOSkeleton' />
      </div>
    );

  // if (error) return <Error />;

  return (
    <div className='dashboard io'>
      <DashboardGeneral  data = {data[0]} />
      <DashboardInputs   data = {data[0].receiving} />
      <DashboardGPI      data = {data[0].gpi} />
      <DashboardGPO      data = {data[0].gpo} />
      <DashboardMessages url  = {device.ipaddress} type = {device.type} />
    </div>
  );
}

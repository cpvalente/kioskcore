import { useEffect, useRef, useState } from 'react';
import { FETCH_INTERVAL } from '../../appSettings';
import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardHeatmap from '../../common/components/dashboardHeatmap';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import DashboardPlaybacks from '../../common/components/dashboardPlaybacks';
import Error from '../../common/components/error';
import { getDummyData } from '../../data/dummyData';
import { fetchPlaybackData } from '../../data/fetchAPI';

export default function QuadDashboard(props) {
  const [data, setData] = useState(getDummyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMountedRef = useRef(null);

  async function getQuadcoreData() {
    fetchPlaybackData(props.deviceConfig.ipaddress)
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
    setLoading(false);

    return function cleanup() {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    if (isMountedRef.current && !loading && !props.sleeping) {
      getQuadcoreData();
    }
  }, FETCH_INTERVAL);

  if (loading || props.deviceGenData == null)
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
      <DashboardGeneral deviceGenData={props.deviceGenData} />
      <DashboardInputs data={props.deviceGenData.receiving} />
      <DashboardPlaybacks data={data[0].playbacks} />
      <DashboardMessages
        ipaddress={props.deviceConfig.ipaddress}
        type={props.deviceConfig.type}
        sleeping={props.sleeping}
      />
      <DashboardHeatmap
        ipaddress={props.deviceConfig.ipaddress}
        type={props.deviceConfig.type}
        sleeping={props.sleeping}
      />
    </div>
  );
}

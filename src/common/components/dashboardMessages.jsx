import { useEffect, useRef, useState } from 'react';
import { fetchNetworkData } from '../../data/fetchAPI';
import './components.css';
import './messages.css';

export default function DashboardMessages({ ipaddress, type, sleeping }) {

  const [dataIn, setDataIn] = useState([]);
  const [dataOut, setDataOut] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [select, setSelect] = useState('TCP');
  const isMountedRef = useRef(null);

  async function getNetworkData() {

    if (select === 'TCP') {
      fetchNetworkData(ipaddress, 'tcp')
      .then((data) => {
        if (isMountedRef.current) {
          setDataIn(data[0].tcpIn);
          setDataOut(data[1].tcpOut);
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

    else if (select === 'UDP') {
      fetchNetworkData(ipaddress, 'udp')
      .then((data) => {
        if (isMountedRef.current) {
          setDataIn(data[0].udpIn);
          setDataOut(data[1].udpOut);
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

    else if (select === 'OSC') {
      fetchNetworkData(ipaddress, 'osc')
      .then((data) => {
        if (isMountedRef.current) {
          setDataIn(data[0].oscIn);
          setDataOut(data[1].oscOut);
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

    else if (type === 'IOCore' && select === 'RS232') {
      fetchNetworkData(ipaddress, 'rs232')
      .then((data) => {
        if (isMountedRef.current) {
          setDataIn(data[0].rs232In);
          setDataOut(data[1].rs232Out);
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
    getNetworkData();

    return function cleanup() {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  useInterval(() => {
    if (isMountedRef.current && !loading && !sleeping) {
      getNetworkData();
    }
  }, 3000);

  if (loading && !error) return <div className='card card-messages'></div>;

  return (
    <div className='card card-messages'>
      <h3 className='cardTitle'>Messages</h3>
      <div className='cardContent'>
        <div className='selectors'>
          <div
            className={select === 'TCP' ? 'selector active' : 'selector'}
            onClick={() => setSelect('TCP')}
          >
            TCP
          </div>
          <div
            className={select === 'UDP' ? 'selector active' : 'selector'}
            onClick={() => setSelect('UDP')}
          >
            UDP
          </div>
          <div
            className={select === 'OSC' ? 'selector active' : 'selector'}
            onClick={() => setSelect('OSC')}
          >
            OSC
          </div>
          {type === 'IOCore' && (
            <div
              className={select === 'RS232' ? 'selector active' : 'selector'}
              onClick={() => setSelect('RS232')}
            >
              RS232
            </div>
          )}
        </div>

        {/* TCP TABLE */}
        {(select === 'TCP' || select === 'UDP') && (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Address</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {dataIn.map((d, index) => (
                <tr key={index}>
                  <td className='field'>RX</td>
                  <td>{d.ip}</td>
                  <td>{d.arg}</td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {dataOut.map((d, index) => (
                <tr key={index}>
                  <td className='field'>TX</td>
                  <td>{d.ip}</td>
                  <td>{d.arg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* OSC TABLE */}
        {select === 'OSC' && (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Address</th>
                <th>URL</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {dataIn.map((d, index) => (
                <tr key={index}>
                  <td className='field'>RX</td>
                  <td>{d.ip}</td>
                  <td>{d.uri}</td>
                  <td>{d.arg}</td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {dataOut.map((d, index) => (
                <tr key={index}>
                  <td className='field'>TX</td>
                  <td>{d.ip}</td>
                  <td>{d.uri}</td>
                  <td>{d.arg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* RS232 TABLE */}
        {select === 'RS232' && (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {dataIn.map((d, index) => (
                <tr key={index}>
                  <td className='field'>RX</td>
                  <td>{d.v}</td>
                </tr>
              ))}
            </tbody>

            <tbody>
              {dataOut.map((d, index) => (
                <tr key={index}>
                  <td className='field'>TX</td>
                  <td>{d.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

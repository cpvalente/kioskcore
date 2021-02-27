import { useEffect, useRef, useState } from 'react';
import { MESSAGES_INTERVAL } from '../../appSettings';
import { fetchNetworkData } from '../../data/fetchAPI';
import './components.css';
import './messages.css';

function TcpHeader() {
  return (
    <thead>
      <tr>
        <th></th>
        <th>Address</th>
        <th>Message</th>
      </tr>
    </thead>
  );
}

function OscHeader() {
  return (
    <thead>
      <tr>
        <th></th>
        <th>Address</th>
        <th>URL</th>
        <th>Message</th>
      </tr>
    </thead>
  );
}

function RS232Header() {
  return (
    <thead>
      <tr>
        <th></th>
        <th>Message</th>
      </tr>
    </thead>
  );
}

export default function DashboardMessages({ ipaddress, type, sleeping }) {
  const [dataIn, setDataIn] = useState([]);
  const [dataOut, setDataOut] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [select, setSelect] = useState('tcp');
  const isMountedRef = useRef(null);

  async function getNetworkData() {
    switch (select) {
      case 'tcp':
        fetchNetworkData(ipaddress, select)
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
        break;

      case 'udp':
        fetchNetworkData(ipaddress, select)
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
        break;

      case 'osc':
        fetchNetworkData(ipaddress, select)
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
        break;

      case 'rs232':
        if (type === 'IOCore') {
          fetchNetworkData(ipaddress, select)
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
        break;

      default:
        break;
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
  }, MESSAGES_INTERVAL);

  if (loading && !error) return <div className='card card-messages'></div>;

  return (
    <div className='card card-messages'>
      <h3 className='cardTitle'>Messages</h3>
      <div className='cardContent'>
        <div className='selectors'>
          <div
            className={select === 'tcp' ? 'selector active' : 'selector'}
            onClick={() => setSelect('tcp')}
          >
            TCP
          </div>
          <div
            className={select === 'udp' ? 'selector active' : 'selector'}
            onClick={() => setSelect('udp')}
          >
            UDP
          </div>
          <div
            className={select === 'osc' ? 'selector active' : 'selector'}
            onClick={() => setSelect('osc')}
          >
            OSC
          </div>
          {type === 'IOCore' && (
            <div
              className={select === 'rs232' ? 'selector active' : 'selector'}
              onClick={() => setSelect('rs232')}
            >
              RS232
            </div>
          )}
        </div>

        {/* TCP TABLE */}
        {(select === 'tcp' || select === 'udp') && (
          <table>
            <TcpHeader />
            <tbody>
              {dataIn.map((d, index) => (
                <tr key={index}>
                  <td className='field rx'>🡾</td>
                  <td>{d.ip}</td>
                  <td>{d.arg}</td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {dataOut.map((d, index) => (
                <tr key={index}>
                  <td className='field tx'>🡼</td>
                  <td>{d.ip}</td>
                  <td>{d.arg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* OSC TABLE */}
        {select === 'osc' && (
          <table>
            <OscHeader />
            <tbody>
              {dataIn.map((d, index) => (
                <tr key={index}>
                  <td className='field rx'>🡾</td>
                  <td>{d.ip}</td>
                  <td>{d.uri}</td>
                  <td>{d.arg}</td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {dataOut.map((d, index) => (
                <tr key={index}>
                  <td className='field tx'>🡼</td>
                  <td>{d.ip}</td>
                  <td>{d.uri}</td>
                  <td>{d.arg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* RS232 TABLE */}
        {select === 'rs232' && (
          <table>
            <RS232Header />
            <tbody>
              {dataIn.map((d, index) => (
                <tr key={index}>
                  <td className='field rx'>🡾</td>
                  <td>{d.v}</td>
                </tr>
              ))}
            </tbody>

            <tbody>
              {dataOut.map((d, index) => (
                <tr key={index}>
                  <td className='field tx'>🡼</td>
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

import { LAST_SEEN_BAD } from '../../appSettings';
import './components.css';

export default function DashboardGeneral( props ) {

  // get data from session
  // const data = JSON.parse(sessionStorage.getItem(`deviceID-${props.deviceId}`));
  const lastSeen = new Date (props.deviceGenData?.lastSeen);

  // get time elapsed since last seen
  const timeElapsed = ( new Date().getTime() ) - ( (lastSeen.getTime()) );

  // style accordingly
  let style = {};
  if (timeElapsed > LAST_SEEN_BAD) {
    style = {
      color:'#ff9191'
    }
  }

  return (
    <div className='card card-general'>
      <h3 className='cardTitle'>{props.deviceGenData?.gen.lbl}</h3>
      <table className='cardContent' style={style}>
        <tbody>
          <tr>
            <td className='field'>Last seen</td>
            <td>{lastSeen.toLocaleString('en-GB')}</td>
          </tr>
          <tr>
            <td className='field'>Uptime</td>
            <td>{props.deviceGenData?.gen.upt}</td>
          </tr>
          {props.deviceGenData.time.d && (
            <tr>
              <td className='field'>Date</td>
              <td>{props.deviceGenData?.time.d}</td>
            </tr>
          )}
          {props.deviceGenData.time.t && (
            <tr>
              <td className='field'>Time</td>
              <td>{props.deviceGenData?.time.t}</td>
            </tr>
          )}
          <tr>
            <td className='field'>IP Address</td>
            <td>{props.deviceGenData?.ip.ip}</td>
          </tr>
          <tr>
            <td className='field'>Subnet</td>
            <td>{props.deviceGenData?.ip.sn}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

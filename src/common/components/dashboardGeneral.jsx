import './components.css';

export default function DashboardGeneral( props ) {

  let ls = props?.lastSeen.toLocaleString();

  return (
    <div className='card card-general'>
      <h3 className='cardTitle'>{props?.label}</h3>
      <table className='cardContent'>
        <tbody>
          <tr>
            <td className='field'>Last seen</td>
            <td>{ls}</td>
          </tr>
          <tr>
            <td className='field'>Uptime</td>
            <td>{props?.upt}</td>
          </tr>
          {props.date && (
            <tr>
              <td className='field'>Date</td>
              <td>{props?.date}</td>
            </tr>
          )}
          {props.time && (
            <tr>
              <td className='field'>Time</td>
              <td>{props?.time}</td>
            </tr>
          )}
          <tr>
            <td className='field'>IP Address</td>
            <td>{props?.ip}</td>
          </tr>
          <tr>
            <td className='field'>Subnet</td>
            <td>{props?.sn}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

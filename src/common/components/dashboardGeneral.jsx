import './components.css';

export default function DashboardGeneral({ data }) {
  const lastSeen = '11.02.2021 19:59:23';

  return (
    <div className='card card-general'>
      <h3 className='cardTitle'>{data.gen.lbl}</h3>
      <table className='cardContent'>
        <tbody>
          <tr>
            <td className='field'>Last seen</td>
            <td>{lastSeen}</td>
          </tr>
          <tr>
            <td className='field'>Uptime</td>
            <td>{data.gen.upt}</td>
          </tr>
          {data.time.d && (
            <tr>
              <td className='field'>Date</td>
              <td>{data.time.d}</td>
            </tr>
          )}
          {data.time.t && (
            <tr>
              <td className='field'>Time</td>
              <td>{data.time.t}</td>
            </tr>
          )}
          <tr>
            <td className='field'>IP Address</td>
            <td>{data.ip.ip}</td>
          </tr>
          <tr>
            <td className='field'>Subnet</td>
            <td>{data.ip.sn}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

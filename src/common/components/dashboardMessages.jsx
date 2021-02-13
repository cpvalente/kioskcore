import './components.css';
import './indicator.css';


export default function DashboardMessages({ data }) {
  // TODO: Find a better solution for generating ids

  return (
    <div className='card card-messages'>
      <h3 className='cardTitle'>Messages</h3>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>Prot.</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {data.tcpIn.map((tcp, index) => (
            <tr key={index}>
              <td>{tcp.ip}</td>
              <td>TCP</td>
              <td>{tcp.arg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

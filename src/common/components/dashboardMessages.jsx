export default function DashboardMessages({ data }) {
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
          {data.tcpIn.map((tcp) => (
            <tr>
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

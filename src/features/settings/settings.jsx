import { config } from '../../config';
import './settings.css';

export default function Settings() {
  return (
    <div className='settings'>
      <div className='card card-settings-title'>
        <h3 className='cardTitle'>{config.projectTitle}</h3>
        <h4 className='cardSub'>{`Revised on ${config.revisionDate}`}</h4>
      </div>

      <div className='card-settings-devices'>
        {config.devices.map((dev) => (
          <div className='card card-settings-device' key={dev.id}>
            <h3 className='cardTitle'>{dev.name}</h3>
            <table>
              <tbody>
                <tr>
                  <td className='field'>Device</td>
                  <td>{dev.type}</td>
                </tr>
                <tr>
                  <td className='field'>IP Address</td>
                  <td>{dev.ipaddress}</td>
                </tr>

                <tr>
                  <td className='field'>Notes</td>
                  <td>{dev.notes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className='card card-settings-notes'>
        <h3 className='cardTitle'>Notes</h3>
        <p>{config.notes}</p>
      </div>

      <div className='card card-settings-contacts'>
        <h3 className='cardTitle'>
          {`Programmed by Carlos Valente for LJOS Studio
        In case of issues please contact ${config.contact} `}
        </h3>
        <p></p>
      </div>
    </div>
  );
}

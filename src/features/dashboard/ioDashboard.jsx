import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardGPI from '../../common/components/dashboardGPI';
import DashboardGPO from '../../common/components/dashboardGPO';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import Error from '../../common/components/error';

export default function IODashboard( props ) {

  let deviceData = {
    lastSeen : 'Retrieving data....',
    gen: {
      serial: 'Retrieving data....',
      upt: 'Retrieving data....',
      lbl: 'Retrieving data....',
    },
    ip: {
      ip: 'Retrieving data....',
      sn: 'Retrieving data....',
    },
    time: {
      d: 'Retrieving data....',
      t: 'Retrieving data....',
    },
    receiving: {},
    gpi: {},
    gpo: {}
  };

  if (props.genData) {
    let dd = props.genData.find((d) => d.id == props.deviceConfig.id);
    if (dd) {
      deviceData = dd;
    }
  }

  if (deviceData === undefined)
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
      <DashboardGeneral
        label = {deviceData.gen.lbl}
        lastSeen = {deviceData.lastSeen}
        upt = {deviceData.gen.upt}
        date = {deviceData.gen.d}
        time = {deviceData.gen.t}
        ip = {deviceData.ip.ip}
        sn = {deviceData.ip.sn}
      />
      <DashboardInputs data={deviceData.receiving} />
      <DashboardGPI data={deviceData.gpi} />
      <DashboardGPO data={deviceData.gpo} />
      <DashboardMessages
        ipaddress={props.deviceConfig.ipaddress}
        type={props.deviceConfig.type}
        sleeping={props.sleeping}
      />
    </div>
  );
}

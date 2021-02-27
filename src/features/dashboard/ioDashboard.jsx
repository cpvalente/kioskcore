import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardGPI from '../../common/components/dashboardGPI';
import DashboardGPO from '../../common/components/dashboardGPO';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import Error from '../../common/components/error';

export default function IODashboard( props ) {

  if (props.deviceGenData == null)
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
      <DashboardGeneral deviceGenData={props.deviceGenData} />
      <DashboardInputs data={props.deviceGenData.receiving} />
      <DashboardGPI data={props.deviceGenData.gpi} />
      <DashboardGPO data={props.deviceGenData.gpo} />
      <DashboardMessages
        ipaddress={props.deviceConfig.ipaddress}
        type={props.deviceConfig.type}
        sleeping={props.sleeping}
      />
    </div>
  );
}

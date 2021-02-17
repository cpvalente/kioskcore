import './components.css';
import './indicator.css';

export default function Indicator({ active, main, secondary }) {
  return (
    <div className={active ? 'indicator active' : 'indicator'}>
      <span className='indicator-secondary'>{secondary}</span>
      <span className='indicator-main'>{main}</span>
    </div>
  );
}

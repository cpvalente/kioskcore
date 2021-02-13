export default function DashboardInputs({ data }) {
  return (
    <div className='card card-inputs indicatorlist'>
      <h3 className='cardTitle'>Inputs</h3>
      <div
        className={
          data.receiving.d1 === 'yes' ? 'indicator active' : 'indicator'
        }
      >
        DMX A
      </div>
      <div
        className={
          data.receiving.d2 === 'yes' ? 'indicator active' : 'indicator'
        }
      >
        DMX B
      </div>
      <div
        className={
          data.receiving.midi === 'yes' ? 'indicator active' : 'indicator'
        }
      >
        MIDI
      </div>
      <div
        className={
          data.receiving.a === 'yes' ? 'indicator active' : 'indicator'
        }
      >
        Art-Net
      </div>
      <div
        className={
          data.receiving.s === 'yes' ? 'indicator active' : 'indicator'
        }
      >
        sACN
      </div>
      <div
        className={
          data.receiving.t === 'yes' ? 'indicator active' : 'indicator'
        }
      >
        TCP
      </div>
      <div
        className={
          data.receiving.u === 'yes' ? 'indicator active' : 'indicator'
        }
      >
        UDP
      </div>
      <div
        className={
          data.receiving.o === 'yes' ? 'indicator active' : 'indicator'
        }
      >
        OSC
      </div>
    </div>
  );
}

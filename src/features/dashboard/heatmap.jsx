import { memo } from 'react';

const Heatmap = memo(({ heatmapData }) => {
  return (
    <div className='heatmapgrid cardContent'>
      {heatmapData.map((d, index) => {
        const val = (d + 5) / 255.0;
        return (
          <div
            className='node'
            key={index}
            style={{ backgroundColor: `rgba(38, 218, 173, ${val})` }}
          />
        );
      })}
    </div>
  );
});

export default Heatmap;

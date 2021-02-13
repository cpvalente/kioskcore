export const config = {
  projectTitle: 'Kringjså Skole',
  revisionDate: '12.02.2021',
  devices: [
    {
      id: 1,
      name: 'DMX Output',
      type: 'Quadcore',
      ipaddress: 'http://haarlem.visualproductions.nl:10015/',
      notes: 'Receives UDP from IOCore, runs lighting scenes',
      short: 'Q'
    },
    {
      id: 2,
      name: 'Sensor Input',
      type: 'IOCore',
      ipaddress: 'http://haarlem.visualproductions.nl:89/',
      notes: 'Receives data from 5 sensors and sends to Quadcore as UDP',
      short: 'I'
    },
    {
      id: 3,
      name: 'Dummy',
      type: 'Cuecore',
      ipaddress: 'http://haarlem.visualproductions.nl:84/',
      notes: 'Just so I can get the data right',
      short: 'C'
    },
  ],
    notes: '',
    contact: 'Pekka Stoke at mail@ljos.no',
  }

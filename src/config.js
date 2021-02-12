export const config = {
  projectTitle: 'Kringjså Skole',
  revisionDate: '12.02.2021',
  devices: [
    {
      name: 'DMX Output',
      type: 'Quadcore',
      ipaddress: '192.168.1.10',
      notes: 'Receives UDP from IOCore, runs lighting scenes',
      short: 'Q'
    },
    {
      name: 'Sensor Input',
      type: 'IOCore',
      ipaddress: '192.168.1.11',
      notes: 'Receives data from 5 sensors and sends to Quadcore as UDP',
      short: 'I'
    },
  ],
    notes: '',
    contact: 'Pekka Stoke at mail@ljos.no',
  }

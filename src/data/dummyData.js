export function getDummyData() {
  return [
    {
      gen: {
        serial: 'MyCueCore',
        upt: '7d 4h 26m',
        fw: '1.38',
      },
      ip: {
        ip: '192.168.1.14',
        sn: '255.255.255.0',
      },
      time: {
        d: '2020-01-13',
        t: '23:51:29',
      },
      receiving: {
        d1: '-',
        d2: '-',
        midi: 'no',
        ArtNet: 'no',
        sACN: 'no',
        TCP: 'no',
        UDP: 'no',
        OSC: 'no',
      },
    },

    {
      playbacks: [
        {
          label: 'Playback 1',
          state: 0,
          cue: '-',
          list: '-',
        },
        {
          label: 'Playback 2',
          state: 0,
          cue: '-',
          list: '-',
        },
        {
          label: 'Playback 3',
          state: 0,
          cue: '-',
          list: '-',
        },
        {
          label: 'Playback 4',
          state: 0,
          cue: '-',
          list: '-',
        },
        {
          label: 'Playback 5',
          state: 0,
          cue: '-',
          list: '-',
        },
        {
          label: 'Playback 6',
          state: 0,
          cue: '-',
          list: '-',
        },
      ],
    },

    {
      inCount: 162,
      tcpIn: [],
    },

    {
      channels: {
        data: [0]
      }
    },

    {
      channels: {
        data: [0]
      }
    },

  ];
}
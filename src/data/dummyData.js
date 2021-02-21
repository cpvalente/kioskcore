export function getDummyGeneralData() {
  return [
    {
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
  ]
}

export function getDummyData() {
  return [
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
      channels: {
        data: [0],
      },
    },

    {
      channels: {
        data: [0],
      },
    },
  ];
}


export function getDummyDMX() {
  return [
    {
      channels: {
        data: [0],
      },
    },

    {
      channels: {
        data: [0],
      },
    },
  ];
}
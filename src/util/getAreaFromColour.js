const colourMap = {
  0: {
    0: {
      136: 'lon-lon',
      255: 'lost-woods',
    },
    136: {
      0: 'colossus',
      136: 'market',
      255: 'jabu',
    },
    255: {
      0: 'zora-area',
      136: 'fire-temple',
      255: 'kokiri',
    }
  },
  136: {
    0: {
      0: 'gerudo-valley',
      136: 'hyrule-field',
      255: 'ice-cavern',
    },
    136: {
      0: 'gerudo-fortress',
      255: 'water-temple',
    },
    255: {
      0: 'dc',
      136: 'deku',
      255: 'spirit-temple',
    }
  },
  255: {
    0: {
      0: 'kakariko',
      136: 'shadow-temple',
      255: 'lake-hylia',
    },
    136: {
      0: 'botw',
      136: 'forest-temple',
    },
    255: {
      0: 'death-mountain',
    },
  },
};

export default function (r: number, g: number, b: number): ?string {
  let ret = colourMap[r];
  if (!ret) return null;
  ret = ret[g];
  if (!ret) return null;
  ret = ret[b];
  if (!ret) return null;
  return ret;
}

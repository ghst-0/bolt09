const {floor} = Math;
const {max} = Math;

/** Encode feature bits into a buffer

  {
    bits: <Bit Length>
    features: [<Feature Bit Number>]
  }

  @returns
  {
    data: <Feature Bits Written Into Buffer>
  }
*/
export default ({bits, features}) => {
  const data = Buffer.alloc(floor(max(...features) / bits) + 1);

  const endIndex = data.length - 1;

  for (const n of features) {
    data[endIndex - floor(n / bits)] |= 1 << n % bits
  }

  return {data};
};

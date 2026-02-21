import encodeFeatures from './encode_features.js';

const bits = 5;
const {isArray} = Array;

/** Encode feature flags into a serialized data buffer

  {
    features: [<Feature Bit Number>]
  }

  @throws
  <Error>

  @returns
  {
    words: [<Bech32 Word Number>]
  }
*/
export default ({features}) => {
  if (!isArray(features)) {
    throw new Error('ExpectedArrayOfFeatureBitsToEncodeAsWords');
  }

  const words = [];

  // Exit early with no words when there are no features
  if (features.length === 0) {
    return {words};
  }

  for (const [_, byte] of encodeFeatures({bits, features}).data.entries()) {
    words.push(byte);
  }

  return {words};
};

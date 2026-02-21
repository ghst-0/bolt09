import test from 'node:test';
import { deepStrictEqual, throws,  } from 'node:assert/strict';
import { featureFlagsFromWords } from './../index.js';

const tests = [
  {
    args: {},
    description: 'An array of word numbers is required',
    error: 'ExpectedArrayOfWordNumbersToDeriveFeatureFlags',
  },
  {
    args: {words: [16, 0]},
    description: 'Feature flags are returned',
    expected: {features: [{bit: 9, is_required: false, type: 'tlv_onion'}]},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => featureFlagsFromWords(args), new Error(error), 'Got error');
    } else {
      const res = featureFlagsFromWords(args);

      deepStrictEqual(res.features, expected.features, 'Got feature bits');
    }

    return end();
  })
}

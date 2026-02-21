import test from 'node:test';
import { deepStrictEqual, throws,  } from 'node:assert/strict';
import { featureFlagsAsHex } from './../index.js';

const tests = [
  {
    args: {},
    description: 'An array of features is required',
    error: 'ExpectedArrayOfFeaturesToEncodeAsHex',
  },
  {
    args: {features: []},
    description: 'Nil features is serialized',
    expected: {encoded: '0000'},
  },
  {
    args: {features: [0]},
    description: 'A feature flag is serialized',
    expected: {encoded: '000101'},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => featureFlagsAsHex(args), new Error(error), 'Got error');
    } else {
      const res = featureFlagsAsHex(args);

      deepStrictEqual(res.encoded, expected.encoded, 'Got serialization');
    }

    return end();
  });
}

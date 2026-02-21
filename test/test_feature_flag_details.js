import test from 'node:test';
import { deepStrictEqual, throws,  } from 'node:assert/strict';
import { featureFlagDetails } from './../index.js';

const tests = [
  {
    args: {},
    description: 'A bit is required',
    error: 'ExpectedBitNumberToGetFeatureFlagDetails',
  },
  {
    args: {bit: 0},
    description: 'A feature flag is returned',
    expected: {type: 'data_loss_protection'},
  },
  {
    args: {bit: Number.MAX_SAFE_INTEGER},
    description: 'No feature flag is known',
    expected: {},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => featureFlagDetails(args), new Error(error), 'Got error');
    } else {
      const res = featureFlagDetails(args);

      deepStrictEqual(res.type, expected.type, 'Got expected type');
    }

    return end();
  });
}

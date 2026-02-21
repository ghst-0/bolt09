import test from 'node:test';
import { deepStrictEqual, throws,  } from 'node:assert/strict';
import { featureFlagsFromHex } from './../index.js';

const tests = [
  {
    args: {},
    description: 'Serialized feature flags are required',
    error: 'ExpectedHexSerializedFeatureFlagsToDecode',
  },
  {
    args: {hex: '00018C'},
    description: 'Feature flags are returned',
    expected: {
      features: [
        {bit: 2, is_required: true, type: undefined},
        {bit: 3, is_required: false, type: 'requires_initial_graph'},
        {bit: 7, is_required: false, type: 'gossip_queries_v1'},
      ],
    },
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => featureFlagsFromHex(args), new Error(error), 'Got error');
    } else {
      const res = featureFlagsFromHex(args);

      deepStrictEqual(res.features, expected.features, 'Got feature flags');
    }

    return end();
  });
}

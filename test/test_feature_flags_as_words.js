import test from 'node:test';
import { deepStrictEqual, throws,  } from 'node:assert/strict';
import { featureFlagsAsWords } from './../index.js';

const tests = [
  {
    args: {},
    description: 'An array of features is required',
    error: 'ExpectedArrayOfFeatureBitsToEncodeAsWords',
  },
  {
    args: {features: []},
    description: 'Nil features is serialized',
    expected: {words: []},
  },
  {
    args: {features: [0]},
    description: 'A feature flag is encoded',
    expected: {words: [1]},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => featureFlagsAsWords(args), new Error(error), 'Got error');
    } else {
      const res = featureFlagsAsWords(args);

      deepStrictEqual(res.words, expected.words, 'Got words encoding');
    }

    return end();
  });
}

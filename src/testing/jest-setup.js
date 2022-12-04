import {expect} from '@jest/globals';
import {
  toHaveShadowPart,
  toHaveShadowPartsCount,
} from './matchers';
import '@testing-library/jest-dom';

expect.extend({
  toHaveShadowPart,
  toHaveShadowPartsCount,
});

const { describe, it } = global;
import t from 'tcomb';

describe('sanity', () => {
  it('should allow static class members', () => {
    class C {
      static m = 'm';
    }
    t.assert(C.m === 'm');
  });
});

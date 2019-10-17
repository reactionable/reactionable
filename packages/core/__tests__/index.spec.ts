import { add, greet } from '../src';

describe('core module', () => {
  it('should add', () => {
    expect(add(2, 3)).toEqual(5);
  });
  it('should greet', () => {
    expect(greet('world')).toEqual('core says: hello to world');
  });
});

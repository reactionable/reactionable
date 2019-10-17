import { add, greet } from '../src';

describe('ui-bootstrap module', () => {
  it('should add', () => {
    expect(add(2, 3)).toEqual(5);
  });
  it('should greet', () => {
    expect(greet('world')).toEqual('ui-bootstrap says: hello to world');
  });
});

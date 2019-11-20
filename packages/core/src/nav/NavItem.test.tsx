import React from 'react';
import { shallow } from 'enzyme';
import { useGeneratedPath } from './NavItem';

export default function testHook(runHook) {
  function HookWrapper() {
    const output = runHook();

    return (
      <span data-output={output} />
    );
  }
  const wrapper = shallow(<HookWrapper />);

  return wrapper.find('span').props()['data-output'];
}

it('generatePath with parent directory pattern', () => {
  const value = testHook(() => useGeneratedPath('/test/:id/child/..', { id: '1' }));
  expect(value).toBe('/test/1');
});

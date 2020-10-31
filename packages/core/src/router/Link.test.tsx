import { generatePath } from './Link';

describe('Link', () => {
  describe('generatePath', () => {
    it('generate absolute path with duplicated separators', () => {
      for (const path of ['/', '/', '/test/..', '/test/../', '//test//..//']) {
        const value = generatePath(path);
        expect(value).toBe('/');
      }
    });

    it('generate absolute path with parent directory pattern', () => {
      for (const path of [
        '/test/:id/child/:childId/sub-child/..',
        '/test//:id/child//:childId/sub-child/..',
      ]) {
        const value = generatePath(path, { id: '1' }, { childId: 2 });
        expect(value).toBe('/test/1/child/2');
      }
    });

    it('generate relative path with parent directory pattern', () => {
      for (const path of [
        'test/:id/child/:childId/sub-child/..',
        'test//:id/child//:childId/sub-child/..',
      ]) {
        const value = generatePath(path, { id: '1' }, { childId: 2 });
        expect(value).toBe('test/1/child/2');
      }
    });
  });
});

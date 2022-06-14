import { isQueryable, isUpdatable } from '@orbit/data';
import { RecordSource } from '@orbit/records';
import { AxiosInstance } from 'axios';
import { JSONAPISource } from '../src';
describe('jsonapi-source', () => {

  let source: ReturnType<typeof JSONAPISource.create>;
  beforeAll(() => {
    source = JSONAPISource.create({
      getAxiosInstance: (i) => i,
    });
  });

  it('exists', () => {
    expect(source).toBeTruthy();
  });

  it('is having correct prototype chain', () => {
    expect(source instanceof RecordSource).toBeTruthy();
  });

  it('is having default axios settings', () => {
    const axiosInstance = source.axiosInstance as AxiosInstance;
    expect(axiosInstance.defaults.headers.common).toMatchObject({
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    });

    expect(axiosInstance.defaults.timeout).toBe(5000);
  });

  it('is updatable', () => {
    expect(isUpdatable(source)).toBeTruthy();
  });

  it('is queryable', () => {
    expect(isQueryable(source)).toBeTruthy();
  });

  describe('getAxiosInstance', () => {
    it('allows changing axios settings', () => {
      source = JSONAPISource.create({
        getAxiosInstance(axiosInstance) {
          axiosInstance.defaults.headers.common.Accept = 'application/json';
          axiosInstance.defaults.timeout = 0;
          return axiosInstance;
        },
      });

      const axiosInstance = source.axiosInstance as AxiosInstance;
      expect(axiosInstance.defaults.headers.common).toMatchObject({
        Accept: 'application/json',
      });

      expect(axiosInstance.defaults.timeout).toBe(0);
    });
  });
});


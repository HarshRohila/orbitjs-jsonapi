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
});
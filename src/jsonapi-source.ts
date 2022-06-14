/* eslint-disable @typescript-eslint/no-shadow */
import { queryable, updatable } from '@orbit/data';
import { RecordSource } from '@orbit/records';
import axios, { AxiosInstance } from 'axios';

export { JSONAPISource };

interface JSONAPISourceSettings {
  getAxiosInstance: (axiosInstance: AxiosInstance) => AxiosInstance;
}

const JSONAPISource = {
  create(settings: JSONAPISourceSettings) {

    const { getAxiosInstance } = settings;


    const axiosInstance = createAxiosInstance();

    const jsonapiSource = Object.create(RecordSource.prototype);

    Object.defineProperty(jsonapiSource, 'axiosInstance', {
      get() {
        return axiosInstance;
      },
    });

    updatable(jsonapiSource.constructor);
    queryable(jsonapiSource.constructor);

    return jsonapiSource as any;


    function createAxiosInstance() {
      const axiosInstance = axios.create();

      axiosInstance.defaults.headers.common.Accept = 'application/vnd.api+json';
      axiosInstance.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
      axiosInstance.defaults.timeout = 5000;

      return getAxiosInstance(axiosInstance);
    }
  },


};
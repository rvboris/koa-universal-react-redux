import request from 'axios';
import { createAction } from 'redux-actions';
import { config } from '../env';

const TIME_API = `${config.apiUrl}/time`;

export default createAction('GET_TIME',
  null,
  () => ({
    optimist: true,
    promise: request.get(TIME_API),
  })
);

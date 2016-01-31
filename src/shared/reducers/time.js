import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

const initialState = Immutable.Map({ time: 'Default' });

export default handleActions({
  GET_TIME: () => Immutable.Map({ time: 'Loading' }),
  GET_TIME_RESOLVED: (state, action) => Immutable.fromJS(action.payload.data),
  GET_TIME_REJECTED: (state) => state,
}, initialState);

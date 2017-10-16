import _ from 'lodash';
import { createDuck } from 'redux-duck';
import { REHYDRATE } from 'redux-persist/constants';

const duck = createDuck('likedJobs', 'jobs-app');

// types
const LIKE_JOB = duck.defineType('LIKE_JOB');

// actions
export const likeJob = duck.createAction(LIKE_JOB);

// reducer
const initialState = {
  likedJobs: [],
};

export default duck.createReducer(
  {
    [LIKE_JOB]: (state, { payload }) => _.uniqBy([payload, ...state], 'id'),
    [REHYDRATE]: (state, { payload }) => payload.likedJobs || [],
  },
  initialState,
);

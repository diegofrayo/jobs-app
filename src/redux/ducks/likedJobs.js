import _ from 'lodash';
import { createDuck } from 'redux-duck';
import { REHYDRATE } from 'redux-persist/constants';

const duck = createDuck('likedJobs', 'jobs-app');

// types
const CLEAR_LIKED_JOBS = duck.defineType('CLEAR_LIKED_JOBS');
const LIKE_JOB = duck.defineType('LIKE_JOB');

// actions
export const clearLikedJobs = duck.createAction(CLEAR_LIKED_JOBS);
export const likeJob = duck.createAction(LIKE_JOB);

// reducer
const initialState = {
  likedJobs: [],
};

export default duck.createReducer(
  {
    [CLEAR_LIKED_JOBS]: () => [],
    [LIKE_JOB]: (state, { payload }) => _.uniqBy([payload, ...state], 'id'),
    [REHYDRATE]: (state, { payload }) => payload.likedJobs || [],
  },
  initialState,
);

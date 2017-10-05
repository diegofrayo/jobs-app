import { combineReducers } from 'redux';

import jobs from './jobs';
import likedJobs from './likedJobs';

export default combineReducers({
  jobs,
  likedJobs,
});
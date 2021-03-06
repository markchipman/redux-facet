import { combineFacetReducers } from '../../src/immutable';
import { combineReducers } from 'redux-immutable';
import color from './common/color';

export default combineReducers({
  [combineFacetReducers.key]: combineFacetReducers({
    blockA: combineReducers({
      color,
    }),
    blockB: combineReducers({
      color,
    }),
    blockC: combineReducers({
      color,
    }),
    blockD: combineReducers({
      color,
    }),
  }),
});

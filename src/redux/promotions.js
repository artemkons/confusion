import * as actionTypes from './actionTypes';

export const Promotions = (state  = { isLoading: true, errMess: null, promotions:[]}, action) => {
    switch (action.type) {
        case actionTypes.ADD_PROMOS:
        return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case actionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}

        case actionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};
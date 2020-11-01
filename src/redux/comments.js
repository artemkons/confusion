import * as actionTypes from './actionTypes';

export const Comments = (state = {errMess: null, comments:[]}, action) => {
    switch(action.type) { 
        case actionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        
        case actionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
          
        case actionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return { ...state, comments: state.comments.concat(comment)};

        default:
            return state;
    };
};
// change this to true to see test results on the black diamond section.
export const BLACK_DIAMOND = true;


//TYPES
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECCREMENT';
const UNDO = 'UNDO';
const REDO = 'REDO';

//ACTION CREATORS
export function increment(amount){
    return {
        amount,
        type: INCREMENT
    }
}

export function decrement(amount){
    return {
        amount,
        type: DECREMENT
    }
}

export function undo(){
    return {
        type: UNDO
    }
}

export function redo(){
    return {
        type: REDO
    }
}

//make inital state
let initialState = {
    currentValue: 0,
    previousValues: [],
    futureValues: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case INCREMENT:
            return Object.assign({}, state, {previousValues: [state.currentValue, ...state.previousValues], 
                                            futureValues: [], 
                                            currentValue: state.currentValue + action.amount}); //Object.assign({}, state, {what's over there})
        case DECREMENT:
            return Object.assign({}, state, {previousValues: [state.currentValue, ...state.previousValues], 
                                            futureValues: [],
                                            currentValue: state.currentValue - action.amount});
        case UNDO:
            return Object.assign({}, state, {futureValues: [state.currentValue, ...state.futureValues], currentValue: state.previousValues[0], previousValues: state.previousValues.slice(1)});
        case REDO:
            return Object.assign({}, state, {previousValues: [state.currentValue, ...state.previousValues], currentValue: state.futureValues[0], futureValues: state.futureValues.slice(1)});
        default:
            return state;
    }
}

//Make reducer function
//return the state
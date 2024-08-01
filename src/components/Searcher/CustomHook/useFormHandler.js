import { useCallback, useReducer } from 'react';

const initialState = {
    input: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INPUT':
            return { ...state, input: action.payload };
        case 'RESET_INPUT':
            return initialState;
        default:
            return state;
    }
};

const useFormHandler = (onSearch) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = useCallback((e) => {
        dispatch({ type: 'SET_INPUT', payload: e.target.value });
    }, []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        onSearch(state.input);
        dispatch({ type: 'RESET_INPUT' });
    }, [onSearch, state.input]);

    return {
        input: state.input,
        handleChange,
        handleSubmit
    };
};

export default useFormHandler;

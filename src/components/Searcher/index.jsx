import React from 'react';
import useFormHandler from './CustomHook/useFormHandler';
import './Searcher.css';

const Searcher = ({ onSearch }) => {
    const { input, handleChange, handleSubmit } = useFormHandler(onSearch);

    return (
        <form className="searcher__bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="¿Qué necesitas?"
                value={input}
                onChange={handleChange}
                className="searcher__input"
            />
            <button type="submit" className="searcher__button">BUSCAR</button>
        </form>
    );
};

export default Searcher;

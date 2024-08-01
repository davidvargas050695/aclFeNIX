import { useState, useCallback } from 'react';

const useFormValidation = (formData) => {
    const [errors, setErrors] = useState({});

    const validate = useCallback(() => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'El nombre es requerido.';
        }
        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo electrónico no es válido.';
        }
        if (!formData.message) {
            newErrors.message = 'El mensaje es requerido.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    return [errors, validate];
};

export default useFormValidation;

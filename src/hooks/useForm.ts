import { useState } from 'react';

export type ValidationSchema = {
    [key: string]: {
        type: 'string' | 'number' | 'boolean';
        required: boolean;
    };
};

type Errors = {
    [path: string]: string;
};

export function useForm<T>(
    initialValues: T,
    validationSchema: ValidationSchema
) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Errors>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        const { name } = e.target;

        setValues({
            ...values,
            [name]: value,
        });

        const { required, type } = validationSchema[name];

        if (required) {
            if (type === 'boolean') {
                if (value == null) {
                    setErrors(prevErrors => {
                        return {
                            ...prevErrors,
                            [name]: 'This field is required',
                        };
                    });
                }
            } else if (!value) {
                setErrors(prevErrors => {
                    return {
                        ...prevErrors,
                        [name]: 'This field is required',
                    };
                });
            }
        }
    }

    return { values, handleChange, errors };
}

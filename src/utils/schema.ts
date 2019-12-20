import * as yup from 'yup';

export const createBetSchema = yup.object().shape({
    bet: yup.string().required('Please enter a bet'),
    eachWay: yup.boolean().required(),
    odds: yup
        .string()
        .required('Please enter the odds')
        .matches(/[1-9][0-9]*(\/|-)[1-9][0-9]*/g, {
            message: 'Must be in format: 11/4 or 11-4',
        }),
    stake: yup
        .number()
        .required('Please enter your stake')
        .min(0, 'Please enter a non-negative stake'),
    settled: yup.boolean().required(),
    returns: yup.number().when('settled', {
        is: true,
        then: yup
            .number()
            .required('Please enter your returns')
            .min(0, 'Please enter non-negative returns'),
        otherwise: yup.number(),
    }),
});

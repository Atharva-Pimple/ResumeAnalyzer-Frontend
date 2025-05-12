import * as Yup from 'yup';


export const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6,"too short").required('Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms')
});
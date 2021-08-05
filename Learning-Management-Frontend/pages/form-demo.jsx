import React from 'react';
import {useFormik} from "formik";

const initialValues = {
    name: '',
    email: '',
    channel: ''
}

const onSubmit = values => {
    console.log('form data', values)
}

const validate = values => {
    let errors = {}

    if (!values.name) {
        errors.name = 'Required'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email format'
    }

    if (!values.channel) {
        errors.channel = 'Required'
    }

    return errors;
}

const FormDemo = () => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    console.log('form values ', formik.errors);
    return (
        <div className={'App'}>

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor={'name'}>Name</label>
                <input
                    type={'text'}
                    id={'name'}
                    name={'name'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

                <label htmlFor={'email'}>E-mail</label>
                <input
                    type={'email'}
                    id={'email'}
                    name={'email'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <label htmlFor={'channel'}>Channel</label>
                <input
                    type={'text'}
                    id={'channel'}
                    name={'channel'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.channel}
                />
                {formik.touched.channel && formik.errors.channel ? <div>{formik.errors.channel}</div> : null}
                <button type={'submit'}>Submit</button>
            </form>
        </div>
    );
};

export default FormDemo;

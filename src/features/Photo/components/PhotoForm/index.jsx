import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import { PHOTO_CATEGORY_OPTIONS } from '../../../../contants/global';
import InputField from '../../../../custom-fields/InputField';
import RandomPhotoField from '../../../../custom-fields/RandomPhotoField';
import SelectField from '../../../../custom-fields/SelectField';

PhotoForm.propTypes = {
    onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
    onSubmit: null,
}

function PhotoForm(props) {
    const initialValues = {
        title: '',
        categoryId: null,
        photo: '',
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('This field is required'),

        categoryId: Yup.number().required('This field is required').nullable(),

        photo: Yup.string().required('This field is required'),
        // photo: Yup.string().when('categoryId', {
        //     is: 1,
        //     then: Yup.string().required('This field is required'),
        //     otherwise: Yup.string().notRequired(),

        // })
    });

    const { onSubmit } = props;

    const handleSubmit = (values) => {
        if (onSubmit) {
            onSubmit(values);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formikProps => {
                //do st here
                const { values, errors, touched, isSubmitting } = formikProps;
                console.log({ values, errors, touched });


                return (
                    <Form>
                        <FastField
                            name="title"
                            component={InputField}

                            label="Title"
                            placeholder="Eg: Wow nature ..."
                        />
                        <FastField
                            name="categoryId"
                            component={SelectField}

                            label="Category"
                            placeholder="What's your photo category?"
                            options={PHOTO_CATEGORY_OPTIONS}
                        />

                        <FastField
                            name="photo"
                            component={RandomPhotoField}
                            label="Photo"
                        />


                        <FormGroup>
                            <Button type="submit" color="primary">
                                {isSubmitting && <Spinner size='sm' />}
                                Add to album
                            </Button>
                        </FormGroup>
                    </Form>
                )
            }}

        </Formik>
    );
}

export default PhotoForm;
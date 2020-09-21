import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { ErrorMessage } from 'formik';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

SelectField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
    options: []
}

function SelectField(props) {
    const { form, field,
        type, label, placeholder, disabled, options } = props;
    // const { name, value, onChange, onBlur } = field;

    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name]

    const selectedOption = options.find(option => option.value === value)

    const handleSelectOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;
        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        }
        field.onChange(changeEvent)
    }

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <Select
                type={type}
                id={name}

                {...field}
                value={selectedOption}
                onChange={handleSelectOptionChange}

                disabled={disabled}
                placeholder={placeholder}
                options={options}
                className={showError ? 'is-invalid' : ''}
            />
            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
}

export default SelectField;
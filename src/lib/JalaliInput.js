/**
 * this file is copied from ra-ui-materialui/src/input/DateInput.js , we have to track the changes
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addField, FieldTitle } from 'ra-core';
import { DateInput } from 'react-hichestan-datetimepicker';
import {
  Input, InputLabel, FormControl, FormHelperText
} from '@material-ui/core';
//the following is a copy of ra-ui-materialui/src/input/sanitizeRestProps.js we have track the changes
import sanitizeRestProps from './sanitizeRestProps';

/**
 * Convert Date object to String
 *
 * @param {Date} v value to convert
 * @returns {String} A standardized date (yyyy-MM-dd), to be passed to an <input type="date" />
 */
const sanitizeValue = value => {
    // null, undefined and empty string values should not go through dateFormatter
    // otherwise, it returns undefined and will make the input an uncontrolled one.
    if (value == null || value === '') {
        return '';
    }

    // const finalValue = typeof value instanceof Date ? value : new Date(value);
    // return dateFormatter(finalValue);
    return value;
};

export class JalaliInput extends Component {
    onChange = event => {
        this.props.input.onChange(event.target.value);
    };

    render() {
        const {
            className,
            meta,
            input,
            isRequired,
            label,
            options,
            source,
            resource,
            ...rest
        } = this.props;
        if (typeof meta === 'undefined') {
            throw new Error(
                "The JalaliInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details."
            );
        }
        const { touched, error } = meta;
        const value = sanitizeValue(input.value);
        const sanitizedRest = sanitizeRestProps(rest);

        return (
            <JalaliField
                {...input}
                className={className}
                margin="normal"
                error={!!(touched && error)}
                helperText={touched && error}
                label={
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                }
                InputLabelProps={{
                    shrink: true,
                }}
                {...options}
                {...sanitizedRest}
                value={value}
                onChange={this.onChange}
                onBlur={this.onBlur}
            />
        );
    }
}

JalaliInput.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
};

JalaliInput.defaultProps = {
    options: {},
};

export default addField(JalaliInput);

class JalaliField extends React.Component {
  render() {
    const {
      autoComplete,
      autoFocus,
      className,
      defaultValue,
      disabled,
      error,
      FormHelperTextProps,
      fullWidth,
      helperText,
      id,
      InputLabelProps,
      inputProps,
      InputProps,
      inputRef,
      label,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      required,
      value,
      classes,
      noDialog,
      ...other
    } = this.props;

    const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
    const InputElement = (
      <Input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        disabled={disabled}
        fullWidth={fullWidth}
        name={name}
        value={value}
        id={id}
        inputRef={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        inputComponent={noDialog ? DateInputSimple : DateInput}
        inputProps={inputProps}
        {...InputProps}
      />
    );

    return (
      <FormControl
        aria-describedby={helperTextId}
        className={className}
        error={error}
        fullWidth={fullWidth}
        required={required}
        {...other}
      >
        {label && (
          <InputLabel htmlFor={id} {...InputLabelProps}>
            {label}
          </InputLabel>
        )}
        {InputElement}
        {helperText && (
          <FormHelperText id={helperTextId} {...FormHelperTextProps}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
  
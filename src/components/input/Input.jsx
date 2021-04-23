import {
  FormControl,
  InputLabel,
  Input as MUIInput,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

const Input = ({ classes, className = null, onChange, value, label, id, ...props }) => {
  return (
    <FormControl className={clsx(classes.root, className)} {...props}>
      <InputLabel
        className={classes.label}
        htmlFor={id}
        variant="outlined"
      >
        {label}
      </InputLabel>
      <MUIInput
        className={classes.input}
        id={id}
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
};

export default withStyles(styles, { withTheme: true })(Input);
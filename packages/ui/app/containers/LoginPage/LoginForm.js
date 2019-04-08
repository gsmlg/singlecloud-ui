import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const UsernameField = ({
  label,
  input,
  classes,
  meta,
  inputProps,
  ...custom
}) => (
  <CustomInput
    id="login-username"
    labelText={label}
    meta={meta}
    formControlProps={{
      fullWidth: true,
    }}
    inputProps={{
      ...input,
      type: 'text',
      autoComplete: 'username',
      endAdornment: (
        <InputAdornment position="end">
          <People className={classes.inputIconsColor} />
        </InputAdornment>
      ),
      ...inputProps,
    }}
    {...custom}
  />
);

const PasswordField = ({
  label,
  input,
  classes,
  meta,
  inputProps,
  ...custom
}) => (
  <CustomInput
    id="login-password"
    labelText={label}
    meta={meta}
    formControlProps={{
      fullWidth: true,
    }}
    inputProps={{
      ...input,
      type: 'password',
      autoComplete: 'current-password',
      endAdornment: (
        <InputAdornment position="end">
          <Icon className={classes.inputIconsColor}>lock_outline</Icon>
        </InputAdornment>
      ),
      ...inputProps,
    }}
    {...custom}
  />
);

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const classes = {};
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <CardHeader color="primary" className={classes.cardHeader}>
        <h4>Login</h4>
      </CardHeader>
      <CardBody>
        <Field
          name="username"
          component={UsernameField}
          label="Username"
          classes={classes}
        />
        <Field
          name="password"
          component={PasswordField}
          label="Password"
          classes={classes}
        />
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <Button simple color="primary" size="lg" type="submit">
          Sign In
        </Button>
      </CardFooter>
    </form>
  );
};

export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
  validate,
})(LoginForm);

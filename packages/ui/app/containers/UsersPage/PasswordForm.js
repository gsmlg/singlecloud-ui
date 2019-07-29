import React, { PureComponent } from 'react';
import getByKey from '@gsmlg/utils/getByKey';
import { FormattedMessage } from 'react-intl';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';

import messages from './messages';

class PasswordForm extends PureComponent {
  state = {};

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      isAdmin,
    } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
        {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          {!isAdmin || true ? (
            <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
              <InputField
                label={<FormattedMessage {...messages.oldPassword} />}
                name="oldPassword"
                formControlProps={{
                  className: classes.passwordControl,
                }}
                inputProps={{ type: 'password', autoComplete: 'off' }}
                classes={classes}
              />
            </GridItem>
          ) : null}
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.newPassword} />}
              name="newPassword"
              formControlProps={{
                className: classes.passwordControl,
              }}
              inputProps={{ type: 'password', autoComplete: 'off' }}
              classes={classes}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default PasswordForm;

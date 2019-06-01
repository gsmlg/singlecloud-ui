/**
 *
 * Create Namespace Page
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import { makeSelectClusterID } from 'containers/App/selectors';

import { makeSelectCreateFormData } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import NamespacesTable from './NamespacesTable';
import NamespacesPageHelmet from './helmet';
import NamespaceForm from './NamespaceForm';

export const formName = 'createNamespaceForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateNamespaceForm = reduxForm({
  form: formName,
  validate,
})(NamespaceForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateNamespacePage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    const {
      classes,
      formData,
      submitForm,
      createNamespace,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const name = formValues.get('name');
        await new Promise((resolve, reject) => {
          createNamespace({ name }, { resolve, reject });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <NamespacesPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Typography component="div" className="">
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage {...messages.createNamespace} />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <CreateNamespaceForm
                      classes={classes}
                      onSubmit={doSubmit}
                      initialValues={fromJS({ name: '' })}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitForm}
                    >
                      <FormattedMessage {...messages.createNamespaceButton} />
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(CreateNamespacePage);

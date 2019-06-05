/**
 *
 * DaemonSetsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import * as actions from 'ducks/daemonSets/actions';
import { makeSelectURL } from 'ducks/daemonSets/selectors';

import messages from './messages';
import DaemonSetsPageHelmet from './helmet';
import styles from './styles';
import DaemonSetsTable from './DaemonSetsTable';

/* eslint-disable react/prefer-stateless-function */
export class DaemonSetsPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { clusterID, namespaceID, url, loadDaemonSets } = this.props;
    loadDaemonSets({ url, clusterID, namespaceID });
  }

  componentDidUpdate(prevProps) {
    const {
      clusterID: prevClusterID,
      namespaceID: prevNamespaceID,
    } = prevProps;
    const { clusterID, namespaceID, url, loadDaemonSets } = this.props;
    if (prevClusterID !== clusterID || prevNamespaceID !== namespaceID) {
      loadDaemonSets({ url, clusterID, namespaceID });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DaemonSetsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.daemonSets} />
                    <Link
                      to={`${this.props.location.pathname}/create`}
                      className={classes.createBtnLink}
                    >
                      <IconButton>
                        <AddIcon nativeColor="#fff" />
                      </IconButton>
                    </Link>
                  </h4>
                </CardHeader>
                <CardBody>
                  <DaemonSetsTable location={this.props.location} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
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
)(DaemonSetsPage);
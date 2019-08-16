import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';

import messages from './messages';

function ClusterManagePageHelmet(props) {
  const { intl } = props;
  return (
    <Helmet>
      <title>{intl.formatMessage(messages.pageTitle)}</title>
      <meta
        name="description"
        content={intl.formatMessage(messages.pageDesc)}
      />
    </Helmet>
  );
}

ClusterManagePageHelmet.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ClusterManagePageHelmet);
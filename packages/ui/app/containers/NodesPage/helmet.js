import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';

import messages from './messages';

function NodesPageHelmet(props) {
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

NodesPageHelmet.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(NodesPageHelmet);
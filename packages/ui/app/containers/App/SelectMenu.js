import React, { useEffect, useState, memo, useRef } from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';

import { makeSelectClustersAndNamespaces } from 'ducks/namespaces/selectors';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import * as actions from 'ducks/app/actions';
import { changeNamespace, loadNamespaces } from 'ducks/namespaces/actions';

import SelectIcon from 'components/Icons/Select';
import ChevronRight from 'components/Icons/ChevronRight';
import messages from './messages';
import useStyles from './dashboardStyles';

const SelectMenu = ({
  clusters,
  changeCluster,
  clusterID,
  namespaceID,
  itemLink,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectCluster, setSelectCluster] = React.useState(null);
  const [nsAnchorEl, setNsAnchorEl] = React.useState(null);
  const [selectNamespace, setSelectNamespace] = React.useState(null);
  const menuRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNsAnchorEl(null);
  };

  const handleSelectCluster = (c) => {
    setSelectCluster(c.get('id'));
    if (c.get('status') === 'Running') {
      changeCluster(selectCluster);
      setSelectNamespace(null);
      handleClose();
    }
  };

  const handleSelectNamespace = (ns) => {
    setSelectNamespace(ns);
    itemLink(`/clusters/${selectCluster}/namespaces/${ns}/applications`);
    handleClose();
  };

  const openNamespanceMenu = (e, c) => {
    if (c && c.get('status') === 'Running') {
      setSelectCluster(c.get('id'));
      setNsAnchorEl(e.currentTarget);
    } else {
      setNsAnchorEl(null);
    }
  };

  useEffect(() => {
    if (namespaceID) {
      setSelectNamespace(namespaceID);
    }
  }, [namespaceID]);

  useEffect(() => {
    if (anchorEl === null) {
      setNsAnchorEl(null);
    }
  }, [anchorEl]);

  const cluster = clusters.get(selectCluster);

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        style={{ backgroundColor: '#fff' }}
        className={classes.selectBtn}
      >
        {clusterID ? (
          <>
            {clusterID}
            {selectNamespace ? (
              <ChevronRight
                style={{
                  transform: 'scale(0.6)',
                  color: '#9E9E9E',
                  marginRight: 4,
                }}
              />
            ) : null}
            {selectNamespace}
          </>
        ) : (
          <FormattedMessage {...messages.global} />
        )}
        <SelectIcon className={classes.selectIcon} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          handleClose();
        }}
        classes={{ paper: classes.selectMenu }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        elevation={0}
        getContentAnchorEl={null}
      >
        <MenuItem
          onClick={() => {
            setSelectCluster('');
            changeCluster('');
            setSelectNamespace(null);
            handleClose();
          }}
          className={classes.menuItem}
          ref={menuRef}
          onMouseEnter={(e) => openNamespanceMenu(e, '')}
        >
          <ListItemText
            className={
              clusterID === '' ? classes.activeItemText : classes.ItemText
            }
          >
            <FormattedMessage {...messages.global} />
          </ListItemText>
        </MenuItem>
        {clusters.toList().map((c, i) => (
          <MenuItem
            key={i}
            onClick={(e) => handleSelectCluster(c)}
            className={classes.menuItem}
            onMouseEnter={(e) => openNamespanceMenu(e, c)}
            disabled={c.get('status') !== 'Running'}
          >
            <ListItemText
              primary={c.get('id')}
              className={
                clusterID === c.get('id')
                  ? classes.activeItemText
                  : classes.ItemText
              }
            />
          </MenuItem>
        ))}
        {cluster ? (
          <Popper
            open={Boolean(nsAnchorEl)}
            anchorEl={menuRef.current}
            placement="right-start"
            className={classes.secondMenu}
          >
            {cluster
              .get('namespaces')
              .toList()
              .map((nc, i) => (
                <MenuItem
                  key={i}
                  onClick={(e) => handleSelectNamespace(nc.get('id'))}
                  className={classes.menuItem}
                >
                  <ListItemText
                    primary={nc.get('id')}
                    className={
                      selectNamespace === nc.get('id')
                        ? classes.activeItemText
                        : classes.ItemText
                    }
                  />
                </MenuItem>
              ))}
          </Popper>
        ) : null}
      </Menu>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClustersAndNamespaces(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      changeNamespace,
      loadNamespaces,
      itemLink: push,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(SelectMenu);

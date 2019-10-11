import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import EditIcon from 'components/Icons/Edit';
import IconButton from 'components/CustomIconButtons/IconButton';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = [
  'storageType',
  'phase',
  'hosts',
  'size',
  'usedSize',
  'freeSize',
];

const tableSchema = schema
  .map((id) => {
    if (id === 'hosts') {
      return {
        id,
        label: ucfirst(id),
        component: (props) => (
          <span>{props.data.get('hosts') && props.data.get('hosts').size}</span>
        ),
      };
    }
    return {
      id,
      label: ucfirst(id),
    };
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({
        pathname,
        data,
        removeStorageCluster,
        clusterID,
        setError,
      }) => (
        <Fragment>
          <IconButton
            aria-label="Edit"
            component={Link}
            to={`${pathname}/${data.get('id')}/edit`}
          >
            <EditIcon />
          </IconButton>

          <ConfirmDelete
            actionName={removeStorageCluster}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            clusterID={clusterID}
            reject={(e) => setError(e)}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'storageType') {
      return {
        ...sch,
        component: (props) => (
          <Button
            link
            component={Link}
            to={`${props.pathname}/${props.data.get('id')}/show`}
          >
            {props.data.get('storageType')}
          </Button>
        ),
      };
    }
    return sch;
  });
export default tableSchema;
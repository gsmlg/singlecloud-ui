import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import IconButton from 'components/CustomIconButtons/IconButton';
import LinkIcon from 'images/icons/link.svg';

const schema = ['name', 'cpuUsed'];
const inflection = require('inflection');

const cpuTableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((sch) => {
    if (sch.id === 'cpuUsed') {
      return {
        ...sch,
        component: ({ value }) => `${value / 1000}`,
      };
    }
    return sch;
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({
        clusterID,
        classes,
        push,
        executeNamespaceAction,
        data,
        namespace,
        namespaceID,
      }) => (
        <IconButton
          onClick={() => {
            const podName = data.get('name');
            const url = namespace.getIn(['links', 'self']);
            executeNamespaceAction(
              'searchPod',
              { name: podName },
              {
                resolve({ response: { kind, name } }) {
                  push(
                    `/clusters/${clusterID}/namespaces/${namespaceID}/${inflection.pluralize(
                      kind
                    )}/${name}/show`
                  );
                },
                reject() {},
                url,
              }
            );
          }}
        >
          <img src={LinkIcon} alt="link" className={classes.linkIcon} />
        </IconButton>
      ),
    },
  ]);
export default cpuTableSchema;
/*
 * App Messages
 *
 * This contains all the text for the App container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.App';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'App',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of App',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the App container!',
  },
  cluster: {
    id: `${scope}.cluster`,
    defaultMessage: 'Cluster ',
  },
  global: {
    id: `${scope}.global`,
    defaultMessage: 'Global',
  },
  clusterEvents: {
    id: `${scope}.clusterEvents`,
    defaultMessage: 'Cluster Events',
  },
  leftMenuGlobal: {
    id: `${scope}.leftMenuGlobal`,
    defaultMessage: 'Global',
  },
  leftMenuClusterManagement: {
    id: `${scope}.leftMenuClusterManagement`,
    defaultMessage: 'ClusterManagement',
  },
  leftMenuOverview: {
    id: `${scope}.leftMenuOverview`,
    defaultMessage: 'Overview',
  },
  leftMenuNamespaces: {
    id: `${scope}.leftMenuNamespaces`,
    defaultMessage: 'Namespaces',
  },
  leftMenuNodes: {
    id: `${scope}.leftMenuNodes`,
    defaultMessage: 'Nodes',
  },
  leftMenuResourceQuota: {
    id: `${scope}.leftMenuResourceQuota`,
    defaultMessage: 'Resource Quota',
  },
  leftMenuAppManagement: {
    id: `${scope}.leftMenuAppManagement`,
    defaultMessage: 'AppManagement',
  },
  leftMenuDeployments: {
    id: `${scope}.leftMenuDeployments`,
    defaultMessage: 'Deployments',
  },
  leftMenuStatefulSet: {
    id: `${scope}.leftMenuStatefulSet`,
    defaultMessage: 'StatefulSet',
  },
  leftMenuDaemonSet: {
    id: `${scope}.leftMenuDaemonSet`,
    defaultMessage: 'DaemonSet',
  },
  leftMenuCronJob: {
    id: `${scope}.leftMenuCronJob`,
    defaultMessage: 'CronJob',
  },
  leftMenuJob: {
    id: `${scope}.leftMenuJob`,
    defaultMessage: 'Job',
  },
  leftMenuConfigMaps: {
    id: `${scope}.leftMenuConfigMaps`,
    defaultMessage: 'ConfigMaps',
  },
  leftMenuSecrets: {
    id: `${scope}.leftMenuSecrets`,
    defaultMessage: 'Secrets',
  },
  leftMenuSystemManagement: {
    id: `${scope}.leftMenuSystemManagement`,
    defaultMessage: 'SystemManagement',
  },
  leftMenuServiceLink: {
    id: `${scope}.leftMenuServiceLink`,
    defaultMessage: 'ServiceLink',
  },
  leftMenuStorage: {
    id: `${scope}.leftMenuStorage`,
    defaultMessage: 'Storage',
  },
  leftMenuNetwork: {
    id: `${scope}.leftMenuNetwork`,
    defaultMessage: 'Network',
  },
});
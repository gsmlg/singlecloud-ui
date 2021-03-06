/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import OverviewIcon from 'components/Icons/Overview';
import ManagementIcon from 'components/Icons/Management';
import AppConfigurationIcon from 'components/Icons/AppConfiguration';
import SystemIcon from 'components/Icons/System';
import BasicResourcesIcon from 'components/Icons/BasicResources';
import ContinuousIntegrationIcon from 'components/Icons/ContinuousIntegration';
import UserQuotasIcon from 'components/Icons/UserQuotas';
import SystenToolsIcon from 'components/Icons/SystenTools';
import ApplicationStoreIcon from 'components/Icons/ApplicationStore';
import ServiceAndRoutingIcon from 'components/Icons/ServiceAndRouting';
import ServiceGovernanceIcon from 'components/Icons/ServiceGovernance';
import { makeSelectRole, makeSelectIsAdmin } from 'ducks/role/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';

import { prefix } from './constants';

const selectRouter = (state) => state.get('router');

export const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.get('location'));

const selectDomain = (state) => state.get('app');

export const makeSelectShowMenuText = () =>
  createSelector(selectDomain, (appState) => appState.get('showMenuText'));

export const makeSelectShowEvents = () =>
  createSelector(
    selectDomain,
    createMatchSelector('/clusters/:cluster_id/:mode'),
    (appState, match) => {
      let inEventsPage = false;
      if (match && match.params) {
        inEventsPage = match.params.mode === 'events';
      }
      return appState.get('showEvents') && !inEventsPage;
    }
  );

export const makeSelectLastNamespace = () =>
  createSelector(selectDomain, (appState) => appState.get('lastNamespace'));

export const makeSelectTermUrl = () =>
  createSelector(selectDomain, (appState) => appState.get('termUrl'));

export const makeSelectHttpError = () =>
  createSelector(selectDomain, (appState) => appState.get('httpError'));

export const makeSelectUserMenus = () =>
  createSelector(
    selectDomain,
    makeSelectIsAdmin(),
    makeSelectRole(),
    (appState, isAdmin, role) =>
      [
        {
          name: 'UserQuotas',
          path: isAdmin ? '/adminUserQuotas' : '/userQuotas',
        },
        { name: 'Edit', path: `/users/${role.get('user')}/edit` },
        { name: 'Profile', path: `/users/${role.get('user')}/profile` },
        { name: 'Passwd', path: `/users/${role.get('user')}/passwd` },
        isAdmin ? { name: 'List', path: '/users' } : null,
      ].filter((n) => !!n)
  );

export const makeSelectLeftMenus = () =>
  createSelector(
    selectDomain,
    makeSelectLocation(),
    makeSelectCurrentClusterID(),
    makeSelectLastNamespace(),
    makeSelectIsAdmin(),
    (appState, location, cluster, nsID, isAdmin) => {
      const namespace = nsID || 'default';
      let menus = [
        {
          name: 'Global',
          children: [
            { name: 'ClusterList', path: `/clusters` },
            { name: 'GlobalConfiguration', path: `/globalConfiguration` },
            { name: 'AuditLogs', path: `/auditLogs` },
          ],
          icon: OverviewIcon,
          adminOnly: true,
        },
      ];
      const path = location.get('pathname');
      const isManage = /^\/clusters\/[^/]+\/manage/.test(path);
      if (cluster !== '' && !isManage) {
        menus = menus.concat([
          {
            name: 'ClusterManagement',
            children: [
              { name: 'ClusterOverview', path: `/clusters/${cluster}/show` },
              { name: 'Namespaces', path: `/clusters/${cluster}/namespaces` },
              { name: 'Nodes', path: `/clusters/${cluster}/nodes` },
              {
                name: 'Storages',
                path: `/clusters/${cluster}/storages`,
              },
              {
                name: 'Network',
                path: `/clusters/${cluster}/network`,
              },
            ],
            icon: ManagementIcon,
            adminOnly: true,
          },
          {
            name: 'ServiceGovernance',
            children: [
              {
                name: 'NamespaceOverview',
                path: `/clusters/${cluster}/namespaces/${namespace}/overview`,
              },
              {
                name: 'ServiceMesh',
                path: `/clusters/${cluster}/namespaces/${namespace}/svcMeshWorkloads`,
              },
              {
                name: 'ServiceLink',
                path: `/clusters/${cluster}/namespaces/${namespace}/serviceLink`,
              },
              {
                name: 'ServiceMeshTap',
                path: `/clusters/${cluster}/namespaces/${namespace}/svcMeshTap`,
              },
            ],
            icon: ServiceGovernanceIcon,
          },
          {
            name: 'AppStore',
            children: [
              {
                name: 'SystemCharts',
                path: `/clusters/${cluster}/namespaces/${namespace}/charts`,
              },
              {
                name: 'UserCharts',
                path: `/clusters/${cluster}/namespaces/${namespace}/userCharts`,
              },
            ],
            icon: ApplicationStoreIcon,
          },
          {
            name: 'AppManagement',
            children: [
              {
                name: 'Applications',
                path: `/clusters/${cluster}/namespaces/${namespace}/applications`,
              },
              {
                name: 'HPA',
                path: `/clusters/${cluster}/namespaces/${namespace}/horizontalPodAutoscalers`,
              },
            ],
            icon: SystemIcon,
          },
          {
            name: 'ContinuousIntegration',
            children: [
              {
                name: 'WorkFlows',
                path: `/clusters/${cluster}/namespaces/${namespace}/workFlows`,
              },
            ],
            icon: ContinuousIntegrationIcon,
          },
          {
            name:'BasicResources',
            children: [
              {
                name: 'Services',
                path: `/clusters/${cluster}/namespaces/${namespace}/services`,
              },
              {
                name: 'Ingresses',
                path: `/clusters/${cluster}/namespaces/${namespace}/ingresses`,
              },
              {
                name: 'UdpIngresses',
                path: `/clusters/${cluster}/namespaces/${namespace}/udpIngresses`,
              },
              {
                name: 'ConfigMaps',
                path: `/clusters/${cluster}/namespaces/${namespace}/configmaps`,
              },
              {
                name: 'Secrets',
                path: `/clusters/${cluster}/namespaces/${namespace}/secrets`,
              },
              {
                name: 'Deployments',
                path: `/clusters/${cluster}/namespaces/${namespace}/deployments`,
              },
              {
                name: 'StatefulSet',
                path: `/clusters/${cluster}/namespaces/${namespace}/statefulSets`,
              },
              {
                name: 'DaemonSet',
                path: `/clusters/${cluster}/namespaces/${namespace}/daemonSets`,
              },
              {
                name: 'CronJob',
                path: `/clusters/${cluster}/namespaces/${namespace}/cronJobs`,
              },
              {
                name: 'Job',
                path: `/clusters/${cluster}/namespaces/${namespace}/jobs`,
              },
              {
                name: 'PersistentVolumeClaims',
                path: `/clusters/${cluster}/namespaces/${namespace}/persistentVolumeClaims`,
              },
            ],
            icon: BasicResourcesIcon,
          },
        ]);
      }
      if (cluster !== '' && !isManage) {
        menus = menus.concat([
          {
            name: 'SystemTools',
            children: [
              {
                name: 'ImageRegistry',
              },
              {
                name: 'ClusterWatch',
              },
              {
                name: 'LogAnalysis',
              },
            ],
            icon: SystenToolsIcon,
          },
        ]);
      }
      if (!isAdmin) {
        menus = menus.filter((m) => {
          m.children = m.children.filter((c) => c.adminOnly === undefined);
          return m.adminOnly === undefined;
        });
      }
      return menus;
    }
  );

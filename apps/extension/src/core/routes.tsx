// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import Account from 'pages/Account';
import Activity from 'pages/Activity';
import CreateWallet from 'pages/CreateWallet';
import Credentials from 'pages/Credentials';
import Gallery from 'pages/Gallery';
import Help from 'pages/Help';
import Network from 'pages/Network';
import Password from 'pages/Password';
import Settings from 'pages/Settings';
import Token from 'pages/Token';
import Wallet from 'pages/Wallet';
import React from 'react';
import RecoveryPhrase from 'pages/RecoveryPhrase';
import Transaction from 'pages/Transaction';
import NoWallet from 'pages/NoWallet';
import ImportWallet from 'pages/ImportWallet';
import ImportAccountMnemonic from 'pages/ImportAccountMnemonic';
import ImportAccountPrivateKey from 'pages/ImportAccountPrivateKey';

export const Routes = Object.freeze({
  account: {
    element: <Account />,
    routePath: '/accounts/:address',
  },
  activity: {
    element: <Activity />,
    routePath: '/activity',
  },
  createWallet: {
    element: <CreateWallet />,
    routePath: '/create-wallet',
  },
  credentials: {
    element: <Credentials />,
    routePath: '/settings/credentials',
  },
  gallery: {
    element: <Gallery />,
    routePath: '/gallery',
  },
  help: {
    element: <Help />,
    routePath: '/help',
  },
  importWallet: {
    element: <ImportWallet />,
    routePath: '/import',
  },
  importWalletMnemonic: {
    element: <ImportAccountMnemonic />,
    routePath: '/import/mnemonic',
  },
  importWalletPrivateKey: {
    element: <ImportAccountPrivateKey />,
    routePath: 'import/private-key',
  },
  login: {
    element: <NoWallet />,
    routePath: '/',
  },
  network: {
    element: <Network />,
    routePath: '/settings/network',
  },
  noWallet: {
    element: <NoWallet />,
    routePath: '/no-wallet',
  },
  password: {
    element: <Password />,
    routePath: '/password',
  },
  recovery_phrase: {
    element: <RecoveryPhrase />,
    routePath: '/settings/recovery_phrase',
  },
  settings: {
    element: <Settings />,
    routePath: '/settings',
  },
  token: {
    element: <Token />,
    routePath: '/tokens/:id',
  },
  transaction: {
    element: <Transaction />,
    routePath: '/transactions/:version',
  },
  wallet: {
    element: <Wallet />,
    routePath: '/wallet',
  },
} as const);

export type RoutePaths = typeof Routes[keyof typeof Routes]['routePath'];

export default Routes;
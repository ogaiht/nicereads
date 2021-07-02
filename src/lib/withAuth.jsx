import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => {

});

Router.events.on('routeChangeComplete', url => {

});

Router.events.on('routeChangeError', () => {});


export default function withAuth(baseComponent, {
    loginRequired = true,
    logoutRequired = false,
    adminRequired = false } = {}) {
        class App extends React.Component {
            static async getInitialPropsAsync(ctx) {
                const isFromServer
            }
        }
    }
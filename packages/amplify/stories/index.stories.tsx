import 'bootstrap/dist/css/bootstrap.css';

import { linkTo } from '@storybook/addon-links';
import React from 'react';

export default {
  title: 'Amplify/Home',
  parameters: {
    info: { inline: true },
    options: { showPanel: false },
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
};

export const Presentation = () => (
  <div className="container">
    <div className="row">
      <div className="col">
        <div className="jumbotron">
          <h1 className="display-4">
            <code>@reactionable/amplify</code>
          </h1>
          <hr />
          <p className="lead">
            Backend package for{' '}
            <a href="https://docs.amplify.aws/" target="_blank">
              AWS Amplify
            </a>{' '}
            integration
          </p>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <button
              onClick={linkTo('Amplify/Home', 'Installation')}
              className="btn btn-link btn-sm"
            >
              🚀 Installation
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo('Amplify/Home', 'Usage')} className="btn btn-link btn-sm">
              🧾 Usage
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo('Amplify/Components/Identity')} className="btn btn-link btn-sm">
              📖 Components
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export const Installation = () => (
  <div className="container">
    <div className="row">
      <div className="col">
        <div className="jumbotron">
          <h1 className="display-4">
            <code>@reactionable/amplify</code>
          </h1>
          <hr />
          <p className="lead">🚀 Installation</p>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <b>NPM</b>
            <br />
            <br />
            <pre>
              <code>npm install @reactionable/amplify</code>
            </pre>
          </li>
          <li className="list-group-item">
            <b>YARN</b>
            <br />
            <br />
            <pre>
              <code>yarn add @reactionable/amplify</code>
            </pre>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export const Usage = () => (
  <div className="container">
    <div className="row">
      <div className="col">
        <div className="jumbotron">
          <h1 className="display-4">
            <code>@reactionable/amplify</code>
          </h1>
          <hr />
          <p className="lead">🧾 Usage</p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <h2>FAQ</h2>
        <h3>Customize amplify theme</h3>
        <p>
          You can customize your css through{' '}
          <a href="https://docs.amplify.aws/ui/customization/theming/q/framework/react">Theming</a>,
          or via function <code>useIdentityContextProviderProps</code> which accept all options
          supported by{' '}
          <a href="https://docs.amplify.aws/lib/auth/customui/q/platform/js#customize-ui-theme">
            AWS Amplify UI theme
          </a>
          :
          <pre>
            <code>{`
useIdentityContextProviderProps({
  theme: {
      button: {
          'backgroundColor': '#6918b4',
          'borderColor': '#6918b4',
      },
  },
}),`}</code>
          </pre>
        </p>
      </div>
    </div>
  </div>
);

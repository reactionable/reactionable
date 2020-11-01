import 'bootstrap/dist/css/bootstrap.css';

import { linkTo } from '@storybook/addon-links';
import React from 'react';

export default {
  title: 'UI Material/Home',
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
            <code>@reactionable/ui-material</code>
          </h1>
          <hr />
          <p className="lead">
            UI package for{' '}
            <a href="https://material-ui.com/" target="_blank">
              Material-UI
            </a>{' '}
            integration
          </p>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <button
              onClick={linkTo('UI Material/Home', 'Installation')}
              className="btn btn-link btn-sm"
            >
              🚀 Installation
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo('UI Material/Home', 'Usage')} className="btn btn-link btn-sm">
              🧾 Usage
            </button>
          </li>
          <li className="list-group-item">
            <button
              onClick={linkTo('UI Material/Components/Alert')}
              className="btn btn-link btn-sm"
            >
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
            <code>@reactionable/ui-material</code>
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
              <code>npm install @reactionable/ui-material</code>
            </pre>
          </li>
          <li className="list-group-item">
            <b>YARN</b>
            <br />
            <br />
            <pre>
              <code>yarn add @reactionable/ui-material</code>
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
            <code>@reactionable/ui-material</code>
          </h1>
          <hr />
          <p className="lead">🧾 Usage</p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col"></div>
    </div>
  </div>
);

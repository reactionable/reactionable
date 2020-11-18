import "bootstrap/dist/css/bootstrap.css";

import { linkTo } from "@storybook/addon-links";
import React, { ReactElement } from "react";

export default {
  title: "UI Material/Home",
  parameters: {
    info: { inline: true },
    options: { showPanel: false },
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
};

export const Presentation = (): ReactElement => (
  <div className="container">
    <div className="row">
      <div className="col">
        <div className="jumbotron">
          <h1 className="display-4">
            <code>@reactionable/ui-material</code>
          </h1>
          <hr />
          <p className="lead">
            UI package for{" "}
            <a href="https://material-ui.com/" target="_blank" rel="noreferrer">
              Material-UI
            </a>{" "}
            integration
          </p>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <button
              onClick={linkTo("UI Material/Home", "Installation")}
              className="btn btn-link btn-sm"
            >
              🚀 Installation
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo("UI Material/Home", "Usage")} className="btn btn-link btn-sm">
              🧾 Usage
            </button>
          </li>
          <li className="list-group-item">
            <button
              onClick={linkTo("UI Material/Components/Alert")}
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

export const Installation = (): ReactElement => (
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

export const Usage = (): ReactElement => (
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
      <div className="col">
        <h2 className="mb-5">Setup App</h2>
        <dl className="row">
          <dt className="col-12 mb-3">
            1. Wrap the root component of you application in Reactionable App (E.g:{" "}
            <code>index.tsx</code>):
          </dt>
          <dd className="col-12">
            <pre>
              <code>{`import React, { ReactElement } from 'react';
import { App } from '@reactionable/core';
import { useUIProviderProps } from '@reactionable/ui-material';

const MyApp = (): ReactElement => {
  return <App ui={useUIProviderProps()} />;
};

export default MyApp;`}</code>
            </pre>
          </dd>
          <dt className="col-12 mb-3">
            2. It is possible to custom UI Context provider props (
            <button className="btn btn-link btn-sm" onClick={linkTo("UI Material/Components/UI")}>
              Documentation
            </button>
            )
          </dt>
          <dd className="col-12">
            <pre>
              <code>{`import React, { ReactElement } from 'react';
import { App } from '@reactionable/core';
import { useUIProviderProps, IUIProviderProps } from '@reactionable/ui-material';

const MyApp = (): ReactElement => {

  const ui: IUIProviderProps = {
    ...useUIProviderProps(),
    theme: {
      palette: {
        primary: { main: '#FF0000' }
      }
    }
  };

  return <App ui={ui} />
}

export default MyApp;`}</code>
            </pre>
          </dd>
        </dl>
      </div>
    </div>
  </div>
);

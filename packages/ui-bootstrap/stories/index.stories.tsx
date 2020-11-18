import "bootstrap/dist/css/bootstrap.css";

import { linkTo } from "@storybook/addon-links";
import React, { ReactElement } from "react";

export default {
  title: "UI Bootstrap/Home",
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
            <code>@reactionable/ui-bootstrap</code>
          </h1>
          <hr />
          <p className="lead">
            UI package for{" "}
            <a href="https://react-bootstrap.github.io/" target="_blank" rel="noreferrer">
              React Bootstrap
            </a>{" "}
            integration
          </p>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <button
              onClick={linkTo("UI Bootstrap/Home", "Installation")}
              className="btn btn-link btn-sm"
            >
              🚀 Installation
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo("UI Bootstrap/Home", "Usage")} className="btn btn-link btn-sm">
              🧾 Usage
            </button>
          </li>
          <li className="list-group-item">
            <button
              onClick={linkTo("UI Bootstrap/Components/Alert")}
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
            <code>@reactionable/ui-bootstrap</code>
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
              <code>npm install @reactionable/ui-bootstrap</code>
            </pre>
          </li>
          <li className="list-group-item">
            <b>YARN</b>
            <br />
            <br />
            <pre>
              <code>yarn add @reactionable/ui-bootstrap</code>
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
            <code>@reactionable/ui-bootstrap</code>
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
import { useUIProviderProps } from '@reactionable/ui-bootstrap';

const MyApp = (): ReactElement => {
  return <App ui={useUIProviderProps()} />;
};

export default MyApp;`}</code>
            </pre>
          </dd>
        </dl>
      </div>
    </div>
  </div>
);

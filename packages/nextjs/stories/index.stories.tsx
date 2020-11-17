import "bootstrap/dist/css/bootstrap.css";

import { linkTo } from "@storybook/addon-links";
import React, { ReactElement } from "react";

export default {
  title: "NextJs/Home",
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
            <code>@reactionable/graphql</code>
          </h1>
          <hr />
          <p className="lead">
            Router package for{" "}
            <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
              NextJs
            </a>{" "}
            integration
          </p>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <button onClick={linkTo("NextJs/Home", "Installation")} className="btn btn-link btn-sm">
              🚀 Installation
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo("NextJs/Home", "Usage")} className="btn btn-link btn-sm">
              🧾 Usage
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo("NextJs/Components/Link")} className="btn btn-link btn-sm">
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
            <code>@reactionable/nextjs</code>
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
              <code>npm install @reactionable/nextjs</code>
            </pre>
          </li>
          <li className="list-group-item">
            <b>YARN</b>
            <br />
            <br />
            <pre>
              <code>yarn add @reactionable/nextjs</code>
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
            <code>@reactionable/nextjs</code>
          </h1>
          <hr />
          <p className="lead">🧾 Usage</p>
        </div>
      </div>
    </div>
    <div className="row">
      <h2 className="mb-5">Setup NextJs router</h2>
      <dl className="row"></dl>
    </div>
  </div>
);

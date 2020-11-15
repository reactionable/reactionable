import "bootstrap/dist/css/bootstrap.css";

import { linkTo } from "@storybook/addon-links";
import React, { ReactElement } from "react";

export default {
  title: "Graphql/Home",
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
            Backend package for{" "}
            <a href="https://www.apollographql.com/docs/react/" target="_blank" rel="noreferrer">
              Apollo GraphQL
            </a>{" "}
            integration
          </p>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <button
              onClick={linkTo("Graphql/Home", "Installation")}
              className="btn btn-link btn-sm"
            >
              🚀 Installation
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo("Graphql/Home", "Usage")} className="btn btn-link btn-sm">
              🧾 Usage
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo("Graphql/Components/Client")} className="btn btn-link btn-sm">
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
            <code>@reactionable/graphql</code>
          </h1>
          <hr />
          <p className="lead">🚀 Installation</p>
          <div className="alert alert-warning">
            If you are runnin a NextJs app, <code>@apollo/react-ssr</code> must be installed too
          </div>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <b>NPM</b>
            <br />
            <br />
            <pre>
              <code>npm install @reactionable/graphql</code>
            </pre>
          </li>
          <li className="list-group-item">
            <b>YARN</b>
            <br />
            <br />
            <pre>
              <code>yarn add @reactionable/graphql</code>
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
            <code>@reactionable/graphql</code>
          </h1>
          <hr />
          <p className="lead">🧾 Usage</p>
        </div>
      </div>
    </div>
    <div className="row">
      <h2 className="mb-5">Setup GraphQL Client</h2>
      <dl className="row">
        <dt className="col-12 mb-3">
          1. Wrap the root component of you application in Reactionable App (E.g:{" "}
          <code>index.tsx</code>):
        </dt>
        <dd className="col-12">
          <h4>In a React App</h4>
          <pre>
            <code>{`import { App } from '@reactionable/core';
import { GraphqlProvider } from '@reactionable/graphql/lib/Client';

const backendUri = 'http://localhost:5000/graphql';

const MyApp = () => {
  return <GraphqlProvider uri={graphqlUri}><App /></GraphqlProvider>;
};
export default MyApp;`}</code>
          </pre>
          <h4>In a NextJs App</h4>
          <pre>
            <code>{`
import { App } from '@reactionable/core/lib/app/App';
import { GraphqlProvider } from '@reactionable/graphql/lib/Client';
import React from 'react';

const backendUri = 'http://localhost:5000/graphql';

function MyApp({ Component, pageProps }) {
  return  <GraphqlProvider uri={backendUri} initialState={pageProps.initialApolloState}>
    <App>
      <Component {...pageProps} />
    </App>
  </GraphqlProvider>
}

export default MyApp;
`}</code>
          </pre>
        </dd>
      </dl>
    </div>
  </div>
);

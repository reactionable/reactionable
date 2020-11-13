import "bootstrap/dist/css/bootstrap.css";

import { linkTo } from "@storybook/addon-links";
import React, { ReactElement } from "react";

export default {
  title: "Core/Home",
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
            <code>@reactionable/core</code>
          </h1>
          <hr />
          <p className="lead">Main package of Reactionnable</p>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <button onClick={linkTo("Core/Home", "Installation")} className="btn btn-link btn-sm">
              🚀 Installation
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo("Core/Home", "Usage")} className="btn btn-link btn-sm">
              🧾 Usage
            </button>
          </li>
          <li className="list-group-item">
            <button onClick={linkTo("Core/Components/App")} className="btn btn-link btn-sm">
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
            <code>@reactionable/core</code>
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
              <code>npm install @reactionable/core</code>
            </pre>
          </li>
          <li className="list-group-item">
            <b>YARN</b>
            <br />
            <br />
            <pre>
              <code>yarn add @reactionable/core</code>
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
            <code>@reactionable/core</code>
          </h1>
          <hr />
          <p className="lead">🧾 Usage</p>
        </div>
      </div>
    </div>
    <div className="row">
      <h2 className="mb-5">Setup I18n</h2>
      <dl className="row">
        <dt className="col-12 mb-3">
          1. Create file <code>i18n/i18n.ts</code> in the <code>src</code> folder of your app
        </dt>
        <dd className="col-12">
          <pre>
            <code>{`import { initializeI18n } from '@reactionable/core/lib/i18n/I18n';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';

initializeI18n({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: 'en',
  fallbackLng: 'en',
});
`}</code>
          </pre>
        </dd>
        <dt className="col-12 mb-3">
          2. Create locales files <code>i18n/locales/{"{en,fr}"}/translation.json</code>
        </dt>
        <dd className="col-12">
          <pre>
            <code>{`{
  "translation:key": "Translation value"
}`}</code>
          </pre>
        </dd>
        <dt className="col-12 mb-3">
          3. Import i18n config file the application root file (E.g: <code>index.tsx</code>):
        </dt>
        <dd className="col-12">
          <pre>
            <code>{`{
import './i18n/i18n';
}`}</code>
          </pre>
        </dd>
      </dl>
      <h2 className="mb-5">Setup App</h2>
      <dl className="row">
        <dt className="col-12 mb-3">
          1. Import i18n config file the application root file (E.g: <code>index.tsx</code>):
        </dt>
        <dd className="col-12">
          <pre>
            <code>{`import { App } from '@reactionable/core';

const App = (): ReactElement => {
  return <Core />;
};
export default App;`}</code>
          </pre>
        </dd>
      </dl>
    </div>
  </div>
);

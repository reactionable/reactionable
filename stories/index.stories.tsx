import "bootstrap/dist/css/bootstrap.css";

import { linkTo } from "@storybook/addon-links";
import React, { ReactElement } from "react";

export default {
  title: "Home",
  parameters: {
    info: { inline: true },
    options: { showPanel: false },
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
};

export const Presentation = (): ReactElement => (
  <div>
    <p className="text-center">
      <a href="/" target="_blank" rel="noreferrer">
        <img
          src="https://repository-images.githubusercontent.com/215304880/02830f80-f11d-11e9-893a-20a50b13e17c"
          width="600"
        />
      </a>
      <br />
      <br />
      <a
        href="https://github.com/reactionable/reactionable/actions?query=workflow%3A%22Continuous+Integration%22"
        target="_blank"
        rel="noreferrer"
        className="mr-1"
      >
        <img
          alt="Continuous integration"
          src="https://github.com/reactionable/reactionable/workflows/Continuous%20Integration/badge.svg"
        />
      </a>
      <a
        href="https://codecov.io/gh/reactionable/reactionable"
        target="_blank"
        rel="noreferrer"
        className="mr-1"
      >
        <img
          alt="Coverage Status"
          src="https://codecov.io/gh/reactionable/reactionable/branch/master/graph/badge.svg"
        />
      </a>
      <a
        href="https://github.com/reactionable/reactionable/blob/master/LICENSE"
        target="_blank"
        rel="noreferrer"
        className="mr-1"
      >
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
      </a>
      <a
        href="https://www.npmjs.com/search?q=%40reactionable"
        rel="noreferrer"
        target="_blank"
        className="mr-1"
      >
        <img alt="npm" src="https://img.shields.io/npm/v/@reactionable/core" />
      </a>
      <a href="CONTRIBUTING.md" target="_blank" className="mr-1">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
      </a>
      <a href="https://github.com/sponsors/neilime" className="mr-1">
        <img src="https://img.shields.io/badge/%E2%9D%A4-Sponsor-ff69b4" alt="Sponsor" />
      </a>
      <a href="https://github.com/reactionable/reactionable" className="mr-1">
        <img
          alt="GitHub stars"
          src="https://img.shields.io/github/stars/reactionable/reactionable?logo=github"
        />
      </a>
    </p>
    <hr />
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 style={{ marginBottom: "1em" }}>Getting started</h3>
          <h4 style={{ marginBottom: "1em" }}>Installation</h4>
          <h5 style={{ marginBottom: "1em" }}>
            🤖 Installation with [Reactionable
            CLI](https://reactionable.github.io/reactionable-cli/)
          </h5>
          <h5 style={{ marginBottom: "1em" }}>✍️ Manual Installation</h5>
          <div className="alert alert-info" role="alert">
            <button onClick={linkTo("Core/Home")} className="btn btn-link btn-sm">
              <b>
                <code>@reactionable/core</code>
              </b>
            </button>{" "}
            is the main package of <b>Reactionable</b>, it may be enhanced with additionnal third
            party packages:
            <br />
            <br />
            <ul>
              <li className="mb-2">
                <b>UI</b>: add third party styling to user interface components.
              </li>
              <li className="mb-2">
                <b>Router</b>: integrate with third party routing (Link, navigation...).
              </li>
              <li>
                <b>Backend</b>: integrate with third party backend service (authentication, api...).
              </li>
            </ul>
            Each of them are requiring <code>@reactionable/core</code>, so it don&apos;t need to
            install the Core package if a third party package is installed
          </div>
          <hr />
          Install only{" "}
          <button onClick={linkTo("Core/Home")} className="btn btn-outline-dark btn-sm">
            <b>
              <code>@reactionable/core</code>
            </b>
          </button>
          , or install a third party package:
          <hr />
          <div className="card-deck mb-5">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-header">UI Packages</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button onClick={linkTo("UI Bootstrap/Home")} className="btn btn-link btn-sm">
                    UI Bootstrap
                  </button>
                  <a href="https://react-bootstrap.github.io/" rel="noreferrer" target="_blank">
                    <span className="badge badge-secondary">React Bootstrap</span>
                  </a>
                </li>
                <li className="list-group-item">
                  <button onClick={linkTo("UI Material/Home")} className="btn btn-link btn-sm">
                    UI Material
                  </button>
                  <a href="https://material-ui.com/" rel="noreferrer" target="_blank">
                    <span className="badge badge-secondary">Material-UI</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-header">Router Packages</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button onClick={linkTo("Router Next/Home")} className="btn btn-link btn-sm">
                    Router Next
                  </button>
                  <a href="https://nextjs.org/" rel="noreferrer" target="_blank">
                    <span className="badge badge-secondary">NextJS</span>
                  </a>
                </li>
                <li className="list-group-item">
                  <button onClick={linkTo("Router Dom/Home")} className="btn btn-link btn-sm">
                    Router DOM
                  </button>
                  <a
                    href="https://reactrouter.com/web/guides/quick-start"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="badge badge-secondary">React Router DOM</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-header">Backend Packages</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button onClick={linkTo("Amplify/Home")} className="btn btn-link btn-sm">
                    Amplify
                  </button>
                  <a href="https://docs.amplify.aws/" rel="noreferrer" target="_blank">
                    <span className="badge badge-secondary">AWS Amplify</span>
                  </a>
                </li>
                <li className="list-group-item">
                  <button onClick={linkTo("Graphql/Home")} className="btn btn-link btn-sm">
                    GraphQL
                  </button>
                  <a
                    href="https://www.apollographql.com/docs/react/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="badge badge-secondary">Apollo GraphQL</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="mt-5 mb-5">
            These projects are built with <b>Reactionable</b>
          </h3>
          <div className="card-deck">
            <div className="card">
              <img
                className="card-img-top"
                src="https://via.placeholder.com/150x100?text=MyEasySchool"
                alt="MyEasySchool platform"
              />
              <div className="card-body">
                <h5 className="card-title">MyEasySchool</h5>
                <p className="card-text">SAAS platform for school classes management</p>
              </div>
              <div className="card-footer">
                <a
                  href="https://master.d2esspr3nj3mny.amplifyapp.com/"
                  className="btn btn-outline-dark"
                >
                  Discover MyEasySchool platform
                </a>
              </div>
            </div>
            <div className="card">
              <img
                className="card-img-top"
                src="https://via.placeholder.com/150x100?text=Hoverkraft.sh"
                alt="Hoverkraft dashboard"
              />
              <div className="card-body">
                <h5 className="card-title">Hoverkraft</h5>
                <p className="card-text">
                  Hoverkraft provides a unified hub of services to manage the lifecycle of your
                  applications and micro-services within a Cloud infrastructure.
                </p>
              </div>
              <div className="card-footer">
                <a href="https://hoverkraft.sh/" className="btn btn-outline-dark">
                  Discover Hoverkraff Dashboard
                </a>
              </div>
            </div>
            <div className="card">
              <img
                className="card-img-top"
                src="https://via.placeholder.com/150x100?text=ARN"
                alt="ARN project"
              />
              <div className="card-body">
                <h5 className="card-title">ARN</h5>
                <p className="card-text">Project of photographic archive of the French territory</p>
              </div>
              <div className="card-footer">
                <a href="https://www.archive-arn.fr/" className="btn btn-outline-dark">
                  Discover ARN
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="mt-5 mb-5">Helping Project</h3>
          <p>
            ❤️ If this project helps you reduce time to develop and/or you want to help the
            maintainer of this project. You can{" "}
            <a href="https://github.com/sponsors/neilime">sponsor</a> him. Thank you !
          </p>
          <h3 className="mt-5 mb-5">Contributing</h3>
          <p>
            👍 If you wish to contribute to <b>Reactionable</b>, please read the{" "}
            <a href="https://github.com/reactionable/reactionable/blob/master/CONTRIBUTING.md">
              CONTRIBUTING.md
            </a>{" "}
            file, PRs are Welcome !
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="mt-5 mb-5">Author</h3>
          <address>
            <strong>🏢 ESCEMI</strong>
            <br />
            Website: <a href="https://www.escemi.com">https://www.escemi.com</a>
            <br />
            Sponsor: <a href="https://github.com/sponsors/neilime">@neilime</a>
            <br />
            Github: <a href="https://github.com/reactionable">@reactionable</a>
            <br />
            LinkedIn: <a href="https://www.linkedin.com/company/escemi">@escemi</a>
          </address>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="mt-5 mb-5"> License</h3>
          <p>
            📝 Copyright © 2020 <a href="https://www.escemi.com">ESCEMI</a>.
            <br />
            This project is{" "}
            <a href="https://github.com/reactionable/reactionable-cli/blob/master/LICENSE">
              MIT
            </a>{" "}
            licensed.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const Development = (): ReactElement => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="jumbotron">
            <h1 className="display-4">Development</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Use reactionable in local</h2>
          <dl className="row">
            <dt className="col-sm-3">
              1. In <code>reactionable</code> dir
            </dt>
            <dd className="col-sm-9">
              <pre>
                <code>
                  yarn run link;
                  <br />
                  yarn start;
                </code>
              </pre>
            </dd>
            <dt className="col-sm-3">
              2. In <code>react app</code> dir
            </dt>
            <dd className="col-sm-9">
              <pre>
                <code>
                  for package in react react-dom @reactionable/core @reactionable/[...];do yarn link
                  $package;done;
                </code>
              </pre>
              <div className="alert alert-warning" role="alert">
                <ul>
                  <li>
                    If <code>@reactionable/ui-material</code> is used, link must be done with{" "}
                    <code>@material-ui/styles</code>
                  </li>
                  <li>
                    If <code>@reactionable/amplify</code> is used, link must be done with{" "}
                    <code>amplify</code>
                  </li>
                </ul>
              </div>
            </dd>
            <dt className="col-sm-3">
              3. Then ensure that there is only one version of react, react-dom...
            </dt>
            <dd className="col-sm-9">
              <pre>
                <code>
                  for package in react react-dom @reactionable/core @reactionable/[...]; do yarn why
                  $package; done;
                  <br />
                  yarn start;
                </code>
              </pre>
            </dd>
            <dt className="col-sm-3">3. Remove links when finish</dt>
            <dd className="col-sm-9">
              <pre>
                <code>
                  for package in react react-dom \<br />
                  @reactionable/core @reactionable/[...]; \<br />
                  do yarn unlink $package; \<br />
                  done;
                </code>
              </pre>
              <div className="alert alert-warning" role="alert">
                <ul>
                  <li>
                    If <code>@reactionable/ui-material</code> is used, unlink must be done also with{" "}
                    <code>yarn unlink @material-ui/styles</code>
                  </li>
                  <li>
                    If <code>@reactionable/amplify</code> is used, unlink must be done also with{" "}
                    <code>yarn unlink amplify</code>
                  </li>
                </ul>
              </div>
            </dd>
          </dl>
          <h2>Tests</h2>
          <pre>
            <code>yarn test</code>
          </pre>
          <h2>Storybook</h2>
          <dl className="row">
            <dt className="col-sm-3">
              1. Execute <code>storybook</code>
            </dt>
            <dd className="col-sm-9">
              <pre>
                <code>yarn storybook;</code>
              </pre>
            </dd>
            <dt className="col-sm-3">2. Visit</dt>
            <dd className="col-sm-9">
              <pre>
                <code>
                  <a href="http://localhost:6006/">http://localhost:6006/</a>
                </code>
              </pre>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

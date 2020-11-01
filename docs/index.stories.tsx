import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';

export default {
  title: 'Home',
  parameters: { info: { inline: true } },
};

export const Presentation = () => (
  <div>
    <p className="text-center">
      <a href="/" target="_blank">
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
        className="mr-1"
      >
        <img
          alt="Continuous integration"
          src="https://github.com/reactionable/reactionable/workflows/Continuous%20Integration/badge.svg"
        />
      </a>
      <a href="https://codecov.io/gh/reactionable/reactionable" target="_blank" className="mr-1">
        <img
          alt="Coverage Status"
          src="https://codecov.io/gh/reactionable/reactionable/branch/master/graph/badge.svg"
        />
      </a>
      <a
        href="https://github.com/reactionable/reactionable/blob/master/LICENSE"
        target="_blank"
        className="mr-1"
      >
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
      </a>
      <a href="https://www.npmjs.com/search?q=%40reactionable" target="_blank" className="mr-1">
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
          <h3 style={{ marginBottom: '1em' }}>Getting started</h3>
          <h4 style={{ marginBottom: '1em' }}>Installation</h4>
          <p>
            <h5>
              1. Install <code>@reactionable/core</code>:
            </h5>
            <ul style={{ marginTop: '1em' }}>
              <li>
                With <i>NPM</i>:
                <pre>
                  <code>
                    <br />
                    npm install @reactionable/core
                  </code>
                </pre>
              </li>
              <li>
                With <i>Yarn</i>:
                <pre>
                  <code>
                    <br />
                    yarn add @reactionable/core
                  </code>
                </pre>
              </li>
            </ul>
            <h5>
              2. Configure <code>@reactionable/core</code>:
            </h5>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4 style={{ marginBottom: '1em' }}>Usage</h4>
          <ul>
            <li>
              <a href="/">Core</a>
            </li>

            <li>
              <a href="/">UI Bootstrap</a>
            </li>
            <li>
              <a href="/">UI Material</a>
            </li>
          </ul>

          <h3 style={{ marginBottom: '1em' }}>Helping Project</h3>
          <p>
            ❤️ If this project helps you reduce time to develop and/or you want to help the
            maintainer of this project. You can{' '}
            <a href="https://github.com/sponsors/neilime">sponsor</a> him. Thank you !
          </p>

          <h3 style={{ marginTop: '1em', marginBottom: '1em' }}>Contributing</h3>
          <p>
            👍 If you wish to contribute to <b>Reactionable</b>, please read the{' '}
            <a href="https://github.com/reactionable/reactionable/blob/master/CONTRIBUTING.md">
              CONTRIBUTING.md
            </a>{' '}
            file, PRs are Welcome !
          </p>
        </div>
      </div>
    </div>
  </div>
);

# Releasing packages

The [Release workflow](../../.github/workflows/release.yml) prepares versions,
validates packages, publishes them and deploys the documentation. Start it
manually on `main`, or use its Monday 08:25 UTC schedule.

Leave the manual **force** checkbox unchecked to skip when no release is needed.
Check it to release all public packages even without changes. Higher planned
versions are preserved; an unchanged plan receives a patch bump. For example:

```sh
gh workflow run release.yml --ref main -f force=true
```

The schedule keeps normal no-change behavior. Force still runs builds and
validation, updates versions on `main`, and preserves existing tags and published
versions. On an existing tag, it is ignored so recovery keeps the same version.

The workflow currently evaluates the workspace support in
[HoverKraft PR #563](https://github.com/hoverkraft-tech/ci-github-nodejs/pull/563).
Before merging this caller, replace all three Node.js workflow pins with the
same published release containing that support. Published `2.0.0` supports one
package. The shared workflow now uses the published ci-github-publish release
for configuration overrides; the Pages action also uses that release.

## Configure publishing

- Install a release GitHub App on `reactionable/reactionable` with Actions and
  Contents write permissions and Pull requests read permission. Set
  `CI_BOT_APP_CLIENT_ID` as a repository or organization variable and
  `CI_BOT_APP_PRIVATE_KEY` as a repository or organization secret. The caller
  maps these explicitly to the shared preparation workflow, which has no
  environment. Authorize the App's version commits and tags under applicable
  repository rules. If a rule requires a pull request, the App needs an **Always
  allow** bypass; a PR-only bypass does not allow its direct version commit.
- Configure an active npm trusted publisher for each of the seven public
  packages: repository `reactionable/reactionable`, workflow `release.yml`,
  environment `github-pages`, with direct publishing enabled. Confirm that each
  package has already been published and has a valid version baseline.
- Permit `v*` tags in the `github-pages` environment. Both npm publication and
  Pages deployment run from the prepared tag. A policy allowing only `main`
  prevents those jobs from starting.
- For AI summaries, set `CHANGELOG_SUMMARY` to the complete JSON configuration
  accepted by
  [`ci-github-publish/actions/release/create`](https://github.com/hoverkraft-tech/ci-github-publish/tree/main/actions/release/create),
  including the chosen provider, model and credentials. Omit it to generate
  release notes without an AI summary. Invalid configuration or summary failures
  stop publication.

GitHub publication uses `GITHUB_TOKEN`; npm uses OIDC. The App is used for
version preparation and workflow dispatch. Neither an npm token nor a custom
release script is required.

## Release flow

The caller defines a partial YAML `release-config` once and passes it to both
preparation and release through a YAML anchor. It overrides only the release name,
tag template and tag prefix. Version rules and release-note formatting come from
HoverKraft defaults. Supplied top-level keys replace inherited values, including
whole lists and mappings; omitted settings stay inherited.

1. HoverKraft plans the next version from Conventional Commits.
   The caller's shared `release-config` override preserves `v` tags:
   breaking changes increment major, `feat` increments minor, and other changes
   increment patch. Lerna applies the planned version to changed public
   packages, updates dependency ranges and the lockfile, and leaves unchanged
   package versions intact. The shared workflow atomically pushes the signed
   version commit and tag, then dispatches this workflow at the tag.
2. Only preparation status `ready` starts CI. `no-changes`, `released` and
   `dispatched` skip the remaining jobs in that run; for `dispatched`, follow
   the new tag run. Shared CI builds and tests the repository, creates tarballs
   for all seven public packages, checks their declared entry points and
   declarations, and dry-runs npm publication. Installation and packing
   lifecycle hooks are disabled.
3. Release waits for successful CI and consumes its validated artifact map.
   Preparation selects the packages to release; the map may also contain
   unchanged packages. Release checks artifact source and package identity,
   creates the draft and optional summary, publishes the selected packages, and
   finalizes GitHub assets. It does not build, repack or run package tests.
4. One Pages job deploys `build/storybook` from the build artifact after
   publication succeeds, including the deployment action's availability and
   Lighthouse checks.

[Shared CI](../../.github/workflows/__shared-ci.yml) exposes separate outputs:

| Output                      | Consumer                       |
| --------------------------- | ------------------------------ |
| `package-tarball-artifacts` | Release, keyed by package path |
| `build-artifact-id`         | Pages, containing built site   |

CI discovers public packages from `package.json.workspaces`, excluding private
packages. Adding a workspace does not require a workflow directory-list update.
Include all generated package files in the build artifact. Shared package checks
inspect the actual tarball's declared JavaScript and TypeScript entry points by
default. They do not install unpublished sibling versions from npm. The same CI
runs on pull requests without version preparation or publication.

Release notes live in GitHub Releases. Existing changelog files remain
historical; preparation runs Lerna with `--no-changelog` and does not update
them.

## Baseline and recovery

Before the first release, compare each package's manifest and lockfile versions
with npm and the corresponding Git tag and GitHub release. A fixed-version
GitHub release does not prove that every package was published. Review any gap
against the actual published source and the next release's selected packages.
Historical versions do not need to be backfilled to publish a newer version.

Existing tags are never overwritten. The inferred version must not be older than
the committed version. A tag collision or concurrent branch update stops the
atomic push without changing `main` or creating a partial set of remote tags.

If preparation fails before pushing, fix the cause and run from `main` again.
After a tag exists, rerun failed jobs to retain successful CI artifacts. To
rebuild and resume a prepared tag that contains this workflow, dispatch it
explicitly:

```sh
gh workflow run release.yml --ref v1.2.3
```

The tag run uses committed versions. If npm already has a package version, the
shared workflow retrieves its original tarball and verifies its integrity
instead of publishing again. Matching GitHub assets and published release notes
are preserved; conflicting assets stop finalization. npm publication is not
atomic across packages, so partial publication can require a retry. If only
Pages fails, rerun its failed job.

## Validate workflow changes

Use Actionlint for workflow syntax. Run the repository's existing build and test
commands, and run the shared package action's default checks on the resulting
tarballs. PR CI performs package checks and publication dry runs without release
credentials. Dry runs do not validate registry version availability or npm
trusted-publisher authentication.

The separate `.github/workflows/prepare-release.yml` labels pull requests through
ci-github-publish. It runs when a PR opens or changes, including title edits.
Package version updates and publication remain in `.github/workflows/release.yml`.

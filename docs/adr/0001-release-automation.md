# ADR 0001: Lerna releases with AI summaries

- Status: accepted
- Date: 2026-10-29
- Updated: 2026-11-05

## Context

Reactionable uses fixed-version Lerna packages and HoverKraft CI workflows. The
previous release job combined versioning, npm publishing, and GitHub release
creation in one Lerna invocation. It did not fetch complete release history or
grant the Pages write permission required by deployment.

Upstream stable releases were checked against GitHub releases and source on
2026-10-29, starting from repository commit
`ac5f2500553530d221c215ff3b77c781dea855fb`:

| Dependency                | Source   | Verified target    |
| ------------------------- | -------- | ------------------ |
| ci-github-common          | 0.38.0   | [0.39.1][common]   |
| ci-github-nodejs          | 0.24.4   | [1.1.0][nodejs]    |
| ci-github-publish         | 0.28.0   | [1.0.3][publish]   |
| actions/checkout          | v7.0.1   | [v7.0.1][checkout] |
| actions/download-artifact | v8.0.1   | [v8.0.2][download] |
| actions/github-script     | Not used | [v9.0.0][script]   |
| actions/upload-artifact   | Not used | [v7.0.2][upload]   |

[common]: https://github.com/hoverkraft-tech/ci-github-common/releases/tag/0.39.1
[nodejs]: https://github.com/hoverkraft-tech/ci-github-nodejs/releases/tag/1.1.0
[publish]: https://github.com/hoverkraft-tech/ci-github-publish/releases/tag/1.0.3
[checkout]: https://github.com/actions/checkout/releases/tag/v7.0.1
[download]: https://github.com/actions/download-artifact/releases/tag/v8.0.2
[script]: https://github.com/actions/github-script/releases/tag/v9.0.0
[upload]: https://github.com/actions/upload-artifact/releases/tag/v7.0.2

Common 0.39 removed its local-action helpers in favor of native `$/` references,
requiring GitHub.com runners at least 2.336.0. Node.js 0.25 removed its reusable
release workflow in favor of a publish action. Reactionable did not call either
removed interface. Its existing hosted `ubuntu-latest` runners and CI inputs
remain suitable; no package runtime baseline changes are needed. The maintained
workflow files contain the immutable commit pins.

An existing `v0.29.0` tag from 2022 is outside the current release lineage,
whose Lerna version was `0.28.32` at inspection. Automatic versioning must
preserve existing tags if the inferred version collides with this history.

The
[upstream release guide](https://github.com/hoverkraft-tech/ci-github-nodejs/blob/b7eadcff0bdbd690f4688e7ce3f31d7ba0e39865/.github/workflows/release.md)
was reviewed on 2026-10-29. It distinguishes packaging with a local version
override from committing versions and changelogs before building. Reactionable
needs the latter: its packages have internal version ranges, and its release
source includes committed changelogs. The Package and Publish actions are both
available in the pinned Node.js 1.1.0 release.

## Initial decision (2026-10-29, superseded below)

Keep Lerna as the authority for package versions, dependency updates, and local
changelogs. Use HoverKraft's release create/update actions for GitHub releases
and its OpenAI summary integration for the release changelog.

Support both manual dispatch and weekly scheduled releases. Use Monday at 08:25
UTC as the default cadence. Both triggers use Lerna's Conventional Commits
version calculation without a manual version override.

Push version commits and tags atomically. Generate a draft and its AI summary
before npm publishing; publish the GitHub release only after npm succeeds.
Support recovery by rebuilding an existing tag and publishing missing versions.
Keep full source changelog entries alongside the AI summary.

Run source preparation on `main`, then explicitly dispatch the same workflow at
the resulting tag. CI and the Package action run from that tag, with no
packaging-time version override. Public packages at the committed release
version are packaged and published through the upstream actions, including a
publish dry run. Attach the published tarballs to the GitHub release.

Lerna remains the version planner for the fixed-version workspace. It handles
Conventional Commits, internal dependency ranges, and package changelogs
together. The guide's alternative HoverKraft release planner uses PR labels; adding
it would introduce a second version calculation. The tag run reads committed
versions and performs no new version calculation.

## Initial consequences

The flow reuses the existing toolchain and adds no package dependencies or
custom LLM client. It requires an OpenAI API key, npm trusted publishing, and
appropriate repository and environment permissions. AI output can be inaccurate
and must be reviewed. Lerna retains deterministic versioning independent of AI
output.

The same CI, AI summary, publishing, and tag recovery flow serves both triggers.
Existing version tags remain protected: if the inferred version already exists
on another commit, the release stops without pushing changes. Release history
must be reconciled before that version can be released.

Package publishing is not atomic across npm workspaces. Drafts and pushed tags
can remain after a failed run. A tag can also remain when CI fails, because the
final versioned source must exist before it is built. Retry that tag after
addressing service or configuration failures; code fixes require a new release.

Recovery checks npm for each exact version and restores the original published
tarball with SHA-512 verification. GitHub asset uploads are repeated safely by
comparing SHA-256 digests; conflicting assets stop the release. These small
integration helpers preserve recovery across partial workspace publishes and
ensure GitHub assets contain the bytes actually published to npm.

Preparation requires `actions: write` for explicit workflow dispatch. CI is
skipped when preparation finds no changes or the current tag is already
released. The workflow filename and npm trusted-publisher environment remain
unchanged. The [release guide](../development/releases.md) defines setup and
recovery.

## Updated decision (2026-11-05)

Use HoverKraft's reusable preparation, CI and release workflows for the
fixed-version Lerna project. This supersedes the local versioning, registry
recovery and asset upload helpers, Lerna-only version planning, source changelog
generation and the mandatory OpenAI integration described above.

Preparation uses `versioning: lerna`: HoverKraft plans Conventional Commit
versions, then Lerna applies the plan to manifests, dependency ranges and
lockfiles. A release GitHub App authorizes signed version commits, the atomic
branch/tag push and dispatch of the caller at the tag. `main` retains the
prepared version. Preserve existing `v` tags through the release configuration
and retain manual and Monday 08:25 UTC triggers. No-change preparation skips
downstream work.

An optional manual `force` checkbox overrides no-change skipping on `main` and
versions every public package. Preserve a higher Conventional Commit plan and
use a patch increment when the planned version has not increased. This does not
change scheduled runs, explicit tag recovery, validation or tag protection. The
shared preparation workflow owns the behavior; the caller only forwards the input.

CI owns building, testing, packing, declared-entry-point checks and publication
dry runs. Public packages are discovered from the existing workspace
configuration, without a separate directory list in the caller. CI returns a
validated tarball map and a separate build artifact for Pages. Release selects
only the prepared packages, verifies artifact source and identity, and uses
shared recovery and finalization. One Pages job deploys and checks the built
Storybook after successful publication.

AI summaries are optional and accept the upstream provider-neutral JSON through
`CHANGELOG_SUMMARY`. Release notes live on GitHub. Existing source changelogs
remain historical; Lerna runs with `--no-changelog`.

## Updated consequences and supporting evidence

As inspected on 2026-11-05, ci-github-nodejs `2.0.0` supports one package.
Workspace support is in
[PR #563](https://github.com/hoverkraft-tech/ci-github-nodejs/pull/563), whose
checks passed at commit `46ff06afac07e5498ce1b5e3921cdbd2aaed39f4`. At that inspection, the caller
used an immutable evaluation pin and required a published release
containing workspace support before merging. Version pins are maintained in the
workflow files.

The `github-pages` environment was restricted to the `main` branch at
inspection. It must also permit release tags. The same environment name is
retained for npm trusted publishing; each public package needs an active trusted
publisher for this repository and `release.yml`. App credentials must be
available outside the environment because preparation has no environment
binding.

This removes consumer release scripts and their duplicate tests. It keeps action
behavior tests upstream and package validation in the consumer's shared CI. The
existing pull-request workflow entry point and package runtime versions are
unchanged. Local build and validation results belong in the PR, not this
historical record.

Consumer validation found that npm rejects a publication dry run for versions that
are already published, including Reactionable's current package versions. The
upstream PR now limits npm force mode to dry runs, with an existing-version fixture
in its publish-action workflow tests. Live publication retains npm's version checks.

The npm registry returned six of the seven committed `0.28.32` package versions
on 2026-11-05. `@reactionable/react-router@0.28.32` was absent; that package's
published latest version was `0.28.29`. This is a historical publication gap to
review against the first planned batch, not a reason to invent a historical tag
or overwrite an existing version.

### Partial configuration override (2026-11-05)

Replace the duplicated `.github/release-config.yml` with the shared workflows'
`release-config` input. Define the name and `v` tag settings once in the caller
and pass the same YAML to preparation and release. This supersedes the dedicated
repository configuration file in the updated decision. Other version rules and
release-note formatting inherit upstream defaults. Override semantics follow
ci-github-publish's per-key replacement, including lists and mappings.

### Stable release adoption (2026-11-08)

[ci-github-nodejs 2.1.0](https://github.com/hoverkraft-tech/ci-github-nodejs/releases/tag/2.1.0)
published the workspace release support. The caller now pins that stable release
for preparation, validation and publication, superseding the evaluation-pin
requirement above. The fixed Lerna versioning and artifact handoff decisions
remain unchanged.

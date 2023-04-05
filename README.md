# Toot CLI

by [Nicholas C. Zakas](https://humanwhocodes.com)

![Node CI](https://github.com/humanwhocodes/toot/workflows/Node%20CI/badge.svg)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Description

A simple CLI for sending Mastodon toots. This is intended for use in CI systems such as GitHub actions in order to enable to Mastodon notifications of important events.

## Usage

You must have Node.js to use this package.

To start, you must have created a Mastodon application. To do so:

1. Log in to your Mastodon server
1. Click "Preferences"
1. Click "Development"
1. Click "Create application"

Your application will be assigned an access token and you'll need that access token to use this package.

Next, define your environment variables:

* `MASTODON_ACCESS_TOKEN` - your access token
* `MASTODON_HOST` - your Mastodon host (i.e., `mastodon.social`)

The CLI will not work without these environment variables.

Then, you can run the CLI and pass a message on the command line using `npx`:

```
$ npx @humanwhocodes/toot "Hello from the command line!"
```

If successful, the CLI will output the response from Mastodon.

### Testing with dotenv

If you'd like to test with [`dotenv`](https://npmjs.com/package/dotenv), define an additional environment variable `TOOT_DOTENV=1` before executing the CLI. This will cause a local `.env` file to be read before executing.

### Using in a GitHub Workflow

Be sure to set up [GitHub secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) for each environment variable. Then, you can configure a job like this:

```yaml
jobs:
  Toot:
    name: Toot Something
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v3
        with:
          node-version: 12
      - run: 'npx @humanwhocodes/toot "Your Toot text"'
        env:
          MASTODON_ACCESS_TOKEN: ${{ secrets.MASTODON_ACCESS_TOKEN }}
          MASTODON_HOST: ${{ secrets.MASTODON_HOST }}
```

### Developer Setup

1. Ensure you have [Node.js](https://nodejs.org) 18+ installed
2. Fork and clone this repository
3. Run `npm install`
4. Run `npm test` to run tests

## Troubleshooting

**Console says "Required environment variable 'MASTODON_ACCESS_TOKEN' is an empty string."**

You haven't setup the correct environment variables for Toot CLI. Double check that you don't have any misspellings in your environment variable settings.

**GitHub Actions console says "Required environment variable 'MASTODON_ACCESS_TOKEN' is an empty string."**

You're probably trying to use the Toot CLI during the `pull_request` event. This won't work because secrets are not available when a pull request is from a fork. Try using the `pull_request_target` event instead. ([More information](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_target))

## License and Copyright

This code is licensed under the Apache 2.0 License (see LICENSE for details).

Copyright Human Who Codes LLC. All rights reserved.

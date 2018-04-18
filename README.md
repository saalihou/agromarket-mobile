# AgroMarket Mobile

This is the mobile app for the AgroMarket project.
It is a React Native based project.

Most of the core functionality are implemented under the [js](./js) folder.
It contains application [screens](./js/screens), [reusable UI components](./js/components) and business logic encapsulated under the [stores](./js/stores).

You can also find under it various utilities and theming files.

## Documentation

[Stores Documentation](./js/stores/API.md)

[Components Documentation](./js/components/API.md)

## Collaborate

We use [yarn](https://yarnpkg.com/) for dependency management.

Don't forget to document your code with [flow](https://flow.org/) and [jsdoc](http://usejsdoc.org/) and write unit tests for your code with [Jest](https://facebook.github.io/jest/)
If you want to update the docs, just run `yarn docs`.
You can find doc configuration under each folder's `documentation.yml` file.

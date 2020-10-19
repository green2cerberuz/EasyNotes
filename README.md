# EasyNote

A javascript project to test some language features an development tools.
Easy note lets you write, edit and delete some temporary notes in localStorage. Notes, can be scribles, fast notes, when paper is not available :)

## Notes about the project

I tried to use jest wihout babel to import/export functions inside my tests using an experimental feature. Guided by this open [issue](https://github.com/facebook/jest/issues/9430), it indicate basic steps to make it work. In the end I didn't follow that path because it had little support, but leaving it here to test in the future.

## Tests

To run project test, in root folder run:

```npm tests```

Test are made it with jest, To deep dive inside jest test see [docs](https://jestjs.io/docs/en/getting-started)

Check how jest was configured with babel.

## Project Structure

We are using husky package, to run test before commits in a githook. See `huskyrc.json` to see how was configured.

## Eslint

For code style we are using eslint with airbnb guidelines. Need to fix problems when applying code style on save method in vs code. Run eslint automatically.
Note: If eslint stop working, to debug it try to run eslint command manually to see terminal output
Last error was because i have an invalid configuration in .eslintrc

## Run the project

To run easyNote project inside root folder, type:
`npm run light-server`.
Also can use embedded vscode server to show the front end side.

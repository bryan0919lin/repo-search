# Search repo from GitHub
This is a very simple application that could search repo info from GitHub. This application use infinite scroll rather than typical pagination, so let's have different experience to use this App.

## How to start
This App is implemented by Next.js. To launch this App in browser, you need to do the following steps:

### npm install
Before you launch this App in local enviroment, please run `npm install` to install necessary dependencies.

### npm run dev
If you want to develop this App, you can launch this App in dev mode through `npm run dev`

### npm run build
To launch this App in production mode, you need to run `npm run build` to build artifacts in advance.

### Almost done
When you run `npm run dev` or `npm run build && npm start`, you can visit this App in `http://localhost:3000`. Here is the preview when you succeed visit this App:

### npm start
Ensure you have already build artifact by `npm run build` before you start this App with `npm start`

## Development
To develop this App, you can run `npm run dev` to launch it in `http://localhost:3000` that will hot deploy any changes you made so that you can view result without re-launch App.

### Unit test
Here we introduce `jest` and `react-testing-library` to run our unit tests. If you create/modify a component, don't forget add/revise unit tests to ensure code quality.

Here are the guildlines for writing unit test:
1. Must write unit tests for `util functions`
1. Write unit tests for `custom hooks` as possible as you can
1. For componts that is hard to wirte unit test, I recommand you to move these tests to e2e.

To run all unit test, execute this command `npm run test`.

### E2E test
We use `playwright` to write our e2e testing, that need to host UI than run each test case accordingly. (Playwright can run tests in parallel, but currently I didn't have time to config it.)

For our config, we use `headless` browser to speed up the testing process. But if you want to check any behavior that test is running, you can modify `playwright.config.ts` to set prop `headless` to `false`, Thus you can see a real browser opened and do actions by testing scripts.

To run e2e tests, you need to do the following steps:
1. Run `npm run dev` or `npm start`, then wait for UI hosted.
1. Open another terminal, then execute `npm run test:e2e`. 
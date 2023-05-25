# Github GraphQL API Test

This application uses Github GraphQL along with React. This application allows you to search through all the repositories on the Github platform, as well as view general information about them.

## Installation

First of all, you need to clone the project to your device. To do this, open the console in the directory where you want to place the project and enter the following command:

```bash
git clone https://github.com/skifton/github-graphql-test.git
```

The next step is to set up the project and the environment. At the root of your project, create a folder called `.env` and put the access token from your Github there.

```bash
VITE_REACT_APP_GITHUB_API_KEY="YOUR_TOKEN"
```

The last step to complete the setup is installing the dependencies. To install all required dependencies for the application, open a terminal in the root folder of the project and run the following command.

```bash
npm install
```

That's all! Your project is ready to run and use.

## Usage

To run the application, you need to launch the terminal in the root folder of the project and run the command

```javascript
npm run dev
```

# HEAP Group 14 - SGH Compactor Management System

This project aims to solve a problem that SGH-Physiotherapy department is currently having with asset tracking.

# Things to note when pushing
1. https://sgh-compactor-manager-system.herokuapp.com/
2. make sure app can run before pushing because heroku has not been configured to make checks (to do)
3. If dependencies are added, please update the package.json and package-lock.json with `npm install` and push them both as heroku will use them to install the dependencies and rebuild the website at every push, and will crash if the build is unsuccessful (to be configured)
4. If api keys or sensative data are needed, put into .env and send to tele group, it will need to be added into heroku



# How to Start App on Local Machine
0. Put a copy of the .env file in the root directory
1. Open new Terminal and run `npm install`.
2. In the same terminal run `npm run serve` this will setup API connection with MongoDB. 
3. Create a new terminal and cd into the frontend folder.
4. Run `npm install` .
5. After packages are installed, run `npm run start` this will setup the frontend react web application.
6. Download VSCode Extension "REST Client" by Huachao Mao to Test Backend APIs via "Compactor API Testing.rest" and "Logging API Testing.rest"


# Packages and Libraries Used
## Frontend (General)
1. react-router-dom [docs](https://v5.reactrouter.com/web/guides/quick-start)
2. react-boostrap [docs](https://react-bootstrap.github.io/components/navbar/)
3. react-router-bootstrap [docs](https://github.com/react-bootstrap/react-router-bootstrap)
4. material-ui [docs](https://mui.com/material-ui/getting-started/overview/)

### Dashboard Page 
1. Recharts [docs](https://recharts.org/en-US/guide)

## Backend
1. Nodemon [docs](https://www.npmjs.com/package/nodemon


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

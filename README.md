# Conference Hall

[![circleci](https://circleci.com/gh/bpetetot/conference-hall.svg?style=shield)](https://circleci.com/gh/bpetetot/conference-hall)
[![Greenkeeper badge](https://badges.greenkeeper.io/bpetetot/conference-hall.svg)](https://greenkeeper.io/)

## Getting started

1. Clone the Conference Hall app

```
git clone https://github.com/bpetetot/conference-hall.git
```

2. Install dependencies with yarn

```
yarn
```

3. Configure the app with [Firebase](#configure-firebase) and [Google APIs](#configure-google-apis)

4. Start the app

```
yarn start
```

### Configure Firebase

1. Create a firebase project with the [firebase console](https://console.firebase.google.com).

  * activate "Cloud Firestore" for Database
  * activate "Google Provider" for Authentication

2. Create a `.env.local` file by copying `.env` file at root folder and set firebase environment variables.

  * REACT_APP_API_KEY=<API_KEY>
  * REACT_APP_AUTH_DOMAIN=<AUTH_DOMAIN>
  * REACT_APP_PROJECT_ID=<PROJECT_ID>

3. Install [firebase-cli](https://firebase.google.com/docs/cli/) :

```
npm install firebase-tools -g
```

4. You must be logged with firebase and select project :

```
firebase login
firebase use --add
```

> [Firebase documentation](https://firebase.google.com/docs/web)

### Configure Google APIs

Activate the following APIs in the [Google developer console](https://console.developers.google.com/apis) :

* Google Places API Web Service
* Google Maps Embed API
* Google Maps JavaScript API

### Configure nodemail

Configuration of gmail account tot send email, here the command to register those variables:
As per [Google functions samples](https://github.com/firebase/functions-samples/blob/Node-8/quickstarts/email-users/functions/index.js):
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha

```
firebase functions:config:set gmail.email=“…” gmail.password=“…” app.url="https://rivieradev-db8f5.firebaseapp.com"
```

To test cloud functions with Mailgun on local machine (with cloud function shell), you will need to generate `.runtimeconfig.json` file with environment variables :

```
firebase functions:config:get > .runtimeconfig.json
```

> **Important Note:** nodemail usgae is limited tosend to our own emai
## Deploy with Firebase

Build and deploy the app :

```
yarn build
firebase deploy
```

## Frequent questions & issues

### Generate Beta Access keys

The application is still in beta mode for the organizer part, you will need to generate an access key in the database.

**To do it:**
- Go to the firebase console
- Select your project
- Go to the "Database" tab
- Create a collection named "betaAccess"
- Create an empty document with a generated ID
- This generated ID will be your access key

### Add a custom domain

If you want to use a custom domain, you will have to [configure Firebase accordingly](https://firebase.google.com/docs/hosting/custom-domain)

Then you will also need to configure Authentification providers to use your custom domain.

**To do it:**
- Change in your `.env.local` file, the `authDomain` property with your custom domain
- Follow instruction in chapter ["Customizing the redirect domain for Google sign-in"](https://firebase.google.com/docs/auth/web/google-signin)

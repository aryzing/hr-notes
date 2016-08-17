# Google Cloud Platform Deployment
Install SDK. [Link](https://cloud.google.com/sdk/docs/).

For every project, run
```sh
gcloud init
```

# Hello World Node.js GCP tutorial
[Link](https://cloud.google.com/nodejs/getting-started/hello-world).

Uses **App Engine**.

Repo. This repo contains code for all Node.js tutorials and examples.
```
git clone https://github.com/GoogleCloudPlatform/nodejs-docs-samples
```

## Basic configuration
Express:
```js
app.listen(process.env.PORT || '8080')
```

`app.yaml`:
```yaml
runtime: nodejs
vm: true # instructs to use "flexible environment"
```

`package.json`:
```json
{
  "engines": {
    "node": "6.2.0"
  }
}
```

## Deployment
Deploy command:
```sh
gcloud preview app deploy
```

Deploys at `https://<your-project-id>.appspot.com`.

## Additional reading
What it means to run in a **flexible environment**: [link](https://cloud.google.com/appengine/docs/flexible/).

Overview of App Engine: [link](https://cloud.google.com/appengine/docs/flexible/nodejs/an-overview-of-app-engine).

# Bookshelf tutorial
[Link][2].

# Express Tutorial
[Link](https://cloud.google.com/nodejs/resources/frameworks/express).

## Deployment Script
Add to `package.json`:
```json
{
  "scripts": {
    "start": "node ./bin/www",
    "deploy": "gcloud app deploy --project <your-project-id>"
  }
}
```

# Webpack Tutorial
Sample `package.json` configuration:
```json
{
  "scripts": {
    "bundle": "webpack --config webpack.config.js",
    "prestart": "npm run bundle",
    "start": "node server.js",
    "deploy": "gcloud app deploy --project webpack-tutorial"
  }
}
```

# Debugging an instance
[Link][1].

# Google Cloud Storage
Start with [Bookshelf Tutorial][2].



[1]:https://cloud.google.com/appengine/docs/flexible/nodejs/debugging-an-instance
[2]:https://cloud.google.com/nodejs/getting-started/tutorial-app

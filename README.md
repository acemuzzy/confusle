# Confusle!

This is a variant of the popular word guessing game we all know and love. Made using React, Typescript, and Tailwind.

The main live version is hosted at https://confusle.positronicarts.com/.  Rules are within the app.  Can you handle Hard Mode??

It was made on top of https://github.com/cwackerfuss/react-wordle, which has lots of additional advice on e.g. languages, telemetry etc.

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd react-wordle
$> npm install
$> npm run start
```

### To build/run docker container:

#### Development

```bash
$> docker build -t reactle:dev -f docker/Dockerfile .
$> docker run -d -p 3000:3000 --name reactle-dev reactle:dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

#### Production

```bash
$> docker build --target=prod -t reactle:prod -f docker/Dockerfile .
$> docker run -d -p 80:8080  --name reactle-prod reactle:prod
```

Open [http://localhost](http://localhost) in browser.

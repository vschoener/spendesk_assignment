# Spendesk assignment API

Backend assignment that use:
- Node
- Flow
- MongoDB
- Babel

## Requirements
- Node >= 10.x
- Mongodb >= 5.x

## Info
Project use Flow to type hint the code and enforce it and it uses babel to
transpile the es6/7/flow code to be read everywhere.

## Common usage

Setting up the .env if required (Mandatory with Docker usage) and set your values
```bash
> cp .env.sample .env
```

## Installation

Project uses a Makefile to shorcut the commands, you are free to look inside and use
docker-compose command on its own.

``` bash
# Using Docker

> make build
> make install
```

``` bash
# Locally

> npm install
> npm run build
> npm start
```

### Developer

## Watch your code

```bash
# Using Docker

> make watch
```

```bash
# Locally

> npm watch
```

# Usage

Depending how you set your `.env` file, go to your browser or use Postman like app
and request: `http://localhost:8080`

You should see the current api version

# API Documentation

Documentation can be see in the project, run

```bash
# Docker
> make apidoc

# Locally
> npm run apidoc
```

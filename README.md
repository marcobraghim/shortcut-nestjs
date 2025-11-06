# URL Shortcut

Smart way to make URLs shorter

## Description

Architecture of the entire backend for a system that take any URL and make it short. The structure of the system must be such robust that may be able to have more than one thousand of users by hour.

### Functional requirements

1. Make any URL shorter
1. Redirect to the original URL when user access it (frontend)

### Non Functional requirements

1. Ability to create 100 milions of new URLs per day
1. Generated URL must be as short as possible (7 chars = 62^7)
1. Only numbers and letters are allowed: `[0-9a-zA-Z]` 
1. For each CREATE operation the system must expect 10 readings
1. The average size of each URL is 100 bytes
1. Minimum of 10 years of storage for each URL 
1. The system must be available 24/7

### Database Postgres

For the main operation which is URL shortening, we will use a simple table ():

| shortcode (PK) | target_url                            | created_at          |
|----------------|---------------------------------------|---------------------|
| abc123         | https://www.example.com/very-long-url | 2025-11-05 14:30:00 |
| xyz789         | https://www.another-site.com/page     | 2025-11-05 14:31:15 |

### HashID with secret key

To make sure that will not be possible to guess the next URL shortcode we will use the hash generator in base 62 with a secret key.

### Increment ID generator outsourcing

Redis INCR Counter starting from 14 milion to make sure that the first shortcodes will not be shorter than 4 chars.

## Project setup

```bash
$ docker compose up -d
```

If you looking for continue the development of the project, run the `docker compose up` command without the `nestjs` section to raise up only the `redis` and `postgres` and then continue by running the project locally, just like below.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

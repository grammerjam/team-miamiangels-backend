# Cinemate - Server

Cinemate Backend is the server-side component of the Cinemate project, responsible for handling data storage, retrieval, and business logic.

## From Design

<img width="1320" alt="Figma-ent-app" src="https://github.com/grammerjam/team-miamiangels-backend/assets/53446311/cd29df26-2a7c-4b83-a5a7-fe2fb7ff3a7d">

### To Website

<img width="1851" alt="ent-app" src="https://github.com/grammerjam/team-miamiangels-backend/assets/53446311/bf3e9596-dd74-4a10-8eae-1c9a88e5acd8">



### Website Link

[Visit Website](https://develop--transcendent-arithmetic-b66dd1.netlify.app/)


## Table of Contents

- [Server Tech Stack](#server-tech-stack)
- [Features](#features)
- [License](#license)
- [Usage/Examples](#usageexamples)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Related](#related)
- [Credit](#credit)
- [Acknowledgements](#acknowledgements)

## Server Tech Stack

- [Express](https://expressjs.com/)
- [Clerk](https://docs.clerk.dev/))
- [Cors](https://www.npmjs.com/package/cors)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)

## Features

- User Authentication and Authorization
- Configurations for the handling of Users and the User's Media Content
- Data Storage and Retrieval with MongoDB and Prisma
- Environment Variable Configuration
- Server-side Routing and Middleware with Express
- Cross-Origin Resource Sharing (CORS) handling with Cors middleware

## Usage/Examples

```trendingController.js

        // If there's no user, or if the user has no bookmarks, return 10 random media

  if (!user || user.bookmarkIds.length === 0) {
    let trending = []
    let indexes = new Set()
    for (let i = 0; i < 10; i++) {
      let index = Math.floor(Math.random() * media.length)

      while (indexes.has(index)) {
        index = Math.floor(Math.random() * media.length)
      }

      trending.push({...media[index], score: 0})
      }

    return res.json(trending.slice(0, 10))
  }

```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`PORT`

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`BUCKET_NAME`

`BUCKET_REGION`

`CLERK_SECRET_KEY`

## Run Locally

Clone the project

```bash
  git clone https://github.com/grammerjam/tg-main.git
```
Go to the project directory
```bash
  cd team-miamiangels-backend
```
Install dependencies
```bash
  npm install
```
Start the server
```bash
  npm run start
```

## Related

Here are some related projects
https://movie-web.app/browse/game

## Credit - Team MiamiAngels

[Jose Facade](https://www.linkedin.com/in/jfacade/) - Full Stack Developer / Audio Engineer & Director | [GitHub](https://github.com/jluiscool)

[Alejandro Vecchio](https://www.linkedin.com/in/alejandro-vecchio/) - Lead Developer | [GitHub](https://github.com/aliv314)

[Olivia Banks](https://www.linkedin.com/in/olivia-banks-/) - Project Manager / Athlete

[Luis Perez](https://www.linkedin.com/in/lperezdev/) - Full Stack Developer / Powerlifter | [GitHub](https://github.com/LEPII)


## Acknowledgements

Special thanks to Allan Tito and the senior developers from the Grammerhub community for making this project happen.

______________________________

**Powered by [Grammerhub](http://discord.grammerhub.org)**

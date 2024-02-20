# Cinemate - Server

Cinemate Backend is the server-side component of the Cinemate project, responsible for handling data storage, retrieval, and business logic.

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
- [Cors](https://www.npmjs.com/package/cors)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)

## Features

- User Authentication and Authorization
- Data Storage and Retrieval with MongoDB and Prisma
- Environment Variable Configuration
- Server-side Routing and Middleware with Express
- Cross-Origin Resource Sharing (CORS) handling with Cors middleware

## Usage/Examples

```prisma

model User {
  id            String        @id @default(auto()) @map("_id") @db.ObjectId
  email         String        @unique
  password      String?
  role          Role          @default(USER)
  bookmarkId    Media         @relation(fields: [bookmarkIds], references: [id])
  bookmarkIds   String[]      @db.ObjectId
  genreInterest GenreInterest
}
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`PORT`

## Run Locally

Clone the project

```bash
  git clone https://github.com/grammerjam/tg-main.git
```
Go to the project directory
```bash
  cd cd team-miamiangels-backend
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

* Jose Facade - Full Stack Developer /Audio Engineer & Director | LinkedIn | GitHub
* Alejandro Vecchio - Lead Developer  | LinkedIn | GitHub
* Olivia Banks - Project Manager / Athlete | LinkedIn
* Luis Perez - Full Stack Developer / Powerlifter | LinkedIn | GitHub

## Acknowledgements

Special thanks to Allan Tito and the senior developers from the Grammerhub community for making this project happen.

______________________________

**Powered by [Grammerhub](http://discord.grammerhub.org)**

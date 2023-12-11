# Standup Notes App

## Overview

This application is designed to streamline the process of logging and managing standup meeting notes. It allows users to add and remove team members, select speakers, and keep track of notes on a daily basis.

### Features

- Add and remove team members
- Select speakers for standup meetings
- Log notes for each standup session
- View history of past standup notes

## To-Do

- [ ] Move UI components out to make the codebase more modular and manageable.
- [ ] Apply styling to enhance the UI/UX of the application.
- [ ] Write basic tests to ensure the reliability and integrity of the application.
- [ ] Markdown support wysiwyg editor
- [ ] AI summary of the week
- [ ] Typescript
- [ ] Next.js 
- [x] Expand API support for logging and managing notes.
- [x] Playwright tests against test database
- [x] Implement database migrations with Sequelize for scalable data management.

## Running the Application

### Prerequisites

- Node.js
- npm

### Getting Started

Clone the repository
   ```bash
   git clone <repository-url>
   ```

Install the dependencies
   ```bash
   npm run install:all
   ```

DB
   Setup the DB
   ```bash
   npm run db:setup
   ```

Start the Server

   ```bash
   cd server
   npm run start:nodemon
   ```

Start the client

   ```bash
   cd client
   npm run start
   ```

### Database
   DB admin
   [DB Browser for SQLite](https://sqlitebrowser.org/)

   Create a migration
   ```bash
   npm sequelize-cli migration:create --{name}
   ```
   
   Run a migration
   ```bash
   npm run db:migrate
   ```

   Seed the db
   ```bash
   npm sequelize-cli db:seed:all
   ```

### Test
   Run Playwright tests
   ```bash
   npx playwright test --ui
   ```npm cache clean --force

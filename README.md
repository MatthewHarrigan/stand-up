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
- [ ] Expand API support for logging and managing notes.
- [ ] Implement database migrations with Sequelize for scalable data management.
- [ ] Write basic tests to ensure the reliability and integrity of the application.
- [ ] Implement additional features such as user authentication and authorization.
- [ ] Markdown support wysiwyg editor
- [ ] AI summary of the week

## Running the Application

### Prerequisites

- Node.js
- npm or yarn

### Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Run the db migrations

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

3. Start the Server

```bash
npm run start:nodemon
```

4. Start the client

```bash
npm start
```

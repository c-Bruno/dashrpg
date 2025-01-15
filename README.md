
<h1 align="center">
  <br>
  <img src="/public/assets/readme/MythicDashboard.webp" width="200">
  <br>
  Mythic Dashboard
  <br>
</h1>

<p align="center">
  <a href="#overview">Overview</a> • 
  <a href="#key-features">Key Features</a> • 
  <a href="#how-to-use">How To Use</a> • 
  <a href="#technologies-used">Technologies Used</a> • 
  <a href="#license">License</a>
</p>

![screenshot](/public/assets/readme/Preview.gif)

## Overview

**Mythic Dashboard** is an adaptable RPG platform aimed at creating a customized character sheet system using React. The core idea is to develop an RPG character management system that features a dashboard for the game master (GM), displaying a list of all characters registered by players. The GM can quickly view player health, sanity, and images, while also managing characters through CRUD operations as needed.

## Key Features

- **Custom Character Sheets**: Tailored character sheets for an immersive RPG experience.
- **Game Master Dashboard**: A user-friendly interface for managing player characters.
- **Real-Time Communication**: Utilize Socket.io for seamless interaction between the server and clients.


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone the project to your local machine or download the ZIP file.
$ git clone https://github.com/c-Bruno/dashrpg.git

# Go into the repository
$ cd dashrpg

# Install dependencies
$ npm install

# Run the migrations
$ npx prisma migrate reset

# Run the app
$ npm start
```


## Technologies Used

- **React**: For building the user interface. (Version 18.3.1)
- **Next.js**: Utilizing Server-Side Rendering (SSR) and REST API. (Version 12.1.5)
- **Prisma**: As an Object-Relational Mapping (ORM) tool.
- **MySQL**: Relational database for data storage.
- **Socket.io**: For real-time communication between server and client.


## License

This project is licensed under the MIT License.

---


## CODECAMP : INCLUKATHON

These apps are a platform allowing its users to communicate for Inclusion Conseil's event "Inclukhaton". They're composed of **a calendar, a chat service, a contact lists of all the participants, a profile page and an administrator dashboard**. The front app is built with **Vue.js (JavaScript)**. The API is built with **Nest.js (TypeScript)**, and **Prisma**, for database mapping. The app also features a socket servive running with **Socket.io**.

Users are all attributed a group, with which they can communicate by group chat (administrators have their own group). Admins can chat with every group.

Users are managed through a role system : *admins* can create and delete users and groups, and attribute them a role and a group, while *coaches* can see and create users within their own group. *Users* can update their own profile. All these actions are managed through an admin and coach board.

# Install

To install the project, please enter this command:

```bash
yarn install
```

In the three following folders:
-api
-socket-service
-website-vue

# Launching the project

As a prerequisite, a relationnal database needs to be installed and running.
You also need to create a .env file in the root API folder as per the .env.example.
The secret variable will be used by the JWT library to sign and verify the tokens.

To launch the project, please enter the following commands:

```bash
yarn start
```
In the API folder.

This command:
```bash
yarn socket
```
In the socket-service folder.

And this command:
```bash
yarn serve
```
in the website-vue folder.

# In case of error

If you encounter an error, please remove the "Node_module", "yarn.lock" files with the following command:

```bash
rm {name of the file}
```

For more specifics commands, please look for the READ.ME files in the three main folders. They contains all the different commands to manage the project.

# Open localhost:8080 in your browser

You're good to go!
You can log in the sample profiles with the following credentials:

- admin@etna.io:admin is an admin account
- ahmed@etna.io:ahmed is a coach account
- emmalaura@etna.io:emmalaura is a user profile

A documentation for the API can be found at https://documenter.getpostman.com/view/23956928/2s8YzXvfDU
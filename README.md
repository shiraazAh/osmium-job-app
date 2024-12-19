# Osmium Job App

This is a app where user's can look and apply for new jobs. You can access the deployed version of the app here: https://osmium-job-tracker.netlify.app/

## Installation

- `git clone` the project - `git clone https://github.com/shiraazAh/osmium-job-app.git`
- Install the dependencies `npm install`
- Run the project using `npm run dev`

## Project Resources

- The Kanban board we followed to keep progress with our tasks: https://github.com/users/shiraazAh/projects/2
- THe figma design that we followed to create the app according to design : https://www.figma.com/design/irAe81EmWNtlsH9TAFwMxA/Osmium-App?node-id=0-1&t=uF2CTQF2iwjlKJ7D-1

## Project Setup

- This project is made with Vite (React), and the jobs are retrieved from a public API provided by: https://www.themuse.com/developers/api/v2?ref=public_apis
- Used Aws Cognito & AWS Ampify to deal with authentication - Signin Signup
- Used DynamoDB to store job applications
- Created PUT, GET API's with AWS Lamda and API GAteway
- The project is also deployed using netlify to: https://osmium-job-tracker.netlify.app/

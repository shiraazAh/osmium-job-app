# Osmium Job App

This is a app where user's can look and apply for new jobs. You can access the deployed version of the app here: https://osmium-job-tracker.netlify.app/. 

(The github repository link is: https://github.com/shiraazAh/osmium-job-app )

# Steps to use the app

## 1. Installation

- `git clone` the project if you don't have the project already - `git clone https://github.com/shiraazAh/osmium-job-app.git`
- Install the dependencies `npm install`
- Run the project using `npm run dev`

## 2. Logging in

- After you run or use the app, you will be asked to login. Creating a account should be easy but we have provided a sample login below:

- Email: taxaro1532@evusd.com
- Password: maynooth

# Project Application Requirements we have included

- Using an API - Used in Multiple components like AuthenticatedRoutes.jsx, AllJobsPage.jsx and more
- A source of external JSON (created by yourself?) - Created jobData.json under utils folder which is used in AllJobsPage.jsx
- Conditional rendering - Almost on every pages we have done this.
- Project specific sorting, filtering, searching - Used in MyApplications.jsx and AllJobs.jsx
- Using a selection of User-Interface elements - Used Ant design components, AWS Amplify Authentication component and few other custom built components
- Parent-child communication - Almost on every component we have done this.
- Using multiple components - have used multiple components everywhere
- Developing your own computation / algorithms - Have used salary generator & random image generator in JobCard.jsx
- Using a database - used dynamodb to add applied job.
- Using React Router - Reeact router is added in App.js & AuthenticatedRoutes.jsx.

# Project Contribution List

- Oliver Glenn Craigie - JobPagination.jsx, JobCard.jsx, AllJobsPage.jsx, ApplicationSuccess.jsx, JobDetailsPage.jsx, AuthenticatedRoutes.jsx
- Hema Lalitha Surya Somashekar Ganti - GradientButton.jsx, BottomBar.jsx, EditProfile.jsx, ProfilePage.jsx, AuthenticatedRoutes.jsx
- Oisin Stephen Dillon - JobPagination.jsx, Navbar.jsx, JobCard.jsx, MyApplicationCard.jsx, AllJobsPage.jsx
- Shiraaz Ahammed - All Backend work (AWS Cognito, DyanamoDB & API Creation), Main.jsx, App.jsx, AuthenticatedRoutes.jsx, MyApplicationsPage.jsx, BottomBar.jsx, AllJobsPage.jsx, ProfilePage.jsx, SecondaryButton.jsx


# How we created the App:

To create the project we took the same approach most companies take:

- Started with creating a figma design to help us decide the tasks and how the app looks (Most of the design components were taken from free figma community shared designs & altered): https://www.figma.com/design/irAe81EmWNtlsH9TAFwMxA/Osmium-App?node-id=0-1&t=uF2CTQF2iwjlKJ7D-1
- Then created a Kanban / project board which we used to assign tasks and keep progress with our tasks: https://github.com/users/shiraazAh/projects/2
- Project was created Vite (React), React Router, Ant design library and the jobs are retrieved from a public API provided by: https://www.themuse.com/developers/api/v2?ref=public_apis.
- Everyone created their own pull requests with their own branches, and the code was reviewed by us before merging to main branch. To take an example here is a discussion that happened before merging: https://github.com/shiraazAh/osmium-job-app/pull/52
- Created Authentication with Cognito & Amplify on AWS console as mentioned here: https://docs.amplify.aws/gen1/react/start/getting-started/installation/
- Created NoSql AWS DynamoDB database with GET & PUT API (Lambda + API Gateway) which we learned from here: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html
- Deployed our app to netlify: https://osmium-job-tracker.netlify.app/
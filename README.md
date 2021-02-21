![Preview](https://i.imgur.com/gkuiOQl.png)
# Artifacts Client

Use ReactJS to create an archive of custom artifacts. This repo is for the front-end [deployed site](https://anthony-rodriguez.github.io/artifacts/) and speaks with the [back-end](https://github.com/Anthony-Rodriguez/artifacts-api) that was designed for this.

Create an account and sign in. You'll be on the home page with a navbar that will allow you to traverse the site. Click on Create Artifact to start making your first Artifact. After the fields have been completed, submit the form to create your first artifact. The 'My Artifacts' button will show all the artifacts you have. Clicking on an artifact will bring you to the artifact's information page. From here, you can either delete or update your artifact by clicking the corresponding button. Deleting an artifact will permanently remove it from the database, so be careful! The update button will bring you to the update page. Fill out the entire form and hit submit to save your changes. Changing your password is simple, but there's no forgot-password functionality at the moment, so be sure to save it. Signing out will prevent others from accessing your characters, so don't forget to sign out if you plan on keeping the window open!

## Getting Started

1. Fork and clone this repository.
1. Change into this directory
1. Create and checkout a new branch.
1. run `npm install`
1. use `npm start` to run the server and see changes in real time.

Note: This repo is set to run with the api mentioned above, if you would like to use a different api, make changes to apiConfig.js

## Planning Story

Following my character archive project, I decided to make a similar project for artifacts the characters can wield. I intend to make it similar to [D&D Beyond's website](https://www.dndbeyond.com/magic-items), but it's obviously going to take a bit more than V1.

Now, you may be thinking "Tell me github-user Anthony-Rodriguez, isn't this basically the same as your character archive?" Well yes, stranger, you're right! There are some key differences though. For the back-end I went with a Django REST framework. It was my first time coding in Python and, while I enjoyed it, it didn't come without its own challenges. For the front-end I used ReactJS. I used it before on a group project, but it's my first time creating something on my own like this.

Long story short: I wanted to practice and learn.

## Problem Solving Strategy

I find that I've gotten much better at finding and debugging my bugs. When I spent too much time on an error, I would open a support ticket and receive help from the instructors, but a few times I solved the issue after filing the ticket. Aside from those things, I also utilized my cohort by asking them questions.

## User Stories

- As a user, I want to sign up so I can have access to my database
- As a user, I want to sign in so I can access my account
- As a user, I want to be able to change my password for security
- As a user, I want to sign out of my account to prevent others from using it.
- As a user, I want to be able to create an artifact
- As a user, I want to edit the artifacts I have made
- As a user, I want to delete the artifacts I have made
- As a user, I want to see the artifacts I have made

## Technologies Used

- JavaScript
- HTML
- AXIOS
- SASS
- ReactJS
- React-Bootstrap

## Unsolved Problems/Planned Updates

- Actively testing for bugs.
- Add a search bar for artifacts
- Add buttons to filter by category


## Wireframes

![Sign-Up](https://i.imgur.com/6f6wCPl.png)
![Sign-In](https://i.imgur.com/58qgrEG.png)
![Artifacts view](https://i.imgur.com/3TJzwQg.png)

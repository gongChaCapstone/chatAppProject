# Red Panda ASL
Who said learning couldn't be fun! Red Panda is an interactive app to learn basic sign language. Mimic the hand gestures on the screen to learn ASL (American Sign Language), the more you learn the more tests you can unlock. Earn points as you go and fight for a spot on the leaderboard!

# Tech Stack
Red Panda was built using React and Redux for state management on the front-end, and was styled using TailwindCSS. Hand detection was done using the Handpose and Fingerpose models from Tensorflow.js. The back-end and database was done using Express, Sequelize, Postgres and Node.js.

# Setup & Start

1. Install dependencies: `npm install`
2. Sync and seed your database by running `npm run seed`
3. Use `npm run start:dev` to start a local server (on port 8080)


# How to play
1. Make an account and log in
2. Complete a lesson by mimicking the hand gestures on the screen
3. Unlock tests as you complete lessons
4. Complete a test by either showing the hand gesture given the letter or typing in the letter given the gesture.
5. Earn points as you complete lessons and tests and see if you can top the leaderboard!

# Play here: https://redpandaasl.herokuapp.com/

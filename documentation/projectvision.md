# Projectvision

There is multiple ways to create diagrams/charts throughout programs like Excel and Word in the microsoft package. I know that I do not have the time nor resources to create/compete against any microsoft software, this is not meant to compete on the market and is just a fun projekt to facilitate learning in the course 1DV610 at Linnaeus University's Webprogramming program. I want to create a fun and easy little application that only lets user create charts/graphs by just inserting data points fast. The goal is to integrate the npm module `@jenvont/datavisualizer` created by me in the same course.

## Target Group

I do not have a specific target group for this project, it is for everyone and isn't geared to any specific group. Though the demographic most likely to use it is teens and kids that would like to just play around with creating graphs/charts, its simplicity also helps torwards this demographic and it could be suitable as a mobile application aswell in the future.

## Market

As mentioned above, creating graphs/charts is not a new idea and is present in a lot of data managing applications (Among the most popular being Excel and Word in the microsoft office package, which is data and word managing applications that integrates data organization, manipulation and visualization) which makes the idea very hard to make into something unique, so I stuck to simplicity. It is almost impossible for me to compete against present applications on the market that does the same thing (and usually does a lot of other things aswell) so my focus for this project is not on the market or a "unique selling point" and will just be about learning more about clean code practises and OOP (as far as Javascript allows).

## Techniques

I'm going to use Visual Studio Code as my IDE working in this project and Git as version managment through github. The coding language is going to be vanilla JavaScript (ES6) since it is what I am used to the most and I need to use the npm package `@jenvont/datavisualizer` that I made previously for this project that is also written in JS. It will be a Node.js frontend only web application that uses the localstorage in the browser to save data instead of a dedicated database. The application will work as a Single Page Application (SPA) and will update the view through HTML, Javascript and DOM manipuation with "vanilla" CSS (written by me), so there will be no frameworks. The code formatting will be based and managed by the npm `standard` package.

The application will be deployed using [netlify](https://www.netlify.com/) connected to the Github repository for easy updating.
# Requirements specification

## 1. Functional requirements
It should be a simple web-application where users can create graphs/charts. The different types of charts/graphs that the user can create are pie-, column-, and line- charts.
The graphs/charts should be able to be customizable to the extent that the `@jenvont/DataVisualizer` npm module allows, so the data, color and size should be able to be edited by the user when it's being created.
The user should be able to see previously saved graphs/charts and be able to download and/or delete them from the application and the download filetype should be PNG.

## 2. Non-function requirements
There will not be a database involved or any authorization/authentication so the saving functionalities should be simple and stored in the localstorage on the browser, but to limit the memory load it should cap the amount of charts/graphs a user can save to 5, if this is reached the users have to delete an already saved chart/graph if they want to save another to clear up space.

## 3. Organizational requirements
The application should be built using JavaScript and be dependent on the npm module `@jenvont/DataVisualizer` for the core functionalities. It should be launched as a client side application through the `netlify` platform at the adress https://graphsketcher.netlify.app/. The code base should be stored at the GitHub repository https://github.com/JenniferVonT/1DV610_WebApp_L3

### 3.1 Version management
The project should be managed using git and GitHub, commit and test often throughout the development using manual testing since it's the easiest option for this application.

### 3.2 Code standard
The code should follow the book `Clean Code` by Robert C. Martin.


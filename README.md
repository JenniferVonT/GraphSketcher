# GraphSketcher
This application can be found deployed at this address: https://graphsketcher.netlify.app/

A web application where a user can create graphs/charts and either save them locally on the browser/in the application or download them as PNG files. The application works as an SPA (Single Page Application), so the URL never updates, everything is handled through JavaScript and DOM manipulation. It is object-oriented to the degree that JavaScript permits, the only static functions are the ones in the `index.js` file to start the application and open the start view.

All the documentation for this project is located in the [./documentation](./documentation/) directory, where you can find my project vision, reflection, requirement specification, and test report.


## Applications entry point.
This is how the application's entry point looks: a user can either choose a chart/graph type to open the editor or view saved graphs in the navigation bar.
![start-page](./src/img/start_page_L3.PNG)

## Editor
The view after a graph/chart type is chosen opens the editor view, where the user can create and customize their chart.
![editor](./src/img/editor_page_L3.PNG)

## Saved graphs/charts
When a user clicks the "Saved Graph" in the navigation, the view that shows all the previously saved graphs/charts is shown.
![saved-page](./src/img/saved_page_L3.PNG)

## Class diagram
This is a class diagram to show all the relations between the classes, external packages, and storage.

![class-diagram](./src/img/1DV610_L3_ClassD.png)

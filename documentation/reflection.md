# Reflection L3
These are reflections based around the book Clean Code by Robert C. Martin and the chapters 2-11 on the code for the assignments [L2](https://github.com/JenniferVonT/DataVisualizer) (module) and L3 (this project).

## Chapter 2

**L2** - I think I followed this chapter well in L2 and tried to keep the names as meaningful and descriptive as possible and to avoid leaving false clues when it came to the naming of both classes and variables, they are all pronounceable. All my class names are nouns and say what they mean while my method names are verbs. The only class name I believe is the most "deceptive" is the DataVisualizer, it doesn't technically "visualize" the data, it creates the chart class that in turn visualize it. But I wanted that name for my module as a whole and thus decided to keep the "main" entry point class as the same name as the module at large.

![class name example](../src/img/L2_ClassNames.PNG)

(root directory)

**L3** - This assignment was where I ran in to some trouble trying to follow the second chapter. I decided to follow the MVC (Model View Controller) pattern for this project which made me have a really hard time with the naming of specifically method names and trying not to leave "false clues" by choosing very similar names that can sometimes be hard to differentiate between eachother. Since a lot of my methods do similar stuff but for different inputs and areas of the application I ran into these examples in my controller class for instance:

![method name example](../src/img/L3_methodNamesEx.PNG)

(./src/controller/controller.js)

I have a really hard time with naming when I'm faced with methods that does similar things but not similar enough to be refactored into one method (since that would also break against the rule that functions should be small)

## Chapter 3

**L2** - I think its hard to make the decision when a function truly only does "one thing", I tried as best as possible to follow this in L2 and refactor as much as possible when possible. It was easier in this project than L3 because the module had "one" goal and that was to create a chart that could be customized. It made it easier to make everything modular and keep the methods short. The one place where I think I failed with this was in the child classes to the Chart class, I tried refactor their methods but always ran into issues with the inheritance making it loose the progress in the process or running into issues with the reach between the parent/child classes and their methods so I decided to keep them long. But every other class in the project have short and concise methods where I interpret the majority to only do "one thing".

![long method example](../src/img/L2_longMethod.PNG)

(./src/chartModules/pieChart.js)

**L3** - I tried to keep the methods small and arguments short, I managed to keep most methods dyadic or less (whereas the vast majority is nullary, with no arguments) to keep it simple, even in scenarios where I needed a lot of information I made the argument into one object with the data instead of several argument inputs. I have some exceptions to this though where I had to make a triadic method, they are very few and these are only the methods that handle changes to existing data where the original data is needed as a reference

![triadic examepl 1](../src/img/L3_triadicMethod1.PNG)

(./src/controller/controller.js)

![triadic examepl 2](../src/img/L3_triadicMethod2.PNG)

(./src/model/model.js)

## Chapter 4

**L2** - I decided to keep the comments minimal, leaning more on naming and the code structure to communicate what it does instead, with that said I still decided to implement jsdoc to all of my public methods ateast stating what the argument types should be. I wanted it to also be a help when using the module in an IDE that helps the user by showing the jsdoc when writing the code, making it more user friendly.

![comment example](../src/img/L2_comment_example.PNG)

(./src/dataVisualizer.js)

**L3** - Since this project isn't geared towards other developers like the L2 module is I decided to omit comments on even the public methods since they aren't really "public" in the same sense as the L2. I believe the method names are descriptive enough, even if some arguments names could be helped by a comment to just clarify the data type. I have written module comments and very few explanatory comments where I think is neccessary. The first examples just clarifies that the catch block isn't left empty for nothing or forgotten, it is there because the element "chart-selector" is not always present in the DOM and gets an error when it can't find it otherwise. The second example is to clarify that the commented line has to come before the rest because the component handles both the blur/unfocus and keywdown event the same and it fires the event twice otherwise since it blurs it after the keywdown event.

![comment example](../src/img/L3_comment_ex1.PNG)

(./src/view/startPageView.js)

![comment example](../src/img/L3_comment_ex2.PNG)

(./src/view/chart-selector.js)

## Chapter 5
**L2** - I have stuck to the same code format throughout the project, I didn't use any automated tool for this though which means there is a risk that the format I've choosen can have places where they differ, but I have not yet found anywhere noticeable in my code that strays from the set standard. All my global variables in the classes are all declared unaligned at the top of each class and without comment so they aren't to spaced out for an easier overview of the start of the class.

![global variable example](../src/img/L2_global_variable_ex.PNG)

(./src/data.js)

**L3** - What I said for L2 can be applied for L3 aswell, but in this project I have implemented an automatic formatting tool (the npm `standard` package) to help with formatting, this has made it easier to really make sure that the entire code base follows the exact same formatting style everywhere.
A hard thing for me is deciding where to place methods based on conceptual affinity and a logical vertical ordering, if there is just a few methods this isn't an issue, but when several methods starts to use one method I have a hard time figuring out where to put the one method being used by many. For example in this example image I have an abstract method at the start to show the start page, all the methods fall below in the order they are called, except the `clearEditorPreview` method, that one is also abstract and have several method calls and is used by many methods, I also have the methods called in the `#configureStartingSelectButtons` below these shown. This creates the "scrolling" in the document we want to avoid, but I don't know any better way to sort them besides this.

![vertical ordering](../src/img/L3_vertical_ordering.PNG)

(./src/view/startPageView.js)

## Chapter 6
**L2** - I have kept the modules very separate in this project, they only talk to "friends" not "strangers" and hence follows the law of Demeter which means they only calls methods from within themselves or objects that the methods have created, gotten as an argument or the class holds as an instance within itself. I've tried to hide as much data structures as possible and instead leaned on methods for all the data handling, for instance in this example I only use getters and setters for data handling, and only call methods on an object the class hold as an instance (errorHandler):

![Structure example](../src/img/L2_hiding_structure.PNG)

(./src/data.js)

**L3** - This project was a bit harder to keep separate since I'm handling editing with a preview that updates in real time, also saving, downloading and deleting feature so I had to sent objects as arguments and return values on a much higher scale than I needed in L2. I still tried to hide the internal structure within the class, only using methods to manipulate and reach data and keeping most methods not needed by "outsiders" private. I did have some "trainwrecks" though, where I called a method on a return object that the class didn't really have access to according to Demeters law, I changed it to follow the law and only access the data through instantiated classes within the class.

Before:

![trainwreck before](../src/img/L3_trainwreck.PNG)

After: (this.#model and this.#view are both instantiated in the class as global variables)

![trainwreck after](../src/img/L3_trainwreck_after.PNG)

(./src/controller/controller.js)

## Chapter 7
**L2** - I have a lot of error handling in the module, since it's going to act as a third party module for other devs I decided to have a try/catch block and throw errors in the majority of methods and did create an entire class for handling the error messaging because of this. I do not return null anywhere to avoid foistering the problem to the caller of the method and I think I managed it pretty well and definitely do not do that to methods that return to the dev using the module.

First I throw an error object created in my error handling class...

![error handling](../src/img/L2_error_handling_ex_2.PNG)

... Then I catch the error in the method that calls the one above.

![error handling](../src/img/L2_error_handling_ex.PNG)


**L3** - In this I had a little bit of a different approach to the error handling than L2, I do not have an ErrorHandling class like L2 because this project was directed to users on the web. I have minimized the user inputs that arent completely controlled by me (i.e buttons) to the bare minimum and still being able to customize the charts. Because of this I decided to use special cases instead in most places where nothing is returned if it is unsuccessful. I did however introduce try/catch statements where I handle third party libs, even if it is my own L2.

First I catch the error and throw a new error since I'm using localStorage which is a built in lib but also a third party to me.

![error handling](../src/img/L3_error_handling.PNG)

(./src/model/dataSaver.js)

Then I catch it when calling the method in case there is any issues I don't know about in the localStorage.

![error handling](../src/img/L3_error_handling2.PNG)

(./src/model/model.js)

## Chapter 8
**L2** - Since this project does not include any third party dependencies except the built in canvas lib I didn't have to think about the changing and boundaries of the lib to the degree that the chapter shows, there is a lot of documentation around the lib and the rest is my own written code.

**L3** - I have tried to keep the dependencies very low in this project aswell, the only third party package I use that isn't a built into node/browser package is my own L2 module. This made it easy for me to not having to worry about any changes in dependencies since *I* controll said dependency. I also isolated the built in libs to only be used in my dataSaver class making it easy to change if there ever was a need to in the future.

## Chapter 9
**L2** - In this project I did a lot of automatic testing, my only fault was that I did not always follow the Three laws of TDD, sometimes I actually wrote the production code before the test code. I had a hard time knowing exactly what to test before I had even tried to write the production code. I did however stick to one test at a time, running it and debugging until it passed without moving on to writing the next test. I also tried to keep the tests to single concerns. This test however tests both height and width, mostly because they both take the same kind of input and is tested in the same way so I didn't want to write an almost doublicate test just for height and width.

![test](../src/img/L2_test.PNG)

(./test/chart.test.js)

**L3** - In this project I couldn't really follow the book since I don't have any automatic testing. It was better fit with manual testing and I tested manually all the time during development, running the application on a local server with realtime updates. I do however keep all the "official" tests concise and easy to follow, keeping them all written down in my testreport. This makes testing very fast, independent, repeatable, self-validating and timely since they are very accessible during development.

The tests have descriptive names telling the user instantly what they are testing. They also describe in their separate documentation what they expects aswell.

![test](../src/img/L3_test.PNG)

(./documentation/testreport.md)

## Chapter 10

**L2** - I have always had a hard time keeping my classes small (or small according to CC), Sometimes I don't know how to refactor them especially when also trying to follow the method rules, being smaller and only doing one thing. It expands the class so much in size. I do try to keep the classes as separated as possible when it comes to responsibilites atleast, but I know that I could be better with that aswell. It's very easy to just add more functionality to a class while thinking that it's a too "small" of a functionality to be refactored into it's own class. I failed with the cohesion in the super class Chart because even though I refactored the code to create new classes for Data and ColorThemes to try and make it smaller and split the responsibilites it's still very large with a lot of global variables. I had to loosen the encapsulation in the same Chart class aswell because some methods needed to be reached from the subclasses that inherits it, I made them protected though to signal that they arent meant to be used outside of it.

![class example](../src/img/L2_big_class.PNG)

(./src/chartModules/chart.js)

**L3** - The classes still became pretty big in size just as the L2 when the methods became shorter but more was added because of it. I do think the cohesion became better (higher) in this project though, I kept the classes very encapsulated and held the single responsibility principle better here. The views only handle the visual on the browser, the controller validates data and acts as a middleman between the view and model, the model handles the "business" logic and manipulates the chart/graph and the persistence. All of these three "groups" are in turn divided into classes according to their responsibility but with only one "entry point" to keep the data stream linear.

![class diagram](../src/img/1DV610_L3_ClassD.png)

This class diagram shows how I have divided my classes which can be seen in the implementation aswell.

## Chapter 11

**L2** - The application is very encapsulated and modular, each class has their clear responsibility and has a pretty low coupling toward eachother. I separated the Data and ColorTheme classes from the Chart class for this reason aswell since the Chart class had too many responsibilites at first, to make the cohesion higher within the code. I could have used more dependency injections by inserting the data and/or colorTheme as arguments to the Chart class to make it easier with testing and get a looser coupling, but I didn't find it necessary in this situation. I already have arguments for globalOptions and dataPoints so I didn't want to have four arguments, though you could argue that I could remove the arguments for options and data points and insert those via setters instead and change the arguments to the data and colorTheme class to make the coupling looser to those classes/components.

![constructor example](../src/img/L2_constructor_ex.PNG)

(./src/chartModules/chart.js)

**L3** - The application has a clear MVC structure and separates the responsibilities for each class/component. The controller acting as a mediator for the View and Model makes them completely separated from eachother and thus making it easier to change/update them in the future. The code also promotes loose coupling with dependency injections by passing the model to the controller and the controller to the view as an argument instead of instantiating them internally. This also makes it possible for the view to send data to the controller without the controller having to call the view. However, the controller could be broken up into several controllers to separate it's concerns, since now it handles everything from the view both in the editor, start page and saved page. The model could also have had more loose coupling towards the datavisualizer and datasaver by using dependency injections and given those components as arguments instead of instantiating them itself, this would have made it more flexible and easier to test in isolated situtations in the future.

![SoC example](../src/img/L3_SoC_example.PNG)

(./src/controller/controller.js)

![DI example](../src/img/L3_DI_example.PNG)

(./src/index.js)

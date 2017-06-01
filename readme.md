## Synopsis

This project is an TODO-list application that keeps track of important tasks one needs to complete.  The application was developed in order to practice going through another team's code, refactoring it, and adding more functionality to it.  This project was developed for a class at the Turing School of Software and Design.

## Usage

One needs to enter the name of their task along with any information related to the task.  Upon clicking the save button, a new card is generated that contains the information for the task.  One can also click on the text and edit the content on the card.  The content will then be saved so that upon refresh, it will reflect the changes.  The user may also set the importance of the task by pressing either the up or down buttons.  If the user would like to delete the idea, they can press the x button at the top right corner.  All changes made to TODOs are then saved upon refresh.  A user may also mark a task as being completed.  Upon refreshing the page, the list of tasks will not show completed tasks unless they click the Show Completed TODOS button which brings the completed tasks to the top.  One can also search through their TODOs in the search bar, or filter through them by clicking the corresponding button depending on what importance level they are looking for.  Finally, the application presents only 10 tasks initially, but upon pressing the Show More TODOs button, the rest of the tasks will be displayed.

## History

* Created buttons to filter through tasks by importance
* Created button that shows the rest of the ToDos at bottom of page
* Set the application so only the 10 newest tasks are displayed
* Upon refresh, completed tasks do not show.  Created button to reveal completed tasks at top
* Set a button to mark tasks as completed and saves upon refresh  
* Changed quality of idea to importance of TODO
* Finished up the rest of the functionality from previous project including search bar and disabling the save button if either of the inputs are empty
* Changed application from an IdeaBox to a TODO list
* Removed all global variables
* Refactored code so each function was under 8 lines

## Built With

* [HTML](https://github.com/wheresmytyphone/linked-list/blob/master/index.html) - The structure of the page
* [CSS](https://github.com/wheresmytyphone/linked-list/blob/master/styles.css) - The look and colors of the page & buttons
* [Javascript/jQuery](https://github.com/wheresmytyphone/linked-list/blob/master/script.js) - Interactive part of the TODO Box application including the logic

## Contributors

Travis Rollins  
Shayla Richard

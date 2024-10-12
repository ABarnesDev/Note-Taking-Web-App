# Note-Taking Application

## Project Overview
This web app was initially built as a school project. This full-stack web application allows users to create, manage, and organize personal notes. It also allows users to create daily task lists. In addition to this, the web app also implements JWTs for secure user authentication, ensuring that authenticated users can only access their notes and tasks. The web app uses Spring Boot for the backend, Angular for the front end, and PostgreSQL for the database.

You can access the live application here: [Note Taking App](https://note-taking-app-faexdkabfbgycscx.eastus2-01.azurewebsites.net/)

### Technologies Used
* Spring Boot
* Java
* PostgreSQL
* Angular
* TypeScript
* HTML/CSS

## Getting Started

### Prerequisites
* JDK
* Maven
* Node.js and npm
* Angular
* PostgreSQL

### Installation
1. Clone the repository
    ```shell
    git clone https://github.com/github_username/repo_name.git
    ```
2. Create a PostgreSQL database.
3. In `server/src/main/resources/application-dev.properties`, change the values of `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` to match your database's configuration.
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/your-database-name
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    ```
4. Install the frontend dependencies by navigating to the project's `client` folder in your terminal and running the following command:
    ```shell
    npm install
    ```

### Running the Application
1. Start the backend of the application by navigating to the project's `server` folder in your terminal and running the following command:
   ```shell
   mvn spring-boot:run
   ```
2. Start the frontend of the application by navigating to the project's `client` folder in your terminal and running the following command:
   ```shell
   npm run start
   ```
3. Open a browser and navigate to http://localhost:4200 to view the application.

## How to Use

### Login or Register
When you first access the application, you will see the login page if you are not logged in. To log in, enter your account’s email and password and press the log in button. If you do not have an account, click the signup link, which will take you to the signup page. On this page, enter a username, unique email address, and password that meets the requirements shown on the page. Then click the Signup button to create a new account.

### Notes Page
After logging into your account, the web app will display the notes page. On the left of the page is a button that allows you to create a new note, an input field that allows you to search through your notes, and a list that displays the titles of all your notes. If the account is new, this list will initially be empty.

#### Create a Note
You can create a new note by clicking the create note button. Doing this adds a new note to the note list on the left of the screen. The right side of the screen will show inputs for entering the note’s title and body text.

#### Update a Note
When you enter text, the note will automatically save. You can use markdown to format the text.

#### Add Tag to a Note
At the bottom of the note is an input field that allows you to add a tag to the note. If you enter text into this field and press enter, the tag will be added to the note. A dropdown list will appear on the left side of the screen, allowing you to filter the notes by tag. You can remove a tag from a note by clicking the X button on the tag.

#### Delete a Note
To delete a note, click on the info icon to the right of the note’s title. This will display a popup that shows the note’s information and a delete button. Click the delete button to delete the note.

#### Search Notes
On the left side of the screen, below the create note button, there is an input field that allows you to search for notes by their title.

#### Filter Notes By Tag
On the left side of the screen, below the search input field, there is a dropdown list that allows you to select one of the tags you created. Clicking on one of the tags filters the notes list to display the notes that use that tag.

### Tasks Page
The tasks page displays all the tasks you have created for that day. To create a new task, enter the task in the input field and click the save task button. To mark a task as completed, click the checkbox beside it. To delete a task, click the trash icon beside it.

#### View Tasks For Another Day
Click the “Create/View tasks for another day” button to change what day’s tasks are displayed. This will display a calendar that allows you to select a date. Selecting a date will display the tasks for that day.

### Logout or Delete User
Clicking the icon at the top right of the screen will display a popup showing the user’s account information and allowing the user to log out or delete their account.
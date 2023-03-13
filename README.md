# &lt;/salt&gt;

## React - Salt Instructors & Developers

Us instructors have so much to do so we need help keeping track on all developers. Your task is to create a simple UI for us to add & remove developers in different bootcamps and to be able to filter them by bootcamp in the UI.

We have supplied you with a backend server, so this is a frontend test only. You need to follow the specifications as detailed below. Use the screenshot at the bottom of this page as a wireframe.

This weekend test has a very long list of specifications which might make it seem larger than it actually is. Focus on completing one specification at a time.

We recommend that your first command is:

`npx create-react-app frontend --template typescript`

The backend server for this weekend test is already available and you do not need to make any changes there. To install and start the server you have to run the following from the project's root folder:

```shell
cd server && npm i && npm start
```

The server runs on the port `3001` and the frontend should run on port `5173`. For information about your available endpoints go to `http://localhost:3001/swagger`. We recommend you playing around with the api through a REST API Client like [Postman](https://www.postman.com/downloads/). Your frontend should communicate with the backend server to add and delete developers.

Read the UI and Technical specifications below carefully.
> Google for inspiration, read other developers code but make sure to not copy-paste solutions as that would be considered cheating.
> The specifications follow the [RFC2119] (<https://www.ietf.org/rfc/rfc2119.txt>) standards. A good thing to read in your spare time.

### UI specifications

#### Adding Developers

- There MUST be a form for adding a new developer.
- The form MUST contain two inputs, one for a first name and one for a last name.
- There MUST also be a select box in the form where the user can choose which bootcamp to add the developer to.
  - Bootcamps:
    - jsfs
    - jfs
    - dnfs
- When the user submits a new developer from the form the developer MUST appear in the list of developers in the correct bootcamp item without a page reload.
- It MUST be easy to add, toggle and remove developers. For example adding a new developer by hitting the 'Enter'-button.

////// bu yapilmadi 
- An error message MUST be displayed to the user if the user tries to add a developer with invalid input values, according to the e2e test.
/////////////  


//// gallery componentte bootcamp cardlari cagirarak istenilen bootcamp cardtaki veriler gosterilecek. veri degeri filter bootcamptan alinacak

///// bootcamp Card gonderilen veriye gore kisi uretecek ve bu kisileri kendi componentinde filteryaip gosterecek

//// person gelen veriye gore kisi uretecek sadece developer ekleyecegiz ama basta instroctularda uretilecek

#### Displaying Bootcamps

- There MUST be a gallery that displays the bootcamp sections.
- There MUST be a bootcamp section for each bootcamp.
- Each bootcamp section MUST display the name of the bootcamp, a list of instructors and a seperate list of developers.
- There MUST be a select box that the user can use to filter which bootcamps are displayed.
- The selection list MUST have options:
  - all
  - jsfs
  - jfs
  - dnfs

  ////// yapilacak 
- Each developer item MUST be toggleable and when the user clicks the developer item a delete button MUST appear. When the user clicks this button the item MUST be deleted instantly from the list without reloading the page.
///////////
- The different bootcamp items SHOULD be easy to visually separate.
- The instructors list and the developers list SHOULD be easy to visually separate.

| ![Wireframe](wireframe.png) |
| :-------------------------: |
| Example of this application |

### Technical specifications

- Your application MUST be written in TypeScript
- You MUST keep the fetched data in a state object and you SHOULD fetch the data on initial mount.
- You MUST NOT store the data in LocalStorage.
- You MUST use functional components.
- You MUST use at least 4 levels of components (for an example see the figure at the end).
- You MUST reuse the same component for both instructor & developer items
- You MUST use `props` for passing the necessary information between components. You MUST NOT use React Router, useContext nor Redux.
- You MUST use Semantic HTML elements.
- You MUST use a clear naming strategy for your css and class names (for example BEM).
- You SHOULD have a mobile first approach.
- You SHOULD have suitable unit tests - we will run your tests, and expect no errors. Make sure that the tests you write pass.

#### Tech specification for test correction

We will run a separate end-to-end-test suite (e2e test) that automate correcting your tests. In order for our automated correction to run properly you will need to use the classes and ids in the list below.

##### Here is what our e2e-tests will check

- to add a new developer we will type in two input fields with class names `addDeveloperFirstNameInput` and class `addDeveloperLastNameInput` then click an element with class `addDeveloperBtn`.
- to see if a developer has been added we will compare the number of children in an element with class `cardList` before and after.
- to see how many bootcamp items are being rendered we will look for an element with class `gallery` and count the elements with class `bootcamp` when the filter selection value shows all the bootcamps.
- we will check how many bootcamp items are being rendered when targeting a selection element with class `selectBootcamp`. When you filter by a bootcamp the number of elements with class `cardList` must be 2.
- we will click a developer item with a class `card`.
- we will look for a button with class `deleteBtn` inside a item with class `toggled`.
- we will look for an element with class `errorMessage` if input values are invalid. If you use a set timeout, make sure to display the message for a min of 1000 ms.

### Running e2e tests

In this repository there's a `e2e`-folder that contains e2e-test using [Cypress.IO](http://cypress.io). This should be run separately from your application (your solution). You DO NOT need to copy this into the created react application.

1. Start your backend `server` and your `frontend` application and ensure that your client is running on `http://localhost:5173`
2. To install and start the e2e tests, in a separate terminal window, you have to run the following from the project's root folder:

   ```bash
   cd e2e && npm i && npm t
   ```

We have supplied a single e2e test that adds a developer to the `jsfs` list. You can (and should) add more tests to ensure that your application works according to the requirements. Use our tests as an example.

When correcting your tests our test suites will contain more tests than the ones that we have shared with you.

### Handing in the test

- Check that you have no console errors.
- Make sure it runs from a clean `npm i && npm start` in both the `server` and the `frontend` folders.
- Hand in the content of your `frontend` folder (except for the node_modules) in a folder named `saltBootcamp` in your weekend test folder.

Make it work, and then if you have time, make it great!

## FAQ

Can we ignore Internet Explorer?

> Yes, you do not have to consider compatibility with Internet Explorer.

Can we use axios?

> Yes, use any library that you want.

Can we use localStorage?

> No.

I'm so stuck, and I don't know how to get started!

> Take a break, you have all the information and skills you need to solve this. Go through lecture slides and previous labs. Think of these three questions:
>
> - What is the apps component structure?
> - What components should include logic?
> - What state is only local and what state/setters do I have to prop drill?
>
> As a rule of thumb, you should have the closest parent component of all the children that share a state being the smart component. In general, that's the App component. I.e. your app's state will live there, be updated there.

How will you judge our solutions?

> We are going to judge them based on functionality (50%, running an automated E2E-test suite, be careful using the correct classes above), and a code review where we confirm that the technical specification has been followed (50%). We will not judge the design.

Do I need to make it pretty? Or can I just focus on the functionality?
> For this test, our preference is going to be the functionality. I.e.
>
> - All the features should be 100% working.
> - All the technical specifications are followed properly.
> - You have put the CSS Classes and IDs on the elements for our tests to pass.

| ![Component levels](componentLevelsExample.png) |
| :-------------------------: |
| Illustration of 4 levels of components |

# React JS 


## npm 
```
(Node Package Manager) is the default package manager for Node.js, used for installing, managing, and sharing JavaScript packages and dependencies
```

## npx 

```
(Node Package Execute) is a tool bundled with npm (since version 5.2.0) that allows you to execute npm packages directly without permanently installing them on your system. 
```

```an open-source front-end JavaScript library for building user interfaces (UIs) based on components. ```

- React is all About the reusing the components

```
# Must Ignore these files
- .gitignore
- node_modules
- README.md
- package-lock.json
```


## How to create New Project 

- [npm create vite@latest] ---> to create react application

- Give the name of you'r project ---> [Project-Name]

- Select the Framework ---> [React]

- Select the Variant ---> [JavaScript]

- Rolldown-vite ---> [No]

- Install ---> [Yes]

## How can you run the react-Application 

- Go in you maine project ---> [Project-Name] ---> That you given in creation of react-project

- To start the development Server ---> [npm run dev]

- Open URL on web-browser to run the application-server

## Project Structure About the React Application

- [node-modules-Folder] ---> This Folder Contains External Libraries and Packages That our project relies on

- [Public-Folder] ---> It contains the Public Assests

- [source-Folder] ---> contains assests images/videos

- [html-File] ---> Main entry point of our project

- [json-files] ---> These are structured in key-values Pairs contains meta-data about our-project


## How can We create a component in react

1. Create a new file with component name
2. Now in that return the componet
3. Export the whole component as the block
4. import it where you want to inport it
5. also you can add same component multiple time or can Append with any other component 
 
## How to setup react app Manually

1. Go in the project directory
2. npm install -> (will create thr package-lock.json) file
3. npm run dev  (will runn the application)

## If you want to create the react project with the teplate <br>
```npm create vite@latest 1_card -- --template react
 This will crete the pre-builded template for your application
```

## jsx ==> it meand JAVASCRIPT XML


## How to Style React Component  With css
```
 Module --> (preferred for individual projects) In this we create a specific folder for that certain component 

 External --> (global-styles and small projects) In External CSS We simply write the css in the index.css for all of the components;
[in modules work here hashing that avoid the naming conflicts] --> unique classes generated for you via hashing algorithm


 Inline --> (for small componenets )In Inline css we write the css in same file
 ```


 # Props in React 

```
Props => Reac only Properties that are shared b/w components.

A Parent component can sent data to a child component  

Parent component can share key, value pair to child component

```

## Props Types

- to install propType Dependencies <npm install prop-types>

```
A machenism that ensure that the passed value is of the correct DataType

age: PropTypes.number

In Prop Types we give the string on the numberic this will throw an error

{What PropTypes Does }
- Validates Data Types
- Checks for Required Props
- Documents Component Usage
- Provides Runtime Warnings 

[a library used for runtime type-checking of the props (properties) passed to a component]

```
## Default PropTypes

```

In Latest version of react 19.x, it does not support  Default Prop


Default Values for props in case they are not passed from the parent Component 

Example Name:'Guest'
```


# Conditional Rendring

``` 
It allows you to controll what gets render in you applicaiton based on certain conditions (Show, hide, or Change Component)
```

# Render List


# React JS 
React.js is a free, open-source JavaScript library used primarily to build fast and interactive user interfaces (UIs) for websites and mobile apps


## In React.js, Types of the components

``` there are two primary types of components: functional components and class components. 
```

1. Fundamentals (The Basics)

 > JSX: Writing HTML-like code inside JavaScript.

 >Components: Building reusable UI pieces 
 (Functional components are the modern standard).

 >Props: Passing data from parent to child components.

 >State (useState): Managing data that changes over time within a component.

 >Lists and Keys: Rendering arrays of data efficiently using unique identifiers.

 >Conditional Rendering: Showing or hiding parts of the UI based on conditions

2. Core Hooks & Logic

> useEffect: Handling "side effects" like fetching data or setting up subscriptions.

> useContext: Sharing global data across the whole app without "prop drilling".

> useRef: Directly accessing DOM elements or persisting values without re-rendering

> useReducer: Managing complex state logic in a single place.

3. Navigation & State Management

> React Router: Managing multiple "pages" and URL navigation.

> Global State Libraries: Moving beyond basic Context to tools like Zustand, Redux Toolkit, or Jotai.

> Data Fetching: Using libraries like TanStack Query (React Query) or Axios for API management. 

4. Advanced Performance

> Memoization: Using useMemo, useCallback, and React.memo to prevent unnecessary re-renders.

> Lazy Loading & Suspense: Splitting code so parts of the app only load when needed.

> Error Boundaries: Catching JavaScript errors in components so the whole app doesn't crash. 

5. New in React 19 (2025 Standard)

> React Compiler: A tool that automatically optimizes code so you don't need manual memoization

> React Server Components (RSC): Rendering components on the server for faster initial loads.

> Actions API: Simplified ways to handle form submissions and data updates.

> New Hooks: Includes useActionState (managing form states), useOptimistic (instant UI feedback), and the use API for reading resources like promises. 

6. The Broader Ecosystem

> Styling: Modern approaches like Tailwind CSS, CSS Modules, or Styled Components.

> Testing: Writing unit and integration tests using Vitest, Jest, and React Testing Library.

> Next.js: The most popular full-stack framework for React apps in 2025.

> React Native: Using React to build mobile apps for iOS and Android. 


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

 >  npm run dev is a custom command used to start the application in development mode

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

###vite 
[the standard build tool and development server for modern React projects]

Goal	                Command
Simple Web Practice	    > npm create vite@latest
Real Product/Professional App > npx 
create-next-app@latest

Mobile App (iOS/Android)  >npx create-expo-app@latest

High Performance (Rust-powered)	> npx create-rsbuild --template react


-----> there are the serval del-tool that are use in their differnet different stats

 This will crete the pre-builded template for your application
```

### Bun is an all-in-one alternative that can replace Node.js, npm, and Vite all at once for maximum performance.

```Very powerFull that can replace every devlopment tool```



## jsx ==> it meand JAVASCRIPT XML


## How to Style React Component  With css
```
 Module --> (preferred for individual projects) In this we create a specific folder for that certain component 

 External --> (global-styles and small projects) In External CSS We simply write the css in the index.css for all of the components;
[in modules work here hashing that avoid the naming conflicts] --> unique classes generated for you via hashing algorithm


 Inline --> (for small componenets )In Inline css we write the css in same file
 ```


 # Props in React 

 >  the mechanism used to pass data from a parent component to a child component


> <Child-Component name='Shivam' age ={40} friend = 'Ramesh'/>

> In child -->

```function Student(props){
    return (
        <div className="student">
            <p>Name : {props.name}</p>
            <p>Age : {props.age}</p>
            <p>Friend : {props.friend}</p>
        </div>
    )
}```
   


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

[a library used for runtime type-checking of the props (properties) passed to a component]```

## Default PropTypes

```In Latest version of react 19.x, it does not support  Default Prop

Default Values for props in case they are not passed from the parent Component 

Example Name:'Guest';

Student.propTypes = {
    Name : PropTypes.string,    
    Age : PropTypes.number,
    Friend : PropTypes.string,
}

// Student.defaultProps = {
//     Name : 'Guest',    
//     Age : 0,
//     Friend : 'Naveen',
// }
>

# Conditional Rendring

```It allows you to controll what gets render in you applicaiton based on certain conditions (Show, hide, or Change Component)
```

# Render List

```
Create a array and sort it
This will easily happen by sort method but if we have an object and want to sort by name not id only by name we have to use here [localCompare()]
```

# Click Event 

```Click Event => An interaction when user clicks on a specific element, We can respose to click by passing a callback to the onclick event  Handler

do some changes via the onClick Event 

do some external development make the projection to get easily understand the 
[events] --> make a project on events 
```


# React Hook 

```Specail  Function that allow functional components to use features without writing class components```

```(React V16.8)-->  useState, useEffect, useContext, useReducer, useCallbacks, and many more..```

## useState() 

```A React Hook that allow the creation of a stateful variable and a setter function to update its value in the vertual DOMSUCH AS: [name, setName]```



#  npx
> create-vite 9_onchangeEvent-handler --template react

 > Package name: {which dependencies you want write over here (react)}

 > Install with NPM : YES

 > Will install all dependencies or liberaries 

 # On Change Event 

 ```Event  Handler used primarily with form elements ex. <input>, <textarea>, <select>, <radio>, Triggers a function every time the value of the input change```

# Color Picker Application -- 

```react-JS/daily-practice/10_colorPicker```

# Updater Function

``` A function passed as an arrgument to [setState()] 

ex..[ setYear(year+1) ] instead of this updater function we can simply use hre[updater function]

Allow for safe updates based on the previous state Used with multiple state update anf asynchronous functions Good Practice use Updater Function
```

# Create React Js Dependencies 

> npm create vite@latest <New Directory name>

> Package Name : [react]

> Select Framework : [React]

> Select a Variant : [JavaScript]

> Use rolldown-vite (Experimental)?:
   
   │Yes

>  Install with npm and start now?
    
    │Yes

> will start [  Installing dependencies with npm...]

# Update the State of the Objects

``` How can we update the satate of the objects
you insure that you are importing the [UST - State Hook From the React]

useState => 
 const [variable, setterVariable] = useState(<there we can use primitives and non primitives dataTypes by-default>)


import useState from react to your component
 
> import React, {useState} from 'react'
```

# Update Array State

# Update Array of Objects State

# To Do Project 

# Use Effect React JS

```
useEffect() -> 
React Hook that tells React To Do SOME CODE When (pick one): 

This Component Re-render
This Component Mounts
The State of a Value


1. useEffect(() => {})
   // Runs after every re-render
2. useEffect(() => {}, [])
   // Runs only on mount
3. useEffect(() => {}, [value])
   // Runs on mount + when value changes

USES
#1 Event Listeners
#2 DOM manipulation
#3 Subscriptions (real-time updates)
#4 Fetching Data from an API
#5 Clean up when a component unmounts


useEffect(function, [dependencies])
useEffect(() => {})
// Runs after every re-render
useEffect(() => {}, [])
// Runs only on mount
useEffect(() => {}, [value])
// Runs on mount + when value changes



> using of USEEFFECT HOOKS In React
   1. code very orgainized 
   2. useEffect hook --> you could tell what exactly code runs, it runs during every rendring
   3. when componet mounts or When one of these value, 
   4. if you don't use the useEffect(Hook); --> then this code will runs each and every single couple of time.



   --> Mount / UnMount
```
#  digital clack application

# useContext Hook 
```useContext() = React Hook that allows you to share values between multiple levels of components without passing props through each level

PROVIDER COMPONENT
> import React, { createContext } from 'react';

> export const MyContext = createContext();

<MyContext.Provider value={value}>
  <Child />
</MyContext.Provider>

CONSUMER COMPONENTS

import React, { useContext } from 'react';

import { MyContext } from './ComponentA';

const value = useContext(MyContext);
```



# useRef 

> Render that's where useRef comes in useRef doesn't come a compomemt to render
> Where it's value changes. its instead using of state Variable use gonna use Refrence

```
useState() = Re-renders the component when the state value changes.useRef() = "use Reference" Does not cause re-renders when its value changes. When you want a component to "remember" some 
information, but you don't want that information to trigger new renders.

Accessing/Interacting with DOM elements Handling Focus, Animations, and Transitions
Managing Timers and Intervals
```

> provides a way to store a mutable value that persists across component re-renders without causing the component to re-render when the value is updated

#### Key Uses of useRef
The useRef hook has two primary use cases:

> Accessing and Manipulating DOM Elements: 

> Storing Mutable Values:


## 1. Mounting: The "Birth"
Mounting is the process where a component is created and inserted into the DOM for the first time.

## 2. Unmounting: The "Death"
Unmounting is the process where a component is removed from the DOM and destroyed.


  > UseRef returns an object, an object has one property 

  > useRefrence silently notice Everything what's going on in the function code.

> useRef Gonna you'r componenet more efficient

## useState() = 
> Re-renders the component when the state value changes

 ## useRef() = 
 > "use Reference" Does not cause re-renders when its value changes.

1. Accessing/Interacting with DOM elements

2. Handling Focus, Animations, and Transitions

3. Managing Timers and Intervals

# Devlop the server for specific network port.
 > <npx parcel -p [newPort] index.html> is used to launch a development server for a web project with a specific network port

 ##  There are the limited Server Ports are available. [0 - 65,535];
 
 ```The initial range for network ports is 0, and the final range (the maximum possible port number) is 65,535```


 # npm (Node Package Manager)
 ```
Function: npm is primarily a package manager used to install and manage your project's dependencies. It installs packages into the node_modules folder and keeps track of them in your package.json file.
```
# npx (Node Package Execute)
```Function: npx is a package runner that executes packages without necessarily installing them permanently or globally. It automatically looks for the package's executable binary, first in your local node_modules folder, and if not found, it downloads a temporary copy from the npm registry and runs it immediately.
Running commands: This is why npx parcel index.html works—npx finds the parcel executable binary and runs it directly.
```


# Stop Watch
 > final project as the Practice


# The useEffect Hook allows you to perform side effects in your components.

```Some examples of side effects are: fetching data, directly updating the DOM, and timers.

useEffect accepts two arguments. The second argument is optional.

useEffect(<function>, <dependency>)```


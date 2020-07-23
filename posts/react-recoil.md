---
title: 'Recoil.js'
date: '2020-05-02'
series: 'state mngmt'

---


# Recoil.js:  Reactish state management or Facebook on state management take II


### OK but why?

Back then when Redux came out it became and instant hit, Facebook was creating new ways of thinking about the complexities of working on the 'front-end front' but as you may now know when you're creating something totally new it's normal to introduce some collateral unforeseen stuff on the side and it's normal, Redux wasn't tested on the wild within a sea of different projects with a high degree of variety, in this case as in a ton of other software projects, the collateral  came in the form of boilerplate (this is the most mentioned pain point of devs), so for implement any changes in the code base you have to go to a ton of different places. 

Software engineers were begging for a little more simplicity and flexibility as well, so what better for a nice and cool library like react to have a nice and cool complementary lib coming from the same company? And certainly it doesn't disappoint,  working with recoil feels like react API.

Recoil defines a directed graph orthogonal to but also intrinsic and attached to your React tree. State changes flow from the roots of this graph (which we call __atoms__) through pure functions (which we call __selectors__) and into components. Some of the benefits:

-   We get a boilerplate-free API where shared state has the same simple get/set interface as React local state (yet can be encapsulated with reducers etc. if needed).
-   We have the possibility of compatibility with Concurrent Mode and other new React features as they become available.
-   The state definition is incremental and distributed, making code-splitting possible.
-   State can be replaced with derived data without modifying the components that use it.
-   Derived data can move between being synchronous and asynchronous without modifying the components that use it.
-   We can treat navigation as a first-class concept, even encoding state transitions in links.
-   It's easy to persist the entire application state in a way that is backwards-compatible, so persisted states can survive application changes.

### Installation
```javascript
npm install recoil
```
or
```javascript
yarn add recoil
```

### Basic usage
1.  Define some basic __atoms__ which are updatable and subscribable units of state, these are the fundamental building block of the framework. Atoms must have a unique ID and some default state, and they can be created at runtime too. When an atom is updated every component depending on it up be re-rendered.
2. Optionally, you can also create __selectors__, pure function depending on atoms or other selectors and components can depend on selector just like they can depend on atoms, when a selector is re-evaluated the dependant component get re-rendered as well. You can think of selector as derived data.

This architecture offers a good breadth of flexibility you'll see

![Recoil.js structure](https://i.pinimg.com/originals/9b/fa/8b/9bfa8bd62fc9b1b81ba5880134478ab2.jpg)


### Let's start from the top today, so index.js:
If you have been reading this series, you may know that we're building the exact app multiple times, [James king's cool to-do app](https://upmostly.com/tutorials/build-a-todo-app-in-react-using-hooks), so go over there and read it thoroughly because I'll be focusing only on the state management part.

We won't be creating any other subfolder today so let's begin creating our index.js file:
```javascript
// Imports
import  React  from  'react'
import  ReactDOM  from  'react-dom'
import  {  RecoilRoot  as  GlobalState  }  from  'recoil'
import  App  from  './myApp'

ReactDOM.render(
	<GlobalState>
		<App/>
	</GlobalState>,
		document.getElementById('root')
)
```

Let's wrap our main app with <RecoilRoot> component, we don't need to pass any store this time.

Create myState.js right after in the same folder. The state of the app will be an array of objects

```javascript
import  {  atom  }  from  "recoil";
export  const  todoListState  =  atom({
	key:  'todoListState',
	default: [{content:'', isComplete:  false}],
});
```

 we import the atom function from recoil and pass it an object with 'todoListState' as our key and an array with an object representing one lonely and empty to-do.

### Presentational & Container components

One more time I'll be using [dan abramov's](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) pattern here, I like it, it's easy and simple.

create a myContainer.js file in src folder and let's break it down part by part
#### myContainer.js:
```javascript
import  React  from  'react'
import  {  useRecoilState  }  from  'recoil'
import  {todoListState}  from  './myState'
```
We import our __atom__ that will be in sync throughout our app.

There are 3 very important Hooks that used often to read and modify the state of our app:

-  __useRecoilValue__: This one only reads the value of our state.
- __useSetRecoilState__: This one functions as a setter function for our state.
-  __useRecoilState__: Which behaves just like useState from react. We pass it the required atom and it will return the value of the atom and a way to modify it. You can think of it as the sum of the two previous ones, setter and getter.

We'll be using useRecoilState today. Declare our container component:
```javascript
const  MyContainer  =  ({children})  =>  {
const  [todoList,  setTodoList]  =  useRecoilState(todoListState);
	...
	...
	...
	
}
```

now paste our 'reducers' that will make changes to our state:
```javascript
// what's a to-do app without a way of creating to-dos
const  createTodoAtIndex  =  (index)  =>{
	const  theList  = [...todoList]
	theList.splice(index  +  1,  0,  {content:'', isComplete:  false})
	setTodoList(theList)
```
...
```javascript
// what if we want a potato instead of a patata
const  updateTodoAtIndex  =  (evt,  index)  =>{
	const  newTodos  = [...todoList.slice(0,  index),  {content:evt.target.value, isComplete:  todoList[index].isComplete  },  ...todoList.slice(index  +  1)];
	setTodoList(newTodos);
}
```
...
```javascript
const  toggleTodoCompleteAtIndex  =  (index)  =>{
// without this how we can cheat ourselves saying that we did
// something when we didn't?
	const  item  =  {content:todoList[index].content, isComplete:  !todoList[index].isComplete  }
	const  temporaryTodos  = [...todoList.slice(0,  index),  item,  ...todoList.slice(index  +  1)];
	setTodoList(temporaryTodos);
}
```
...
```javascript
const  removeTodoAtIndex  =  (index)  =>{
// Ok, the last resort, what if we had a to-do hanging around for days or weeks?
// how do we get rid of them when it is obvious that we don't/won't do this? 
//if only we could erase it so we could feel a little beter
	if (index  ===  0  &&  todoList.length ===  1) return;
	setTodoList([...todoList.slice(0,  index),  ...todoList.slice(index  +  1)]);
}
```
last but not least, the containment part in container:

```javascript
const  childrenProps  =  {
	todos: [...todoList],
	createTodoAtIndex:  createTodoAtIndex,
	updateTodoAtIndex:  updateTodoAtIndex,
	removeTodoAtIndex:  removeTodoAtIndex,
	toggleTodoCompleteAtIndex:  toggleTodoCompleteAtIndex
}

	return (
	React.cloneElement(children,  childrenProps)
			)
```

I had never used the __React.CloneElement__ API before and it's pretty cool, it solves the problem of passing new props to a children component that we received from above, in this case we made an object with our state and all our state modifying functions and pass it to our children.

Is very important for you to modify the state indirectly and not performing the mutations directly, this can be a subtle source of bugs and you'll end up stuck for more time than the one I'd like to admit, so please Don't.

### UI's, façades, views and more:

Create a file and name it UI.js:

From the top
```javascript
import  React  from  'react';
import  logo  from  './logo.svg';
import  './App.css';
```
...
```javascript
function  handleKeyDown(e,  i)  {
	if (e.key  ===  'Enter') {
	e.preventDefault();
	props.createTodoAtIndex(i);
	setTimeout(()  =>  {
		document.forms[0].elements[i  +  1].focus();
	},  0);
}

if (e.key  ===  'Backspace'  &&  props.todos[i].content  ===  ''  &&  i  !==  0) {
	e.preventDefault();
	props.removeTodoAtIndex(i);
	setTimeout(()  =>  {
	document.forms[0].elements[i  -  1].focus();
		},  0);
	}

}
```
our handleKeyDown 'handles' the createTodoAtIndex & removeTodoAtIndex part in a graceful way, decreting when and where our cursor will be after those operations.

...

```javascript
return (

<div  className="app">
	<div  className="header">
		<div  style={{display: 'inline', textAlign: 'center'}}>
		<img  src={logo} className="logo"  alt="logo"  style={{float: 'left', paddingTop: '30px', paddingRight:'0px'}}/>
		<div  style={{fontSize: '90px', float:'left', marginTop: '40px', marginLeft:'50px', color: 'white'}}>Recoil.js</div>
	</div>

	</div>
		<form  className="todo-list">
		<ul>
		{props.todos.map((todo, i) => (
		<div  key={i} className={`todo ${todo.isComplete  &&  'todo-is-completed'}`}>
		<div  className={'checkbox'} onClick={() =>  props.toggleTodoCompleteAtIndex(i)}>
			{todo.isComplete  && (
			<span>&#x2714;</span>
			)}
	</div>

	<input
		type="text"
		value={todo.content}
		onKeyDown={e  =>  handleKeyDown(e, i)}
		onChange={e  =>  props.updateTodoAtIndex(e, i)}
		/>

	</div>

	))}

		</ul>
	</form>

	</div>

	);

}
```
Display every item in our array.

...

### Assambly time
Create another file (the final I promise) called myApp.js where you'll put together the last two files, myContainer & UI
```javascript
import  React  from  'react';
import  MyContainer  from  './myContainer';
import  UI  from  './UI';

function  App(){
	return(
		<MyContainer> // parent
			<UI/> // children 
		</MyContainer>
		)
}
export  default  App;
```
This is the component that we're rendereing in the first file.

That was the last piece of the puzzle you just need to
```javascript
npm start
```
Let there be http://localhost:3000/  

![react + recoil](https://i.pinimg.com/originals/19/82/d1/1982d1cb8d3c85ff62bf32e1518067db.png)

I really like recoil and I really like the word reactish. The simplicity and the flexibility are priceless
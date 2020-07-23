---
title:  'Redux 101'
date:  '2020-01-02'
series:  'state mngmt'

---

# Another React/Redux Tutorial

![Redux left, React right](https://i.pinimg.com/originals/e3/e2/d6/e3e2d6f6852c07710f5ec8b4fb23fe63.png )

Why you might ask if there's a gazillion of these online, all over the globe and in every conceivable language including __High Valyrian__ (don't really know about that one but highly probable considering the huge overlap between programmers and cool languages enthusiasts), well I can give you two good reasons:
 1) whenever you try to grasp new concepts I learned that the best thing is to examine it from a multitude of angles, specially highly abstract things. Abstract things don't tell you from the start why the case is so, so you need to try to figure out  how the different parts relate to actual concrete cases, plus every reader has a sort of ideal author for every subject, sometimes you spend a lot of time reading articles, books, tutorials here and there until you find the perfect match with the perfect style for your brain and who knows this time I might be your 'One'. 
 2) The second reason is little about me. After done a lot of times point 1 with a lot of stuff myself the best way to solidify the knowledge is just to pass it to someone else, a teacher of mine used to say that one don't really understand a subject until is able to explain it to a 5YO toddler.

### So what's all the fuss about? What is Redux? And when do we use it?

Redux is a __Global__ state management framework. To know what global means here we're going to contrast it with the way we normally manage state in react (now reacts have its own way of managing global state with contexts).

As you might know already, react is a component based UI framework and the way to create user interfaces in it is to create the different components and __stack__/__embed__ them into one another in a hierarchical manner, like this:

![React data flow model](https://i.pinimg.com/originals/64/ab/21/64ab21218cd4f66905a40e0019bfd232.jpg)

As you can see from the picture your app's structures is a tree and the arrows indicates quite clearly that the flow is unidirectional from top to bottom, that means that state, props flow from parent to child only. Normally but no always the components on the leafs are smaller components like inputs and buttons or sliders.

This way of thinking allows us to think in a more structured way about our app diminishing our cognitive payload, helps us find bugs faster and easier.

This kind of structures are well-known since the dawn of CS and because of that there're tons algorithms for dealing with them efficiently. React uses a special diff tool to know what parts of your structure have changed and make the modification accordingly super quick without you ever touching the DOM, how cool is that huh?

The falcon eyed programmer among you quickly noted that this way of doing things introduces some not that nice complexity. What if I have a tall tree and I need to pass data from a near the root component to a leaf component? That would entail to go from component to component editing your source code to pass through them  state they won't use and that gets tiring pretty quick. Another thing is, what about if I want of the leafs want to talk to another component in another branch for example? Then I'd need to incur in the former problem but for two branches instead, ugh!

And here's where the word __Global__ comes in and saves the day.

Global state is nothing else than a central place where the components can plug into with the need to pass through the whole tree to get what it needs, think of the difference between global vs local and the difference between landline telephone where your voice goes through a long cable to be able to talk and a satellite enabled cellphone.

OK now that you know what Redux is, let's see how it works

![how redux works](https://i.pinimg.com/originals/81/98/33/8198334133ea812f68a5906f8c1f6d52.png)

They say that a picture is worth more than a thousand words, and I have seen a few of the pics regarding this subject and I can assure you that this is the most accurate there is. Let's break it down:

### The view
This is your React implementation of your app but this time a lot of the hard logic have been striped away to locate it in another place, making the components lighter and more pleasant for the eyes to read the code, you can still have some dynamic local state here and pass it down to close children.

### Actions
Actions are plain old JavaScript objects, nothing fancy to see here. The genius of actions is that it is used to describe in a meaningful way what we want to change from the state sending this little POJOs to the store. We get cool benefits doing things this way, for example, it'd be easier for the developer to build a time travel implementation to get the whole app to whichever state in its past or maybe send the collection of actions to be hydrated in another place, and that my friend is very cool.

### Dispatcher
POJOs can't do very much by its own right? They're POJOs for Christ's sake. We need some kind of way to get the actions into the store, and what better way that and plain Old  function or  'plOction' (I know, LOL). So we call the dispatcher passing it our action and it gets it where it needs to go, the store.

### The Store, the Reducer and the State
Another good way of thinking about Redux is the __subscriber/provider__ pattern, in this case the store is the provider from which every component plug into (or subscribe) to get a taste of sweet fresh state. How the do that? The store pass the old state to __pure functions__ or __reducers__ and they return the new state, their signature is (oldState, Action) => newState, in the FP camp we call these type of functions the __state monad__ and they're an interesting and cool digression in which we won't indulge today.

---

There you go, the basic underlying Redux concepts. There are a few cool things that I purposefully left behind like middleware and store enhancers that add flexibility to our store management bag of tricks but for not making any longer an already long post I decided to leave them out and teach only the strictly necessary to get Redux going in our app.

If you're still confused, that's okay the Redux documentation is massive and I had to read, re-read and experiment with the framework a few times until it started to dawn on me but don't worry do you thought I'd  leave you in that.... state, do you? Well, no, what's a lesson without some good ol' practice?

 This time we're going to implement the canonical To-do List, yes you heard it, AGAIN!! But this time I made sure to get the shortest/easiest to implement. I took the [example from a guy called james king]([https://upmostly.com/tutorials/build-a-todo-app-in-react-using-hooks](https://upmostly.com/tutorials/build-a-todo-app-in-react-using-hooks)), so I won't be starting from scratch and if you really want to get this article and the code, go to his tutorial and read it, is quick and easy.

__the only new additions to our package.json will be reactg-redux and redux, so please install them before continuing__

### Code organization

Redux is un-opinionated about how you structure the code of your app but a lot of people, myself included, adopted the Rails-like-style separating folders for actions "actions", "reducers", "containers" and "components".

So first go to jame's article and copy the whole app and organize you main folder the following way minus the "Old app" this is where the old main app lives:

![code organization](https://i.pinimg.com/originals/74/f7/d2/74f7d22786eb5555a4b798d5a48a6c83.png)


Go to the Actions folder and an index.js file and move 
```javascript
  
export  const  createTodoAtIndex  =  index  => ({
type:  'CREATE',
payload :  index
})
  
export  const  updateTodoAtIndex  =  (e,  i)  => ({
type:  'UPDATE',
payload :  {
text:  e.target.value,
index:  i}
})

export  const  removeTodoAtIndex  =  index  => ({
type:  'REMOVE',
payload :  index
})

export  const  toggleTodoCompleteAtIndex  =  index  => ({
type:  'TOGGLE',
payload :  index
})
```
Those are called, in the Redux jargon, actions creators, they're functions that return the actions that will passed to the store a little later, remember that actions are poor, uninteresting objects so you need a way to create them and actions creators are that way. Every action must have a type denoting the intention of the action so the reducers know what to do when they receive them. The payload is option though, the payload is used when you need to send information to the store.

Next on the components folder you'll create two more files, namely, MainApp.js and TodoUI.js.

MainApp.js is not very different from Jame's App.js the differences a minimal so not a lot to explain here:

```javascript
import  React  from  'react'
import  TodoListContainer  from  '../containers/TodoListContainer'

const  MainApp  =  ()  => (
<div>
	<TodoListContainer/>
</div>
)
export  default  MainApp;
```

As you see here we use a component called <TodoListContainer / > instead of the most intuitive name that we used for another file, < TodoUI />, these are not 2 completely separated components in all the sense of the word, we used here the [dan abramo's presentational vs container pattern]([https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)), if you don't know is that you can go to that article and read it as well, if you consider that is too much reading and you'll get the idea from the name, I'll leave you an image for better understanding:

 ![et voila](https://i.pinimg.com/originals/40/6f/f0/406ff074498d5fd65d975cdec16ea352.png)

The TodoUI.js component will have only the visual aspect of the app and only a bit logic:

```javascript
import  React  from  'react';
import  logo  from  '../logo.svg';
import  '../App.css';

 function  TodoUI(props)  {

  function  handleKeyDown(e,  i)  {
	if (e.key  ===  'Enter') {
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

  
return (
	<div  className="app">
		<div  className="header">
		<img  src={logo} className="logo"  alt="logo"  />
		<h1  style={{color: '#ffffff', fontSize: '50px', marginBottom: '0px'}}>Eat your abstractions</h1>
		<h5  style={{color: '#ffffff'}}>
			UI taken from <a  href="https://upmostly.com/tutorials/build-a-todo-app-in-react-using-hooks"style={{textDecoration: 'none', color: '#62dafb', paddingLeft:'5px'}}> James's King article in upmostly.com</a>, kudos to him.
		</h5>
	</div>

<form  className="todo-list">
<ul>
	{props.todos.map((todo, i) => (
		<div  key={i} className={`todo ${todo.isCompleted  &&  'todo-is-completed'}`}>
		<div  className={'checkbox'} onClick={() =>  props.toggleTodoCompleteAtIndex(i)}>
			{todo.isCompleted  && (
				<span>&#x2714;</span>
			)}

</div>
	<input
		type="text"
		value={todo.content}
		onKeyDown={e  =>  handleKeyDown(e, i)}
		onChange={e  =>  props.updateTodoAtIndex(e, i)} />

		</div>
))}

		</ul>

		</form>

		</div>

		);

}
export  default  TodoUI;
```

Here we have what the user willl see when we get things up and running and you guess it, those are our action creators in at work but where are they coming from? And who's sending them, stick around please.

The TodoListContainer.js is something a little more interesting:

```javascript
import  TodoUI  from  '../components/TodoUI';
import  {  connect  }  from  'react-redux';
import  {createTodoAtIndex,updateTodoAtIndex,	
		 removeTodoAtIndex, toggleTodoCompleteAtIndex
		} from  '../actions'

  
const  mapStateToProps  =  state  => ({
		todos: [...state] })

  const  mapDispatchToProps  =  dispatch  => ({
		createTodoAtIndex:  id  =>  dispatch(createTodoAtIndex(id)),
		updateTodoAtIndex:  (evt,id)  =>  dispatch(updateTodoAtIndex(evt,id)),
		removeTodoAtIndex:  id  =>  dispatch(removeTodoAtIndex(id)),
		toggleTodoCompleteAtIndex:  id  =>  dispatch(toggleTodoCompleteAtIndex(id)),
})
  
export  default  connect(mapStateToProps,  mapDispatchToProps)(TodoUI)

```
All right what is this component not so much component? It doesn't even have a return method required for React. Well it's because is not mean to display visuals silly, is a  container component remember? 

Here we import the connect method and this is a [Higher Order Component or HOC](https://reactjs.org/docs/higher-order-components.html) which a component that accepts another component and return an enhanced one, in this case we're passing our <TodoUI/> component and this is how our components connect to the __global state__, in our cellphone analogy this would be our cellular tower or a chip in our smartphone that connect to the satellite.

what about those 2 other methods __mapStateToProps__ and __mapDispatchToProps__?

Our __store/satellite__ sends the global state to every component that want its 'cut' but not everyone need or wants the whole pie, mapStatoToProps only sends to our components whatever we want, so for example receive a deep and very data loaded structure from the store and we only want or to records in <TodoListContainer /> we'd create a transformation function to extract that data and the I'd pass the result to our component to mapStateToProps.

Now mapDispatchToProps, see at the top of the source file and check that it is here that we import our action creators that we've made earlier. We receive the dispatcher from the store, wrap it around our action creators, bundle then together in an object that we'll send to our component.

I don't know you but for me this is a very structure and systematic approach to state management, I like it besides the boilerplate.

Open the reducers folder and create another index.js file with the following code:

```javascript
const  todos  =  (state  = [{content:'', isCompleted:  false}],  action)  =>  {

		switch (action.type) {
			case  'CREATE':
				const  newTodos  = [...state];
				newTodos.splice(action.payload  +  1,  0,  {
				content:  '',
				isCompleted:  false,
				});
				return  newTodos

			case  'UPDATE':
				const  newState  = [...state];
				newState[action.payload.index].content  =  action.payload.text;
				return  newState

		  
			case  'REMOVE':
			if (action.payload  ===  0  &&  state.length ===  1){
				return [...state];
				}  else  {

				const  todos  = [...state];
			return  todos.slice(0,action.payload).concat(todos.slice(action.payload  +1, todos.length));

		}

		  
			case  'TOGGLE':
			const  temporaryTodos  = [...state];
			temporaryTodos[action.payload].isCompleted  =  !temporaryTodos[action.payload].isCompleted;
			return  temporaryTodos;

		default:
		return  state
			}

		}

export  default  todos
```

Remember that I told you that the __type__ inside our actions was obligatory, this is way, so can map anction to desired effect. The reducer __must__ be a pure function and not mutate the state directly. Look at the default first argument, this is the initial state of our app when there's no to-do item... to do in our list. Remember also that is this container with the <TodoUi /> embeded that will go in our <MainApp /> component.

Lastly, lets put the final piece to get this one get going. In the root folder move the index.js and app.js file to the OldApp folder and create, in the root, another index.js file with the following:

```javascript
import  React  from  'react'
import  {  render  }  from  'react-dom'
import  {  createStore  }  from  'redux'
import  {  Provider  }  from  'react-redux'
import  MainApp  from  './components/MainApp'
import  rootReducer  from  './reducers'

const  store  =  createStore(rootReducer)

render(
	<Provider  store={store}>
		<MainApp  />
	</Provider>,
	document.getElementById('root')
	)
```

Import our < MainApp /> and our reducers, import also the createStore method from redux and the < Provider /> component from react-redux.

We create our store passing our reducers, we then < Provider /> around our < MainApp /> component so it becomes the exosphere where our __store/satellite__ orbits, and finally pass our store to the < Provider />

et Voila guys, quick, easy and basic redux for once. Hope you enjoyed the journey, see you soon.
//로그인
const loginForm = document.querySelector("#loginForm");
const loginInput = loginForm.querySelector("input");

const greeting = document.querySelector("#greeting");
const hidden = "hidden";
const usernameKey = "username";

function onLoginSubmit (e) {
    e.preventDefault();
    loginForm.classList.add(hidden);
    const userName = loginInput.value;
    localStorage.setItem(usernameKey, userName);
    paintGreeting(userName);
}

function paintGreeting (username) {
    greeting.innerText = `Hello ${username}!`;
    greeting.classList.remove(hidden);
}

const savedUsername = localStorage.getItem(usernameKey);

if(savedUsername === null) {
    //show the form
    loginForm.classList.remove(hidden);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    //show the greeting
    paintGreeting(savedUsername);
}

//시계
const clock = document.querySelector("#clock");

function getClock () {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);

//랜덤 명언
const quotes = [
    {
        quote: "A little sincerity is a dangerous thing, and a great deal of it is absolutely fatal.",
        author: "Oscar Wilde",
    },
    {
        quote: "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
        author: "Helen Keller",
    },
    {
        quote: "To will is to select a goal, determine a course of action that will bring one to that goal, and then hold to that action till the goal is reached. The key is action.",
        author: "Michael Hanson",
    },
    {
        quote: "Only passions, great passions, can elevate the soul to great things.",
        author: "Denis Diderot",
    },
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;

//랜덤 배경
const images = [
    "https://images.unsplash.com/photo-1600691098177-d704b774f5e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1701&q=80", 
    "https://images.unsplash.com/photo-1663970206537-2d24183b59c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80", 
    "https://images.unsplash.com/photo-1663184482663-ba6264996d61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80", 
    "https://images.unsplash.com/photo-1663275162414-64dba99065a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80", 
    "https://images.unsplash.com/photo-1659264734760-094c73faf1f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1656932850123-dbd64a854816?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2006&q=80",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImg = document.createElement("img");
bgImg.src = `${chosenImage}`;
document.body.appendChild(bgImg);

//투두리스트
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoForm input");
const todoList = document.querySelector("#todoList");
let todos = [];
const todosKey = "todos";

function saveTodos () {
    localStorage.setItem(todosKey, JSON.stringify(todos));
}

function paintTodo (newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    span.innerText = newTodo.text;
    todoList.appendChild(li);
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    todos = todos.filter(todo => todo.id !== parseInt(li.id));
    saveTodos();
}

function handleTodoSubmit (event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        text : newTodo,
        id : Date.now(),
    }
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(todosKey);
console.log(savedTodos);
if(savedTodos !== null) {
    const parseTodos = JSON.parse(savedTodos);
    todos = parseTodos;
    parseTodos.forEach(paintTodo);
}

//날씨
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const apiKey = '0713ff5f89673b0e0c8b78c52e285ac1';
function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("You live in", lat, lng);
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;}
        );
    }



function onGeoError () {
    alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
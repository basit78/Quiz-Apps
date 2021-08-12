let Login = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      var displayName = user.displayName;
      var obj = {
      name: displayName,
      }
      firebase.database().ref(`user`).push(obj)
      document.getElementById('TEXT').style.color = "white"
      document.getElementById('TEXT').innerHTML = displayName
      window.location.href = "./question.html"
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage)
    });
}
var obj={
  class:"basit",
}
firebase.database().ref(`user`).push(obj)



// sign Up
let signup = () => {
  var Name = document.getElementById('names').value
  var email = document.getElementById('emails').value;
  var pass = document.getElementById('passs').value;
  // signin authentication
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((data) => {
      console.log(data)
      var obj = {
        name :Name,
        email :email,
        pass : pass,
      }
      firebase.database().ref(`user`).push(obj)
      Name = ""
      email = ""
      pass = ""
      window.location.href = "./question.html"
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    });
}



// sign In
let signin = () => {
  var email = document.getElementById('email').value;
  var pass = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((data) => {
      console.log(data)
      email = ""
      pass = ""
      window.location.href = "./question.html"
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    });
}

// Quiz start

let questions = [
  {
    id: 1,
    question: " What is Html stands for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Tool Makeup Language"
    ]
  },
  {
    id: 2,
    question: "What is CSS stands for?",
    answer: "Cascading Style Sheet",
    options: [
      "Crazy Solid Shapes",
      "Computer Style Sheet",
      "Cascading Style Sheet"

    ]
  },
  {
    id: 3,
    question: "What is JS stands for?",
    answer: "Java Script",
    options: [
      "Junior School",
      "Java Script",
      "Job Security"

    ]
  },
  {
    id: 4,
    question: "What is ES6 stands for?",
    answer: "ECMAScript 6",
    options: [
      "Estonia 6",
      "Educational Services 6",
      "ECMAScript 6"
      
    ]
  },
  {
    id: 5,
    question: "What is MERN stands for?",
    answer: "MongoDB, ES 6, React,Node",
    options: [
      "MongoDB, ES 6, React,Node",
      "MongoDB, Express, React,Node",
      "MongoDB, Express, Node, R"

    ]
  },
];

let question_count = 0;
let points = 0;

window.onload = function() {
  show(question_count);

};




function next() {

   
  if (question_count == questions.length - 1) {
    location.href = "end.html";
  }
  console.log(question_count);

  let user_answer = document.querySelector("input.option.active").innerHTML;
  if (user_answer == questions[question_count].answer) {
    points += 1;
    sessionStorage.setItem("points", points);
  }
  console.log(points);

  question_count++;
  show(question_count);
}

function show(count) {
  let question = document.getElementById("questions");
  let [first, second, third] = questions[count].options;

  question.innerHTML = `
  <h2>Q${count + 1} of 5: <br> <br>${questions[count].question}</h2>
 
  <input type="radio" name="A" class="option"> ${first}</input></br>
  <input type="radio" name="A" class="option"> ${second}</input></br>
  <input type="radio" name="A" class="option"> ${third}</input></br></br>

  `;
  toggleActive();
}

function toggleActive() {
  let option = document.querySelectorAll("input.option");
  for (let i = 0; i < option.length; i++) {
    option[i].onclick = function() {
      for (let i = 0; i < option.length; i++) {
        if (option[i].classList.contains("active")) {
          option[i].classList.remove("active");
        }
      }
      option[i].classList.add("active");
    };
  }
}

function submitForm(e) {
  e.preventDefault();
  let name = document.forms["welcome_form"]["name"].value;
  if (name == "") {
    alert("Please enter your name!");
    return false;
  }
  sessionStorage.setItem("name", name);

  location.href = "question.html";
}


let dt = new Date(new Date().setTime(0));
let ctime = dt.getTime();
let seconds = Math.floor((ctime % (1000 * 60))/ 1000);
let minutes = Math.floor((ctime % (1000 * 60 * 60))/( 1000 * 60));
console.log(seconds, minutes);
let time = 0;
let mytime = setInterval(function(){
        time++;
        
        if(seconds < 59) {
            seconds++;
        } else {
            seconds = 0;
            minutes++;
        }
        let formatted_sec = seconds < 10 ? `0${seconds}`: `${seconds}`;
        let formatted_min = minutes < 10 ? `0${minutes}`: `${minutes}`
        document.querySelector("span.time").innerHTML = `${formatted_min} : ${formatted_sec}`;
    }, 1000);


let user_name = sessionStorage.getItem("name");
let user_points = sessionStorage.getItem("points");

document.querySelector("span.name").innerHTML = user_name;
document.querySelector("span.points").innerHTML = user_points;










































// for(var i=0; i<=Questions.length;i++){
//   document.write(`<br/>`)
//   document.write(`<br/>`)
//   document.write(Questions[i].Q1)
//   document.write(`<br/>`) 
//   for(var j=0;j<=Questions[1].length;j++){
//     document.write(`<input type="radio" id="age1" name="age" value=${Questions[j][i].Choice}}>`+ Questions[j][i].Choice)
//   }
// }
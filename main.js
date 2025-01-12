// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


let heartsNodeArray = [...document.getElementsByClassName("like-glyph")]; //define our target of the hearts, create an HTML Collection, convert it to an iterable array
let modal = document.getElementById("modal") //define the error message so that we can call it throughout the script
let modalMessage = document.getElementById('modal-message') //define the error message paragraph so that we can call it throughout the script

//This was the 3rd task, but got added to the top since it needs to be invoked 1st because it is a promise.  Setup catch; create a function expression (define a variable using a function=> it is automatically invoked upon using the variable) that calls the mimicServer and catches its error if thrown.
let callMimicServerCatch = (event) => {  //a new function that calls the mimic server and performs a catch on the error message.  The catch function is defined later as handleError
  mimicServerCall()
  .then(() => handleResponse(event))
  .catch(error => handleError(error))
}

let heartNodeEvents = heartsNodeArray.map(heartNode => {  //this is our hearts array, we .map() thru them and assign eventListeners.  Also on every click we potentially get an error
  heartNode.addEventListener('click', callMimicServerCatch)
})

let handleError = (errorMessage) => {  //described above, this handles the error caught in the .catch()
  modal.classList.remove("hidden") //remove hidden from error to that it can be seen
  modalMessage.innerText = errorMessage //pulls in the modal-message's inner text
  setTimeout(() => { //sets a timer, after 3 seconds the error message disappears
    modal.classList.add("hidden") //adds the hidden quality back on
    modalMessage.innerText = ''//previous error messages are replaced with empty strings '' so that we don't accumulate them with each new error
  }, 3000);
}

let handleResponse = (event) => { //the function that deals with the successful server calls
  if(event.target.textContent === EMPTY_HEART) { //since default is empty, we can return a FULL_HEART upon a click.  This path was found by inspecting the heart in the console.  The heart is in the textContent section
    event.target.classList.add('activated-heart') //add the activated-heart CSS 
    event.target.textContent = FULL_HEART // change it from a defauly empty heart, to a FULL_HEART upon click
  } else {  //this assumes it's already a full heart
    event.target.classList.remove('activated-heart')  //remove the FULL_HEART and the red activated-heart CSS to make it empty again
    event.target.textContent = EMPTY_HEART
  }
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  console.log("clicked")
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

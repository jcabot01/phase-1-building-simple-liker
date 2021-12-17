// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


let heartsNodeArray = [...document.getElementsByClassName("like-glyph")]; //define our target of the hearts, create an HTML Collection, convert it to an iterable array
let modal = document.getElementById("modal") //define the error message so that we can call it throughout the script
let modalMessage = document.getElementById('modal-message') //define the error message paragraph so that we can call it throughout the script

//This was the 3rd task, but got added to the top since it needs to be invoked 1st because it is a promise.  Setup catch; create a function expression (define a variable using a function=> it is automatically invoked upon using the variable) that calls the mimicServer and catches its error if thrown.
let callMimicServerCatch = () => {  //a new function that calls the mimic server and performs a catch on the error message.  The catch function is defined later as handleError
  try {
    throw mimicServerCall()
  }
  catch (error) {
    handleError(error)
  }
  finally {
    console.log('no errors')
  }
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

// When the "server" returns a success status:
//    Change the heart to a full heart
//    Add the .activated-heart class to make the heart appear red
// When a user clicks on a full heart:
//     Change the heart back to an empty heart
//     Remove the .activated-heart class
// Keep all your styling rules entirely in style.css. Do not manipulate any .style properties.
// Only manipulate the DOM once the server request responds. Do not make the heart full until you're inside a successful .then block.



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

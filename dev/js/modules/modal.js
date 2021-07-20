// select the modal-background
let modal = document.getElementById('modal-background');
// select the close-btn 
let closeBtn = document.getElementById('close-button');

let doneBtn = document.getElementById('done-button');

// hides the modal when the user clicks close-btn
closeBtn.addEventListener('click', function() {

  modal.classList.add('hide');
});

doneBtn.addEventListener('click', function() {
  modal.classList.add('hide');
});

// hides the modal when the user clicks outside the modal
window.addEventListener('click', function(event) {
  // check if the event happened on the modal-background
  if (event.target === modal) {
    // hides the modal
    modal.classList.add('hide');
  }
});

function openModal(){
  modal.classList.remove('hide');
}
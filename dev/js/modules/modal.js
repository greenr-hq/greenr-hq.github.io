// select the modal-background
let modalBackground = document.getElementById('modal-background');
// select the close-btn 
let closeBtn = document.getElementById('close-btn');

// hides the modal when the user clicks close-btn
closeBtn.addEventListener('click', function() {
  modalBackground.style.display = 'none';
});

// hides the modal when the user clicks outside the modal
window.addEventListener('click', function(event) {
  // check if the event happened on the modal-background
  if (event.target === modalBackground) {
    // hides the modal
    modalBackground.style.display = 'none';
  }
});
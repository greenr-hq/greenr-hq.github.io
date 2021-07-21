// select the modal-background
let modal = document.getElementById('modal-background');
// select the close-btn 
let closeBtn = document.getElementById('close-button');

let doneBtn = document.getElementById('done-button');

// hides the modal when the user clicks close-btn
closeBtn.addEventListener('click', function() {

  modal.classList.remove('open-modal');
});

doneBtn.addEventListener('click', function() {
  modal.classList.remove('open-modal');
});

// hides the modal when the user clicks outside the modal
window.addEventListener('click', function(event) {
  // check if the event happened on the modal-background
  if (event.target === modal) {
    // hides the modal
    modal.classList.remove('open-modal');
  }
});

function openModal(title, subtitle, content){
    document.getElementById('modal-title').innerHTML = title;
    
    if(subtitle.badge){
      document.getElementById('modal-subtitle-text').innerHTML = subtitle.text;
      document.getElementById('modal-subtitle-badge').innerHTML = subtitle.badge;
      document.getElementById('modal-subtitle-badge').classList.remove('delete')
    } else {
      document.getElementById('modal-subtitle-text').innerHTML = subtitle.text;
      document.getElementById('modal-subtitle-badge').classList.add('delete')
    }

    content.forEach(element => {
      var paragraph = document.createElement("p");
      paragraph.innerHTML = '• ' + element
      document.getElementById('modal-content').appendChild(paragraph);
    });
    modal.classList.add('open-modal');
}
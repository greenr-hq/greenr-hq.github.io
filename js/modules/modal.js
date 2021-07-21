// select the modal-background
let modal = document.getElementById('modal-background');

let doneBtn = document.getElementById('done-button');

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

    document.getElementById('modal-content-container').innerHTML = '';
    content.forEach(element => {
      var paragraph = document.createElement("p");
      paragraph.innerHTML = '• ' + element
      paragraph.classList.add('modal-content')
      document.getElementById('modal-content-container').appendChild(paragraph);
    });
    modal.classList.add('open-modal');
}
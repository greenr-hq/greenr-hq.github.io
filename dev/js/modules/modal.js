// select the modal-background
let modal = document.getElementById('modal-background');

let doneBtn = document.getElementById('done-button');
let abortBtn = document.getElementById('abort-button');

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

function openModal(title, subtitle, content, settings, action){

  
    doneBtn.removeAttribute('onclick')
    abortBtn.removeAttribute('onclick')
    document.getElementById('abort-button').classList.add('hide')

    document.getElementById('modal-title').innerHTML = title;
    
    if(subtitle.badge){
      document.getElementById('modal-subtitle-text').innerHTML = subtitle.text;
      document.getElementById('modal-subtitle-badge').innerHTML = subtitle.badge;
      document.getElementById('modal-subtitle-badge').classList.remove('delete')
    } else {
      document.getElementById('modal-subtitle-text').innerHTML = subtitle.text;
      document.getElementById('modal-subtitle-badge').classList.add('delete')
    }

    document.getElementById('modal-content-container').innerHTML = ''

    var content_prefix = ''

    if(settings.list){
      content_prefix = '• '
    }

    content.forEach(element => {
      var paragraph = document.createElement("p");
      paragraph.innerHTML = content_prefix + element
      paragraph.classList.add('modal-content')
      document.getElementById('modal-content-container').appendChild(paragraph);
    });

    if(action){
      document.getElementById('done-button').innerHTML = action.done;

      document.getElementById('abort-button').innerHTML = action.abort;
      document.getElementById('abort-button').classList.remove('hide')
      abortBtn.onclick = function() {modal.classList.remove('open-modal');};

      let doneBtn = document.getElementById('done-button');

      doneBtn.addEventListener('click', function() {
        action.execution()
      });
    }

    modal.classList.add('open-modal');
}
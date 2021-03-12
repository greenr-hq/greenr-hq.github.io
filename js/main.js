var plants = [];

var hasSelected = false;
var isHome = true;
var selectedId = -1;

function renderList(){

    document.getElementById('plants').innerHTML = "";

    var id = 0;

    plants.sort((a, b) => { return getStatusByPlant(b) - getStatusByPlant(a)});

    plants.forEach(plant => {
        
        const plantElement = document.createElement('div');

        var status = '';

        if(getStatus(id) == 0){
            status = 'ok';
        } else if(getStatus(id) == 1){
            status = 'warning';
        } else {
            status = 'danger';
        }

        plantElement.id = 'plant-id-' + id;
        plantElement.className = 'plant';
        plantElement.setAttribute("onclick","pick(" + id + ");");
        plantElement.innerHTML = `
            <div class="status ` + status + `"></div>
            <h2 class="plant-name">` + plant.name +`</h2>
            <h3 class="room-name">` + plant.location +`</h3>
        `

        document.getElementById('plants').appendChild(plantElement);

        id++;
    });
}

function pick(id){

    unselectAll();

    if(hasSelected == false){

        hasSelected = true;
        selectedId = id;
        document.getElementById("plant-id-" + id).classList.add("selected");
    } else {
        if(selectedId == id){
            hasSelected = false;
        } else {
            hasSelected = true;
            selectedId = id;
            document.getElementById("plant-id-" + id).classList.add("selected");
        }
    }

    updateMenu();
}

function unselectAll(){

    for(var i = 0; i < plants.length; i++){
        document.getElementById("plant-id-" + i).classList.remove("selected");
    }
}

function updateMenu(){
    if(hasSelected){
        document.querySelectorAll(".select-only").forEach(element => element.classList.add('material-icons-available'));

        if(getStatus(selectedId) == 0){
            document.querySelectorAll(".needs-water-only").forEach(element => element.classList.remove('material-icons-available'));
        }
    } else {
        document.querySelectorAll(".select-only").forEach(element => element.classList.remove('material-icons-available'));
    }
}

function getStatus(id){

    var plant = plants[id];

    var now = new Date();
    var watered = new Date(Date.parse(plant.last_time_watered));

    var since_watering = Math.floor((now - watered) / (1000*60*60*24));

    if(since_watering < plant.watering_interval){
        return 0;
    } else if(since_watering == plant.watering_interval){
        return 1;
    } else {
        return 2;
    }
}

function getStatusByPlant(plant){

    var now = new Date();
    var watered = new Date(Date.parse(plant.last_time_watered));

    var since_watering = Math.floor((now - watered) / (1000*60*60*24));

    if(since_watering < plant.watering_interval){
        return 0;
    } else if(since_watering == plant.watering_interval){
        return 1;
    } else {
        return 2;
    }
}

function remove(){
    if(hasSelected){
        removePlant(plants[selectedId]);
        plants.splice(selectedId, 1)
        hasSelected = false;
        updateMenu();
        renderList();
    }
}

function water(){
    if(hasSelected){
        if(getStatus(selectedId) != 0){
            plants[selectedId].last_time_watered = new Date().toISOString().split('T')[0];
            editPlant(plants[selectedId]);
            hasSelected = false;
            updateMenu();
            renderList();
        }
    }
}

function refresh(){
    hasSelected = false;
    load();
    updateMenu();
    renderList();
}

function areInputsFilled(){
    return (document.getElementById('name').value.length != 0 &&
    document.getElementById('location').value.length != 0 &&
    document.getElementById('last-time-watered').value  &&
    document.getElementById('watering-interval').value.length != 0)
}

function add(){

    if(isHome){

        isHome = false;

        document.getElementById('plants').classList.add('hide');
        document.getElementById('done-icon').classList.add('hide');
        document.getElementById('edit-icon').classList.add('hide');
        document.getElementById('delete-icon').classList.add('hide');
        document.getElementById('refresh-icon').classList.add('hide');
        document.getElementById('back-icon').classList.remove('hide');
        document.getElementById('edit').classList.remove('hide');
        document.getElementById('add-icon').classList.remove('material-icons-available');

    } else {

        if(areInputsFilled()){

            plants.push(
                {
                    name: document.getElementById('name').value,
                    location: document.getElementById('location').value,
                    last_time_watered: document.getElementById('last-time-watered').value,
                    watering_interval: parseInt(document.getElementById('watering-interval').value) 
                }
            );

            document.getElementById('name').value = '';
            document.getElementById('location').value = '';
            document.getElementById('last-time-watered').value = '';
            document.getElementById('watering-interval').value = '';

            addPlant(plants[plants.length-1]);

            hasSelected = false;
            updateMenu();
            renderList();

            goHome();
        }
    }
}

function edit(){

    if(isHome){

        if(hasSelected){

            isHome = false;

            document.getElementById('plants').classList.add('hide');
            document.getElementById('add-icon').classList.add('hide');
            document.getElementById('done-icon').classList.add('hide');
            document.getElementById('delete-icon').classList.add('hide');
            document.getElementById('refresh-icon').classList.add('hide');
            document.getElementById('back-icon').classList.remove('hide');
            document.getElementById('edit').classList.remove('hide');


            var plant = plants[selectedId];

            document.getElementById('name').value = plant.name;
            document.getElementById('location').value = plant.location;
            document.getElementById('last-time-watered').value = plant.last_time_watered;
            document.getElementById('watering-interval').value = plant.watering_interval;

        }

    } else {

        if(areInputsFilled()){

            plants[selectedId] =
                {
                    name: document.getElementById('name').value,
                    location: document.getElementById('location').value,
                    last_time_watered: document.getElementById('last-time-watered').value,
                    watering_interval: parseInt(document.getElementById('watering-interval').value) 
                };

            document.getElementById('name').value = '';
            document.getElementById('location').value = '';
            document.getElementById('last-time-watered').value = '';
            document.getElementById('watering-interval').value = '';

            editPlant(plants[selectedId]);

            hasSelected = false;
            updateMenu();
            renderList();

            goHome();
        }
    }
}

function inputUpdated(){

    if(areInputsFilled()){
        document.getElementById('add-icon').classList.add('material-icons-available');
        document.getElementById('edit-icon').classList.add('material-icons-available');
    } else {
        document.getElementById('add-icon').classList.remove('material-icons-available');
        document.getElementById('edit-icon').classList.remove('material-icons-available');
    }
}

function goHome(){

    isHome = true;

    document.getElementById('plants').classList.remove('hide');
    document.getElementById('add-icon').classList.remove('hide');
    document.getElementById('done-icon').classList.remove('hide');
    document.getElementById('edit-icon').classList.remove('hide');
    document.getElementById('delete-icon').classList.remove('hide');
    document.getElementById('refresh-icon').classList.remove('hide');
    document.getElementById('back-icon').classList.add('hide');
    document.getElementById('edit').classList.add('hide');
    document.getElementById('add-icon').classList.add('material-icons-available');

    document.getElementById('name').value = '';
    document.getElementById('location').value = '';
    document.getElementById('last-time-watered').value = '';
    document.getElementById('watering-interval').value = '';

    if(hasSelected){
        document.querySelectorAll(".select-only").forEach(element => element.classList.add('material-icons-available'));

    } else {
        document.querySelectorAll(".select-only").forEach(element => element.classList.remove('material-icons-available'));
    }
}

function loadPlants(){

    for(var id = 0; id < 150; id++){
        
        if(readPlant(id) == null){
            break;
        }

        plants.push(readPlant(id));
    }

    updateInformation();
}

function addPlant(data){

    writePlant(plants.length-1, data);

    updateInformation();
}

function editPlant(data){

    var id = plants.indexOf(data);

    writePlant(id, data);

    updateInformation();
}

function removePlant(data){

    var id = plants.indexOf(data);

    document.cookie = "plant-" + id +"=" + JSON.stringify(data) + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    updateInformation();
}

function updateInformation(){

    var size = plants.length;

    if(size == 0){
        document.getElementById('information').innerHTML = 'Inga växter';
    } else {
        document.getElementById('information').innerHTML = size + ' st';
    }
}

function writePlant(id, data) {
    document.cookie = "plant-" + id +"=" + JSON.stringify(data) + "; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/";
}

function readPlant(id) {
    var result = document.cookie.match(new RegExp("plant-" + id + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

function delete_cookie(name) {
    document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
  }

function start(){

    loadPlants();
    renderList();
}
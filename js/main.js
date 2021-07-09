var plants = [];

var hasSelected = false;
var isInFuture = false;
var isHome = true;

var red = 0;
var yellow = 0;
var green = 0;

var selectedId = -1;

function renderList(delay = 0){

    document.getElementById('plants').innerHTML = "";

    var id = 0;
    red = 0;
    yellow = 0;
    green = 0;

    plants.sort((a, b) => { return getStatusByPlant(b, delay) - getStatusByPlant(a, delay)});

    plants.forEach(plant => {
        
        const plantElement = document.createElement('div');

        var status = '';

        if(getStatus(id, delay) == 0){
            status = 'ok';
            green++;
        } else if(getStatus(id, delay) == 1){
            status = 'warning';
            yellow++;
        } else {
            status = 'danger';
            red++;
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
    if(isInFuture){
        //
    } else {
        if(hasSelected){
            document.querySelectorAll(".select-only").forEach(element => element.classList.add('material-icons-available'));

            if(getStatus(selectedId) == 0){
                document.querySelectorAll(".needs-water-only").forEach(element => element.classList.remove('material-icons-available'));
            }
        } else {
            document.querySelectorAll(".select-only").forEach(element => element.classList.remove('material-icons-available'));
        }
    }
}

function getStatus(id, delay){

    var plant = plants[id];

    var now = new Date();
    var watered = new Date(Date.parse(plant.last_time_watered));

    var since_watering = Math.floor((now - watered) / (1000*60*60*24)) + delay;

    if(since_watering < plant.watering_interval){
        return 0;
    } else if(since_watering == plant.watering_interval){
        return 1;
    } else {
        return 2;
    }
}

function getStatusByPlant(plant, delay){

    var now = new Date();
    var watered = new Date(Date.parse(plant.last_time_watered));

    var since_watering = Math.floor((now - watered) / (1000*60*60*24)) + delay;

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
        updateInformation();
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

function seeNextDay(){
    if(isInFuture){
        hasSelected = false;
        isInFuture = false;
        loadPlants();
        updateMenu();
        renderList();
        updateInformation();
        document.getElementById('see-next-day-icon').innerHTML = 'update';
    } else {
        hasSelected = false;
        isInFuture = true;
        loadPlants();
        updateMenu();
        renderList(1);
        updateInformation();
        document.getElementById('see-next-day-icon').innerHTML = 'update disabled';
    }
}

function refresh(){
    hasSelected = false;
    loadPlants();
    updateMenu();
    renderList();
    updateInformation();
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
        document.getElementById('see-next-day-icon').classList.add('hide');
        document.getElementById('refresh-icon').classList.add('hide');
        document.getElementById('back-icon').classList.remove('hide');
        document.getElementById('edit').classList.remove('hide');
        document.getElementById('add-icon').classList.remove('material-icons-available');
        document.getElementById('information').classList.add('hide');

    } else {

        if(areInputsFilled()){

            plants.push(
                {
                    id: generatePlantId(),
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
            updateInformation();

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
            document.getElementById('see-next-day-icon').classList.add('hide');
            document.getElementById('refresh-icon').classList.add('hide');
            document.getElementById('back-icon').classList.remove('hide');
            document.getElementById('edit').classList.remove('hide');
            document.getElementById('information').classList.add('hide');


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
                    id: plants[selectedId].id,
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
    document.getElementById('see-next-day-icon').classList.remove('hide');
    document.getElementById('refresh-icon').classList.remove('hide');
    document.getElementById('back-icon').classList.add('hide');
    document.getElementById('edit').classList.add('hide');
    document.getElementById('add-icon').classList.add('material-icons-available');
    document.getElementById('information').classList.remove('hide');

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

    plants = [];

    for(var id = 0; id < 150; id++){
        
        if(readPlant(id) != null){

            plants.push(readPlant(id));
        }
    }
}

function generatePlantId(){

    var listOfIds = [];

    plants.forEach((plant) => {
        listOfIds.push(plant.id);
    })

    for(var id = 0; id < 150; id++){

        if(!listOfIds.includes(id)){
            return id;
        }
    }
}

function addPlant(plant){

    writePlant(plant.id, plant);
}

function editPlant(plant){

    writePlant(plant.id, plant);
}

function removePlant(plant){

    document.cookie = "plant-" + plant.id +"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function updateInformation(){

    var size = plants.length;

    if(isInFuture){
        document.getElementById('day').innerHTML = 'Imorgon';
    } else {
        document.getElementById('day').innerHTML = 'Idag';
    }

    document.getElementById('red').innerHTML = red;
    document.getElementById('yellow').innerHTML = yellow;
    document.getElementById('green').innerHTML = green;

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
    updateInformation();
}
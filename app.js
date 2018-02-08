var nameInput = document.getElementById("nameInput");
var numberInput = document.getElementById("numberInput");
var groupInput = document.getElementById("groupInput");
var contactList = document.getElementById("contactList");

var array = [];

function Person(fullName, number, group) {
        this.fullName = fullName;  
        this.number = number;
        this.group =  group;
        array.push(this);
}

function save() {
    localStorage.setItem("array", JSON.stringify(array));
}

Person.prototype.getFullName = function() {
    return this.fullName+' '+this.number+' '+this.group;
}

function submitToDb() {
    var person = new Person(nameInput.value, numberInput.value, groupInput.value);
    refresh();
}

var p1 = new Person("Raj More",5804337551,"family");
var p2 = new Person("Lalit Zope",8186934432,"work");
var p3 = new Person("Suraj Pawar",3138211928,"work");
var p4 = new Person("Rakesh Mule",3138211928,"family");
var storedArray = JSON.parse(localStorage.getItem("array"));

function loadLocalStorage() {
    for(var i in storedArray){
        array[i] = storedArray[i]; 
    }
    refresh(); 
}

loadLocalStorage();
function clearInputs() {
    nameInput.value = '';
    numberInput.value = ''; 
    groupInput.value = ''; 
}

console.log(array);

function refresh() {
    clearInputs();
    document.getElementById("search").style.display = '';
    document.getElementById("contactList").style.display = '';
    document.getElementById("addNewContact").style.display = "none";
    document.getElementById("editContact").style.display = 'none';
    document.getElementById("AddNewButtonDiv").innerHTML = `
          <p>
            <a href="#">
              <span class="glyphicon glyphicon-plus-sign" onclick="addNew()"></span>
            </a>
          </p>
        `;
        array.sort(function(a, b) {
            var nameA = a.fullName.toUpperCase();
            var nameB = b.fullName.toUpperCase();
            if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
            }
            return 0;
        }
    
    );
    contactList.innerHTML = '';
        for(var i in array) {
                    var id = i;
                    contactList.innerHTML +=
                       `
                        <li>
                        <div class="contactDetail">
                            <h4>Name: ${array[i].fullName}</h4>
                            <p>Number: ${array[i].number}</p>
                            <p>Group: ${array[i].group}</p>
                            <button type="button" class="btn btn-warning" onclick="editContact(${id})">Edit</button>
                            <button type="button" class="btn btn-danger" onclick="deleteMe(${id})">Delete</button>
                        </div>
                        </li>
                        `;
        }
}

function addNew() {
	document.getElementById("addNewContact").style.display = "";
    document.getElementById("search").style.display = 'none';
    document.getElementById("contactList").style.display = 'none';
    document.getElementById("editContact").style.display = 'none';
    document.getElementById("AddNewButtonDiv").innerHTML = `
          <p>
            <a href="#">
              <span class="glyphicon glyphicon-plus-sign" onclick="refresh()"></span>
            </a>
          </p>
       `;
}


function editContact(id) {
    document.getElementById("search").style.display = 'none';
    document.getElementById("contactList").style.display = 'none';
    document.getElementById("editContact").style.display = '';
    document.getElementById("editContact").innerHTML = 
        `
        <form>
          <div class="form-group">
            <label for="InputName2">Name</label>
            <input type="text" class="form-control" id="inputName2" aria-describedby="namehelp" value="${array[id].fullName}">
          </div>
          <div class="form-group">
            <label for="InputNumber2">Number</label>
            <input type="text" class="form-control" id="inputNumber2" value="${array[id].number}">
          </div>
          <div class="form-group">
            <label for="InputGroup2">Group</label>
            <input type="text" class="form-control" id="inputGroup2" value="${array[id].group}">
          </div>
          <button type="submit" class="btn btn-success" onclick="saveMe(${id})">Submit</button>
        </form>
        `;
}

function editContactWithSorting(id) {
    document.getElementById("search").style.display = 'none';
    document.getElementById("contactList").style.display = 'none';
    document.getElementById("editContact").style.display = '';
    document.getElementById("editContact").innerHTML = 
        `
        <form>
          <div class="form-group">
            <label for="InputName2">Name</label>
            <input type="text" class="form-control" id="inputName2" aria-describedby="namehelp" value="${array[id].fullName}">
          </div>
          <div class="form-group">
            <label for="InputNumber2">Number</label>
            <input type="text" class="form-control" id="inputNumber2" value="${array[id].number}">
          </div>
          <div class="form-group">
            <label for="InputGroup2">Group</label>
            <input type="text" class="form-control" id="inputGroup2" value="${array[id].group}">
          </div>
          <button type="submit" class="btn btn-success" onclick="saveMe(${id})">Submit</button>
        </form>
        `;
}

function deleteMe(id) {
    array.splice(id, 1);
    refresh();
    save();
}

function deleteMeWithSorting(id) {
    array.splice(id, 1);
    save();
    refresh();
}

function saveMe(id) {
    array[id].fullName = document.getElementById("inputName2").value;
    array[id].number = document.getElementById("inputNumber2").value;
    array[id].group = document.getElementById("inputGroup2").value;
    save();
    refresh();
}

function saveMeWithSorting(id) {
    array[id].fullName = document.getElementById("inputName2").value;
    array[id].number = document.getElementById("inputNumber2").value;
    array[id].group = document.getElementById("inputGroup2").value;
    save();
    refresh();
}

function search() {
    var searchInput = document.getElementById("searchInput").value;
    
    contactList.innerHTML = '';
    for(var i in array) {
            if(array[i].fullName.toLowerCase().includes(searchInput.toLowerCase()) || array[i].group.toLowerCase().includes(searchInput.toLowerCase()) ) {
                var id = i;
                contactList.innerHTML +=
                            `
					        <li>
					        <div class="contactDetail">
    					        <h4>Name: ${array[i].fullName}</h4>
    					        <p>Number: ${array[i].number}</p>
    					        <p>Group: ${array[i].group}</p>
    					        <button type="button" class="btn btn-warning" onclick="editContact(${id})">Edit</button>
    					        <button type="button" class="btn btn-danger">Delete</button>
					        </div>
					        </li>
					        `;
            }else if(searchInput === ''){
                refresh();
            }
        }
}
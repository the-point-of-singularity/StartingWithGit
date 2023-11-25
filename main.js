//grabbing the form element
var form = document.getElementById("addForm");
//grabbing the <ul> element
var itemList = document.getElementById("items");


//adding event listener to the form
form.addEventListener("submit", addItem);

function addItem(e) {
    e.preventDefault();

    //getting the value of the input field item
    var newItem = document.getElementById("item").value;

    //getting the value of the input field description
    var description = " " + document.getElementById('description').value;
    

    //storing the submit data in local storage
    localStorage.setItem('UserDetails',newItem+description);


    //creating a new <li> tag with the input value and the description value
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(document.createTextNode(description));


    //creating a delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);


    //creating an edit button
    var editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary btn-sm float-right mr-2 edit";
    editBtn.appendChild(document.createTextNode("Edit"));
    li.appendChild(editBtn);


    //adding the new <li> tag with the input value to the <ul> list
    itemList.appendChild(li);
}


//creating the delete button functionality
itemList.addEventListener("click", removeItem);
function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are You Sure?")) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}

//creating a filter functionality
var filter = document.getElementById('filter');
filter.addEventListener('keyup',filterItems);
function filterItems(e) {
    var text = e.target.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');

    //making an array to search
    Array.from(items).forEach(function(item) {
        
        var itemName = item.firstChild.textContent;
        var descriptionName = item.childNodes[1].textContent;
        //console.log(descriptionName);
        if(itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display='block';
        }
        else if(descriptionName.toLowerCase().indexOf(text) != -1) {
            item.style.display='block';
        }
        else {
            item.style.display='none';
        }
    })
}

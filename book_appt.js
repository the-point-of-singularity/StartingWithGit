var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
form.addEventListener('submit',addItem);
function addItem(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var date = document.getElementById('dateofappt').value;
    var time = document.getElementById('appt').value;
    var inputObj = {
        UserName : username,
        Email : email,
        Phone_No : phone,
        Date_of_Appt : date,
        Time_of_Appt : time
    };
    let inputObj_Serialized = JSON.stringify(inputObj);
    localStorage.setItem(email,inputObj_Serialized);
    var li = document.createElement('li');
    li.className="list-group-item";
    li.appendChild(document.createTextNode("Username is : "+username));
    li.appendChild(document.createTextNode(" Email is : "+email));
    li.appendChild(document.createTextNode(" Phone number is : "+phone));
    var deleteBtn = document.createElement('button');
    deleteBtn.className="btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode('X'));
    li.appendChild(deleteBtn);
    var editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary btn-sm float-right mr-2 edit";
    editBtn.appendChild(document.createTextNode("Edit"));
    li.appendChild(editBtn);
    itemList.appendChild(li);
}
itemList.addEventListener('click',removeItem);
function removeItem(e) {
    if(e.target.classList.contains('delete')) {
        if(confirm('Are You Sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}
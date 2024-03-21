var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
form.addEventListener("submit", addItem);
function addItem(e) {
    e.preventDefault();

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var date = document.getElementById("dateofappt").value;
    var time = document.getElementById("appt").value;
    var inputObj = {
        UserName: username,
        Email: email,
        Phone_No: phone,
        Date_of_Appt: date,
        Time_of_Appt: time,
    };

    //doing a network call

    axios
        .post(
            "https://crudcrud.com/api/51e04283091241019964c6b14ac76a1c/appointmentData",
            inputObj
        )
        .then((response) => {
            console.log(response.data);
            showNewUserOnScreen(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function showNewUserOnScreen(object) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.setAttribute("data-id", object._id);
    li.appendChild(
        document.createTextNode(`${object.UserName} - ${object.Email}`)
    );
    //delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);
    //edit button
    var editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary btn-sm float-right mr-2 edit";
    editBtn.appendChild(document.createTextNode("Edit"));
    li.appendChild(editBtn);
    itemList.appendChild(li);
}
itemList.addEventListener("click", removeItem);
function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        //let EMAIL = e.target.email.value;
        //console.log(EMAIL);
        if (confirm("Are You Sure?")) {
            var li = e.target.parentElement;
            var userId = li.getAttribute("data-id");

            //now deleting from the database
            axios
                .delete(
                    `https://crudcrud.com/api/51e04283091241019964c6b14ac76a1c/appointmentData/${userId}`
                )
                .then(() => {
                    console.log("Deleted Successfully");
                    itemList.removeChild(li);
                })
                .catch((err) => {
                    console.log("Error found in deleting", err);
                });
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "https://crudcrud.com/api/51e04283091241019964c6b14ac76a1c/appointmentData"
        )
        .then((response) => {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                showNewUserOnScreen(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

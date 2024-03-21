var form = document.getElementById("addForm");
var expenseList = document.getElementById("expense_list");
form.addEventListener("submit", OnSubmit);
function OnSubmit(e) {
    e.preventDefault();
    var ExpenseAmount = document.getElementById("expenseamount").value;
    var ExpenseDescription =
        document.getElementById("expensedescription").value;
    var ExpenseCategory = document.getElementById("expensecategory").value;
    var inputObj = {
        expense_amount: ExpenseAmount,
        expense_description: ExpenseDescription,
        expense_category: ExpenseCategory,
    };
    let inputObj_Serialized = JSON.stringify(inputObj);
    localStorage.setItem(ExpenseDescription, inputObj_Serialized);
    var li = document.createElement("li");
    li.className = "list-group-item";
    // Create a div for content and buttons, and set it to flex
    var contentDiv = document.createElement("div");
    contentDiv.style.display = "flex";
    contentDiv.style.alignItems = "center";

    // Append the content to the div
    contentDiv.appendChild(
        document.createTextNode(
            "* " +
                ExpenseAmount +
                " " +
                ExpenseDescription +
                " " +
                ExpenseCategory
        )
    );

    // Create the delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm delete";
    deleteBtn.style.marginLeft = "auto";
    deleteBtn.style.marginRight = "8px";
    deleteBtn.appendChild(document.createTextNode("X"));

    // Create the edit button
    var editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary btn-sm edit ml-2";
    editBtn.appendChild(document.createTextNode("Edit"));

    // Append buttons to the div
    contentDiv.appendChild(deleteBtn);
    contentDiv.appendChild(editBtn);

    // Append the div to the list item
    li.appendChild(contentDiv);

    expenseList.appendChild(li);
}
expenseList.addEventListener("click", removeItem);

function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are You Sure?")) {
            var li = e.target.parentElement.parentElement;

            // Extracting the description from the list item
            var description = li.textContent
                .trim()
                .split(" ")
                .slice(2, 3)
                .join(" ");

            // Logging the description to the console for debugging
            console.log("Removing from local storage:", description);

            // Removing the item from local storage using the description as the key
            localStorage.removeItem(description);

            expenseList.removeChild(li);
        }
    }
}
expenseList.addEventListener("click", editItem);
function editItem(e) {
    if (e.target.classList.contains("edit")) {
        var li = e.target.parentElement.parentElement;

        // Extracting the data from the list item
        var amount = li.textContent.trim().split(" ")[1];
        var description = li.textContent.trim().split(" ")[2];
        var category = li.textContent.trim().split(" ")[3];

        // Populating the form fields with the extracted data
        document.getElementById("expenseamount").value = amount;
        document.getElementById("expensedescription").value = description;
        document.getElementById("expensecategory").value = category;

        localStorage.removeItem(description);

        expenseList.removeChild(li);
    }
}

const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
let userArray = [];
let editId = null;

let objStr = localStorage.getItem('users');

if (objStr != null) { 
   userArray = JSON.parse(objStr);
}


displayInfo();
addUserBtn.onclick = () => {
   //get user name from text field
   const name1 = usernameTextField.value;
   const name = name1.trim()
   if ( name == ""){
      alert("Please Enter Task");
      usernameTextField.focus();
   }
   else if (editId != null) {
      //edit 
      userArray.splice(editId, 1, {
         'name': name
      });
      editId = null;
   } else {
      //insert   
      userArray.push({
         'name': name
      });
   }
  
   saveInfo(userArray);
   usernameTextField.value = '';
   usernameTextField.focus();
   addUserBtn.innerText = btnText;
}

// store user's name in local storage
function saveInfo(userArray) {
   let str = JSON.stringify(userArray);
   localStorage.setItem('users', str);
   displayInfo();
}

// display user's name
function displayInfo() {
   let statement = '';
   userArray.forEach((user, i) => {
      statement += `<tr>
           <th scope="row">${i+1}</th>
           <td>${user.name}</td>
           <td class="d-flex float-end"><i class="btn text-white fa fa-edit mx-2" onclick='editInfo(${i})'></i> <i class="btn text-white fa fa-trash " onclick='deleteInfo(${i})'></i></td>
         </tr>`;
   });
   recordsDisplay.innerHTML = statement;
}

// edit user's name
function editInfo(id) {
   editId = id;
   usernameTextField.value = userArray[id].name;
   addUserBtn.innerHTML = 'Save Task';
   usernameTextField.focus();
}

//delete user's name
function deleteInfo(id) {
   userArray.splice(id, 1);
   saveInfo(userArray);

}

function entr(e) {
   if(e.keyCode===13){
      addUserBtn.click();
   }
}
usernameTextField.addEventListener("keyup",entr);
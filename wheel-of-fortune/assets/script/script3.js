// wheel.style.transform = "rotate(1850deg)"
let selectedUsersHistory = [];

function loadAllUsers() {
   const allUsersList = document.getElementById("all-users");

   $.ajax({
      type: "GET",
      url: "https://jsonplaceholder.org/users",
      dataType: "json",
      success: function (users) {
         $.each(users, function (i, user) {
            const newUser = createUserObject(user.id, user.firstname, user.lastname, user.email);
            const newUserEl = createUserElement(newUser);
            addUser(allUsersList, newUserEl);
         });
      },
   });
}

function loadHistory() {
   const history = JSON.parse(localStorage.getItem("history"));
   if (history === null) return;
   history.forEach((user) => {
      selectedUsersHistory.push(user);
   });
}

function calculateRotation(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findPureRotationValue(rotationValue) {
   while (rotationValue > 360) {
      rotationValue = rotationValue - 360;
   }

   return rotationValue;
}

function findNumber(rotationValue) {
   totalNumbers = 12;
   tempRotationValue = findPureRotationValue(rotationValue);
   return Math.round((tempRotationValue * totalNumbers) / 360) + 1;
}

function makeApiCall(userNumber) {
   $.ajax({
      type: "GET",
      url: `https://jsonplaceholder.org/users/${userNumber}`,
      dataType: "json",
      success: function (response) {
         // console.log(response);
         const user = createUserObject(response.id, response.firstname, response.lastname, response.email);
         selectedUsersHistory.push(user);
         const history = JSON.stringify(selectedUsersHistory);
         localStorage.setItem("history", history);
         updateUI();
      },
   });
}

function createUserObject(id, firstname, lastname, email) {
   user = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      email: email,
   };

   return user;
}

function createUserElement(user) {
   const userEl = document.createElement("li");
   userEl.className = "list-group-item";
   userEl.innerHTML = `
         User ID: ${user.id} <br />
         First name: ${user.firstname} <br />
         Last name: ${user.lastname} <br />
         Email: ${user.email}
      `;

   return userEl;
}

function addUser(list, user) {
   list.append(user);
}

function updateUI() {
   const selectedUsersList = document.getElementById("selected-users");
   selectedUsersList.innerHTML = "";
   const keyToCheck = "history";

   if (localStorage.getItem(keyToCheck) === null) {
      return;
   } else {
      const selectionHistory = JSON.parse(localStorage.getItem("history"));
      selectionHistory.forEach((user) => {
         selectedUser = createUserElement(user);
         selectedUsersList.append(selectedUser);
         // console.log(selectedUser);
         // console.log(user);
         selectedUser.addEventListener("click", function () {
            getUserDetails(user);
         });
      });
   }
}

function getUserDetails(user) {
   $.ajax({
      type: "GET",
      url: `https://jsonplaceholder.org/users/${user.id}`,
      dataType: "json",
      success: function (response) {
         localStorage.setItem("clickedUser", JSON.stringify(response));
         openPage("user-details.html");
      },
   });
}

function openPage(pageUrl) {
   window.location.href = pageUrl;
}

function main() {
   loadAllUsers();
   updateUI();
   loadHistory();

   const rotations = [];
   const btn = document.getElementById("go-btn");
   const clearHistoryBtn = document.getElementById("clear-history");

   clearHistoryBtn.addEventListener("click", () => {
      localStorage.clear();
      selectedUsersHistory = [];
      updateUI();
   });

   btn.addEventListener("click", function rotateWheel() {
      const wheel = document.getElementById("wheel");
      const displayNumber = document.getElementById("number");
      minRotationValue = 5000;
      maxRotationValue = 5360;
      rotationValue = calculateRotation(minRotationValue, maxRotationValue);
      rotations.push(rotationValue);
      wholeRotationValue = 0;
      for (let i = 0; i < rotations.length; i++) {
         wholeRotationValue += rotations[i];
      }

      btn.removeEventListener("click", rotateWheel);
      btn.classList.add("disabled");

      // console.log(rotationValue);
      // console.log(findPureRotationValue(wholeRotationValue));
      // console.log(findNumber(findPureRotationValue(wholeRotationValue)));

      wheel.style.transform = wheel.style.transform + `rotate(${rotationValue}deg)`;
      wheel.addEventListener("transitionend", function transitionEndHandler() {
         wheel.removeEventListener("transitionend", transitionEndHandler);
         displayNumber.innerText = `Last selected id: ${findNumber(findPureRotationValue(wholeRotationValue))}`;
         makeApiCall(findNumber(findPureRotationValue(wholeRotationValue)));
         btn.addEventListener("click", rotateWheel);
         btn.classList.remove("disabled");
      });
   });
}

main();
updateUI();

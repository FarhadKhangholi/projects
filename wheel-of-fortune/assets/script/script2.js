// wheel.style.transform = "rotate(1850deg)"

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
            updateUI(allUsersList, newUserEl);
         });
      },
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
   // if ((rotationValue > -1 && rotationValue < 16) || (rotationValue > 345 && rotationValue < 361)) {
   //    return 1;
   // } else if (rotationValue > 315 && rotationValue < 346) {
   //    return 2;
   // } else if (rotationValue > 285 && rotationValue < 316) {
   //    return 3;
   // } else if (rotationValue > 255 && rotationValue < 286) {
   //    return 4;
   // } else if (rotationValue > 225 && rotationValue < 256) {
   //    return 5;
   // } else if (rotationValue > 195 && rotationValue < 226) {
   //    return 6;
   // } else if (rotationValue > 165 && rotationValue < 196) {
   //    return 7;
   // } else if (rotationValue > 135 && rotationValue < 166) {
   //    return 8;
   // } else if (rotationValue > 105 && rotationValue < 136) {
   //    return 9;
   // } else if (rotationValue > 75 && rotationValue < 106) {
   //    return 10;
   // } else if (rotationValue > 45 && rotationValue < 76) {
   //    return 11;
   // } else if (rotationValue > 15 && rotationValue < 46) {
   //    return 12;
   // } else {
   //    return 0;
   // }

   totalNumbers = 12;
   tempRotationValue = findPureRotationValue(rotationValue);
   return Math.round((tempRotationValue * totalNumbers) / 360) + 1;
}

function makeApiCall(userNumber) {
   const selectedUsersList = document.getElementById("selected-users");
   const selectedUsersHistory = [];

   $.ajax({
      type: "GET",
      url: `https://jsonplaceholder.org/users/${userNumber}`,
      dataType: "json",
      success: function (response) {
         console.log(response);
         const user = createUserObject(response.id, response.firstname, response.lastname, response.email);
         localStorage.setItem(JSON.stringify(user.id), JSON.stringify(user));
         console.log(localStorage);
         selectedUsersHistory.push(user);
         const userElement = createUserElement(user);
         updateUI(selectedUsersList, userElement);
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

function updateUI(list, user) {
   list.append(user);
}

function main() {
   loadAllUsers();

   const rotations = [];
   const btn = document.getElementById("go-btn");

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

      console.log(rotationValue);
      console.log(findPureRotationValue(wholeRotationValue));
      console.log(findNumber(findPureRotationValue(wholeRotationValue)));

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

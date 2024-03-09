const userDetails = document.getElementById("user-details");
const backButton = document.getElementById("back-btn");

backButton.addEventListener("click", () => {
   openPage("index.html");
});

function loadClickedUserDetails() {
   if (localStorage.getItem("clickedUser") === null) return;
   const clickedUser = JSON.parse(localStorage.getItem("clickedUser"));
   console.log(clickedUser);
   userDetails.append(createUserDetailsElement(clickedUser));
}

function createUserDetailsElement(user) {
   const userEl = document.createElement("div");
   userEl.className = "card-body";
   userEl.innerHTML = `
         <p class="card-text">User ID: ${user.id}</p>
         <p class="card-text">First name: ${user.firstname}</p>
         <p class="card-text">Last name: ${user.lastname}</p>
         <p class="card-text">Birthdate: ${user.birthDate}</p>
         <p class="card-text">Address: ${user.address.suite}, ${user.address.street}, ${user.address.city}</p>
         <p class="card-text">Phone: ${user.phone}</p>
         <p class="card-text">Website: ${user.website}</p>
      `;
   return userEl;
}

function openPage(pageUrl) {
   window.location.href = pageUrl;
}

loadClickedUserDetails();

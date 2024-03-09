const navbar = document.getElementById("navbarNav");

window.addEventListener("scroll", function () {
   if (this.scrollY >= 200 && this.window.innerWidth > 768) {
      navbar.classList.add("fixed-top");
      navbar.classList.add("navbar-shadow");
      navbar.style.opacity = (this.scrollY - 200) / 210;
   } else {
      navbar.classList.remove("fixed-top");
      navbar.classList.remove("navbar-shadow");
      navbar.style.opacity = 1;
   }
});

$(document).ready(function () {
   $get("https://jsonplaceholder.typicode.com/posts", (data) => {
      console.log(data);
   });
});

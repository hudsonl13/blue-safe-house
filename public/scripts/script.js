const collapsibleMenuButton = document.querySelector("#collapsible-menu-button");
const collapsibleMenu = document.querySelector("#collapsible-menu");

collapsibleMenuButton.addEventListener("click" , function()
{
    collapsibleMenu.classList.toggle("menu-active");
});

function onClickMenuOption() {
    const btnToggle = document.getElementById("btn-toggle");
    const menu = document.getElementById("menu");
    
    btnToggle.setAttribute("aria-expanded", false);
    menu.setAttribute("class", "navbar-collapse collapse"); 
}
function openNav() {
    if (window.screen.width < 992) {
        document.getElementById("mb_nav_body").style.width = "100%";
        document.getElementById("mb_nav").style.width = "300px";
    }
}

function closeNav() {
    document.getElementById("mb_nav_body").style.width = "0%";
    document.getElementById("mb_nav").style.width = "0";
}


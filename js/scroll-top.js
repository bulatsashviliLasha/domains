const scrollTop = document.querySelector(".scroll_top");

const btnVisibility = () => {
    if (window.scrollY > 150) {
        scrollTop.style.visibility = "visible";
        scrollTop.style.opacity = "1"
    } else {
        scrollTop.style.visibility = "hidden";
        scrollTop.style.opacity = "0";
    }
};

document.addEventListener("scroll", () => {
    btnVisibility();
});

scrollTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
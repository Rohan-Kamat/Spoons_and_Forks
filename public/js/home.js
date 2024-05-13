document.querySelectorAll(".recipe-tile").forEach(tile => {
    tile.addEventListener("click", function (e) {
        this.querySelector("form").submit();
    })
});

/**
 * Hamburger menu functionality.
 *
 * See https://bulma.io/documentation/components/navbar/#navbar-menu
 */

document.addEventListener("DOMContentLoaded", () => {
    /** @type {NodeListOf<HTMLElement>} */
    const burgers = document.querySelectorAll(".navbar-burger");

    for(const burger of burgers) {
        const targetId = burger.dataset["target"];
        const target = document.getElementById(targetId ?? "");

        if(!target) {
            console.error(`Hamburger target ${targetId} for ${burger} not found.`);
            return;
        }

        burger.addEventListener("click", () => {
            burger.classList.toggle("is-active");
            target.classList.toggle("is-active");
        });
    }

});

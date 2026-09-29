const searchInput = document.getElementById("searchInput");
const gameCards = document.getElementById("game-card");
const buyButtons = document.getElementById(".buy-btn");
const cart = document.getElementById(".cart");
const cartCount = document.getElementById(".cart-count");
const contactForm = document.getElementById(".contact-form");

let cartitems = 0;

searchInput.addEventListener("input", function () {
    const search = searchInput.value.toLowerCase();

    gameCards.forEach(function (card) {
        const gameName = card.querySelector("h3");

        if (gameName) {
            const name = gameName.textContent.toLowerCase();

            if (name.includes(search)) {
                card.style.display = "";
            } else {
                card.style.display = "none"
            }
        }
    });
});

buyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        cartitems++;
        cartCount.textContent = cartitems;
        button.textContent = "Adicionado!";
        button.style.background = "#ffffff";
        setTimeout(function () {
            button.textContent = "Comprar";
            button.style.background = "";
        }, 1500);

        showNotification("Jogo adicionado ao carrinho!");

        cart.style.transform = "scale(1)";
    }, 200);
});

function showNotification(message) {
    const notification = document.createElement("div");

    notification.textContent = message;
    
    notification.style.position = "fixed";
    notification.style.top = "95px";
    notification.style.right = "25px";
    notification.style.padding = "15px 20px";
    notification.style.background = "#0c0c0c";
    notification.style.color = "#39ff14";
    notification.style.border = "1 px solid #39ff14";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0 0 20px rgba(57,255, 20, 0.25)";
    notification.style.zIndex = "2000";
    notification.style.fontWeight = "bold";
    notification.style.fontSize = "14px";
    notification.style.opacity = "0";
    notification.style.transform = "translateX(30px)";
    notification.style.transition = "0.3s";

    document.body.appendChild(notification);
    setTimeout(function () {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(0)";
    }, 10);

    setTimeout(function () {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(30px)";
    setTimeout(function (){
        notification.remove();
    }, 300);
    
}, 2500);
}

cart.addEventListener("click", function () {
    if (cartitems === 0) {
        showNotification("Seu carrinho está vazio!")
    } else {
        showNotification(
            "Você possui " + cartitems + "item(ns) no carrinho!"
        );
    }
});

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = contactForm.querySelector(
        'input[type="text"]'
    ).value;

    showNotification(
        "Mensagem enviada com sucesso " + name + "!"
    );

    contactForm.reset();
});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
        }, {
            threshold: 0.1
        }
);

sections.fontSize(function (section) {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0,7s ease, transform 0.7s ease";

    observer.observe(section);
});

const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const target = document.querySelector(
            link.getAttribute("href")
        );

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.boxShadow = 
        "0 5px 25px rgba(0, 0, 0, 0.5)";
    } else {
        header.style.boxShadow = "none"
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hide");
            document.body.classList.add("loaded");
        }, 1000);
    });


    /* NAVBAR */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    /* MOBILE MENU */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = mobileMenu.querySelectorAll("a");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });
    });


    /* MENU DATA */

    const menuData = {

        coffee: [
            {
                icon: "☕",
                name: "Spanish Latte",
                description: "Smooth espresso with a rich, creamy finish."
            },
            {
                icon: "☕",
                name: "Pistachio Latte",
                description: "A nutty, aromatic take on a classic latte."
            },
            {
                icon: "☕",
                name: "Belgian Brown Latte",
                description: "Velvety coffee with indulgent chocolate notes."
            },
            {
                icon: "◉",
                name: "Iced Coffee",
                description: "Refreshing, chilled and made for slow afternoons."
            },
            {
                icon: "✦",
                name: "Hot Chocolate",
                description: "Comforting, creamy and deeply chocolatey."
            },
            {
                icon: "☕",
                name: "Signature Coffee",
                description: "Ask the HOUSE team about today's favorite."
            }
        ],

        desserts: [
            {
                icon: "🍰",
                name: "Tiramisu",
                description: "A classic coffee dessert with a soft, creamy finish."
            },
            {
                icon: "🍰",
                name: "San Sebastián Cheesecake",
                description: "Rich, creamy cheesecake with a beautifully baked top."
            },
            {
                icon: "🍫",
                name: "Brookie",
                description: "A delicious meeting of brownie and cookie."
            },
            {
                icon: "🍰",
                name: "Tres Leches Cake",
                description: "Soft, indulgent and made for dessert lovers."
            },
            {
                icon: "🍫",
                name: "Brownie",
                description: "A rich chocolate treat for any time of day."
            },
            {
                icon: "✦",
                name: "Today's Dessert",
                description: "Ask our team about the fresh selection."
            }
        ],

        bites: [
            {
                icon: "🥪",
                name: "HOUSE Sandwich",
                description: "A satisfying savory bite to pair with your coffee."
            },
            {
                icon: "🥪",
                name: "Signature Bites",
                description: "Perfect for a light meal or coffee break."
            },
            {
                icon: "🥐",
                name: "Fresh Pastry",
                description: "Ask our team about today's pastry selection."
            },
            {
                icon: "✦",
                name: "Light Bites",
                description: "Something savory for your next coffee moment."
            }
        ]

    };


    const menuGrid = document.getElementById("menuGrid");
    const tabs = document.querySelectorAll(".menu-tab");


    function renderMenu(category) {

        menuGrid.innerHTML = "";

        menuData[category].forEach((item, index) => {

            const menuItem = document.createElement("article");

            menuItem.className = "menu-item";
            menuItem.style.animationDelay = `${index * 0.07}s`;

            menuItem.innerHTML = `
                <div class="menu-item-icon">${item.icon}</div>

                <div class="menu-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>

                <span class="menu-item-category">
                    ${category.toUpperCase()}
                </span>
            `;

            menuGrid.appendChild(menuItem);
        });
    }


    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(item => item.classList.remove("active"));

            tab.classList.add("active");

            renderMenu(tab.dataset.category);
        });

    });


    renderMenu("coffee");


    /* SCROLL REVEAL */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* PARALLAX HERO */

    const hero = document.querySelector(".hero");
    const steamElements = document.querySelectorAll(".coffee-steam");

    window.addEventListener("mousemove", event => {

        if (window.innerWidth < 800) return;

        const x = (event.clientX / window.innerWidth - 0.5);
        const y = (event.clientY / window.innerHeight - 0.5);

        steamElements.forEach((steam, index) => {

            const strength = (index + 1) * 9;

            steam.style.marginLeft = `${x * strength}px`;
            steam.style.marginTop = `${y * strength}px`;

        });

    });


    /* BACK TO TOP */

    const backTop = document.getElementById("backTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    });

    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* YEAR */

    document.getElementById("year").textContent = new Date().getFullYear();


    /* SMOOTH ANCHOR OFFSET */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const offset = 75;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});

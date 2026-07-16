function switchLanguage(lang) {
    const elements = document.querySelectorAll("[data-en][data-bn]");
    elements.forEach(el => {
        if (lang === "en") {
            el.textContent = el.getAttribute("data-en");
        } else if (lang === "bn") {
            el.textContent = el.getAttribute("data-bn");
        }
    });

    const placeholders = document.querySelectorAll(
        "[data-en-placeholder][data-bn-placeholder]"
    );
    placeholders.forEach(el => {
        if (lang === "en") {
            el.placeholder = el.getAttribute("data-en-placeholder");
        } else if (lang === "bn") {
            el.placeholder = el.getAttribute("data-bn-placeholder");
        }
    });
}

// Sync mobile language with main language
const mainLangRadios = document.querySelectorAll('input[name="language"]');
const mobileLangRadios = document.querySelectorAll(
    'input[name="mobile-language"]'
);

function syncLanguage(value) {
    mainLangRadios.forEach(radio => {
        if (radio.value === value) radio.checked = true;
    });
    mobileLangRadios.forEach(radio => {
        if (radio.value === value) radio.checked = true;
    });
    switchLanguage(value);
}

mainLangRadios.forEach(radio => {
    radio.addEventListener("change", function () {
        if (this.checked) syncLanguage(this.value);
    });
});

mobileLangRadios.forEach(radio => {
    radio.addEventListener("change", function () {
        if (this.checked) syncLanguage(this.value);
    });
});

// Smooth scroll animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, {});

let hiddenElements = document.querySelectorAll(".some-info");
hiddenElements.forEach(el => observer.observe(el));

hiddenElements = document.querySelectorAll(".about-imam-ghazali-img");
hiddenElements.forEach(el => observer.observe(el));

// Create hamburger button dynamically
const headerLeft = document.querySelector(".header-left");
const hamburger = document.createElement("button");
hamburger.className = "hamburger";
hamburger.setAttribute("aria-label", "Toggle menu");
hamburger.innerHTML = "<span></span><span></span><span></span>";
headerLeft.insertBefore(hamburger, headerLeft.firstChild);

// Create overlay
const overlay = document.createElement("div");
overlay.className = "nav-overlay";
document.body.appendChild(overlay);

// Create mobile navigation
const navMobile = document.createElement("div");
navMobile.className = "nav-mobile";

const desktopNav = document.querySelector("nav");
const navLinks = desktopNav.querySelectorAll("a");

let mobileNavHTML = '<div class="close-btn">✕</div>';
navLinks.forEach(link => {
    const href = link.getAttribute("href");
    const text = link.textContent;
    const isActive = link.classList.contains("active") ? "active" : "";
    mobileNavHTML += `<a href="${href}" class="${isActive}">${text}</a>`;
});
navMobile.innerHTML = mobileNavHTML;
document.body.appendChild(navMobile);

const hamburgerBtn = document.querySelector(".hamburger");
const navMobileEl = document.querySelector(".nav-mobile");
const overlayEl = document.querySelector(".nav-overlay");
const closeBtn = document.querySelector(".nav-mobile .close-btn");
const mobileLinks = document.querySelectorAll(".nav-mobile a");

function openMenu() {
    hamburgerBtn.classList.add("active");
    navMobileEl.classList.add("open");
    overlayEl.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    hamburgerBtn.classList.remove("active");
    navMobileEl.classList.remove("open");
    overlayEl.classList.remove("active");
    document.body.style.overflow = "";
}

hamburgerBtn.addEventListener("click", () => {
    if (navMobileEl.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

overlayEl.addEventListener("click", closeMenu);
closeBtn.addEventListener("click", closeMenu);

mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && navMobileEl.classList.contains("open")) {
        closeMenu();
    }
});

const currentPage = window.location.pathname.split("/").pop() || "";
mobileLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "#")) {
        link.classList.add("active");
    }
});

desktopNav.querySelectorAll("a").forEach((desktopLink, index) => {
    if (desktopLink.classList.contains("active")) {
        const mobileLink = mobileLinks[index];
        if (mobileLink) mobileLink.classList.add("active");
    }
});




/*

// EmailJS — initialise once the DOM (and the CDN script) is ready
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("9LF1NkllctD8a-Ugy");

    // --- Join Us form ---
    const joinForm = document.querySelector(".join-us form");
    if (joinForm) {
        joinForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = joinForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            const templateParams = {
                full_name: joinForm.querySelector('input[name="name"]').value,
                email: joinForm.querySelector('input[name="email"]').value,
                phone:
                    joinForm.querySelector('input[name="phone"]').value ||
                    "Not provided",
                message:
                    joinForm.querySelector('textarea[name="message"]').value ||
                    "No message provided"
            };

            emailjs
                .send("service_gobggph", "template_nvx4g1i", templateParams)
                .then(function () {
                    window.location.href = "join-us.html";
                })
                .catch(function (error) {
                    alert(
                        "❌ There was an issue sending your application. Please try again or contact us directly at hasanrup7@gmail.com"
                    );
                    console.log("Error details:", error);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // --- Footer contact form ---
    const contactForm = document.querySelector(".contact-form form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector(
                'button[type="submit"]'
            );
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            const templateParams = {
                full_name: contactForm.querySelector(
                    'input[name="contact_name"]'
                ).value,
                email: contactForm.querySelector('input[name="contact_email"]')
                    .value,
                message:
                    contactForm.querySelector(
                        'textarea[name="contact_message"]'
                    ).value || "No message provided"
            };

            emailjs
                .send("service_gobggph", "template_w3lqvzk", templateParams)
                .then(function () {
                    alert(
                        "✅ Message sent! We'll get back to you within 2–3 days."
                    );
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                })
                .catch(function (error) {
                    alert(
                        "❌ Something went wrong. Please email us directly at hasanrup7@gmail.com"
                    );
                    console.log("Error:", error);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});

*/
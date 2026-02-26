// Initialize AOS
AOS.init({ duration: 1000, once: true });

/* ==============================
   FULL PAGE SECTION SCROLL
   + NAVBAR ACTIVE FIX (ALL)
============================== */

if (window.location.pathname.includes("index.html") || 
    window.location.pathname === "/" || 
    window.location.pathname === "/index") {

    const allSections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = 0;
    let isScrolling = false;

    function updateActiveNav(index) {
        navLinks.forEach(link => link.classList.remove("active"));

        const sectionId = allSections[index].id;

        navLinks.forEach(link => {
            if (link.getAttribute("href") === "#" + sectionId) {
                link.classList.add("active");
            }
        });
    }

    function scrollToSection(index) {
        if (index < 0 || index >= allSections.length) return;

        isScrolling = true;
        currentSection = index;

        allSections[index].scrollIntoView({
            behavior: "smooth"
        });

        updateActiveNav(index);

        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }

    window.addEventListener("wheel", function (e) {
        if (isScrolling) return;

        if (e.deltaY > 0) {
            scrollToSection(currentSection + 1);
        } else {
            scrollToSection(currentSection - 1);
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();
                currentSection = Array.from(allSections).indexOf(targetSection);
                scrollToSection(currentSection);
            }
        });
    });

}
/* Set Home active on load */
document.addEventListener("DOMContentLoaded", () => {
  updateActiveNav(0);
});

document.getElementById("contactForm").addEventListener("submit", sendEmail);
document.getElementById("bannerForm").addEventListener("submit", sendEmail);

function sendEmail(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_nxhaguf",
    "template_kjd5ctw",
    e.target
  ).then(
    () => {
      alert("Message sent successfully!");
      e.target.reset();
    },
    (error) => {
      console.log("EmailJS Error:", error);
      alert("Failed to send message");
    }
  );
}

document.addEventListener('DOMContentLoaded', function () {
  const carouselInner = document.querySelector('#testimonialCarousel .carousel-inner');
  const originalCards = Array.from(carouselInner.querySelectorAll('.col-md-4'));

  const cardsPerSlide = 3;
  const totalCards = originalCards.length;

  // Clear existing slides
  carouselInner.innerHTML = '';

  // Create slides for each starting card (one-by-one movement)
  for (let i = 0; i < totalCards; i++) {
    const slide = document.createElement('div');
    slide.classList.add('carousel-item');
    if (i === 0) slide.classList.add('active');

    const row = document.createElement('div');
    row.classList.add('row', 'g-4', 'justify-content-center');

    for (let j = 0; j < cardsPerSlide; j++) {
      const index = (i + j) % totalCards;
      const cardClone = originalCards[index].cloneNode(true);
      row.appendChild(cardClone);
    }

    slide.appendChild(row);
    carouselInner.appendChild(slide);
  }
});


document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("tsparticles")) {

        tsParticles.load("tsparticles", {
            particles: {
                number: { value: 60 },
                color: { value: "#38bdf8" },
                shape: { type: "circle" },
                opacity: { value: 0.4 },
                size: { value: { min: 2, max: 6 } },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#38bdf8",
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    outModes: { default: "bounce" }
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab"
                    }
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: { opacity: 0.6 }
                    }
                }
            }
        });

    }
});

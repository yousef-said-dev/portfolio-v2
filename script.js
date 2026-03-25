
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('ul');

// Toggle Mobile Menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navMenu.classList.toggle('active');
});

// Close Mobile Menu when clicking a link
document.querySelectorAll('ul li a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navMenu.classList.remove('active');
    });
});

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let posX = 0,
    posY = 0;

let mouseX = 0,
    mouseY = 0;

gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        gsap.set(follower, {
            css: {
                left: posX - 15, // Adjusted to match center of 30px width
                top: posY - 15
            }
        });

        gsap.set(cursor, {
            css: {
                left: mouseX - 5, // Adjusted to match center of 10px width
                top: mouseY - 5
            }
        });
    }
});

document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Apply hover and magnetic effect to links and buttons
document.querySelectorAll("a, button, .link").forEach(el => {
    el.addEventListener("mouseenter", function () {
        cursor.classList.add("active");
        follower.classList.add("active");
    });

    el.addEventListener("mousemove", function (e) {
        // Calculate the center of the element
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate the distance from mouse to center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Pull the element slightly towards the mouse
        gsap.to(el, {
            x: distanceX * 0.4, // 0.4 controls the 'magnetic' strength
            y: distanceY * 0.4,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    el.addEventListener("mouseleave", function () {
        cursor.classList.remove("active");
        follower.classList.remove("active");

        // Spring the element back to its original position
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// Free open-source alternative to SplitText
const splittedText = new SplitType(".main-header", { types: "chars,words,lines" });
const splittedText2 = new SplitType(".main-sub-header", { types: "chars,words,lines" });
const image = document.querySelector(".main-image");
const otherHeaderText = document.querySelectorAll('.main-text, .main-button,.main-hello');
const skills = document.querySelectorAll('.skill-item,.dot');
const techs = document.querySelectorAll('.tech-item,.dot2');
gsap.from(splittedText.chars, {
    y: 30,
    opacity: 0,
    stagger: 0.05,
    duration: .5,
    // ease: "back.out(1.7)"
});
gsap.from(splittedText2.chars, {
    y: 100,
    opacity: 0,
    stagger: 0.05,
    duration: 1,
    // ease: "back.out(1.7)"
});

gsap.from(image, {
    y: 100,
    delay: .5,
    opacity: 0,
    stagger: 0.05,
    duration: 1,
    // ease: "back.out(1.7)"
});

gsap.from(otherHeaderText, {
    y: 100,
    delay: 1.3,
    opacity: 0,
    stagger: 0.05,
    duration: 1,
    // ease: "back.out(1.7)"
});

gsap.to(skills, {
    x: -2000,
    repeat: -1,
    yoyo: true,
    duration: 30,
    stagger: 0.05,
});
gsap.fromTo(techs, {
    x: -2000
},
    {
        x: 100,
        repeat: -1,
        yoyo: true,
        duration: 30,
        stagger: 0.05,
    }
);

gsap.registerPlugin(ScrollTrigger);

// Vertical Stacked Projects
const stackedCards = gsap.utils.toArray('.work');

if (stackedCards.length > 0) {
    stackedCards.forEach((card, i) => {
        // Only scale down if it is NOT the last card
        if (i !== stackedCards.length - 1) {
            gsap.to(card, {
                scale: 0.9,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: card,
                    start: "top 15vh",
                    end: "bottom -15vh",
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        }

        // Initial entrance reveal for each card
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

const heading = document.querySelector('.about-heading-text');
const headingContainer = document.querySelector('.about-heading');

if (heading) {
    gsap.to(heading, {
        y: headingContainer.offsetHeight - (window.innerWidth > 1300 ? 250 : 200), // Increased travel distance for a much more dramatic parallax effect!
        scrollTrigger: {
            trigger: "#about",
            start: `top ${window.innerWidth > 1300 ? '10%' : '10%'}`,
            end: "30% 10%",
            markers: true,
            triggerActions: "play restart restart restart",
            scrub: 1.5,
            duration: 1,
            invalidateOnRefresh: true
        }
    });
}
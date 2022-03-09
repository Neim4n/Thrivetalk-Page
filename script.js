/*=========Burger==============*/
let body = document.body;
let wrapper = document.querySelector(".wrapper");
let burgerButton = document.querySelector(".header__burger-menu");
let menu = document.querySelector(".header__menu");
let header = document.querySelector(".header");
let headerButton = document.querySelector(".header__button");

/*=========Header==============*/
header.addEventListener("click", headerClickHandler)

function headerClickHandler(e) {
    if (((!e.target.closest(".header__menu") && burgerButton.classList.contains("active")) || e.target.closest(".header__burger-menu") || e.target.closest(".menu__item")) && window.innerWidth < 768) {
        burgerButtonHandler();
    }
}

function burgerButtonHandler() {
    body.classList.toggle("lock");
    wrapper.classList.toggle("lock");
    burgerButton.classList.toggle("active");
    menu.classList.toggle("active");
    headerButton.classList.toggle("active");
    if (header.classList.contains("active")) {
        setTimeout(() => header.classList.remove("active"), 200)
    } else {
        header.classList.add("active");
    }
}

/*=========Open POP-UP==============*/
wrapper.addEventListener("click", buttonHandler);

function buttonHandler(e) {
    if (e.target.closest(".button")) {
        e.preventDefault();
        if (e.target.closest(".button-group")) {
            document.querySelector(".button-group").querySelector(".active").classList.remove("active");
        }
        if (e.target.closest(".open-pop-up")) {
            renderPopUp();
        }
        e.target.classList.toggle("active");
    }
    if (e.target.closest(".close-button")) {
        e.preventDefault();
        renderPopUp();
    }
}

function renderPopUp() {
    if (document.querySelector(".pop-up__window")) {
        document.querySelector(".pop-up__window").remove()
        document.querySelector(".open-pop-up.active").classList.remove("active")
    } else {
        wrapper.insertAdjacentHTML("afterbegin", popUpTemplate())
    }
}

function popUpTemplate() {
    return `<div class="pop-up__window">
        <div class="window__container">
            <div class="window__header">
                <a href="#" class="close-button"></a>
            </div>
            <div class="window__content">
                <div class="content__item">
                    <span class="item__container">SOME INFO</span>
                    <span class="item__content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                            commodo ligula.
                        </span>
                </div>
                <div class="content__item">
                    <span class="item__container">ENFOLD HEALTH</span>
                    <span class="item__content">
                            <a href="https://goo.gl/maps/AGxL5m8yhskvHmuF6" class="content__links">Main Street 1, Olcott Buffalo, United States</a>
                            <a href="tel:+555283784333" class="content__links">+555 283 784 333</a>
                            <a href="mailto:office@enfold-health.com"
                               class="content__links">office@enfold-health.com</a>
                        </span>
                </div>
                <div class="content__item">
                    <span class="item__container">OFFICE HOURS</span>
                    <span class="item__content">
                            <span>Mo-Fr: 8:00-19:00</span>
                            <span>Sa: 8:00-14:00</span>
                            <span>Su: closed</span>
                        </span>
                </div>
            </div>
        </div>
    </div>`
}

/*===========MouseParallax===========*/
let backgroundParallax = document.querySelector('.mouse-parallax-bg');
window.addEventListener('mousemove', function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    backgroundParallax.style.backgroundPosition = '-' + x * 15 + 'px -' + y * 15 + 'px';
});
/*===========ScrollAnimations===========*/
let headerContainer = document.querySelector(".header__container")
let homePictures = document.querySelectorAll(".picture__bubble");

const animItems = document.querySelectorAll("._anim-items");
window.addEventListener("scroll", animOnScroll);

function animOnScroll(params) {
    colorHeader();
    slideHomePicture();
    changeActiveLink();
    for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add("_active");
        } else {
            if (!animItem.classList.contains('_anim-no-hide')) {
                animItem.classList.remove("_active");
            }
        }
    }
}

let menuLinks = document.querySelectorAll(".menu__item");
let Home = document.querySelector("#Home");
let About = document.querySelector("#About");
let Services = document.querySelector("#Services");
let Blog = document.querySelector("#Blog");

function changeActiveLink() {
    Array.from(menuLinks).forEach(elem => elem.classList.remove("active"));
    if (Blog.offsetTop <= pageYOffset + 5) {
        menuLinks[3].classList.add("active");
    } else if (Services.offsetTop <= pageYOffset + 5) {
        menuLinks[2].classList.add("active");
    } else if (About.offsetTop <= pageYOffset + 5) {
        menuLinks[1].classList.add("active");
    } else if (Home.offsetTop <= pageYOffset + 5) {
        menuLinks[0].classList.add("active");
    }
}

function colorHeader() {
    if (pageYOffset > 300) {
        headerContainer.classList.add('color');
    } else {
        headerContainer.classList.remove('color');
    }
}

function slideHomePicture() {
    if (window.innerWidth > 1024) {
        Array.from(homePictures).forEach((picture) => {
                picture.style.transform = `translate(0px,${-pageYOffset * 0.3}px)`
            }
        )
    }
}

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop, left: rect.left + scrollLeft
    }
}

animOnScroll();
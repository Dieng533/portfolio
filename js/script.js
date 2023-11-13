/* ------------- toggle navbar ----------------*/ 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    menuIcon.classList.toggle('active');

};

/* ------------- défiler dans la page active avec scroll ----------------*/ 
let sections = document.querySelectorAll("section");
let navLink = document.querySelectorAll("header nav a");

window.onscroll = () =>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");
 
        if(top >= offset && top < offset + height){
            navLink.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id +']').classList.add('active');
            });
        }
    });
    /* sticky navbar*/
        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);

        menuIcon.classList.toggle('bx-x');
        menuIcon.classList.toggle('active');
}
/* scroll reveal*/
ScrollReveal({
    reset : true,
    distance: '80px',
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('home-content, .heading',{origin : 'top'});
ScrollReveal().reveal('.home-img, service-content, .portfolio-box,.contact form .heading',{origin : 'top'});


const typed = new typed ('.multiple-text',{
    strings: ['Développeur Web', 'Développeur mobile', 'Inphographe' ],
    typeSpeed: 100,
    backSpeed : 100,
    backDelay: 1000,
    loop: true
});
var type=new Typed(".Mutiple-text",{
    strings:["Frontend Developer","Youtuber","Data Analyst"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
})

// circle skill/////////////////////////////////////////////////////////////////
const circles=document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots=elem.getAttribute("data-dots");
    var marked=elem.getAttribute("data-percent");
    var percent=Math.floor(dots*marked/100);
    var points=""
    var rotate=360/dots;

    for(let i=0 ; i<dots ; i++){
        points+=`<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML=points;

    const pointsMarked=elem.querySelectorAll('.points');
    for(let i=0;i<percent;i++){
        pointsMarked[i].classList.add('marked')
    }

})

// mix it up//////////////////////////////////////////////////////////////
var mixer=mixitup('.portfolio-gallery');




// active menu////////////////////////////////////////////////////////////
let menuLi=document.querySelectorAll('header ul li a');
let section =document.querySelectorAll('section');

function activemenu(){
    let len=section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
        menuLi.forEach(sec=>sec.classList.remove("active"));
        menuLi[len].classList.add("active");
}

activemenu();
window.addEventListener("scroll",activemenu);


//sticky navbar/////////////////////////////////////////////////////////////
const header=document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",this.window.scrollY>50)
})

// Smooth scrolling//////////////////////////////////////////////////////////
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){
        e.preventDefault();

document.querySelector(this.getAttribute('href')).scrollIntoView({
    behavior:'smooth'
});
    });
});

// toggle navbar//////////////////////////////////////////////////////////z
let menuIcon=document.querySelector("#menu-icon");
let navbar=document.querySelector(".navbar");

menuIcon.onclick=()=>{
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("open");
};

window.onscroll=()=>{
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("open");
};



// footer///////////////////////////////////////////////////////////////////////////////

const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-itmes");
        } else{
            entry.target.classList.add("show-items");
        }
    });
})

const scrollScale=document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>obersver.observe(el));

const scrollBottom=document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>obersver.observe(el));

const scrollTop=document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>obersver.observe(el));
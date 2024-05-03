const base_url = "/assets/JSON";
const userStart = qs(".userStart");
const userSkill = qs(".skills");
const projectContent = qs(".project-content");
const form = qs(".form");
const uyari = qs(".uyari");
const emailBar = qs(".emailBar");
const avatarDeneme = qs(".avatar-deneme");
uyari.style.display = "none";
let i = 0;

function handleForm(){
    form.addEventListener("submit", getFormValues);
}

let kontrol = [];
let kontrol2= [];
let sayac = 0;

function getFormValues(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    kontrol = formObj.email;
    kontrol2 = kontrol.split("");
    console.log(kontrol2);

    for (const value of kontrol2) {
        console.log(value);
        if (value == "@") {
            sayac++;   
        }
    }

    if (sayac == 0) {
        showAlert();
    }

    
}

function showAlert(){
    uyari.style.display = "block";
    emailBar.classList.add("uyariEmail");
    return false;

}

function bindEventsAll(selector, eventType, cbFunction){
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
        element.addEventListener(eventType, cbFunction);
    }
}

function qs(selector){
    const element = document.querySelector(selector);
    return element;
}

async function getInfos(endpoint){
    const response = await fetch(`${base_url}/${endpoint}`);
    const data = await response.json();
    return data;
}

async function showHeroInfos(){
    const hero = await getInfos("hero.json");
    console.log(hero.title);
    // avatarDeneme.src = `${hero.photo}`;
    userStart.innerHTML = `
        <div>
            <img  class="avatar" src="${hero.photo}" alt="">
        </div>

        <div class="user-start-bottom">
            <a href="#"class="title">${hero.title}</a>
            <a href="#" class="subtitle">${hero.subtitle}</a>
            <a href="#" class="cvBtn">ÖZ GEÇMİŞ</a>
        </div>`;



    
    
}

{/* <div>
<img  class="avatar" src="${hero.photo}" alt="">
</div>

<div class="user-start-bottom">
<h1 class="title">${hero.title}</h1>
<a href="#" class="subtitle">${hero.subtitle}</a>
<p class="description">${hero.description}</p>
<a href="#">CONTACT ME</a>
</div> */}


async function showSkills(){
    const skills = await getInfos("skills.json");
    for (const skill of skills) {
        userSkill.innerHTML += `
            <div class="skills-item">
                <h2 class="skills-name">${skill.name}</h2>
                <p class="experience">${skill.experience}</p>
            </div>
      `;
    }
}

async function showProjects(){
    const projects = await getInfos("projects.json");
    for (const project of projects) {
        projectContent.innerHTML += `
        <div class="project-content-item">
            <div class="links mobile-tablet-hidden">
                <div class="links-inside">
                    <div class="desktop-link">
                        <a href="#" class="link-content">VIEW PROJECT</a>
                        <a href="#" class="link-content">VIEW CODE</a> 
                    </div>
                    <figure><img class="project-photo-2" src="${project.photo}" alt=""></figure>
                    
                </div>                        
            </div>
            <img  class="project-photo desktop-hidden" src="${project.photo}" alt="">
            <p class="project-name">${project.title}</p>
            <ul class="project-categories" data-id=${i}></ul>
            <div class="links desktop-hidden">
                <a href="#">VIEW PROJECT</a>
                <a href="#">VIEW CODE</a>                    
            </div>
        </div>`;
        i++;
    }

    const projectPhotos = document.querySelectorAll(".project-photo");
    const linkContents = document.querySelectorAll(".link-content");
    // const desktopLinks = document.querySelector(".desktop-link")
    const projectCategories = document.querySelectorAll(".project-categories");

    for (let k = 0; k < projects.length; k++) {
        // console.log(projects[k]);
        for (const category of projectCategories) {
            // console.log(category);
            if (k == category.dataset.id) {
                for (const deneme of projects[k].categories) {
                    category.innerHTML += `<li>${deneme}</li>`;
                }
            }
        }
    }

    bindEventsAll(".project-photo-2","mouseover", handleView);
    bindEventsAll(".project-photo-2","mouseout", handleViewClose);
    // showLinks(projectPhotos);
}

function showLinks(photos){
    for (const photo of photos) {
        photo.addEventListener("click", function(){
            this.parentElement.previousElementSibling.firstElementChild.style.display = "block";
            this.parentElement.previousElementSibling.lastElementChild.style.display = "block";
        })
    }
}

function handleView(){
    this.parentElement.previousElementSibling.firstElementChild.style.display = "block";
    this.parentElement.previousElementSibling.lastElementChild.style.display = "block";
}
function handleViewClose(){
    this.parentElement.previousElementSibling.firstElementChild.style.display = "none";
    this.parentElement.previousElementSibling.lastElementChild.style.display = "none";
}


function init(){
    showHeroInfos();
    showSkills();
    showProjects();
    handleForm();
}

init();
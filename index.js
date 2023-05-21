// Shorthands: see https://stackoverflow.com/questions/13383886
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const fromId = document.getElementById.bind(document);
const fromClass = document.getElementsByClassName.bind(document);
const fromTag = document.getElementsByTagName.bind(document);


/* ------------------------------------------------------------------------- */
/* --------------------------------- SETUP --------------------------------- */
/* ------------------------------------------------------------------------- */

const sounds = {
    merle: new Howl({
        src: ['static/audio/merle_noir.mp3']
    }),
    // faucon: new Howl({
    //     src: ['static/audio/faucon_crecerelle.mp3']
    // }),
    loriot: new Howl({
        src: ['static/audio/loriot.mp3']
    }),
    mesange: new Howl({
        src: ['static/audio/mesange_bleue.mp3']
    }),
    effraie: new Howl({
        src: ['static/audio/effraie_clochers.mp3']
    }),
    // effraie2: new Howl({
    //     src: ['static/audio/effraie2.mp3']
    // }),
    hulotte: new Howl({
        src: ['static/audio/chouette_hulotte.mp3']
    }),
};


/* ------------------------------------------------------------------------- */
/* ------------------------------- HEALTH BAR ------------------------------ */
/* ------------------------------------------------------------------------- */


const originalHealth = 10;
let health = originalHealth;


/* ------------------------------------------------------------------------- */
/* --------------------------- WORKSHOP SELECTOR --------------------------- */
/* ------------------------------------------------------------------------- */


const home = fromId("home");
const workshops = fromId("workshops");
const backBtn = fromId("back-btn");
backBtn.addEventListener("click", () => {
    stopAllSounds();
    displayHome();
});

function displayHome() {
    home.classList.remove("hidden");
    workshops.classList.add("hidden");
}

const foodWorkshopBtn = fromId("food-workshop-btn");
const biometricWorkshopBtn = fromId("biometric-workshop-btn");
const nestWorkshopBtn = fromId("nest-workshop-btn");
const workshopContainers = fromClass("workshop-container");

foodWorkshopBtn.addEventListener("click", () => displayWorkshop("food-workshop"));
biometricWorkshopBtn.addEventListener("click", () => displayWorkshop("biometric-workshop"));
nestWorkshopBtn.addEventListener("click", () => displayWorkshop("nest-workshop"));

function displayWorkshop(id) {
    home.classList.add("hidden");
    workshops.classList.remove("hidden");
    // show the corresponding workshop and hide the others
    for (i = 0; i < workshopContainers.length; i++) {
        const container = workshopContainers[i];
        if (container.id == id) {
            container.classList.remove("hidden");
        } else {
            container.classList.add("hidden");
        }
    }
}


/* ------------------------------------------------------------------------- */
/* ----------------------------- FOOD WORKSHOP ----------------------------- */
/* ------------------------------------------------------------------------- */


const foodButtonA = fromId("food-choice-A");
const foodButtonB = fromId("food-choice-B");
const foodResultA = fromId("food-result-A");
const foodResultB = fromId("food-result-B");
const foodChoices = fromId("food-choices");
const backBtnFoodChoicesA = fromId("back-btn-food-choices-A");
const backBtnFoodChoicesB = fromId("back-btn-food-choices-B");

foodButtonA.addEventListener("click", foodChoiceA);
foodButtonB.addEventListener("click", foodChoiceB);

backBtnFoodChoicesA.addEventListener("click", () => {
    foodResultA.classList.add("hidden");
    foodChoices.classList.remove("hidden");
});

backBtnFoodChoicesB.addEventListener("click", () => {
    foodResultB.classList.add("hidden");
    foodChoices.classList.remove("hidden");
    displayHome();
});

function foodChoiceA() {
    /* Retour au choix de proie - Diminution de la ligne de vie */
    foodResultA.classList.remove("hidden");
    foodChoices.classList.add("hidden");

    health -= 10;
}

function foodChoiceB() {
    /* Retour à la page principale - Augmentation de la ligne de vie */
    foodResultB.classList.remove("hidden");
    foodChoices.classList.add("hidden");

    health += 20;
}


/* ------------------------------------------------------------------------- */
/* -------------------------- BIOMETRIC WORKSHOP --------------------------- */
/* ------------------------------------------------------------------------- */


/* ------------------------------------------------------------------------- */
/* ----------------------------- NEST WORKSHOP ----------------------------- */
/* ------------------------------------------------------------------------- */


fromId('nest-btn-merle').addEventListener('click', () => toggleSound(sounds.merle));
fromId('nest-btn-mesange').addEventListener('click', () => toggleSound(sounds.mesange));
fromId('nest-btn-effraie').addEventListener('click', () => toggleSound(sounds.effraie));
//fromId('nest-btn-effraie2').addEventListener('click', () => toggleSound(sounds.effraie2));
fromId('nest-btn-loriot').addEventListener('click', () => toggleSound(sounds.loriot));
fromId('nest-btn-hulotte').addEventListener('click', () => toggleSound(sounds.hulotte));


function toggleSound(sound) {
    if (sound.playing()) {
        sound.stop();
    } else {
        stopAllSounds();
        sound.play();
    }
}

function stopAllSounds() {
    for (const [_key, value] of Object.entries(sounds)) {
        value.stop();
    }
}
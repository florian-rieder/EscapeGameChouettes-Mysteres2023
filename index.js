/* ------------------------------------------------------------------------- */
/* ------------------------------ SHORTHANDS ------------------------------- */
/* ------------------------------------------------------------------------- */


// see https://stackoverflow.com/questions/13383886
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const fromId = document.getElementById.bind(document);
const fromClass = document.getElementsByClassName.bind(document);
const fromTag = document.getElementsByTagName.bind(document);

function show(element) {
    element.classList.remove("hidden");
}

function hide(element) {
    element.classList.add("hidden");
}


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


const originalHealth = 30;
let health;

const sickClutch = fromId("sick-clutch");
const happyClutch = fromId("happy-clutch");

setHealth(originalHealth); // Initialize the health bar

function setHealth(newHealth){
    health = newHealth;
    if (health > 50){
        show(happyClutch);
        hide(sickClutch);
    } else {
        show(sickClutch);
        hide(happyClutch);
    }
    setProgressBar(health);
}

function setProgressBar(percentage) {
    /** 
     * Sets the progress bar to a certain percentage
     * Based on: https://codepen.io/alvarotrigo/pen/vYeNpjj
     * Uses GSAP
     * @param {float} percentage - a value between 0 and 1
     */

    const progressBarContainer = query(".custom-progress-bar__container");
    const progressBar = query(".custom-progress-bar");

    if (percentage == 100) {
        gsap.to(progressBar, {
            x: `${percentage}%`,
            duration: 1,
            backgroundColor: "#4dd14f",
            onComplete: () => {
                progressBarContainer.style.boxShadow = "0 0 5px black";
            }
        });
    } else {
        gsap.to(progressBar, {
            x: `${percentage}%`,
            duration: 1,
        });
    }
}


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
    show(home);
    hide(workshops);
}

const foodWorkshopBtn = fromId("food-workshop-btn");
const biometricWorkshopBtn = fromId("biometric-workshop-btn");
const nestWorkshopBtn = fromId("nest-workshop-btn");
const workshopContainers = fromClass("workshop-container");

foodWorkshopBtn.addEventListener("click", () => displayWorkshop("food-workshop"));
biometricWorkshopBtn.addEventListener("click", () => displayWorkshop("biometric-workshop"));
nestWorkshopBtn.addEventListener("click", () => displayWorkshop("nest-workshop"));

function displayWorkshop(id) {
    hide(home);
    show(workshops);
    // show the corresponding workshop and hide the others
    for (i = 0; i < workshopContainers.length; i++) {
        const container = workshopContainers[i];
        if (container.id == id) {
            show(container);
        } else {
            hide(container);
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
    hide(foodResultA);
    show(foodChoices);
});

backBtnFoodChoicesB.addEventListener("click", () => {
    hide(foodResultB);
    show(foodChoices);
    displayHome();
});

function foodChoiceA() {
    /* Retour au choix de proie - Diminution de la ligne de vie */
    show(foodResultA);
    hide(foodChoices);
    foodButtonA.disabled = true;


    setHealth(health - 10);
}

function foodChoiceB() {
    /* Retour à la page principale - Augmentation de la ligne de vie */
    show(foodResultB);
    hide(foodChoices);
    foodWorkshopBtn.disabled = true;

    setHealth(health + 20);
}


/* ------------------------------------------------------------------------- */
/* -------------------------- BIOMETRIC WORKSHOP --------------------------- */
/* ------------------------------------------------------------------------- */

// I admit, not my finest work...
// Step 1 - Etat général
const bioStep1 = fromId("bio-step-1");
const bioChoices1 = fromId("bio-choices-1");
const bioChoice1A = fromId("bio-choice-1A");
const bioChoice1B = fromId("bio-choice-1B");
const bioResult1A = fromId("bio-result-1A");
const bioResult1B = fromId("bio-result-1B");
const bioBack1A  = fromId("back-bio-choice-1A");
const bioBack1B  = fromId("back-bio-choice-1B");

// Step 2 - Condition physique
const bioStep2 = fromId("bio-step-2");
const bioChoices2 = fromId("bio-choices-2");
const bioChoice2A = fromId("bio-choice-2A");
const bioChoice2B = fromId("bio-choice-2B");
const bioResult2A = fromId("bio-result-2A");
const bioResult2B = fromId("bio-result-2B");
const bioBack2A  = fromId("back-bio-choice-2A");
const bioBack2B  = fromId("back-bio-choice-2B");

// Step 3 - Plumes
const bioStep3 = fromId("bio-step-3");
const bioChoices3 = fromId("bio-choices-3");
const bioChoice3A = fromId("bio-choice-3A");
const bioChoice3B = fromId("bio-choice-3B");
const bioResult3A = fromId("bio-result-3A");
const bioResult3B = fromId("bio-result-3B");
const bioBack3A  = fromId("back-bio-choice-3A");
const bioBack3B  = fromId("back-bio-choice-3B");


// Step 1
bioChoice1A.addEventListener("click", () => {
    hide(bioChoices1);
    show(bioResult1A);
});

bioChoice1B.addEventListener("click", () => {
    hide(bioChoices1);
    show(bioResult1B);
});

bioBack1A.addEventListener("click", () => {
    /* Retour à la page précédente "Etat général" pour permettre de choisir "Tout est ok" */
    show(bioChoices1);
    hide(bioResult1A);
    bioChoice1A.disabled = true;
});

bioBack1B.addEventListener("click", () => {
    /* Avancer à la page - Condition physique */
    hide(bioStep1);
    show(bioStep2);
});


// Step 2
bioChoice2A.addEventListener("click", () => {
    hide(bioChoices2);
    show(bioResult2A);
});

bioChoice2B.addEventListener("click", () => {
    hide(bioChoices2);
    show(bioResult2B);
});

bioBack2A.addEventListener("click", () => {
    /* Retour à la page précédente "Condition physique" pour permettre de choisir "un des 2 mâles est plus léger" */
    show(bioChoices2);
    hide(bioResult2A);
    bioChoice2A.disabled = true;

});

bioBack2B.addEventListener("click", () => {
    /* Avancer à la page - Etat des plumes */
    hide(bioStep2);
    show(bioStep3);
});


// Step 3
bioChoice3A.addEventListener("click", () => {
    hide(bioChoices3);
    show(bioResult3A);
});

bioChoice3B.addEventListener("click", () => {
    hide(bioChoices3);
    show(bioResult3B);
    setHealth(health + 30);
});

bioBack3A.addEventListener("click", () => {
    /* Retour à la page précédente "Etat des plumes" pour permettre de choisir "un des 2 mâles a perdu la première plume" */
    show(bioChoices3);
    hide(bioResult3A);
    bioChoice3A.disabled = true;

});

bioBack3B.addEventListener("click", () => {
    /* Augmentation de la ligne de vie - Retour à la page principale */
    hide(bioResult3B);
    biometricWorkshopBtn.disabled = true;
    displayHome();
});

/* ------------------------------------------------------------------------- */
/* ----------------------------- NEST WORKSHOP ----------------------------- */
/* ------------------------------------------------------------------------- */


fromId('nest-btn-merle').addEventListener('click', () => toggleSound(sounds.merle));
fromId('nest-btn-mesange').addEventListener('click', () => toggleSound(sounds.mesange));
fromId('nest-btn-loriot').addEventListener('click', () => toggleSound(sounds.loriot));
fromId('nest-btn-hulotte').addEventListener('click', () => toggleSound(sounds.hulotte));
fromId('nest-btn-effraie').addEventListener('click', () => toggleSound(sounds.effraie));
//fromId('nest-btn-effraie2').addEventListener('click', () => toggleSound(sounds.effraie2));

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
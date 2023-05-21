// Shorthands: see https://stackoverflow.com/questions/13383886
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const fromId = document.getElementById.bind(document);
const fromClass = document.getElementsByClassName.bind(document);
const fromTag = document.getElementsByTagName.bind(document);

/* ------------------------------------------------------------------------- */
/* --------------------------- WORKSHOP SELECTOR --------------------------- */
/* ------------------------------------------------------------------------- */

const foodWorkshopBtn = fromId("food-workshop-btn");
const biometricWorkshopBtn = fromId("biometric-workshop-btn");
const nestWorkshopBtn = fromId("nest-workshop-btn");

foodWorkshopBtn.addEventListener("click", () => {
    displayWorkshop("food-workshop");
});
biometricWorkshopBtn.addEventListener("click", () => {
    displayWorkshop("biometric-workshop");
});
nestWorkshopBtn.addEventListener("click", () => {
    displayWorkshop("nest-workshop");
});

function displayWorkshop(id) {
    // show the corresponding workshop and hide the others
    const workshopContainers = document.getElementsByClassName("workshop-container");
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

const foodButtonA = document.getElementById("food-choice-A");
const foodButtonB = document.getElementById("food-choice-B");
const foodResultA = document.getElementById("food-result-A");
const foodResultB = document.getElementById("food-result-B");

foodButtonA.addEventListener("click", foodChoiceA);
foodButtonB.addEventListener("click", foodChoiceB);

function foodChoiceA() {
    /* Retour au choix de proie - Diminution de la ligne de vie */
}

function foodChoiceB() {
    /* Retour à la page principale - Augmentation de la ligne de vie */
}

/* ------------------------------------------------------------------------- */
/* -------------------------- BIOMETRIC WORKSHOP --------------------------- */
/* ------------------------------------------------------------------------- */


/* ------------------------------------------------------------------------- */
/* ----------------------------- NEST WORKSHOP ----------------------------- */
/* ------------------------------------------------------------------------- */

const sounds = {
    merle: new Howl({
        src: ['static/audio/merle_noir.mp3']
    }),
    faucon: new Howl({
        src: ['static/audio/faucon_crecerelle.mp3']
    }),
    loriot: new Howl({
        src: ['static/audio/loriot.mp3']
    }),
    mesange: new Howl({
        src: ['static/audio/mesange_bleue.mp3']
    }),
    // effraie: new Howl({
    //     src: ['static/audio/effraie.mp3']
    // }),
    effraie: new Howl({
        src: ['static/audio/effraie_clochers.mp3']
    }),
    hulotte: new Howl({
        src: ['static/audio/chouette_hulotte.mp3']
    }),
};

fromId('nest-btn-merle').addEventListener('click', () => toggleSound(sounds.merle));
fromId('nest-btn-mesange').addEventListener('click', () => toggleSound(sounds.mesange));
fromId('nest-btn-effraie').addEventListener('click', () => toggleSound(sounds.effraie));
//fromId('nest-btn-effraie2').addEventListener('click', () => toggleSound(sounds.effraie2));
fromId('nest-btn-loriot').addEventListener('click', () => toggleSound(sounds.loriot));
fromId('nest-btn-hulotte').addEventListener('click', () => toggleSound(sounds.hulotte));


function toggleSound(sound){
    if (sound.playing()){
        sound.stop();
    } else {
        // stop all sounds
        for (const [_key, value] of Object.entries(sounds)) {
            value.stop();
        }
        sound.play();
    }
}

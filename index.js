/* ------------------------------------------------------------------------- */
/* ------------------------------ SHORTHANDS ------------------------------- */
/* ------------------------------------------------------------------------- */


// see https://stackoverflow.com/questions/13383886
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const fromId = document.getElementById.bind(document);
const fromClass = document.getElementsByClassName.bind(document);
const fromTag = document.getElementsByTagName.bind(document);
const create = document.createElement.bind(document);

// Shorthands for showing and hiding elements from view
const show = element => element.classList.remove("hidden");
const hide = element => element.classList.add("hidden");


/* ------------------------------------------------------------------------- */
/* --------------------------------- SETUP --------------------------------- */
/* ------------------------------------------------------------------------- */


const birdSongs = {
    merle: {
        code: 123,
        sound: new Howl({
            src: ['static/audio/merle_noir.mp3'],
            onend: function () {
                fromId('nest-btn-merle').classList.remove("playing-song");
            }
        }),
    },
    effraie: {
        code: 427,
        sound: new Howl({
            src: ['static/audio/effraie_clochers.mp3'],
            onend: function () {
                fromId('nest-btn-effraie').classList.remove("playing-song");
            }
        }),
    },
    hulotte: {
        code: 589,
        sound: new Howl({
            src: ['static/audio/chouette_hulotte.mp3'],
            onend: function () {
                fromId('nest-btn-hulotte').classList.remove("playing-song");
            }
        }),
    },
    loriot: {
        code: 659,
        sound: new Howl({
            src: ['static/audio/loriot.mp3'],
            onend: function () {
                fromId('nest-btn-loriot').classList.remove("playing-song");
            }
        }),
    },
    mesange: {
        code: 216,
        sound: new Howl({
            src: ['static/audio/mesange_bleue.mp3'],
            onend: function () {
                fromId('nest-btn-mesange').classList.remove("playing-song");
            }
        }),
    },
    effraie2: {
        code: 846,
        sound: new Howl({
            src: ['static/audio/effraie_clochers.mp3'],
            onend: function () {
                fromId('nest-btn-effraie2').classList.remove("playing-song");
            }
        }),
    }
};

// Make sure 3.1 checkboxes aren't still checked after a soft reload.
const checkboxes = queryAll('.checkbox-container input[type="checkbox"]');
checkboxes.forEach(box => box.checked = false);


/* ------------------------------------------------------------------------- */
/* ------------------------------- HEALTH BAR ------------------------------ */
/* ------------------------------------------------------------------------- */


const originalHealth = 30;
let health;

const sickClutch = fromId("sick-clutch");
const happyClutch = fromId("happy-clutch");

// Initialize the health bar for clutch A at original health
setHealth(originalHealth); // Initialize the health bar

// Initialize the health bar for clutch B at 100%
const secondBar = fromId("custom-progress-bar2");
gsap.to(secondBar, {
    x: `100%`,
    duration: 1,
    backgroundColor: "green",
});

function setHealth(newHealth) {
    health = newHealth;

    if (health > 70) {
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

    const progressBar = fromId("custom-progress-bar1");

    // Red twice to make the red part more noticeable. Since we start at 30%
    // health, that starting health should be more red-ish than orange-ish.
    let newColor = gsap.utils.interpolate(["red", "red", "orange", "green"], percentage / 100)
    gsap.to(progressBar, {
        x: `${percentage}%`,
        duration: 1,
        backgroundColor: newColor,
    });
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
const bioBack1A = fromId("back-bio-choice-1A");
const bioBack1B = fromId("back-bio-choice-1B");

// Step 2 - Condition physique
const bioStep2 = fromId("bio-step-2");
const bioChoices2 = fromId("bio-choices-2");
const bioChoice2A = fromId("bio-choice-2A");
const bioChoice2B = fromId("bio-choice-2B");
const bioResult2A = fromId("bio-result-2A");
const bioResult2B = fromId("bio-result-2B");
const bioBack2A = fromId("back-bio-choice-2A");
const bioBack2B = fromId("back-bio-choice-2B");

// Step 3 - Plumes
const bioStep3 = fromId("bio-step-3");
const bioChoices3 = fromId("bio-choices-3");
const bioChoice3A = fromId("bio-choice-3A");
const bioChoice3B = fromId("bio-choice-3B");
const bioResult3A = fromId("bio-result-3A");
const bioResult3B = fromId("bio-result-3B");
const bioBack3A = fromId("back-bio-choice-3A");
const bioBack3B = fromId("back-bio-choice-3B");


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

// Step 1
fromId('nest-btn-merle').addEventListener('click', (e) => toggleSound(e, birdSongs.merle));
fromId('nest-btn-mesange').addEventListener('click', (e) => toggleSound(e, birdSongs.mesange));
fromId('nest-btn-loriot').addEventListener('click', (e) => toggleSound(e, birdSongs.loriot));
fromId('nest-btn-hulotte').addEventListener('click', (e) => toggleSound(e, birdSongs.hulotte));
fromId('nest-btn-effraie').addEventListener('click', (e) => toggleSound(e, birdSongs.effraie));
fromId('nest-btn-effraie2').addEventListener('click', (e) => toggleSound(e, birdSongs.effraie2));

const songsResults = fromId("nest-results-container");

function toggleSound(event, singObject) {
    if (singObject.sound.playing()) {
        singObject.sound.stop();
        event.target.classList.remove("playing-song"); // Remove the class from the button
        songsResults.innerHTML = "";

    } else {
        stopAllSounds();
        singObject.sound.play();
        event.target.classList.add("playing-song"); // Add the class to the button
        songsResults.innerHTML = "Code: " + singObject.code;
    }
}

function stopAllSounds() {
    // iterate through the birdSongs object to stop all sounds
    for (const [_key, value] of Object.entries(birdSongs)) {
        value.sound.stop();
    }

    const buttons = queryAll(".sing-btn");
    buttons.forEach((button) => {
        button.classList.remove("playing-song"); // Remove the class from all buttons
    });

    songsResults.innerHTML = "";
}

fromId("validate-song-submit").addEventListener("click", validateSelection);
fromId("song-choice-next-step").addEventListener("click", () => {
    // Go to the next step
    hide(fromId("nest-step-1"));
    show(fromId("nest-step-2"));
});

function validateSelection() {
    // Get the relevant checkboxes
    const checkboxA = fromId('buttonA');
    const checkboxB = fromId('buttonB');
    const checkboxC = fromId('buttonC');
    const checkboxD = fromId('buttonD');
    const checkboxE = fromId('buttonE');
    const checkboxF = fromId('buttonF');
    const result = fromId("song-choice-result");
    const nextStepButton = fromId("song-choice-next-step");

    // Check if the checkboxes corresponding to the barn owl songs are selected
    const isBarnOwlSong1Selected = checkboxB.checked;
    const isBarnOwlSong2Selected = checkboxF.checked;
    const areOtherSongsSelected = checkboxA.checked || checkboxC.checked || checkboxD.checked || checkboxE.checked

    // Validate the selection
    if ((isBarnOwlSong1Selected && isBarnOwlSong2Selected) && !areOtherSongsSelected) {
        result.classList.add("success");
        result.classList.remove("error");

        // Disable submit button and checkboxes
        fromId("validate-song-submit").disabled = true;
        const checkboxes = queryAll('.checkbox-container input[type="checkbox"]');
        checkboxes.forEach(box => box.disabled = true);

        result.innerHTML = "Félicitations ! Vous pouvez passer à l'étape suivante";
        show(nextStepButton);
    } else {
        result.classList.remove("success");
        result.classList.add("error");
        result.innerHTML = "Désolé, vous n'avez pas correctement identifié les chants de chouette effraie. Réessayez !"
    }
}


// Step 2
const nestPlacementChoices = fromId("nest-choices");
const nestResult = fromId("nest-placement-result");

const btnNorth = fromId("nest-choice-north");
const btnEast = fromId("nest-choice-east");
const btnSouth = fromId("nest-choice-south");
const btnWest = fromId("nest-choice-west");

btnNorth.addEventListener("click", () => nestChoice("north"));
btnEast.addEventListener("click", () => nestChoice("east"));
btnSouth.addEventListener("click", () => nestChoice("south"));
btnWest.addEventListener("click", () => nestChoice("west"));

function nestChoice(choice) {
    hide(nestPlacementChoices);

    // Create "Retour" button
    const returnButton = create("button");
    returnButton.classList.add("util-btn");

    let resultText = "";
    if (choice == "north" || choice == "east") {
        resultText = "Bravo ! Votre nichoir est bien placé, votre nichée va mieux !";
        nestResult.classList.add("success");
        setHealth(health + 20);
        nestWorkshopBtn.disabled = true;

        returnButton.addEventListener("click", displayHome);
        returnButton.innerHTML = "Retour au menu";

    } else {
        resultText = "Raté ! Il fait trop chaud dans ce nichoir, votre nichée va moins bien";
        nestResult.classList.add("error");
        setHealth(health - 10);
        const id = "nest-choice-" + choice;
        const btn = fromId(id);
        btn.disabled = true;

        returnButton.addEventListener("click", () => {
            nestResult.className = ""; // Remove all classes
            nestResult.innerHTML = ""; // Delete results
            show(nestPlacementChoices);
        });
        returnButton.innerHTML = "Retour au choix";
    }

    // Create feedback paragraph
    const resultParagraph = create("p");
    resultParagraph.innerHTML = resultText;

    // Add to the page
    nestResult.appendChild(resultParagraph);
    nestResult.appendChild(returnButton);
}

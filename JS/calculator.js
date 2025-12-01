let clickIndex = 0;
const clickSounds = ["sfx-click1", "sfx-click2", "sfx-click3"];


/* === SOUND EFFECTS === */
function playSound(id) {
    const s = document.getElementById(id);
    if (!s) return;

    s.currentTime = 0;  
    s.play().catch(() => {});
}

/* === CALCULATOR LOGIC === */
const display = document.getElementById("display");

function insert(value) {
    playSound(clickSounds[clickIndex]);

    // Move to next sound
    clickIndex = (clickIndex + 1) % clickSounds.length;

    display.value += value;
}

function clearDisplay() {
    playSound("sfx-clear");
    display.value = "";
}

function backspace() {
    playSound("sfx-backspace");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        playSound("sfx-equals");
        let result = eval(display.value);

        // Prevent undefined or NaN
        if (result === undefined || isNaN(result)) {
            throw new Error("Invalid");
        }

        display.value = result;
    } catch (err) {
        playSound("sfx-error");  // invalid math sound
        display.value = "Error!";
        setTimeout(() => display.value = "", 900);
    }
}

function squareRoot() {
    try {
        playSound("sfx-click1");
        let val = Math.sqrt(eval(display.value));

        if (isNaN(val)) throw new Error();

        display.value = val;
    } catch {
        playSound("sfx-error");
        display.value = "Error!";
        setTimeout(() => display.value = "", 900);
    }
}

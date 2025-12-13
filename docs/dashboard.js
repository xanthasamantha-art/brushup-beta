// Community prompt list (add more anytime)
const PROMPTS = [
    "Draw an object using only 10 lines.",
    "Draw a character made from only 3 shapes.",
    "Draw something ‘happy’ using only wavy lines.",
    "Draw the same object twice: one with thick lines, one with thin lines.",
    "Draw a scene using only light and dark values (no outlines).",
    "Draw a tiny creature living inside a household object.",
    "Draw your mood as an abstract texture pattern.",
    "Draw a still life using only spheres, cubes, and cylinders.",
    "Draw a warm-color version of a landscape, then a cool-color version.",
    "Draw something from memory, then add one silly detail Arty would approve of."
];

// Returns a number that changes each day (UTC) so everyone gets the same prompt
function getUtcDayNumber() {
    const now = new Date();
    const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    return Math.floor(utcMidnight / 86400000); // ms in a day
}

function getTodaysPrompt() {
    const dayNum = getUtcDayNumber();
    const index = dayNum % PROMPTS.length;
    return PROMPTS[index];
}

const btn = document.getElementById("artyPromptBtn");
const promptText = document.getElementById("artyPromptText");

function revealPrompt() {
    // If it's already open, close it
    if (!promptText.hidden) {
        promptText.hidden = true;
        promptText.textContent = "";
        return;
    }

    // Otherwise, open it with today's prompt
    const prompt = getTodaysPrompt();
    promptText.hidden = false;
    promptText.textContent = prompt;
}


// Click to reveal
btn.addEventListener("click", revealPrompt);

// Keyboard support (Enter / Space) since it's clickable
btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        revealPrompt();
    }
});

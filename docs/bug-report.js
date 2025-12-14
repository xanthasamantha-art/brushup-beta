// bug-report.js
(() => {
    const form = document.getElementById("bugForm");
    const statusEl = document.getElementById("status");
    const copyBtn = document.getElementById("copyBtn");

    const BUG_EMAIL = "brushupbugreport@gmail.com";

    function getSelectedRadioValue(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : "";
    }

    function buildReportText() {
        const doing = document.getElementById("doing").value.trim();
        const steps = document.getElementById("steps").value.trim();
        const screenshot = document.getElementById("screenshot").value.trim();
        const browser = document.getElementById("browser").value.trim();
        const repro = getSelectedRadioValue("repro");
        const username = document.getElementById("username").value.trim();

        // Helpful extra context:
        const page = window.location.href;
        const time = new Date().toISOString();

        return [
            "BrushUp Bug Report",
            "-------------------",
            `BrushUp username: ${username}`,
            `Browser/device: ${browser}`,
            `Reproducible every time?: ${repro}`,
            `Page URL: ${page}`,
            `Time (ISO): ${time}`,
            "",
            "What were you doing?",
            doing,
            "",
            "Steps to reproduce:",
            steps,
            "",
            "Screenshot link (optional):",
            screenshot || "(none)",
            "",
            "Thank you! (Arty is on the case.)"
        ].join("\n");
    }

    function openPrefilledEmail(reportText) {
        const subject = encodeURIComponent("BrushUp Bug Report");
        const body = encodeURIComponent(reportText);

        // mailto opens the user's email client/app with the content filled in.
        // Note: some browsers have body-length limits; copy button below covers that.
        const mailto = `mailto:${BUG_EMAIL}?subject=${subject}&body=${body}`;

        window.location.href = mailto;
    }

    async function copyToClipboard(text) {
        // Clipboard API only works on https or localhost and needs user interaction
        await navigator.clipboard.writeText(text);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        statusEl.textContent = "";

        // Basic required checks (HTML required already helps, but this keeps it sturdy)
        const doing = document.getElementById("doing").value.trim();
        const steps = document.getElementById("steps").value.trim();
        const browser = document.getElementById("browser").value.trim();
        const username = document.getElementById("username").value.trim();
        const repro = getSelectedRadioValue("repro");

        if (!doing || !steps || !browser || !username || !repro) {
            statusEl.textContent = "Please fill out all required fields before submitting.";
            return;
        }

        const reportText = buildReportText();

        // Optional: copy first so even if mailto truncates, they can paste it
        try {
            await copyToClipboard(reportText);
            statusEl.textContent = "Copied report to clipboard. Opening your email app…";
        } catch {
            statusEl.textContent = "Opening your email app… (Clipboard copy unavailable here.)";
        }

        openPrefilledEmail(reportText);
    });

    copyBtn.addEventListener("click", async () => {
        statusEl.textContent = "";
        const reportText = buildReportText();

        try {
            await copyToClipboard(reportText);
            statusEl.textContent = "Copied! You can paste this report anywhere.";
        } catch {
            statusEl.textContent = "Copy failed (browser blocked it). You can still submit via the email button.";
        }
    });
})();

// Get display elements
const displayCurrent = document.getElementById("currentInput");
const displayHistory = document.getElementById("history");
const clearButton = document.querySelector(".clearButton");

let currentInput = "0";
let history = "";

// Update the display
function updateDisplay() {
    displayCurrent.textContent = currentInput;
    displayHistory.textContent = history;
    displayCurrent.scrollLeft = displayCurrent.scrollWidth;
}

updateDisplay();

// Handle button clicks
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {

        const value = button.getAttribute("data-value");
        const type = button.getAttribute("data-type");

        // DELETE (Backspace)
        if (type === "delete") {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = "0";
            }
            updateDisplay();
            return;
        }

        // EQUALS
        if (type === "equals") {
            try {
                // Convert percentages before evaluation
                let toEval = currentInput.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
                let result = eval(toEval).toString();

                // Update history
                history = currentInput + " = " + result;

                currentInput = result;
            } catch {
                currentInput = "Error";
            }
            updateDisplay();
            return;
        }

        // PERCENT
        if (type === "percent") {
            const lastChar = currentInput.slice(-1);
            if (/\d|\)/.test(lastChar)) {
                currentInput += "%"; // Add % after a number or closing bracket
            } else {
                currentInput += "%"; // Otherwise treat as modulus (if you want, can separate)
            }
            updateDisplay();
            return;
        }

        // PLUS-MINUS
        if (type === "plus-minus") {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay();
            return;
        }

        // PARENTHESES TOGGLE
        if (type === "parentheses") {
            let open = (currentInput.match(/\(/g) || []).length;
            let close = (currentInput.match(/\)/g) || []).length;

            if (open > close) {
                currentInput += ")";
            } else {
                currentInput += "(";
            }
            updateDisplay();
            return;
        }

        // NUMBER OR OPERATOR
        if (value && !type) {
            if (currentInput === "0") {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay();
            return;
        }

    });
});

// CLEAR BUTTON
clearButton.addEventListener("click", () => {
    currentInput = "0";  // Reset current input
    history = "";         // Reset history if desired
    updateDisplay();
});

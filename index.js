let display = document.getElementById("display");
let currentInput = "0";
function updateDisplay() {
    display.textContent = currentInput;
    display.scrollLeft = display.scrollWidth;
}


updateDisplay();

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        const type = button.getAttribute("data-type");
        if (type === "clear") {
            currentInput = "0";
        }else if (type === "equals") {
            try {
                currentInput = eval(currentInput).toString();
            } catch {
                currentInput = "Error";
            }
        }

         if (value && !type)
            {
                if(currentInput === "0")
                {
                    currentInput = value;
                }
                else
                {
                    currentInput += value;
                }
            }

        if (type === "plus-minus")
            {
                currentInput = (parseFloat(currentInput) * -1).toString();
            }    
        updateDisplay();




    });
});

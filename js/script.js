//Khanh made this when we click on the button page 1, we can see the menu
function showMenu() {
    document.getElementById("hidden_menu").style.display = "block";
}


// Validate the form fields
function checkRequired(event) {
    

    const form = document.getElementById("sign_in");
    const inputs = form.querySelectorAll("input[required]");
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const male = document.getElementById("male").checked;
    const fmale = document.getElementById("fmale").checked;
    const other = document.getElementById("other").checked;
    let errorMessage = ''; // Initialize errorMessage as an empty string

    // Check for required fields
    inputs.forEach(input => {
        if (!input.value.trim()) {
            errorMessage += `The field "${input.name}" cannot be left blank.<br>`;
        }
    });

    // Check password length
    if (password.length < 9) {
        errorMessage += "Password must be at least 9 characters long!<br>";
    }

    // Check password match
    if (password !== password2) {
        errorMessage += "Passwords do not match.<br>";
    }

    // Check gender selection
    if (!male && !fmale && !other) {
        errorMessage += "Please select a gender.<br>";
    }

    // If there are errors, show them and prevent form submission
    if (errorMessage) {
        createErrorWindow(errorMessage);
        return false; // Prevent form submission
    }

    // If no errors, submit form and show success message
    alert("Well done!! Welcome to Sweet Life!");
    form.submit();
    return true;
}

function createErrorWindow(errorMessage) {
    // Create the overlay
    const overlay = document.createElement("div");
    overlay.id = "scrnOverlay";

    // Create the error window with a template literal
    const errorWindow = document.createElement("section");
    errorWindow.id = "errWin";
    errorWindow.innerHTML = `
        <h3>Watch Out!!</h3>
        <div>${errorMessage}</div>
        <a href="#" id="closeButton">Close</a>
    `;

    // Close button event listener
    const closeButton = errorWindow.querySelector("#closeButton");
    closeButton.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.removeChild(overlay);
        document.body.removeChild(errorWindow);
    });

    // Append the error window and overlay
    document.body.appendChild(overlay);
    document.body.appendChild(errorWindow);
}

// Initialize the form validation
function init() {
    const form = document.getElementById("sign_in");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        checkRequired(e);
    });
}

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", init);





function payOnline() {
    document.getElementById("pay_online").style.display = "block";
}

function payPickUp() {
    document.getElementById("pay_online").style.display = "none";
}

function checkShopping(event) {
    const email = document.getElementById("email").value.trim();
    const num = document.getElementById("num").value.trim();
    const deliveryAddress = document.getElementById("deliveryAddress").value.trim();
    const deliverySub = document.getElementById("deliverySub").value.trim();
    const postcode = document.getElementById("billingPostcode").value.trim();
    const payOnlineOption = document.getElementById("online").checked;

    let errorMessage = '';

    // Validate email (not empty and valid format)
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errorMessage += "Email is required and must be valid.<br>";
    }

    // Validate phone number (8-12 digits)
    if (!num || !/^\d{8,12}$/.test(num)) {
        errorMessage += "Phone Number is required and must be 8-12 digits.<br>";
    }

    // Validate delivery address
    if (!deliveryAddress) {
        errorMessage += "Delivery address is required.<br>";
    }

    // Validate delivery suburb
    if (!deliverySub) {
        errorMessage += "Delivery suburb is required.<br>";
    }

    // Validate postcode (must be exactly 4 digits)
    if (!/^\d{4}$/.test(postcode)) {
        errorMessage += "Postcode must be exactly 4 digits.<br>";
    }

    // Only validate credit card if Pay Online is selected
    if (payOnlineOption) {
        const creditCard = document.getElementById("creditCard").value.trim();
        const creditCardType = document.getElementById("creditCardType").value;

        // Require credit card to be filled
        if (creditCard === '') {
            errorMessage += "Credit Card information is required for Pay Online.<br>";
        } else {
            // Check credit card length based on type
            if (creditCardType === "visa" || creditCardType === "mastercard") {
                if (!/^\d{16}$/.test(creditCard)) {
                    errorMessage += "Visa and MasterCard numbers must be exactly 16 digits.<br>";
                }
            } else if (creditCardType === "amex") {
                if (!/^\d{15}$/.test(creditCard)) {
                    errorMessage += "American Express numbers must be exactly 15 digits.<br>";
                }
            }
        }
    }

    // If there are errors, display them in the error window
    if (errorMessage) {
        event.preventDefault(); // Prevent form submission
        createErrorWindow(errorMessage);
        return false;
    }

    return true; // Allow form submission
}

function createErrorWindow(errorMessage) {
    const existingOverlay = document.getElementById("scrnOverlay");
    const existingErrorWindow = document.getElementById("errWin");
    if (existingOverlay) document.body.removeChild(existingOverlay);
    if (existingErrorWindow) document.body.removeChild(existingErrorWindow);

    const overlay = document.createElement("div");
    overlay.id = "scrnOverlay";

    const errorWindow = document.createElement("section");
    errorWindow.id = "errWin";
    errorWindow.innerHTML = `
        <h3>Watch Out!!</h3>
        <div>${errorMessage}</div>
        <a href="#" id="closeButton">Close</a>
    `;

    const closeButton = errorWindow.querySelector("#closeButton");
    closeButton.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.removeChild(overlay);
        document.body.removeChild(errorWindow);
    });

    document.body.appendChild(overlay);
    document.body.appendChild(errorWindow);
}

function init() {
    const form = document.getElementById("shopping");
    form.addEventListener("submit", function (e) {
        if (!checkShopping(e)) {
            e.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", init);

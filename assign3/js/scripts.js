// constants for query selector
const myStudentId = document.getElementById('myStudentId');
const form = document.querySelector("form");
const orderSummary = document.getElementById("order-summary");
const errorMessagesDiv = document.getElementById("error-messages");

// my id
myStudentId.textContent = 'Natalia Hoffmann - 20062790';

class Pizza {
    /* This is how to create an object with the parameters from the form */
    constructor(fName, lName, address, postalcode, phone, email, size, crust, sauce, meats, veggies, bake, shape, switchOption) {
        this.fName = fName;
        this.lName = lName;
        this.address = address;
        this.postalcode = postalcode;
        this.phone = phone;
        this.email = email;
        this.size = size;
        this.crust = crust;
        this.sauce = sauce;
        this.meats = meats;
        this.veggies = veggies;
        this.bake = bake;
        this.shape = shape;
        this.switchOption = switchOption;
    }

    arrayOutput(array) {
        /* Adjusting the array for output */
        if (array.length === 0) return "None"; // Return "None" if the user did not check any box
        
        if (array.length === 1) return array[0]; // Return the item, if there is only one
        
        // If there is an array, join them with ', ' and if it is the last we use 'and'
        let formattedString = "";
        for (let i = 0; i < array.length; i++) {
            if (i === array.length - 1) {
                formattedString += "and " + array[i];
            } else {
                formattedString += array[i] + ", ";
            }
        }
        return formattedString;
    }

    // Function to output the pizza description
    output() {
        const meatsOutput = this.arrayOutput(this.meats);
        const veggiesOutput = this.arrayOutput(this.veggies);

        return `
            <h3>Order Summary:</h3>
            <p><strong>Customer Name:</strong> ${this.fName} ${this.lName}</p>
            <p><strong>Address:</strong> ${this.address}, ${this.postalcode}</p>
            <p><strong>Phone:</strong> ${this.phone}</p>
            <p><strong>Email:</strong> ${this.email}</p>
            <p><strong>Pizza Size:</strong> ${this.size} slices</p>
            <p><strong>Crust:</strong> ${this.crust}</p>
            <p><strong>Sauce:</strong> ${this.sauce}</p>
            <p><strong>Meats:</strong> ${meatsOutput}.</p>
            <p><strong>Veggies:</strong> ${veggiesOutput}.</p>
            <p><strong>Bake Preference:</strong> ${this.bake}</p>
            <p><strong>Shape:</strong> ${this.shape}</p>
            <p><strong>Order Type:</strong> ${this.switchOption}</p>
        `;
    }
}

// Function to validate the form before submission
function validateForm(event) {
    event.preventDefault();

    const fName = document.getElementById("fName").value.trim();
    const lName = document.getElementById("lName").value.trim();
    const address = document.getElementById("address").value.trim();
    const postalcode = document.getElementById("postalcode").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const size = document.getElementById("size").value;
    const crust = document.getElementById("crust").value;
    const sauce = document.getElementById("sauce").value;
    const meats = Array.from(document.getElementById("meats").selectedOptions).map(option => option.value);
    const veggies = Array.from(document.getElementById("v&m").selectedOptions).map(option => option.value);
    const bake = document.getElementById("bake").value;
    const shape = document.getElementById("shape").value;
    const switchOption = document.querySelector('input[name="switch"]:checked') ? document.querySelector('input[name="switch"]:checked').value : '';

    let valid = true;
    let errorMessage = '';

    if (!fName || !lName || !address || !postalcode || !phone || !email) {
        valid = false;
        errorMessage += "Please fill out all personal information fields.\n";
    }

    if (!size || !crust || !sauce || meats.length === 0 || veggies.length === 0 || !bake || !shape) {
        valid = false;
        errorMessage += "Please select all the pizza options.\n";
    }

    if (!switchOption) {
        valid = false;
        errorMessage += "Please select an order type (Take Out, Delivery, Eat In).\n";
    }

    if (!valid) {
        alert(errorMessage);
        return false;
    }

    // If the form is not valid, show error messages
    if (!valid) {
        errorMessagesDiv.textContent = errorMessage; // Display errors
        return false;
    } else {
        errorMessagesDiv.textContent = ""; // Clear previous errors
    }

    return true;
}

// Main function the form is submitted
form.addEventListener("submit", function (event) {
    if (validateForm(event)) { //validate
        // Get the values from the form
        const fName = document.getElementById("fName").value.trim();
        const lName = document.getElementById("lName").value.trim();
        const address = document.getElementById("address").value.trim();
        const postalcode = document.getElementById("postalcode").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const size = document.getElementById("size").value;
        const crust = document.getElementById("crust").value;
        const sauce = document.getElementById("sauce").value;
        const meatsSelect = document.getElementById("meats");
        const meats = [];
        for (let i = 0; i < meatsSelect.selectedOptions.length; i++) {
            meats.push(meatsSelect.selectedOptions[i].value);
        }
        const veggiesSelect = document.getElementById("v&m");
        const veggies = [];
        for (let i = 0; i < veggiesSelect.selectedOptions.length; i++) {
            veggies.push(veggiesSelect.selectedOptions[i].value);
        }
        const bake = document.getElementById("bake").value;
        const shape = document.getElementById("shape").value;
        const switchOption = document.querySelector('input[name="switch"]:checked') ? document.querySelector('input[name="switch"]:checked').value : '';

        // Create a new Pizza object 
        const pizzaOrder = new Pizza(fName, lName, address, postalcode, phone, email, size, crust, sauce, meats, veggies, bake, shape, switchOption);

        // Output the pizza details
        orderSummary.innerHTML = pizzaOrder.output();
    }
});

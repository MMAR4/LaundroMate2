// --- Email.js Setup ---
// Public Key: EUSgMEXqIRr3SMUV (Integrated)
(function() {
    emailjs.init({
        publicKey: "-EUSgMEXqIRr3SMUV", 
    });
})();


// --- Global Declarations ---
let cart = [];
const cartItemsElement = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');
const bookingForm = document.getElementById('booking-form');
const confirmationMessage = document.getElementById('confirmation-message');


// --- 1. Cart Functions (Quantity & Price Calculation) ---

/**
 * Function to re-render the cart table and calculate the grand total.
 * @returns {number} The calculated grand total.
 */
function renderCart() {
    cartItemsElement.innerHTML = '';
    let grandTotal = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px; color:#999;">Your cart is empty.</td></tr>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            grandTotal += itemTotal;

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    ${item.name} 
                    ${item.quantity > 1 ? `<span style="font-size:0.8em; color:#555;">(x${item.quantity})</span>` : ''}
                </td>
                <td>₹${itemTotal.toFixed(2)}</td>
                <td>
                    <button type="button" class="remove-btn" onclick="removeItem(${item.id})">
                        <i class="fa-solid fa-circle-minus"></i>
                    </button>
                </td>
            `;
            cartItemsElement.appendChild(newRow);
        });
    }

    totalAmountElement.textContent = `₹${grandTotal.toFixed(2)}`;
    return grandTotal; 
}

/**
 * Function to add an item to the cart, increasing quantity if it exists.
 */
function addItem(button) {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const existingItem = cart.find(item => item.name === name); 

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: Date.now(), name, price, quantity: 1 });
    }

    renderCart();
}

/**
 * Function to remove an item from the cart, decreasing quantity or removing entirely.
 */
function removeItem(id) {
    const itemIndex = cart.findIndex(item => item.id === id); 

    if (itemIndex > -1) {
        cart[itemIndex].quantity -= 1;

        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }

    renderCart();
}


// --- 2. Email Confirmation and Booking ---

/**
 * Formats the cart contents into a readable string for the email body.
 */
function formatCartDetails() {
    if (cart.length === 0) return "No services booked.";

    let details = "Services Booked:\n";
    cart.forEach(item => {
        details += `- ${item.name} x${item.quantity} (₹${(item.price * item.quantity).toFixed(2)})\n`;
    });
    return details;
}

/**
 * Handles the "Book Now" submission, sends email, and shows confirmation.
 * Service ID: service_z2sqm2a
 * Template ID: template_ric8x0h
 */
function bookService(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Please add services to your cart before booking.");
        return;
    }
    
    // --- START: Enhanced Input Reading and Validation (Critical for 400 Error) ---
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Check if any required field is empty. This prevents the 400 Bad Request error.
    if (!fullName || !email || !phone) {
        confirmationMessage.textContent = 'Please fill out all contact fields (Name, Email, Phone).';
        confirmationMessage.style.color = 'red';
        confirmationMessage.classList.add('show');
        console.error('Validation Failed: Contact fields are empty. Cannot send API request.');
        return; // Stop the function if any field is empty
    }
    // --- END: Enhanced Input Reading and Validation ---


    const totalAmount = renderCart();
    const cartDetails = formatCartDetails();

    const templateParams = {
        // Use the trimmed, validated values
        full_name: fullName, 
        email: email,
        phone: phone,
        cart_details: cartDetails,
        total_amount: `₹${totalAmount.toFixed(2)}`
    };

    confirmationMessage.classList.remove('show');
    confirmationMessage.style.color = '#4CAF50'; 

    // Sending Email...
    // Service ID: service_z2sqm2a, Template ID: template_ric8x0h
    emailjs.send('service_z2sqm2a', 'template_ric8x0h', templateParams)
        .then((response) => {
           // Success handling
           confirmationMessage.textContent = "Thank you For Booking the Service. We will get back to you soon!";
           confirmationMessage.classList.add('show');
           console.log('EMAIL SENT SUCCESSFULLY!', response);
           
           cart = [];
           renderCart();
           bookingForm.reset();
        }, (error) => {
           // Failure handling
           confirmationMessage.textContent = 'Booking failed. Check console for details!';
           confirmationMessage.style.color = 'red';
           confirmationMessage.classList.add('show');
           console.error('EMAIL FAILED:', error);
        });
}


// --- 3. Initial Setup and Event Listeners (Scrolling Fix & Initialization) ---

document.addEventListener('DOMContentLoaded', () => {
    // Height of the fixed navbar
    const navbarHeight = 60; 
    const links = document.querySelectorAll('a[href^="#"]');

    // Scroll Fix Logic
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    let offsetPosition;
                    
                    if (targetId === '#home') {
                        // Scroll to the very top (0)
                        offsetPosition = 0;
                    } else {
                        // Calculate the position to scroll to, minus the navbar height
                        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                        offsetPosition = elementPosition - navbarHeight;
                    }

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Attach the booking function to the form submit event
    bookingForm.addEventListener('submit', bookService);
    
    // Initial render of the cart on DOM load
    renderCart();
});
# LaundroMate: Laundry Service Booking Site

This project is a single page website template designed for a professional laundry or dry cleaning service, featuring a fully functional service booking system.

## Live Demo
https://laundromate2.netlify.app/

## ✨ Features

* **Interactive Shopping Cart:** Customers can add and remove services with real-time total amount calculation.
* **Email Booking Confirmation:** Utilizes the **Email.js** service to send booking requests directly to the business owner's email without needing a backend server.
* **Responsive Design:** Optimized for desktop, tablet, and mobile views.
* **Smooth Navigation:** Fixed header and smooth scrolling implemented for a polished user experience.

## 🛠️ Technology Stack

* **HTML5:** Structure and content.
* **CSS3:** Styling and layout (including media queries for responsiveness).
* **JavaScript (Vanilla JS):** Core logic for the cart, calculations, form validation, and Email.js integration.
* **Font Awesome:** Icons used across the site.

## ⚙️ Setup and Deployment

This project is configured for deployment via Netlify.

1.  **Clone the Repository:**
    ```bash
    git clone [your-repo-link]
    ```

2.  **API Configuration (Required):**
    For the booking form to work, you must configure your Email.js credentials in `script.js`:
    * **Public Key:** (Integrated in `script.js` initialization)
    * **Service ID:** `service_z2sqm2a`
    * **Template ID:** `template_ric8x0h`
    
    *Note: If running locally, you must adjust the Email.js Network Security settings to allow `file://` or `http://localhost`.*

3.  **Deploy with Netlify:**
    * Log in to Netlify.
    * Click **"Add new site"** $\rightarrow$ **"Import an existing project"**.
    * Connect to GitHub and select the **LaundroMate** repository.
    * Use the default settings:
        * **Build command:** *(Leave empty)*
        * **Publish directory:** *(Leave empty)*
    * Click **"Deploy site"**.

# Login and Registration System with OTP 🚀

A simple and secure login and registration system with OTP (One-Time Password) functionality. This project uses HTML, CSS, JavaScript, jQuery, AJAX, PHP, Tailwind CSS, and MySQL.

## Features 🌟

- **Registration:**
  - User provides name and email.
  - Email verification using OTP.
  - OTP expires in 5 minutes.
  - Password setup after OTP verification.
  - Successful registration redirects to the login page.

- **Login:**
  - User enters email and password.
  - Redirects to the logged-in page upon successful login.
  - Access to the logged-in page is restricted without authentication.

- **Security:**
  - Backend OTP verification for maximum security.
  - Passwords securely stored in the database.
  - Access control to the logged-in page.

## Setup Instructions ⚙️

1. **Database Setup:**
   - Create a MySQL database named "user."
   - Import tables using the provided `user.sql` file through phpMyAdmin or your preferred method.

2. **Server Configuration:**
   - Configure your server's mail function for email verification.
   - Adjust SMTP details or use other libraries for production.

3. **Local Setup:**
   - Clone the repository to your local machine.
   - Host it on a localhost or a server.

4. **Run the Application:**
   - Open the registration and login pages in a web browser.
   - Follow the steps for registration and login.

## Dependencies 🛠️

- [Tailwind CSS](https://tailwindcss.com/) - For styling.
- [jQuery](https://jquery.com/) - Used for DOM manipulation.
- [PHPMailer](https://github.com/PHPMailer/PHPMailer) (Optional) - For SMTP email configuration.

## Demo 🌐

You can see a live demo of this project [here](#).

## Screenshots 📸

![Screenshot 1](screenshots/screenshot1.png)
*Description of the screenshot.*

![Screenshot 2](screenshots/screenshot2.png)
*Description of the screenshot.*

## Feedback and Contributions 💌

If you have any feedback or want to contribute to this project, feel free to contact the developer:

**Developer:** [Your Name]
**Email:** [Your Email]

Happy coding! 🚀

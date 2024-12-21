# 🛒 Agni - Smart Trolley with Website Integration

Agni is an innovative E-commerce platform designed as part of a final year project to enhance the shopping experience through seamless website integration with smart trolleys. This system leverages RFID technology and microcontroller communication for real-time cart updates and offers features like customer registration, OTP verification, cart management, payment processing, and receipt generation.

## 🚀 Features

- **Smart Trolley Integration**: Uses an ESP WROOM-32 microcontroller and an EM-18 RFID reader to update the website in real-time.
- **QR Code-Based Interaction**: Easily connect carts with the website for a personalized shopping experience.
- **Customer Registration**: Secure OTP-based email verification during signup.
- **Cart Management**: Add, update, and remove items in the cart with instant database synchronization.
- **Payment Gateway**: Hassle-free checkout with online payment options.
- **Receipt Generation**: Automatic receipts for completed transactions.

## 📂 Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- [MongoDB](https://www.mongodb.com/) for the database.
- [Postman](https://www.postman.com/) for API testing (optional).

### Installation

1. Clone the repository:
   
  `git clone https://github.com/your-repo-url.git`
  `cd your-project-folder`
   
2. Install dependencies:

  `npm install`

3. Configure environment variables:
   
  Create a .env file in the root directory and add the required environment variables such as JWT_SECRET, DB_URI, etc.

## 🛠️ Development

To start the development server:

`npm run dev`

### Notes:

  - The page will automatically reload when you make changes to the code.
  - Check the console for any lint or runtime errors.

## 📜 Project Overview

The project integrates smart trolley technology with a website to enable a futuristic shopping experience. The trolley communicates with the backend in real time to provide updates and facilitate efficient shopping.

### Key components include:

  1. Frontend: Built with React.js for an intuitive and responsive user interface.
  2. Backend: Developed using Express.js for robust API handling and MongoDB for data storage.
  3. Hardware Integration: Real-time data exchange between the trolley and the website using an ESP WROOM-32 microcontroller and RFID readers.

## 🧪 Testing

  - Use Postman to test API endpoints.
  - Simulate cart updates and payments through test data.
  - Ensure the OTP verification flow is functional.

## 🌟 Acknowledgments

  - Team Members: A special thanks to everyone who contributed to this project.
  - Mentors: For their guidance throughout the development process.
  - Libraries & Tools: Thank you to the developers of Node.js, React.js, MongoDB, and other dependencies.



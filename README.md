# MERN Stack Digital Wallet

## Overview

This is a MERN (MongoDB, Express, React, Node.js) stack-based digital wallet application that allows users to perform various financial transactions, manage their wallets, and track their spending.

## Key Features:

- **User Authentication:** Secure registration and login functionality.
- **Email Verification:** Email-based verification during registration using the Resend API.
- **Forgot Password:** Secure password recovery using email verification via the Resend API.
- **Payment Processing:** Integration with PayPal API for seamless transaction handling.
- **Transaction History:** A detailed record of all user transactions.
- **Responsive Design:** Fully responsive frontend for optimal user experience across devices.

## Setup Instructions

Follow these steps to set up the application on your local machine:

### Prerequisites:

- Node.js and npm installed
- MongoDB instance running
- PayPal developer account for API credentials
- Resend API account for email services

### Steps:

#### 1. Clone the Repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

#### 2. Install Dependencies:

Navigate to both the backend and frontend directories to install the required dependencies:

```bash
# For Backend
cd backend
npm install

# For Frontend
cd ../frontend
npm install
```

#### 3. Configure Environment Variables:

Update the `.env` file in the backend directory with the following values:

```
MONGO_URL=<your-mongodb-connection-string>
PORT=<backend-port-number>
JWT_SECRET=<your-jwt-secret>
RESEND_API_KEY=<your-resend-api-key>
CLIENT_URL=<frontend-url>
PAYPAL_CLIENT_ID=<your-paypal-client-id>
PAYPAL_CLIENT_SECRET=<your-paypal-client-secret>
```

#### 4. Start the Application:

##### Backend:

```bash
cd backend
npm start
```

##### Frontend:

```bash
cd frontend
npm run dev
```

#### 5. Access the Application:

Open your browser and navigate to `http://localhost:<frontend-port>`.

## Additional Notes:

### Testing:

Basic unit and integration tests are included. Run tests using:

```bash
npm test
```

### Contributions:

Contributions are welcome. Submit a pull request with your changes.

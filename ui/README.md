# Spread Sweat

## Overview
Welcome to Spread Sweat!  
The philosophy here is simple: complete a designated number of reps for each exercise daily, in any order and any set division you prefer. 
The routine changes day by day to target different muscle groups, ensuring a balanced workout regimen.

Changes to the user interface are saved in real-time, ensuring a seamless experience. 
Your last session's settings will greet you every time you return.

## ⚠️ Warnings 

- **Development Stage:** This project was rapidly prototyped and awaits significant refactoring and expansion.
- **Security:** Authentication is not yet implemented. Currently, anyone with the URL can access and alter the application state.
- **Data Validation:** The application lacks payload validation, which poses a risk of large, unverified data being stored on the server.
- **Encryption:** The default setup will run on `http` rather than `https`. Refer to the *Advanced Setup* section for secure deployment.

## 🚀 Quick Start

1. [Install Docker](https://docs.docker.com/engine/install/)
2. [Install Docker Compose](https://docs.docker.com/compose/install/)
3. Copy the `.env.sample` file to `.env` and make any necessary adjustments.
4. Run `docker-compose up` in your terminal.
5. Access the application at [http://localhost:8010](http://localhost:8010) or the URL set in your `.env` file.

## 💡 Advanced Setup
For setting up a secure HTTPS connection, further steps will be required. In a perfect world, these steps will be documented one day 🌈🙃

## 🤝 Contributing

This project is in its early stages, simple and prototypical, but if you find it useful and have ideas to enhance it, your pull requests are more than welcome. Dive in and help us improve!

---

Thank you for checking out Spread Sweat. Let's make fitness flexible and fun!
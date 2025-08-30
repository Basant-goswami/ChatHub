# 🚀 ChatHub – Real-time Chat Application  

ChatHub is a **full-stack real-time chat application** built with **Spring Boot (backend)**, **PostgreSQL (database)**, and **React (frontend)**. It provides secure authentication and seamless messaging with a modern UI.  

🔗 **Live Demo**: [Click here to try ChatHub](https://basant-chathub.netlify.app)  

---

## 🔑 Features  
- 👤 **User Authentication** – Login & Register with JWT security  
- 🔐 **Password Encryption** – Secure user data with hashing  
- 💬 **Real-time Messaging** – One-to-one chat functionality  
- 📂 **Database Integration** – PostgreSQL with JPA & Hibernate  
- 🌍 **CORS Configured** – Smooth communication between frontend & backend  
- 🖥 **Frontend** – Built with React + Vite  
- ⚡ **Backend** – Spring Boot REST APIs  
- 🚀 **Deployment Ready** – Configured for cloud deployment (Render/Netlify/Vercel)  

---

## 🛠 Tech Stack  
- **Backend**: Spring Boot, Spring Security, JWT, Hibernate  
- **Frontend**: React (Vite), Bootstrap  
- **Database**: PostgreSQL  

---

## ⚙️ Setup Instructions  

### 1️⃣ Backend (Spring Boot)  
```bash
# Clone repository
git clone https://github.com/your-username/chathub.git
cd chathub/backend

# Configure database in application.properties
spring.datasource.url=jdbc:postgresql://<your-db-url>:5432/chathubdb
spring.datasource.username=<your-db-username>
spring.datasource.password=<your-db-password>

# Build & Run
mvn clean package
java -jar target/chathub-0.0.1-SNAPSHOT.jar




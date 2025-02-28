# To-Do App (React Native + Expo)

A simple and intuitive To-Do application built using **React Native** and **Expo**, with backend integration via an API.

## Features

- Add, update, and delete tasks
- Mark tasks as completed
- Fetch tasks from an API
- Responsive and mobile-friendly UI
- Persistent data with API integration

## Tech Stack

- **Frontend:** React Native, Expo
- **State Management:** useState, useEffect (React Hooks)
- **Networking:** Axios / Fetch API
- **Backend:** Node.js / Express (or any API service)

## Installation & Setup

### Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Have an API ready for handling to-do tasks

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/todo-app-react-native.git
   cd todo-app-react-native
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure API Endpoint

   - Create a `.env` file in the root folder
   - Add the API base URL:
     ```env
     API_URL=https://your-api-url.com
     ```

4. Start the Expo development server:

   ```bash
   npx expo start
   ```

5. Scan the QR code using the Expo Go app (Android/iOS) or run it in an emulator.

## API Endpoints

Ensure your backend API supports the following endpoints:

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /todos      | Get all tasks     |
| POST   | /todos      | Create a new task |
| PUT    | /todos/\:id | Update a task     |
| DELETE | /todos/\:id | Delete a task     |

## Project Structure

```
📂 todo-app-react-native
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┣ 📂 screens
 ┃ ┣ 📂 services (API calls)
 ┃ ┣ 📜 App.js
 ┣ 📜 package.json
 ┣ 📜 .env
 ┣ 📜 README.md
```

## Screenshots

(Add relevant screenshots here)

## Contributing

Contributions are welcome! Fork the repo, make changes, and submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

**Happy Coding! 🚀**

n

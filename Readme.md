
# 🌤️ Real-Time Weather Dashboard

A **React Native** weather app built with **Expo** that shows real-time weather data based on the user's geolocation or manual city search.

---

## 🚀 How to Set Up and Run the App

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Configure API Key

- Create a **.env** file in the root directory:

```bash
touch .env
```

- Add your **OpenWeatherMap API Key**:

```env
API_KEY=your_openweathermap_api_key_here
```

### 4️⃣ Run the App

```bash
npx expo start
```

- Press **i** for iOS Simulator
- Press **a** for Android Emulator
- Or scan the QR code with **Expo Go**

---

## 🛠️ Design and Approach

- Built using **React Native** with **Expo** for cross-platform support.
- Uses **Expo Location API** to fetch geolocation-based weather data.
- Fetches weather data from **OpenWeatherMap API**.
- Simple state management using **React Hooks** (`useState`, `useEffect`).
- Dynamic backgrounds based on weather conditions.
- Manual city search with API-powered suggestions.
- Favorites stored locally using **AsyncStorage**.

---

## ⚠️ Assumptions & Limitations

- Users will grant location permissions to fetch geolocation-based data.
- The app requires an active internet connection to fetch weather data.
- No offline mode or caching implemented.
- Error handling for API errors, and denied permissions.

---

## 📄 License

This project is licensed under the **MIT License**.

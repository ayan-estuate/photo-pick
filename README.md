# 📸 Expo React Native Photo Capture App

A fully functional photo capture, gallery, and preview mobile app built with **React Native**, **Expo**, **TypeScript**, and **Expo Router**.

---

## 🚀 Features

✅ Capture photos using the device camera  
✅ View captured photos instantly in a gallery  
✅ Tap any photo to preview it in full-screen view  
✅ Photos are stored locally on the device  
✅ Simple and elegant UI built with React Native components

---

## 🏗️ Project Structure

```
app/
 ├── index.tsx              # Home screen (Capture + Gallery buttons)
 ├── capture.tsx            # Camera screen to capture images
 ├── gallery.tsx            # List of captured photos
 └── preview/[id].tsx       # Preview photo by id

src/
 ├── components/
 │   └── PhotoCard.tsx      # Renders a single photo card
 ├── hooks/
 │   └── usePhotos.ts       # Manages photo state, save/load logic
 └── utils/
     └── storage.ts         # AsyncStorage or FileSystem helper
```

---

## ⚙️ Setup & Installation

### 1️⃣ Install Expo CLI

```bash
npm install -g expo-cli
```

### 2️⃣ Create project

```bash
npx create-expo-app photo-app --template
```

### 3️⃣ Navigate and install dependencies

```bash
cd photo-app
npm install expo-router expo-camera expo-file-system @react-native-async-storage/async-storage
```

### 4️⃣ Enable Expo Router

```bash
npx expo install expo-router
npx expo prebuild
```

### 5️⃣ Update `package.json`

```json
"main": "expo-router/entry"
```

---

## 🧠 Workflow Explanation

### ➤ Capture Screen (`capture.tsx`)

- Uses `expo-camera` to open the device camera.
- When user clicks **Capture**, photo is taken and saved to file system.
- Metadata (id, URI, timestamp) is stored using `AsyncStorage`.
- Navigates back to home and refreshes gallery.

### ➤ Gallery Screen (`gallery.tsx`)

- Loads all saved photos via the `usePhotos()` hook.
- Displays them in a FlatList using `PhotoCard` component.
- When a photo is tapped, navigates to preview screen.

### ➤ Preview Screen (`preview/[id].tsx`)

- Reads photo `id` from router params.
- Displays full photo using `<Image>`.
- Allows delete or share (optional features).

---

## 🪝 Hooks Overview

### `usePhotos.ts`

Handles:

- `photos` state array
- `loadPhotos()` → loads photos from storage
- `savePhoto(uri)` → saves a new photo
- `deletePhoto(id)` → removes photo

Example:

```ts
const { photos, loadPhotos, savePhoto } = usePhotos();
```

---

## 💾 Storage Logic

Photos are stored using:

- `expo-file-system` → for actual photo files
- `@react-native-async-storage/async-storage` → for metadata JSON

Example structure in AsyncStorage:

```json
[
  {
    "id": "1",
    "uri": "file:///path/to/photo.jpg",
    "timestamp": "2025-11-10T09:00:00Z"
  }
]
```

---

## 🧭 Navigation Flow

```
Home (index.tsx)
 ├── Capture → (capture.tsx)
 ├── Gallery → (gallery.tsx)
 └── Preview → (preview/[id].tsx)
```

---

## 🧰 Development Plan

| Phase | Task       | Description                                 |
| ----- | ---------- | ------------------------------------------- |
| 1     | Setup      | Create Expo app, install deps               |
| 2     | Camera     | Build Capture screen with expo-camera       |
| 3     | State Mgmt | Implement usePhotos hook                    |
| 4     | Gallery    | Build gallery with FlatList                 |
| 5     | Preview    | Add photo preview by id                     |
| 6     | Persist    | Store photos with FileSystem + AsyncStorage |
| 7     | Polish     | Add styling, icons, navigation improvements |

---

## 🧪 Testing

You can test using Expo Go app:

```bash
npx expo start
```

Then scan QR code using Expo Go app on your phone.

---

## 📱 Example Output

- Tap **Capture** → take a photo
- Navigate to **Gallery** → see captured photo instantly
- Tap photo → open **Preview screen** to view full image

---

## 🧩 Future Enhancements

- Cloud backup (Firebase / S3)
- Photo editing tools (crop, filter)
- Multi-select delete / share
- Authentication (optional)

---

## 🧑‍💻 Author

**Estuate inc.**  
Built with ❤️ using **Expo + TypeScript**

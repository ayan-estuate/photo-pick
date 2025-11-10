import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "My Photo App",
  slug: "my-photo-app",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "myphotoapp",
  userInterfaceStyle: "automatic",

  // --- App icons, splash, and branding ---
  icon: "./assets/images/icon.png",
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },

  // --- Platform configuration ---
  ios: {
    supportsTablet: false,
  },

  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      backgroundColor: "#E6F4FE",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    package: "com.anonymous.myphotoapp",
    permissions: [
      "CAMERA",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
      "ACCESS_MEDIA_LOCATION",
    ],
  },

  // --- Web fallback (optional) ---
  web: {
    favicon: "./assets/images/favicon.png",
    bundler: "metro",
  },

  // --- Expo Router + Plugins ---
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
  ],

  // --- Experimental features ---
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  // --- Extra environment config (optional future use) ---
  extra: {
    environment: process.env.NODE_ENV || "development",
  },
});

import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "just-education",
  slug: "just-education",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "main",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./src/assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    googleServicesFile: "./google-services/GoogleService-Info.plist",
    bundleIdentifier: "com.justeducation.edu",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    googleServicesFile: "./google-services/google-services.json",
    package: "com.justeducation.edu",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./src/assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-web-browser",
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "4b4d65af-d0af-4fa7-a18d-e061e16fd4f3",
    },
  },
  owner: "sgadriankoh",
});

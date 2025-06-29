# Welcome to Kode-Kloude-Lite app 👋

This is an React Native [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
   ---

2. Start the app

   > For Mac users use the following command:

   ```bash
   ipconfig getifaddr en0
   ```
   You should see an output like `192.168.1.4`.
   
   Now, open `config/AppConfig.ts` and set:

   ```NETWORK_BASE_URL: "http://192.168.1.4:8092"```


   ---

3. Start the app

   > For Android:
   ```bash
   npx expo start:android
   ```

   > For iOS:
   ```bash
   npx expo start:ios
   ```
   ---

4. Start Mock Api Server in a new terminal

   ```bash
   npm run mockoon
   ```
   ---

## Example Deeplinks

You can test deep linking with the following commands:

 1. > For Android:

      ```bash
      npx uri-scheme open kodekloudelite://course-detail/postman-essentials --android
      ```


 2. > For iOS:

      ```bash
      npx uri-scheme open kodekloudelite://course-detail/postman-essentials --ios
      ```

## Assumptions

1. *Lesson progress tracking*:

   Completion and progress of lessons are currently tracked locally via cache instead of network calls. It is assumed that progress data will be synchronized with backend APIs in a production setup.
2. *Module progress*:
   
   Module progress is mocked via a static network API returning 80%. It is expected that this will be replaced by real backend data fetching in the future.

## Tech Choices

1. Architecture: MVVM (Model-View-ViewModel) pattern for scalable and maintainable code.
2. Data fetching & caching: TanStack Query for efficient data management and infinite scrolling support.
3. Local storage: MMKV for fast and efficient caching and persistence.
4. Design patterns: Repository and Adapter patterns implemented for clear data separation.
5. Component structure: Atomic Design principles dividing UI into Atoms, Molecules, and Organisms.
6. Framework: Expo for React Native, enabling a smooth developer experience and cross-platform support.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

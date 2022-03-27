# Daily Tasks

Opinionated task app for MacOS to help you get through the day

https://user-images.githubusercontent.com/4202010/160281910-91c8e51c-d8d1-4710-9bcf-bec739167e4f.mov


## Installation

Currently there are no builds, nor availability in the App Store. If you stumbled upon this repo and would like to see it there, leave a star!

## Build

The only way to build this at the moment is to building it in development mode.

### Prerequisites

After cloning the repository, install all dependencies (`yarn` is required, `npm` might not work)

```
yarn
```

### Available Scripts

#### `yarn expo-electron start`

Runs the app on desktop in development mode. It uses electron internally, although has been tested on MacOS only.

#### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `yarn ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `yarn android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

## License

Distributed under the MIT License. See LICENSE.txt for more information.

---

Ondřej Bárta - [@bartaxyz](https://twitter.com/bartaxyz)

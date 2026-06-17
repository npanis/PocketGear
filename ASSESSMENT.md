#QA Take-Home — Detox E2E Test Suite

Submission for: Mercari QA Engineer (US App) QAE Assessment
Author: Neri
App under test: PocketGear — a Pokédex-style React Native app
This repository is a fork. The application code is the original author's (satya164). My contribution is the Detox end-to-end test suite and the testIDs added to support stable, maintainable selectors.

##How to run the tests

###Prerequisites (macOS only — iOS Simulator target)
Xcode with an iOS Simulator runtime installed (Xcode → Settings → Components)
Node, Watchman, CocoaPods, applesimutils (brew install watchman cocoapods / brew tap wix/brew && brew install applesimutils)
Yarn via Corepack (corepack enable)
Detox and the expo-detox-config-plugin (community Detox plugin for Expo SDK 54+) — already in devDependencies

### One-time Setup
1. Install dependencies: yarn install
2. Generate the native iOS project with the Detox plugin applied
(--clean ensures the Detox config plugin is injected)
 npx expo prebuild --clean
3. Build the app for Detox (compiles the iOS app for the simulator)
npx detox build --configuration ios.sim.debug

###Run
npx detox test --configuration ios.sim.debug

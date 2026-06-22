#QA Take-Home — Detox E2E Test Suite

Submission for: Mercari QA Engineer (US App) QAE Assessment
Author: Neri
App under test: PocketGear — a Pokédex-style React Native app
This repository is a fork. The application code is the original author's (satya164). My contribution is the Detox end-to-end test suite and the testIDs added to support stable, maintainable selectors.

# Setup & How to Run

##Prerequisites (macOS — iOS Simulator target)


Xcode with an iOS Simulator runtime installed (Xcode → Settings → Components)
Node, Watchman, CocoaPods, applesimutils


bash  brew install node watchman cocoapods
  brew tap wix/brew && brew install applesimutils


Yarn via Corepack (corepack enable)
Detox + expo-detox-config-plugin (the community Detox plugin for Expo SDK 54+) — already in devDependencies


## 1. Install dependencies

bash yarn install

## 2. Run the app locally (optional — confirms the app builds)

bashnpx expo run:ios

The Simulator boots and opens PocketGear, a browsable, searchable Pokédex.
(PocketGear is an Expo SDK 54 app; this command auto-generates the native iOS project, then builds and launches it.)


## 3. Build the app for Detox

bashnpx expo prebuild --clean        # regenerate native project with the Detox plugin applied
npx detox build --configuration ios.sim.debug

## 4. Run the E2E tests

npx detox test --configuration ios.sim.debug

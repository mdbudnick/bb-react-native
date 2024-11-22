# Breathbox React-Native

![Breathbox Icon](assets/img/buddha-gnome-smaller.jpg)

## Overview

**Breathbox** is a simple yet powerful React-Native app designed to help you practice the breath box technique effortlessly. This mindfulness practice involves structured and rhythmic breathing patterns to promote relaxation and stress reduction. While the website appears deceptively simple on the outside, it is a testament to industry-standard development practices and cutting-edge technologies.

## About

Breathbox is just a small example of my commitment to always learning new development practices. I invite you to make Breathbox a companion on your journey towards enhanced well-being and mindfulness!

## How to run app locally
1. Install Expo Go app on your phone
2. `npx expo prebuild`
3. `npx expo start` (fix any issues that arise in console)
4. Scan the QR code and it will open on the phone

## How to upload to Google Play
1. `npx expo prebuild`
2. `npm install -g eas-cli && eas login`
3. `eas build -p android` - This creates a build on Expo App website
4. `eas submit -p android` <- This has permissions errors, even though the user is admin
5. Download the .aap file from the build, and manually upload it to the Google Play Store
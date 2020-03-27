# Be-The-Hero
This project was developed during the event SemanaOmnistack 11.0 offered by Rocketseat!


## Stack React + ReactNative + Node.js
Was used React on front-end, React Native on mobile and Node.js for the back-end

## Libraries and Frameworks
### Expo
  Expo is a framework for React Native is a framework that has several libraries to access device resources, such as sensors, 
  camera, location and much more.
  Without Expo, we would need install the Android Studio to get the Android development SDK and the XCode to get the iOS 
  development SDK in our system.
  
  To install Expo:
  
      npm install --global expo-cli
  
  And to create a new project:
  
      expo init my-project
  
  With Expo, our initiation to development is easier, since the installation of these SDKs is not extremely simple and is not 
  error-free.
  
### Express
  Trivially you can create simple servers to answer any request using only the standard Node HTTP package. However, some other 
  common development tasks are not directly supported by Node. If you want to handle different HTTP requests (GET, POST and 
  DELETE, for example) and handle requests on different routes, you can rely on a framework.
Express does just that, in a minimistic but flexible way, offering a robust set of resources to create an API easily and quickly.

  To install Express:
  
      npm install express
  
  We need add the follow lines for import the Express module and create a Express application:
  ```
    var express = require('express');
    var app = express();
  ```
  The "app" have all HTTP methods, properties and functions available.





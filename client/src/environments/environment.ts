// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    baseUrl : 'http://localhost:3000/register',
    url : 'http://localhost:3000/',
  

     firebaseConfig:{
      apiKey: "AIzaSyBM4FQ1TgkTd8hR6NdwkNtD2lixc4_oGNI",
      authDomain: "fundoonotes-29a41.firebaseapp.com",
      databaseURL: "https://fundoonotes-29a41.firebaseio.com",
      projectId: "fundoonotes-29a41",
      storageBucket: "fundoonotes-29a41.appspot.com",
      messagingSenderId: "100506863197",
      appId: "1:100506863197:web:803643fcbbdafc26f5afb4",
      measurementId: "G-9JJ2C1YEGB"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

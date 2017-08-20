// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// [END import]



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// we watch the 'userGroups' node for onCreate and onDelete events.
exports.watchUserGroups = functions.database.ref('userGroups/{userId}').onCreate( event => {
    // grab the current value of what was added to the Realtime Database.
    const original = event.data.val();
    console.log('Processing:' + event.params.userId, original)
    // we need the userId and the group push id to continue.
    const userId = event.params.userId;
    console.log('user id is: ' + userId);
    // const groupId = event.key;
    // console.log('event.key: ' + event.key); // undefiened
    console.log('original is: ');
    console.dir(original);

    console.log('original.key : ' + original.key);
    // we update the 'localStorageSync/{userId}' node to reflect the newly created group.

    // admin.database.ref('localStorageSync/' + userId).update({
    //     groups: {[groupId]: original}
    // });
});
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var db = firebase.firestore();


// var loc= '579 20th st sf CA';
// var loc_return1,loc_return2 = mapbox_geocoding(loc);
// console.log('check')
// console.log(loc_return1)
// function updateUserAvatarImage(){
//   $(document).ready(function() {
	
//   var readURL = function(input) {
//       if (input.files && input.files[0]) {
//           var reader = new FileReader();

//           reader.onload = function (e) {
//               $('.profile-pic').attr('src', e.target.result);
//           }
  
//           reader.readAsDataURL(input.files[0]);
//       }
//   }
// };




function enablematchButton(){
  var user = firebase.auth().currentUser;
  var uid = user.uid;
  var docRef = db.collection("users").doc(uid);

    docRef.get().then(function(doc) {
    if (doc.exists) {
        //console.log("Document data:", doc.data());
        document.getElementById("match-button").removeAttribute('hidden');
        // push_user_location();
        
    } else {
        console.log("User has not updated the profile in database!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

};



async function updateUserProfile() {

  var empty = false;
  $('input[type="text"]').each(function(){
    //check all the input text field except the message box text field
    if($(this).val() =="" && (this.id != "message")){
        // $(this).addClass("alert-field");
        empty =true;
        return true;
      }
  });

  if(empty != true){
    console.log('all fields checked');
    var user = firebase.auth().currentUser;
    var username, useremail, userphotoUrl, useruid;
    var result = await clear_previous_user_region_logs();
    console.log(result);
    if (user != null) {
      username = user.displayName;
      useremail = user.email;
      userphotoUrl = user.photoURL;
      useruid = user.uid;  // The user's ID, unique to the Firebase project.
    }
    
    var userprofilename = $("#form-user-name").val();
    var usergender = $("#radiodivgender input[type='radio']:checked").val();
    var useridentity = $("#radiodividentity input[type='radio']:checked").val();
    var userlocation = $("#location-input-field").val();

    db.collection("users").doc(useruid).set({
      name: userprofilename,
      gender:usergender,
      id: useruid,
      type: useridentity,
      location: userlocation,
      email:useremail,
      photoURL:userphotoUrl,
    })
    .then(function() {
        console.log("User basic info successfully written!");
        mapbox_geocoding(userlocation);

     
        
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        Swal.fire({
          position: 'top',
          icon:'error',
          background: `rgb(0,0,0,9)`,
          text: 'Server Error',
          confirmButtonColor: `rgb(0,0,0)`,
        })
    });
    enablematchButton();

    // push_user_location();
    // document.getElementById("closeformbutton").removeAttribute('hidden');
    document.getElementById("updatebutton").setAttribute('hidden', 'true');
    Swal.fire({
      position: 'top',
      icon:'success',
      background: `rgb(0,0,0,9)`,
      text: 'Profile updated!',
      confirmButtonColor: `rgb(0,0,0)`,
    })
    closeForm();
  }
  else{
      Swal.fire({
        position: 'top',
        icon: 'warning',
        background: `rgb(0,0,0,0.9)`,
        text: 'Please fill in all the profile inputs ...',
        confirmButtonColor: `rgb(0,0,0)`,
      })
  }



}









'use strict';
//drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log('check');
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  console.log("check");
}
//drag and drop//


// user avatar image
$(document).ready(function() {
	
  var readURL = function(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('.profile-pic').attr('src', e.target.result);
          }
  
          reader.readAsDataURL(input.files[0]);
      }
  }
 
  $(".file-upload").on('change', function(){
      readURL(this);
  });
  
  $(".upload-button").on('click', function() {
     $(".file-upload").click();
  });
});
// user avatar image//



// identity selection check//

function yesnoCheck(that) {
    if (that.value == "tenant") {
        document.getElementById("destination-field").removeAttribute('hidden');
        document.getElementById("host-field").setAttribute('hidden', 'true');
        document.getElementById("location-input-field").removeAttribute('hidden');
        
    } else {
        document.getElementById("host-field").removeAttribute('hidden');
        document.getElementById("destination-field").setAttribute('hidden', 'true');
        document.getElementById("location-input-field").removeAttribute('hidden');

    }
}

function openForm() {
    document.getElementById("user-profile-form").style.display = "block";

  }

  
function closeForm() {
    document.getElementById("user-profile-form").style.display = "none";
    document.getElementById("updatebutton").removeAttribute('hidden');
    // document.getElementById("closeformbutton").setAttribute('hidden', 'true');
    document.getElementById("user-profile-form-field").reset(); 
    document.getElementById("host-field").setAttribute('hidden', 'true');
    document.getElementById("destination-field").setAttribute('hidden', 'true');
    document.getElementById("location-input-field").setAttribute('hidden', 'true');

  }

function openMessage() {
    document.getElementById("message-profile-form").style.display = "block";
    loadMessages();

}

function closeMessage() {
  document.getElementById("message-profile-form").style.display = "none";
}


function signIn() {
  // Sign into Firebase using popup auth & Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}
// Signs-out of Friendly Chat.
function signOut() {
  // Sign out of Firebase.
  document.getElementById("user-profile-form").style.display = "none";
  firebase.auth().signOut();
}
// Initiate firebase auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

// Returns the signed-in user's profile pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}
// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}
// Saves a new message on the Firebase DB.
function saveMessage(messageText) {
  // Add a new message entry to the database.
  return firebase.firestore().collection('messages').add({
    name: getUserName(),
    text: messageText,
    profilePicUrl: getProfilePicUrl(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).catch(function(error) {
    console.error('Error writing new message to database', error);
  });
}

// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
  // Create the query to load the last 2 messages and listen for new ones.
  var query = firebase.firestore()
                  .collection('messages')
                  .orderBy('timestamp', 'desc')
                  .limit(2);

  // Start listening to the query.
  query.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      if (change.type === 'removed') {
        deleteMessage(change.doc.id);
      } else {
        var message = change.doc.data();
        displayMessage(change.doc.id, message.timestamp, message.name,
                       message.text, message.profilePicUrl, message.imageUrl);
      }
    });
  });
}

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageMessage(file) {
  // TODO 9: Posts a new image as a message.
}

// Saves the messaging device token to the datastore.
// function saveMessagingDeviceToken() {
//   firebase.messaging().getToken().then(function(currentToken) {
//     if (currentToken) {
//       console.log('Got FCM device token:', currentToken);
//       // Saving the Device Token to the datastore.
//       firebase.firestore().collection('fcmTokens').doc(currentToken)
//           .set({uid: firebase.auth().currentUser.uid});
//     } else {
//       // Need to request permissions to show notifications.
//       requestNotificationsPermissions();
//     }
//   }).catch(function(error){
//     console.error('Unable to get messaging token.', error);
//   });
// }

// Requests permissions to show notifications.
function requestNotificationsPermissions() {
  console.log('Requesting notifications permission...');
  firebase.messaging().requestPermission().then(function() {
    // Notification permission granted.
    // saveMessagingDeviceToken();
  }).catch(function(error) {
    console.error('Unable to get permission to notify.', error);
  });
}

// // Triggered when a file is selected via the media picker.
// function onMediaFileSelected(event) {
//   event.preventDefault();
//   var file = event.target.files[0];

//   // Clear the selection in the file picker input.
//   imageFormElement.reset();

//   // Check if the file is an image.
//   if (!file.type.match('image.*')) {
//     var data = {
//       message: 'You can only share images',
//       timeout: 2000
//     };
//     signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
//     return;
//   }
//   // Check if the user is signed-in
//   if (checkSignedInWithMessage()) {
//     saveImageMessage(file);
//   }
// }

// Triggered when the send new message form is submitted.
function onMessageFormSubmit(e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.
  if (messageInputElement.value && checkSignedInWithMessage()) {
    saveMessage(messageInputElement.value).then(function() {
      // Clear message text field and re-enable the SEND button.
      resetMaterialTextfield(messageInputElement);
      toggleButton();
    });
  }
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) { // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    profilepicbeforeuploadElement.style.backgroundImage = 'url(' +profilePicUrl + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    dropdownArrowElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // if userid exist enable the match button
    enablematchButton();
    // push_user_location();


    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

  

    // We save the Firebase Messaging Device token and enable notifications.
    // saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    dropdownArrowElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');
    document.getElementById("match-button").setAttribute('hidden', 'true');

    // var backtomylayers = mylayers;
    // deckgl.setProps({layers: backtomylayers});

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
    // deckgl.setProps({layers: mylayers});
  
  }
}

// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
  // Return true if the user is signed in Firebase
  if (isUserSignedIn()) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
  return false;
}

// Resets the given MaterialTextField.
function resetMaterialTextfield(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}

// Template for messages.
var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}



// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

// Delete a Message from the UI.
function deleteMessage(id) {
  var div = document.getElementById(id);
  // If an element for that message exists we delete it.
  if (div) {
    div.parentNode.removeChild(div);
  }
}

function createAndInsertMessage(id, timestamp) {
  const container = document.createElement('div');
  container.innerHTML = MESSAGE_TEMPLATE;
  const div = container.firstChild;
  div.setAttribute('id', id);

  // If timestamp is null, assume we've gotten a brand new message.
  // https://stackoverflow.com/a/47781432/4816918
  timestamp = timestamp ? timestamp.toMillis() : Date.now();
  div.setAttribute('timestamp', timestamp);

  // figure out where to insert new message
  const existingMessages = messageListElement.children;
  if (existingMessages.length === 0) {
    messageListElement.appendChild(div);
  } else {
    let messageListNode = existingMessages[0];

    while (messageListNode) {
      const messageListNodeTime = messageListNode.getAttribute('timestamp');

      if (!messageListNodeTime) {
        throw new Error(
          `Child ${messageListNode.id} has no 'timestamp' attribute`
        );
      }

      if (messageListNodeTime > timestamp) {
        break;
      }

      messageListNode = messageListNode.nextSibling;
    }

    messageListElement.insertBefore(div, messageListNode);
  }

  return div;
}

// Displays a Message in the UI.
function displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
  var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);

  // profile picture
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
  }

  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');

  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUrl) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      messageListElement.scrollTop = messageListElement.scrollHeight;
    });
    image.src = imageUrl + '&' + new Date().getTime();
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function() {div.classList.add('visible')}, 1);
  messageListElement.scrollTop = messageListElement.scrollHeight;
  messageInputElement.focus();
}

// Enables or disables the submit button depending on the values of the input
// fields.
function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
  }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

// Checks that Firebase has been imported.
checkSetup();

// Shortcuts to DOM Elements.
var messageListElement = document.getElementById('messages');
var messageFormElement = document.getElementById('message-form-field');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');
var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var dropdownArrowElement = document.getElementById('dropdown-arrow');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var signInSnackbarElement = document.getElementById('must-signin-snackbar');
var profilepicbeforeuploadElement = document.getElementById("profile-pic-before-upload");

signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', signIn);

// Saves message on form submit.
messageFormElement.addEventListener('submit', onMessageFormSubmit);

// Toggle for the button.
messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

// initialize Firebase
initFirebaseAuth();


var firestore = firebase.firestore();


var settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// We load currently existing chat messages and listen to new ones.
// loadMessages();



  const geoQuery = geoFirestore.query({
    center: new firebase.firestore.GeoPoint(10.38, 2.41),
    radius: 10.5
  });


    //Create a node at firebase location to add locations as child keys
    var locationsRef = firebase.database().ref("locations");
    var bounds = new google.maps.LatLngBounds();
    locationsRef.on('child_added', function(snapshot) {
    console.log(snapshot)
      var data = snapshot.val();
      console.log(data);
      var marker = new google.maps.Marker({
        position: {
          lat: data.User.l[0],
          lng: data.User.l[1]
        },
        map: map
      });
      bounds.extend(marker.getPosition());
      marker.addListener('click', (function(data) {
        return function(e) {
          infowindow.setContent(this.getPosition().toUrlValue(6) + "<br>" + data.User.g);
          infowindow.open(map, this);
        }
      }(data)));
      map.fitBounds(bounds);
    });
  }
  google.maps.event.addDomListener(window, "load", initialize);
  

// // This example adds a search box to a map, using the Google Place Autocomplete
// // feature. People can enter geographical searches. The search box will return a
// // pick list containing a mix of places and predicted search terms.
// // This example requires the Places library. Include the libraries=places
// // parameter when you first load the API. For example:
// // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places">
// function initAutocomplete() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: -33.8688, lng: 151.2195 },
//       zoom: 13,
//       mapTypeId: "roadmap",
//     });
//     // Create the search box and link it to the UI element.
//     const input = document.getElementById("pac-input");
//     const searchBox = new google.maps.places.SearchBox(input);
  
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener("bounds_changed", () => {
//       searchBox.setBounds(map.getBounds());
//     });
  
//     let markers = [];
  
//     // Listen for the event fired when the user selects a prediction and retrieve
//     // more details for that place.
//     searchBox.addListener("places_changed", () => {
//       const places = searchBox.getPlaces();
  
//       if (places.length == 0) {
//         return;
//       }
  
//       // Clear out the old markers.
//       markers.forEach((marker) => {
//         marker.setMap(null);
//       });
//       markers = [];
  
//       // For each place, get the icon, name and location.
//       const bounds = new google.maps.LatLngBounds();
  
//       places.forEach((place) => {
//         if (!place.geometry || !place.geometry.location) {
//           console.log("Returned place contains no geometry");
//           return;
//         }
  
//         const icon = {
//           url: place.icon,
//           size: new google.maps.Size(71, 71),
//           origin: new google.maps.Point(0, 0),
//           anchor: new google.maps.Point(17, 34),
//           scaledSize: new google.maps.Size(25, 25),
//         };
  
//         // Create a marker for each place.
//         markers.push(
//           new google.maps.Marker({
//             map,
//             icon,
//             title: place.name,
//             position: place.geometry.location,
//           })
//         );
//         if (place.geometry.viewport) {
//           // Only geocodes have viewport.
//           bounds.union(place.geometry.viewport);
//         } else {
//           bounds.extend(place.geometry.location);
//         }
//       });
//       map.fitBounds(bounds);
//     });
//   }


// const center = { lat: 50.064192, lng: -130.605469 };
// // Create a bounding box with sides ~10km away from the center point
// const defaultBounds = {
//   north: center.lat + 0.1,
//   south: center.lat - 0.1,
//   east: center.lng + 0.1,
//   west: center.lng - 0.1,
// };
// const input = document.getElementById("pac-input");
// const options = {
//   bounds: defaultBounds,
//   componentRestrictions: { country: "us" },
//   fields: ["address_components", "geometry", "icon", "name"],
//   strictBounds: false,
//   types: ["establishment"],
// };
// const autocomplete = new google.maps.places.Autocomplete(input, options);


// document.addEventListener("DOMContentLoaded", event =>{

//     let DB_COLLECTION_NAME = 'posts';

//     // firebase.auth().onAuthStateChanged(function(user) {

//     //     if(user) {
//     //        console.log("user logged in!");//Here you can place the code that you want to run if the user is logged in
//     //         document.getElementById("sign_in_name").innerHTML = "Hello " + user.displayName;
//     //     } else {
//     //        console.log("user not logged in.");
//     //        document.getElementById("sign_in_name").innerHTML = "Hello " + 'Guest';
//     //     }
//     //     });

//     const app = firebase.app();
//     console.log(app);

//     const db = firebase.firestore();

//     const productsRef = db.collection(DB_COLLECTION_NAME);

//     const query = productsRef//.where('title', 'like', '%')

//     db.collection('Tag_Documents').get()
//         .then(products =>{
//             products.forEach(doc =>{
//                 data = doc.data()
//                 document.getElementById('categories_filter').innerHTML += create_checkbox_filter(data);
//                 // document.write(`${data.title}` + ` reeee </br>`)
//             })
//         })

//     // query.get()
//     //     .then(products =>{
//     //         products.forEach(doc =>{
//     //             data = doc.data()
//     //             document.getElementById('posts').innerHTML += create_article_post(data);
//     //             // document.write(`${data.title}` + ` reeee </br>`)
//     //         })
//     //     })
    
//     db.collection(DB_COLLECTION_NAME)//.where("state", "==", "CA")
//     .onSnapshot((querySnapshot) => {
//         var strings = "";
//         querySnapshot.forEach((doc) => {
//             strings += create_article_post(doc.data());
//         });
//         document.getElementById('posts').innerHTML = strings;
//     });

        
//     // const myPost = db.collection('photos').doc('first image');

//     // myPost.get()
//     //     .then(doc =>{
//     //         const data = doc.data();
//     //         document.write(data.title + '<br>')
//     //         document.write(data.createdAt)
//     //     })
//     // get all the posts in photos.

//     // // Live changes
//     // myPost.onSnapshot()(doc =>{
//     //     const data = doc.data();
//     //     document.getElementById('posts').innerHTML += write(`${data.title}` + ` reeee </br>`)
//     //     // document.write(data.title + '<br>')
//     //     // document.write(data.createdAt)
//     // })
// });

// function googleLogin(){
//     // document.write(`Hello you rat`);
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth()
//     .signInWithPopup(provider)
//     .then((result) => {
//         /** @type {firebase.auth.OAuthCredential} */
//         var credential = result.credential;

//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         // ...
//     }).catch((error) => {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//     });
//     // firebase.auth().signInWithPopup(provider)
//     //     .then((result) => {
//     //         const user = result.user;
//     //         document.write(`Hello ${user.displayName}`);
//     //         console.log(user)
//     //     })
//     //     .catch(console.log)
// }
// function showPosition(position) {
//     console.log(position.coords.latitude +
//     " Longitude: " + position.coords.longitude);
//   }
// function getLocation() {
//     // if (navigator.geolocation) {
//     //   return navigator.geolocation.getCurrentPosition(showPosition);
//     // } else {
//     //   return [0,0];
//     // }
//     return [0,0]
//   }
// /*
//  * Add photo documents to input field.
//  */
// function add_photo_document(){
//     console.log("click")
//     const db = firebase.firestore();
//     const productsRef = db.collection('posts');
//     const location = getLocation();
//     const key_name = formatDate();
//     const data_title = document.getElementById('name').value;
//     const photo_url_string = document.querySelector('#imgUpload').src;
//     const file_description = document.getElementById('message').value;
//     const date_created_string = Date.now();//document.getElementById('file_date').value;
//     const file_tags = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(e => e.value);
//     console.log(file_tags);
//     productsRef.doc(key_name).set({
//         date: date_created_string,
//         description: file_description,
//         likes: 1,
//         location: location, // TODO
//         photo_url: photo_url_string,
//         tags: file_tags,
//         title:data_title,
//         uid: key_name,
//     }).then(() => {
//         console.log("Document successfully written!");
//     })
//     .catch((error) => {
//         console.error("Error writing document: ", error);
//     });

//     // get all the posts in photos.
//     const query = productsRef//.where('title', 'like', '%')
//     // query.get()
//     //     .then(products =>{
//     //         products.forEach(doc =>{
//     //             data = doc.data()
//     //             document.getElementById('posts').innerHTML += write(`${data.title}` + ` reeee </br>`)
//     //         })
//     //     })

// }

// function uploadFile(files){
//     const storageRef = firebase.storage().ref();
//     const h_name = formatDate() + '.jpg';
//     const horseRef = storageRef.child(h_name);
//     const file = files.item(0);

//     const task = horseRef.put(file)

//     task.then(function(){horseRef.getDownloadURL().then(function(url) {
//         var test = url;
//         // alert(url);
//         document.querySelector('#imgUpload').src = test;
//     }).catch(function(error) {

//     });
//     });
//     console.log("done.");
//     // task.then(snapshot => {
//     //     console.log(snapshot)
//     //     // const url = snapshot.getMetadata().getDownloadUrl();
//     //     // document.querySelector('#imgUpload').setAttribute('src', url.toString())
//     //     document.querySelector('#imgUpload').src = 'gs://mtjoa-photography.appspot.com/horse.jpg'
//     // })
// }


// function formatDate() {
//     var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth()+1; 
//     var yyyy = today.getFullYear();
//     var hour = today.getHours();
//     var minute = today.getMinutes();
//     var sec = today.getSeconds();
//     if(dd<10) 
//     {
//         dd='0'+dd;
//     } 
//     if(mm<10) 
//     {
//         mm='0'+mm;
//     } 
//     today = mm+'_'+dd+'_'+yyyy+'_'+hour+'_'+minute+'_'+sec;
//     return today;
// }
// function create_tag_button(tag_data){
//     // string = '<option onclick = query_element("'+tag_data.Name+'")>' + tag_data.Name + '</button>';
//     return '<option value = "'+ tag_data.title+'">' + tag_data.title + '</option>';
// }
// function query_element(elem_name){
//     // const query = ref.where('Tags', 'array-contains-any', [elem_name]);
//     db.collection(DB_COLLECTION_NAME).where("state", "array-contains-any",  [elem_name])
//     .onSnapshot((querySnapshot) => {
//         var strings = "";
//         querySnapshot.forEach((doc) => {
//             strings += create_article_post(doc.data());
//         });
//         document.getElementById('posts').innerHTML = strings;
//     });
// }
// function popup_information(data_title){
//     const db = firebase.firestore();
//     const myPost = db.collection('posts').doc(data_title);
//     var d_title = ""
//     var d_url = ""
//     var d_description = ""
//     var d_shortdescription = ""
//     var d_tags = ""
//     myPost.get()
//         .then(doc =>{
//             const data = doc.data();
//             console.log(data.title);

//                  // Get the modal
//         var modal = document.getElementById("myModal");
//         // Get the <span> element that closes the modal
        
//         string = '<h1>'+data.title+'</h1>\
//         <p><img src="'+data.photo_url+'" alt="" height="300px"/></br> <b>' + data.description +'</b></p> \
//         <p>'+data.description+'</p> \
//         <p>' + data.tags.toString() +'</p> \
//         \
//         ';
//         // if (data.url.length >1){
//         //     string += '<a href = '+data.URL+'> Click Here to see Project</a>'
//         // }
//         document.getElementById("modal-edit").innerHTML = string;
        
//         var span = document.getElementsByClassName("close")[0];
    
//         // When the user clicks on the button, open the modal
//         modal.style.display = "block";
    
//         // When the user clicks on <span> (x), close the modal
//         span.onclick = function() {
//         modal.style.display = "none";
//         }
    
//         // When the user clicks anywhere outside of the modal, close it
//         window.onclick = function(event) {
//             if (event.target == modal) {
//                 modal.style.display = "none";
//             }
//         }
//         });
//     console.log("clicked success");
    

//     // get all the posts in photos.
//     // var thing = []
//     // db.collection(DB_COLLECTION_NAME).where("Title", "like", data_title )
//     // .onSnapshot((querySnapshot) => {
//     //     var strings = "";
//     //     querySnapshot.forEach((doc) => {
//     //         strings += create_article_post(doc.data());
//     //     });
//     //     document.getElementById('posts').innerHTML = strings;
//     // });
// }

// function create_article_post(data){
//     /*
//     data: a json object.
//     */
//     console.log(data)
//     var string;
//     string = '<article class="mini-post"> \
//         <header> \
//             <h1><a onclick="popup_information(\''+ data.uid+'\');">' +  data.title + '</a></h1> \
//             <p><i>Tags: '+data.tags.toString() + '</i></p>\
//             <time class="published" datetime="2015-10-20">'+data.date+' </time> \
//             <a href="#" class="author">\
//                 <img src="'+''+'" alt="">\
//             </a>\
//             </header> \
//         <a onclick="popup_information(\''+ data.uid+'\');" class="image"><img src="'+data.photo_url+'" alt="" /></a> \
//         </article>';
   
//     return string;
// }

// function create_modal(string_description){}

// function get_group_info(selectBox) {
//     var op = selectBox.options[selectBox.selectedIndex];
//     var optgroup = op.parentNode;
//     // alert("selected option text is:  " + op.text + " \noptGroup label is:  " + optgroup.label);
//     return [optgroup.label, op.text];
// }
// function update_filters(){
//     const db = firebase.firestore();
//     file_tags = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(e => e.value);
//     db.collection("posts").where("tags", "array-contains-any",  file_tags)
//     .onSnapshot((querySnapshot) => {
//         var strings = "";
//         querySnapshot.forEach((doc) => {
//             strings += create_article_post(doc.data());
//         });
//         document.getElementById('posts').innerHTML = strings;
//     });
// }
// function update_list(){
//     selected_value = document.getElementById("Tags").value;
//     document.getElementById('posts').innerHTML = "";
//     const db = firebase.firestore();

//     const productsRef = db.collection('documents');

//     var query = productsRef;
//     if(selected_value != "All"){
//         query = productsRef.where('Tags', 'array-contains', selected_value);
//     }

//     query.get()
//         .then(products =>{
//             products.forEach(doc =>{
//                 data = doc.data()
//                 document.getElementById('posts').innerHTML += create_article_post(data);
//                 // document.write(`${data.title}` + ` reeee </br>`)
//             })
//         })
// }

// function create_checkbox(data){
//     string = '<input type="checkbox" id="'+data.title+'" value="'+data.title+'" name="'+data.title+'">\
//     <label for="'+data.title+'">'+data.title+'</label>';
//     return string;
// }
// function create_checkbox_filter(data){
//     string = '<input type="checkbox" id="'+data.title+'" value="'+data.title+'" name="'+data.title+'" onchange="update_filters()">\
//     <label for="'+data.title+'">'+data.title+'</label>';
//     return string;
// }

// function popup_modal_form(){
//     console.log("click");
//     var modal = document.getElementById("myModal");
//     string = '	<h3>Add a Discovery</h3>\
//     <form method="post" action="#">\
//         <div class="row gtr-uniform gtr-50">\
//             <div class="col-6 col-12-xsmall">\
//                 <input type="text" name="name" id="name" value="" placeholder="Title" />\
//             </div>\
//             <div class="col-6 col-12">\
//             <h2>\
//             <img id = "imgUpload" src = "" height="200px"></br>\
//             <input type = "file" onchange = "uploadFile(this.files);">\
//             </h2>\
//              </div>\
//             <div class="col-12 checkbox_container" style="height:10em" id="categories">\
//             <h4><b>Tag:</b></h4>      \
//             </div>\
//             <div class="col-12">\
//                 <textarea name="message" id="message" placeholder="Describe your discovery!" rows="6"></textarea>\
//             </div>\
//             <div class="col-12">\
//                 <ul class="actions">\
//                     <li><input onclick="add_photo_document();" value="Share your Find!" /></li>\
//                 </ul>\
//             </div>\
//         </div>\
//     </form>';
//     document.getElementById("modal-edit").innerHTML = string;
//     var span = document.getElementsByClassName("close")[0];
// // type="submit"
//     // Adding the possible tags
//     const db = firebase.firestore();

//     db.collection('Tag_Documents').get()
//         .then(products =>{
//             products.forEach(doc =>{
//                 data = doc.data()
//                 document.getElementById('categories').innerHTML += create_checkbox(data);
//                 // document.write(`${data.title}` + ` reeee </br>`)
//             })
//         })
//     // When the user clicks on the button, open the modal
//     modal.style.display = "block";

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//     modal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }


// }

let pos;
let map;
function initMap() {
    // Set the default location and initialize all variables
    pos = {lat: -33.857, lng: 151.213};
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });
}

/*global
    google
*/
/*jslint
    multivar, browser
*/
function initMap() {
    "use strict";
    var map,
        marker,
        uluru = {
            lat: 40.4193914,
            lng: -3.7055
        };
    map = new google.maps.Map(document.getElementById("geo"), {
        zoom: 17,
        center: uluru
    });
    marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

var map;

function initMap() {
    "use strict";
    map = new google.maps.Map(document.getElementById("geo"), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}

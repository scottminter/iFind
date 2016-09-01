/**
 * Scott Minter
 * sminter@gmail.com
 * September 1, 2016
 *
 * This files controls the auto-completion and map portion of the site.
 */
var map;

function initMap() {
    console.log("Load the map...");
    map = new google.maps.Map(document.getElementById('myMap'), {
        center: {
            lat: 36.786224,
            lng: -76.548823
        },
        zoom: 6
    });

    var input = document.getElementById('userLocation');
    var autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });


    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
            alert("No geography data for this location");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(14);
        }

        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);


        var addr = '';
        if (place.formatted_address) {
            addr = place.formatted_address;
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + addr + '</div>');
        infowindow.open(map, marker);
    });



}

console.log('Map loaded!');
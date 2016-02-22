$.namespace("DjangoGoogleMapWidget");

DjangoGoogleMapWidget = DjangoMapWidgetBase.extend({

    initializeMap: function(){
        var location = this.defaultLandingLocation;
        if (this.landingLocation && this.landingLocationName){
            location = this.landingLocation
        }
        this.map = new google.maps.Map(document.getElementById('mw-map'), {
            center: new google.maps.LatLng(location.lat, location.lng),
            scrollwheel: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT
            },
            zoom: this.zoom
        });

    },

    addMarkerToMap: function(lat, lng){
        this.removeMarker();
        this.marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: this.map,
            draggable: true
        });
        this.marker.addListener("dragend", this.dragMarker.bind(this));
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(this.marker.getPosition());
        this.map.fitBounds(bounds);
        var listener = google.maps.event.addListener(this.map, "bounds_changed", function() {
            if (this.getZoom() > 16) this.setZoom(16);
            google.maps.event.removeListener(listener);
        });
    },

    removeMarker: function(e){
        if (this.marker){
            this.marker.setMap(null);
        }
    },

    dragMarker: function(e){
        this.updateLocationInput(e.latLng.lat(), e.latLng.lng())
    }

});
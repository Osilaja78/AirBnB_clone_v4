$(document).ready(function () {
    let selectedAmenities = {};
    let selectedStates = {};
    let selectedCities = {};

    $(document).on('change', "input[type='checkbox']", function () {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).is(":checked")) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        var amenitiesText = Object.values(selectedAmenities).join(', ');
        $("div.amenities h4").text(amenitiesText);
    });

    $(document).on('change', ".locations > .popover > li > input[type='checkbox']", function () {
        var stateId = $(this).data('id');
        var stateName = $(this).data('name');

        if ($(this).is(":checked")) {
            selectedStates[stateId] = stateName;
        } else {
            delete selectedStates[stateId];
        }

        var statesText = Object.values(selectedStates).join(', ');
        $("div.locations h4").text(statesText);
    });

    $(document).on('change', ".locations > .popover > li > ul > li > input[type='checkbox']", function () {
        var cityId = $(this).data('id');
        var cityName = $(this).data('name');

        if ($(this).is(":checked")) {
            selectedCities[cityId] = cityName;
        } else {
            delete selectedCities[cityId];
        }

        var citiesText = Object.values(selectedCities).join(', ');
        $("div.locations h4").text(citiesText);
    });

    $.get("http://localhost:5001/api/v1/status/", function (data, textStatus) {
        if (textStatus === "success") {
            if (data.status === "OK") {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        }
    });

    $.ajax({
        type: 'POST',
        url: 'http://localhost:5001/api/v1/places_search/',
        data: '{}',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let place = data[i];
                $('.places').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
            }
        }
    });

    $('.filters > button').on('click', function () {
        $('.places > article').remove();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5001/api/v1/places_search',
            data: JSON.stringify({'amenities': Object.keys(selectedAmenities), 'states': Object.keys(selectedStates), 'cities': Object.keys(selectedCities)}),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    let place = data[i];
                    $('.places').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
                }
            }
        });
    });
});

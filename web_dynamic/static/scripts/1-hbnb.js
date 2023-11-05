$(document).ready(function () {
    let selectedAmenities = {};

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
});

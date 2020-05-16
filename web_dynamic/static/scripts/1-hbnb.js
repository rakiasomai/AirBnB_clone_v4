const $ = window.$;
$(document).ready(function () {
  console.log('document loaded');

  const myAmenity = {};

  $('li :checkbox').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if (this.checked) {
      myAmenity[amenityId] = amenityName;
    } else {
      delete myAmenity[amenityId];
    }

    $('div.amenities h4').empty();

    const addText = $.map(myAmenity, function (v) {
      return v;
    }).join(', ');

    $('div.amenities h4').text(addText);
  });
});

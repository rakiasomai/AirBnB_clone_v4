const $ = window.$;
$(document).ready(function () {
  console.log('document loaded');

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    }
  }).fail(function (d, textStatus, err) {
    $('DIV#api_status').removeClass('available');
  });

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

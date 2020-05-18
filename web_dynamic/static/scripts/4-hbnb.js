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

  // GET All Places and Show on DOM on initial load
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done((res) => {
    console.log(res);
    const places = $('section.places');

    for (const place of res) {
      const article = $('<article></article>');

      article.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
      article.append('<h2>' + place.name + '</h2>');
      const subdiv = $('<div class="informations"></div>');
      subdiv.append('<div class="max_guest">' + place.max_guest + ' Guests</div>');
      subdiv.append('<div class="number_rooms">' + place.number_rooms + ' Rooms</div>');
      subdiv.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div>');
      article.append(subdiv);
      article.append('<div class="description">' + place.description + '</div>');

      places.append(article);
    }
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

  $('section.filters button').on('click', function () {
    const allChecked = $('li :checkbox:checked').map(function () {
      return $(this).attr('data-name');
    });

    console.log(allChecked);
    console.log(allChecked.length);

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: allChecked })
    }).done((res) => {
      console.log(res);
      console.log('Response changing amenities: ' + res);
      const places = $('section.places');
      places.empty();

      for (const place of res) {
        const article = $('<article></article>');

        article.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
        article.append('<h2>' + place.name + '</h2>');
        const subdiv = $('<div class="informations"></div>');
        subdiv.append('<div class="max_guest">' + place.max_guest + ' Guests</div>');
        subdiv.append('<div class="number_rooms">' + place.number_rooms + ' Rooms</div>');
        subdiv.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div>');
        article.append(subdiv);
        article.append('<div class="description">' + place.description + '</div>');

        places.append(article);
      }
    });
  });
});

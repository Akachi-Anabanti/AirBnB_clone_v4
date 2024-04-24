$(document).ready(function() {
	let baseUrl = "http://192.168.33.10:5001/api/v1"
	let amenities = [];
	$('input[type="checkbox"]').change(function() {
		let amenityName = $(this).data('name');
		if ($(this).is(':checked')){
			amenities.push(amenityName);
		} else {
			let index = amenities.indexOf(amenityName);
			if (index > -1) {
				amenities.splice(index, 1);
			}
		}

		$('.amenities h4').text(amenities.join(', '));
	});

	$.get(`${baseUrl}/status/`, function(data, status) {
		if (data.status === 'OK') {
			$('#api_status').addClass("available");
		}
	});

	$.ajax({
		url: `${baseUrl}/places_search`,
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({}),
		success: function(result){
			for (let place of result){
				createPlace(place);
			}
		}
	});
});

function createPlace(place) {
	let article = $('<article></article>');
	let titleBox = $('<div class="title_box"></div>');
	titleBox.append(`<h2>${place.name}</h2>`);
	titleBox.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
	let information = $('<div class="information"></div>');
	information.append(`<div class="max_guest">${place.max_guest} guests</div>`);
	information.append(`<div class="number_rooms">${place.number_rooms} rooms</div>`);
	information.append(`<div class="number_bathrooms">${place.number_bathrooms} bathrooms</div>`);
	
	let description = $(`<div class="description">${place.description}</div>`);

	article.append(titleBox);
	article.append(information);
	article.append(description);

	$('section.places').append(article);
};

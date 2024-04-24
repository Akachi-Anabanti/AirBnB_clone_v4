$(document).ready(function() {
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
});

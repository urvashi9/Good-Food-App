$(document).ready(function(){
	$('.moodGetter').submit(function(e){
		e.preventDefault();
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of user input
		var moods = $(this).find("input[name='mood']").val();
		console.log(moods);
		$('#appName').hide();
		$('#foodName').text(moods).show();
		var myLocation = function getLocation(){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				alert('Please allow Good Food Network access to your location so it can give you better results.');
			}
		}

		function showPosition(position){
			var lat=position.coords.latitude;
			var lon=position.coords.longitude;
			return lat;
			return lon;
		}
		getMood(moods);
	});

	$('.areaGetter').submit(function(e){
		e.preventDefault();
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of user input
		var areas = $(this).find("input[name='area']").val();
		console.log(areas);
		getArea(areas);
	});
});

var showRestaurants = function(restaurant){
	var result = $('.templates .mood').clone();
	var moodElem = result.find('.name');
	moodElem.text(result.results.name);

	var address = result.find('.location');
	address.text(result.results.formatted_address);

	var rating = result.find('.ratings');
	rating.text(result.rating);

	return result;
}

var getMood = function(moods){
	var request={
	//	key: 'AIzaSyDGBxmDYugWVWqgGOtXDrAM_-wY7VEmdhE',
	};

	var url="https://maps.googleapis.com/maps/api/place/textsearch/json";

	$.ajax({
		
		url: url,
		dataType:"json",
		type:"GET",
		data:{
			query: moods,
			key: "AIzaSyDGBxmDYugWVWqgGOtXDrAM_-wY7VEmdhE",
		},
		success: function(data, textStatus, jqXHR){
      	console.log(data);
	}

})

	.done(function(result){
		$.each(result.results,function(i,item){
			var restaurant=showRestaurants(item);
			$('.results').append(restaurant);
		});
	});
}
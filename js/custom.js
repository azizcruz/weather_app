$(document).ready(function(){
	
	
    'use strict';
	// Dynamic Page Height
	$(".content").css({
      	height: $(window).height()
  	});
	
	// Declare Global Variables
	var get_weather_degrees_in_celsuis 		= 0,
		get_weather_degrees_in_fehrenheit 	= 0,
		get_weather_condition				= "",
		get_wind_speed						= 0,
		get_max_temp						= 0,
		get_min_temp						= 0,
		get_country 						= "",
		get_weather_description 			= "";
	
	// Loading Page
	$(document).on({
		ajaxStart: function () {
			$('.wrapper').fadeIn(1);
		},
		ajaxStop: function () {
			$('.spinner').fadeOut(1000, function () {
				$(this).parent().fadeOut(500);
			});
		}
	});
	
//*********************************************************************************************
    
			/*
			***************************************************************************
			*** Weather API Information using JSON with http://openweathermap.org/ ****
			*** And http://www.geoplugin.com/ API.									***
			*** Powered By Abdelaziz Abdelioua - All Rights Are Reserved 2017, v0.5.0 *
			***************************************************************************
			*/ 
    
	// Set General Informations
	var set_weather_image 		= $('#weather_image'), // to set the gif image according to the weather
		set_cityName 			= $('#set_city_name'), // to set city name
		city_name 				= geoplugin_city(); // to get city name using plugin
		// fix problem with famagusta city
	if(city_name === "Bolu") { 
			city_name 	= "Famagusta";
		}

	var country 				= $('#country'), // to set country abbreviation name
		set_weather_degrees 	= $('#degrees'), // to set weather degrees
		set_weather_condition 	= $('#weather_condition'); // to set weather condition
	
	// Set Weather Informations
	var set_wind_speed 			= $('#wind_speed'), // to set wind speed
		set_max_temp 			= $('#max_temp'), // to set max temperator
		set_min_temp 			= $('#min_temp'), // to set min temperator
		set_weather_desc		= $('#desc'); // to set weather description
		
		
		
	
    
    var weather_info; // This Variable to store an object with the city weather information
    
    $.getJSON('http://api.openweathermap.org/data/2.5/find?q=' 
			  + city_name + 
			  '&units=metric&appid=d5e1df4b3014b99d008572faed35e86c', function(json){
        	
       	weather_info = json.list[0]; // store the returned object into the variables
		
		// Get all the informations from the server and assign them to the global variables
		get_country 						= weather_info.sys.country;
		get_weather_condition				= weather_info.weather[0].main;
		get_wind_speed						= weather_info.wind.speed;
		get_max_temp						= Math.floor(weather_info.main.temp_max);
		get_min_temp						= Math.floor(weather_info.main.temp_min);
		get_weather_description 			= weather_info.weather[0].description;
		get_weather_degrees_in_celsuis 		= Math.floor(weather_info.main.temp);
		
		
		// Dynamic gif images according to the weather condition 
		switch (get_weather_condition) {
			case 'Clouds':
				set_weather_image.attr('src', 'videos/cloudy.gif');
				break;
			case 'Haze':
				set_weather_image.attr('src', 'videos/foggy.gif');
				break;
			case 'Rain':
				set_weather_image.attr('src', 'videos/rain.gif');
				break;
			case 'Snow':
				set_weather_image.attr('src', 'videos/snow.gif');
				break;
			default:
				set_weather_image.attr('src', 'videos/sunny.gif')
		}

		// Set All The Informations to the fields
		set_cityName.text(city_name);
		country.text(get_country);
		set_weather_degrees.text(get_weather_degrees_in_celsuis + '°C');
		set_weather_condition.text(get_weather_condition);
		set_wind_speed.text(get_wind_speed);
		set_max_temp.text(Math.floor(get_max_temp) + '°C');
		set_min_temp.text(Math.floor(get_min_temp) + '°C');
		set_weather_desc.text(get_weather_description);
    });
	
	//Toggle unit between Fehrenheit and Celsius
	$('.toggle').on('click', function(){
		if($('#degrees').text().indexOf('C') > -1) {
			$('#degrees').text(Math.floor(get_weather_degrees_in_celsuis * 9/5 + 32) + '°F');
			$('#max_temp').text(Math.floor(get_max_temp * 9/5 + 32) + '°F');
			$('#min_temp').text(Math.floor(get_min_temp * 9/5 + 32) + '°F');
		} else {
			$('#degrees').text(get_weather_degrees_in_celsuis + '°C');
			$('#max_temp').text(Math.floor(get_max_temp) + '°C');
			$('#min_temp').text(Math.floor(get_min_temp) + '°C');
		}
	});
	
}); 
  

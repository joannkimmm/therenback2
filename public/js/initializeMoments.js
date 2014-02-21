'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.heartoverlay a').click(function(e) {
		// Prevent following the link
		e.preventDefault();

		// Get the div ID, e.g., "project3"
		var momentID = $(this).closest('.heartoverlay').attr('id');
		// get rid of 'project' from the front of the id 'project3'
		var idNumber = momentID.substr('moments'.length);

		// this is the URL we'll call
		var url_call = '/moments/'+idNumber;

		// How to respond to the GET request
		function changeIcon() {
			// get the span to change the glyph
			var toChange = $(".heartoverlay #moments"+idNumber).find("span");
			// add the content to the DIV
			if(toChange.hasClass("glyphicon-heart")){
				toChange.removeClass("glyphicon-heart").addClass("glyphicon-heart-empty");
			} else if(toChange.hasClass("glyphicon-heart-empty")){
				toChange.removeClass("glyphicon-heart-empty").addClass("glyphicon-heart");
			}

		}

		// issue the GET request
		$.get(url_call, changeIcon);
	});

	$('#newProjectSubmitButton').click(function(e) {
		console.log('clicked');
		var title = $('#new-project-form #title').val();
		var image_url = $('#new-project-form #image_url').val();
		var date = $('#new-project-form #date').val();
		var summary = $('#new-project-form #summary').val();
		var json = {
			'project_title': title,
			'image_url': image_url,
			'date':  date,
			'summary': summary
		};
		$.post('/project/new', json, function() {
			window.location.href = '/'; // reload the page
		});
	});
}


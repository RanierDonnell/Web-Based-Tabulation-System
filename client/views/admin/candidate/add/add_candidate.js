Template.addCandidate.rendered = function() {
	Session.set('formTitle', 'Candidate');
	Session.set('formColor', 'red darken-2');

	Meteor.setTimeout(function() {
		$('#number').focus();
	}, 300);

	$('form').validate({
		rules: {
			number: 'required',
			image: 'required',
			fname: 'required',
			lname: 'required',
			place: 'required',
		},
		messages: {
			number: 'Please enter the candidate number',
			image: 'Please enter image',
			fname: 'Please enter first name',
			lname: 'Please enter last name',
			place: 'Please enter the place the candidate represents',
		},
		submitHandler: function() {
			var candidate = {
				number: parseInt($('#number').val()),
				fname: $('#fname').val(),
				mname: $('#mname').val(),
				lname: $('#lname').val(),
				place: $('#place').val(),
			}

			Meteor.call('addCandidate', candidate, function(error, data) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
				else{
					Materialize.toast('Successfully added!', 4000, 'green darken-2');

					var image = $('#image')[0].files;

					for(var i = 0; i < image.length; i++) {
						var file = image[i];
						var newImage = new FS.File(file);
						newImage.metadata = {owner: data};
						Images.insert(newImage, function(error, fileObj) {
							if(error) {
								Materialize.toast(error.reason, 4000, 'red darken-2');
							}
							else {
								$('#image').val('');
							}
						});
					}

					$('#number').val('').removeClass('valid').focus();
					$('#fname').removeClass('valid').val('');
					$('#mname').removeClass('valid').val('');
					$('#lname').removeClass('valid').val('');
					$('#place').removeClass('valid').val('');
				}
			});
		},
		errorElement: 'em'
	});

}

Template.addCandidate.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();
	},
	'change #image': function(evt, tmpl) {
		var file = evt.target.files;

		if(file && file[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#preview').attr('src', e.target.result);
			}

			reader.readAsDataURL(file[0]);
		}
	}
});

Template.addCandidate.helpers({
	getFormColor: function() {
		return Session.get('formColor');
	}
});
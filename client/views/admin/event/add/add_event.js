Template.addEvent.rendered = function() {
	Session.set('formTitle', 'Event');
	Session.set('formColor', 'green darken-2');

	Meteor.setTimeout(function() {
		$('#name').focus();
	}, 300);

	$('form').validate({
		rules: {
			name: 'required',
			image: 'required'
		},
		messages: {
			name: 'Please enter event name',
			image: 'Please enter event image'
		},
		submitHandler: function() {
			var evt = {
				name: $('#name').val(),
				activate: 0
			}

			Meteor.call('addEvent', evt, function(error, data) {
				if(error) {
					if(error.reason == 'Username already exists.') {
						Materialize.toast(error.reason, 4000, 'red darken-2');
						$('#username').addClass('invalid').focus();
					}
					else {
						Materialize.toast(error.reason, 4000, 'red darken-2');
					}
				}
				else{
					Materialize.toast('Successfully added!', 4000, 'green darken-2');
					$('#name').val('').removeClass('valid').focus();

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
								$('#preview').attr('src', '');
							}
						});
					}
				}
			});
		},
		errorElement: 'em'
	});

}

Template.addEvent.events({
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

Template.addEvent.helpers({
	getFormColor: function() {
		return Session.get('formColor');
	}
});
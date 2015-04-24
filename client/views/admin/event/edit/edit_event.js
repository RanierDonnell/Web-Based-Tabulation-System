Template.editEvent.onCreated(function() {
	var options = {
		_id: Router.current().params._id
	}

	this.subscribe('event', options);
});

Template.editEvent.rendered = function() {
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
				_id: Router.current().params._id,
				name: $('#name').val()
			}

			Meteor.call('editEvent', evt, function(error) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
				else{
					Materialize.toast('Successfully updated!', 4000, 'green darken-2');

					var image = $('#image')[0].files;
					
					if(image.length > 0) {
						Meteor.call('deleteImage', {_id: Router.current().params._id}, function(error, data) {
							if(error) {
								Materialize.toast(error.reason, 4000, 'red darken-2');
							}
							else {
								var image = $('#image')[0].files;

								for(var i = 0; i < image.length; i++) {
									var file = image[i];
									var newImage = new FS.File(file);
									newImage.metadata = {owner: Router.current().params._id};
									Images.insert(newImage, function(error, fileObj) {
										if(error) {
											Materialize.toast(error.reason, 4000, 'red darken-2');
										}
									});
								}
							}
						});
					}

					$('#name').focus();
				}
			});
		},
		errorElement: 'em'
	});
}

Template.editEvent.events({
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


Template.editEvent.helpers({
	event: function() {
		return Events.findOne({_id: Router.current().params._id});
	},
	image: function() {
		return Images.find();
	},
	getFormColor: function() {
		return Session.get('formColor');
	}
});
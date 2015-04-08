Template.editCandidate.onCreated(function() {
	var options = {
		_id: Router.current().params._id
	}

	this.subscribe('candidate', options);
});

Template.editCandidate.rendered = function() {
	Session.set('formTitle', 'Candidate');
	Session.set('formColor', 'red darken-2');
	$('#number').focus();

	$('form').validate({
		rules: {
			number: 'required',
			// image: 'required',
			fname: 'required',
			mname: 'required',
			lname: 'required',
			place: 'required',
		},
		messages: {
			number: 'Please enter the candidate number',
			// image: 'Please enter image',
			fname: 'Please enter first name',
			mname: 'Please enter middle name',
			lname: 'Please enter last name',
			place: 'Please enter the place the candidate represents',
		},
		submitHandler: function() {
			var candidate = {
				_id: Router.current().params._id,
				number: parseInt($('#number').val()),
				fname: $('#fname').val(),
				mname: $('#mname').val(),
				lname: $('#lname').val(),
				place: $('#place').val(),
			}

			Meteor.call('editCandidate', candidate, function(error, data) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
				else{
					Materialize.toast('Successfully added!', 4000, 'green darken-2');

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

					$('#number').focus();
				}
			});
		},
		errorElement: 'em'
	});
}

Template.editCandidate.events({
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

Template.editCandidate.helpers({
	candidate: function() {
		return Candidates.findOne({_id: Router.current().params._id});
	},
	image: function() {
		return Images.find();
	},
	getFormColor: function() {
		return Session.get('formColor');
	}
});
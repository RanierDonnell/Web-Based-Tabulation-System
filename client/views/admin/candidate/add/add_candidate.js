Template.addCandidate.rendered = function() {
	Session.set('formTitle', 'Candidate');
	Session.set('formColor', 'red darken-2');
	$('#number').focus();

	$('form').validate({
		rules: {
			number: 'required',
			// image: {
			// 	required: true,
			// 	accept: 'image/*'
			// },
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
				number: parseInt($('#number').val()),
				fname: $('#fname').val(),
				mname: $('#mname').val(),
				lname: $('#lname').val(),
				place: $('#place').val(),
			}
			Meteor.call('addCandidate', candidate, function(error) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
				else{
					Materialize.toast('Successfully added!', 4000, 'green darken-2');
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
	}
});

Template.addCandidate.helpers({
	getFormColor: function() {
		return Session.get('formColor');
	}
});
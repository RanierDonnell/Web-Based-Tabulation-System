Template.addJudge.rendered = function() {
	Session.set('formTitle', 'Judge');
	Session.set('formColor', 'blue darken-2');

	Meteor.setTimeout(function() {
		$('#name').focus();
	}, 300);

	$('form').validate({
		rules: {
			name: 'required',
			username: 'required',
			password: 'required'
		},
		messages: {
			name: 'Please enter your name',
			username: 'Please enter a username',
			password: 'Please provide a password'
		},
		submitHandler: function() {
			var judge = {
				name: $('#name').val(),
				username: $('#username').val(),
				password: $('#password').val()
			}
			Meteor.call('createSystemUser', judge, function(error) {
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
					$('#username').removeClass('valid').val('');
					$('#password').removeClass('valid').val('');
				}
			});
		},
		errorElement: 'em'
	});

}

Template.addJudge.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();
	}
});

Template.addJudge.helpers({
	getFormColor: function() {
		return Session.get('formColor');
	}
});
Template.editJudge.onCreated(function() {
	var options = {
		_id: Router.current().params._id
	}

	this.subscribe('judge', options);
});

Template.editJudge.rendered = function() {
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
				_id: Router.current().params._id,
				name: $('#name').val(),
				username: $('#username').val(),
				password: $('#password').val()
			}

			Meteor.call('updateSystemUser', judge, function(error) {
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
					Materialize.toast('Successfully updated!', 4000, 'green darken-2');
					$('#name').focus();
				}
			});
		},
		errorElement: 'em'
	});
}

Template.editJudge.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();
	}
});

Template.editJudge.helpers({
	judge: function() {
		return Meteor.users.findOne({_id: Router.current().params._id});
	},
	getFormColor: function() {
		return Session.get('formColor');
	}
});
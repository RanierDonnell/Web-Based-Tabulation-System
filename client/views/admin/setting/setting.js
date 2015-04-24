Template.setting.onCreated(function() {
	this.subscribe('settings');
});

Template.setting.rendered = function() {
	Session.set('formTitle', 'Setting');
	Session.set('formColor', 'orange darken-2');

	Meteor.setTimeout(function() {
		$('#title').focus();
	}, 300);

	$('form').validate({
		rules: {
			title: 'required',
			top: 'required'
		},
		messages: {
			title: 'Please enter system title',
			top: 'Please enter final top'
		},
		submitHandler: function() {
			var setting = {
				title: $('#title').val(),
				top: $('#top').val()
			}

			var settings = Settings.find();

			if(settings.count() > 0) {
				_.extend(setting, {_id: settings.fetch()[0]._id});
				
				Meteor.call('editSetting', setting, function(error) {
					if(error) {
						Materialize.toast(error.reason, 4000, 'red darken-2');
					}
					else{
						Materialize.toast('Successfully updated!', 4000, 'green darken-2');
						$('#title').removeClass('valid').focus();
					}
				});
			}
			else {
				Meteor.call('addSetting', setting, function(error) {
					if(error) {
						Materialize.toast(error.reason, 4000, 'red darken-2');
					}
					else{
						Materialize.toast('Successfully added!', 4000, 'green darken-2');
						$('#title').removeClass('valid').focus();
					}
				});
			}
		},
		errorElement: 'em'
	});
}

Template.setting.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();
	}
});

Template.setting.helpers({
	getFormColor: function() {
		return Session.get('formColor');
	},
	settings: function() {
		return Settings.findOne();
	},
	settingsExist: function() {
		return Settings.find().count() > 0 ? true : false;
	}
});
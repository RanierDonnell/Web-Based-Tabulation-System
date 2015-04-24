Template.adminDashboard.onCreated(function() {
	this.subscribe('events');
});

Template.adminDashboard.rendered = function() {
	Session.set('formTitle', 'Dashboard');
}

Template.adminDashboard.events({
	'click [name="event"]': function(evt, tmpl) {
		if($.isEmptyObject(this)) {
			Meteor.call('deactivateAll', function(error) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
			});
		}
		else {
			var doc = {
				_id: this._id
			}
			
			Meteor.call('activate', doc, function(error) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
			});
		}
	},
	'click #generate': function(evt, tmpl) {
		evt.preventDefault();

		Meteor.call('generateFinalists', function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
			else {
				Materialize.toast('Successfully generated!', 4000, 'green darken-2');
			}
		});
	}
});

Template.adminDashboard.helpers({
	events: function() {
		return Events.find();
	},
	isActivated: function(id) {
		return Events.findOne({_id: id}).activate == 1 ? true : false;
	}
});
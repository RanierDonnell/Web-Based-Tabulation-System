Template.criteria.onCreated(function() {
	var options = {
		_id: Router.current().params._id
	}

	this.subscribe('eventCriteria', options);
});

Template.criteria.rendered = function() {
	Session.set('formTitle', 'Event');
	Session.set('formColor', 'green darken-2');

	Meteor.setTimeout(function() {
		$('#name').focus();
	}, 300);

	$('form#add-form').validate({
		rules: {
			name: 'required',
			points: 'required'
		},
		messages: {
			name: 'Please enter criteria name',
			points: 'Please enter criteria points'
		},
		submitHandler: function() {
			var criteria = {
				eventId: Router.current().params._id,
				name: $('#name').val(),
				points: $('#points').val()
			}

			Meteor.call('addCriteria', criteria, function(error) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
				else{
					Materialize.toast('Successfully added!', 4000, 'green darken-2');
					$('#name').val('').focus();
					$('#points').val('');
				}
			});
		},
		errorElement: 'em'
	});

	$('form#edit-form').validate({
		rules: {
			'edit-name': 'required',
			'edit-points': 'required'
		},
		messages: {
			'edit-name': 'Please enter criteria name',
			'edit-points': 'Please enter criteria points'
		},
		submitHandler: function() {
			var criteria = {
				_id: Session.get('editCriteria'),
				name: $('#edit-name').val(),
				points: $('#edit-points').val()
			}

			Meteor.call('editCriteria', criteria, function(error) {
				if(error) {
					Materialize.toast(error.reason, 4000, 'red darken-2');
				}
				else{
					Materialize.toast('Successfully updated!', 4000, 'green darken-2');
					Session.set('editCriteria', false);
					$('#name').focus();
				}
			});
		},
		errorElement: 'em'
	});
}

Template.criteria.events({
	'submit form': function(evt, tmpl) {
		evt.preventDefault();
	},
	'click #delete': function(evt, tmpl) {
		evt.preventDefault();

		var criteria = {
			_id: this._id
		}

		Meteor.call('deleteCriteria', criteria, function(error) {
			if(error) {
				Materialize.toast(error.reason, 4000, 'red darken-2');
			}
		});
	},
	'click #edit': function(evt, tmpl) {
		evt.preventDefault();

		Session.set('editCriteria', this._id);

		Meteor.setTimeout(function() {
			$('#edit-name').focus();
		}, 300);
	},
	'click #cancel': function(evt, tmpl) {
		evt.preventDefault();

		Session.set('editCriteria', false);
		$('#name').focus();
	}
});

Template.criteria.helpers({
	criterias: function() {
		return _.sortBy(Criterias.find({'eventId': Router.current().params._id}).fetch(), 'name');
	},
	getFormColor: function() {
		return Session.get('formColor');
	},
	setEventTitle: function() {
		Session.set('eventTitle', Events.findOne().name);
	},
	editCriteria: function(id) {
		return Session.get('editCriteria') == id;
	}
});
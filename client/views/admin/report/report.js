Template.report.rendered = function() {
	Session.set('formTitle', 'Report');
	Session.set('formColor', 'purple darken-2');
}

Template.report.events({
	'click #select-report': function(evt, tmpl) {
		var selectedReport = $('#select-report').val();

		Session.set('selectedReport', selectedReport.toUpperCase());
	},
	'click #print': function(evt, tmpl) {
		evt.preventDefault();

		$('.for-print').print();
	}
});

Template.report.helpers({
	selectedReport: function(name) {
		return Session.get('selectedReport') == name;
	}
});
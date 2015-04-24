Router.route('/event/:_id/delete', {
	name: 'deleteEvent',
	template: 'deleteEvent',
	title: 'Delete Event',
	layoutTemplate: 'adminLayout'
});
Router.onBeforeAction('authenticate', {
	'authenticate': {
		route: 'login'
	},
	except: ['login', 'landing']
});

Router.onBeforeAction(function() {
	Session.set('eventTitle', false);
	Session.set('editCriteria', false);
	Session.set('selectedCandidateNumber', false);
	Session.set('selectedCandidateId', false);
	Session.set('selectedEventId', false);
	Session.set('selectedEventName', false);
	Session.set('selectedJudgeId', false);
	Session.set('finalee', false);
	Session.set('selectedReport', false);
	this.next();
});
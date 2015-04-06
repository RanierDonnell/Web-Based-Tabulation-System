Meteor.publish('judges', function() {
	return Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}});
});

Meteor.publish('judge', function(options) {
	return Meteor.users.find({'_id': options._id});
});

Meteor.publish('candidates', function() {
	return Candidates.find();
});
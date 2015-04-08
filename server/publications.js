// set primary field
Candidates._ensureIndex({number: 1}, {unique: 1});


// publications
Meteor.publish('judges', function() {
	return Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}});
});

Meteor.publish('judge', function(options) {
	return Meteor.users.find({'_id': options._id});
});

Meteor.publish('candidates', function() {
	return Candidates.find();
});

Meteor.publish('images', function(options) {
	return Images.find();
});

Meteor.publishComposite('candidate', function(options) {
	return {
		find: function() {
			return Candidates.find({'_id': options._id});
		},
		children: [
			{
				find: function(candidate) {
					return Images.find({'metadata.owner': candidate._id});
				}
			}
		]
	}
});
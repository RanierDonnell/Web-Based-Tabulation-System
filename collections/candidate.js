Candidates = new Mongo.Collection('candidates');

Candidates.allow({
	insert: function(userId, doc) {
		if(userId)
			return true;
		else
			return false;
	},
	update: function(userId, doc) {
		if(userId)
			return true;
		else
			return false;
	}
});

Meteor.methods({
	addCandidate: function(options) {
		var nonEmptyString = Match.Where(function(x) {
			check(x, String);
			return x.length > 0;
		});
		check(options.number, Match.Integer);
		check(options.fname, nonEmptyString);
		check(options.mname, nonEmptyString);
		check(options.lname, nonEmptyString);
		check(options.place, nonEmptyString);

		return Candidates.insert(options);
	}
});
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
	addCandidate: function(doc) {
		var nonEmptyString = Match.Where(function(x) {
			check(x, String);
			return x.length > 0;
		});
		check(doc.number, Match.Integer);
		check(doc.fname, nonEmptyString);
		check(doc.mname, nonEmptyString);
		check(doc.lname, nonEmptyString);
		check(doc.place, nonEmptyString);

		return Candidates.insert(doc);
	},
	editCandidate: function(doc) {
		var nonEmptyString = Match.Where(function(x) {
			check(x, String);
			return x.length > 0;
		});
		check(doc.number, Match.Integer);
		check(doc.fname, nonEmptyString);
		check(doc.mname, nonEmptyString);
		check(doc.lname, nonEmptyString);
		check(doc.place, nonEmptyString);

		return Candidates.update(doc._id, {
			$set: {
				number: doc.number,
				fname: doc.fname,
				mname: doc.mname,
				lname: doc.lname,
				place: doc.place
			}
		});
	},
	deleteCandidate: function(doc) {
		return Candidates.remove(doc._id);
	}
});
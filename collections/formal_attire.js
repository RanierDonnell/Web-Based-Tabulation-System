FormalAttires = new Mongo.Collection('formalAttires');

FormalAttires.allow({
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
	addFormalAttireScore: function(doc) {

		check(doc.candidateId, String);
		check(doc.eventId, String);
		check(doc.judgeId, String);
		check(doc.criteria1, String);
		check(doc.criteria2, String);

		FormalAttires.update({
			candidateId: doc.candidateId,
			eventId: doc.eventId,
			judgeId: doc.judgeId
		}, doc, {
			upsert: true
		});
	}
});
Finalists = new Mongo.Collection('finalists');

Finalists.allow({
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
	addFinalistScore: function(doc) {

		check(doc.candidateId, String);
		check(doc.eventId, String);
		check(doc.judgeId, String);
		check(doc.criteria1, String);
		check(doc.criteria2, String);

		Finalists.update({
			candidateId: doc.candidateId,
			eventId: doc.eventId,
			judgeId: doc.judgeId
		}, doc, {
			upsert: true
		});
	},
	generateFinalists: function() {
		Candidates.find().forEach(function(e) {
			var fantasyScore = 0;
			var swimwearScore = 0;
			var gownScore = 0;
			var preliminaryScore = 0;

			Fantasys.find({candidateId: e._id}).forEach(function(obj) {
				fantasyScore += parseFloat(obj.total);
			});

			Swimwears.find({candidateId: e._id}).forEach(function(obj) {
				swimwearScore += parseFloat(obj.total);
			});

			Gowns.find({candidateId: e._id}).forEach(function(obj) {
				gownScore += parseFloat(obj.total);
			});

			Preliminaries.find({candidateId: e._id}).forEach(function(obj) {
				preliminaryScore += parseFloat(obj.total);
			});

			var total = parseFloat(fantasyScore) + parseFloat(swimwearScore) + parseFloat(gownScore) + parseFloat(preliminaryScore);

			Candidates.update(e._id, {
				$set: {
					score: total
				}
			});

		});
	}
});
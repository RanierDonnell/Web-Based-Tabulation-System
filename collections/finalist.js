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
			var talentScore = 0;
			var swimwearScore = 0;
			var gownScore = 0;
			var interviewScore = 0;

			Talents.find({candidateId: e._id}).forEach(function(obj) {
				talentScore += parseFloat(obj.total);
			});

			Swimwears.find({candidateId: e._id}).forEach(function(obj) {
				swimwearScore += parseFloat(obj.total);
			});

			Gowns.find({candidateId: e._id}).forEach(function(obj) {
				gownScore += parseFloat(obj.total);
			});

			Interviews.find({candidateId: e._id}).forEach(function(obj) {
				interviewScore += parseFloat(obj.total);
			});

			var total = parseFloat(talentScore) + parseFloat(swimwearScore) + parseFloat(gownScore) + parseFloat(interviewScore);

			Candidates.update(e._id, {
				$set: {
					score: total
				}
			});

		});
	}
});
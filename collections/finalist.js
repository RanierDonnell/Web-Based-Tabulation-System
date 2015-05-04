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
			var productionNumberScore = 0;
			var festivalAttireScore = 0;
			var menInShortsScore = 0;
			var formalAttireScore = 0;
			var casualInterviewScore = 0;

			ProductionNumbers.find({candidateId: e._id}).forEach(function(obj) {
				productionNumberScore += parseFloat(obj.total);
			});

			FestivalAttires.find({candidateId: e._id}).forEach(function(obj) {
				festivalAttireScore += parseFloat(obj.total);
			});

			MenInShorts.find({candidateId: e._id}).forEach(function(obj) {
				menInShortsScore += parseFloat(obj.total);
			});

			FormalAttires.find({candidateId: e._id}).forEach(function(obj) {
				formalAttireScore += parseFloat(obj.total);
			});

			CasualInterviews.find({candidateId: e._id}).forEach(function(obj) {
				casualInterviewScore += parseFloat(obj.total);
			});

			productionNumberScore *= parseFloat(.2);
			festivalAttireScore *= parseFloat(.2);
			menInShortsScore *= parseFloat(.2);
			formalAttireScore *= parseFloat(.2);
			casualInterviewScore *= parseFloat(.2);

			productionNumberScore = productionNumberScore.toFixed(2);
			festivalAttireScore = festivalAttireScore.toFixed(2);
			menInShortsScore = menInShortsScore.toFixed(2);
			formalAttireScore = formalAttireScore.toFixed(2);
			casualInterviewScore = casualInterviewScore.toFixed(2);

			var total = parseFloat(productionNumberScore) + parseFloat(festivalAttireScore) + parseFloat(menInShortsScore) + parseFloat(formalAttireScore) + parseFloat(casualInterviewScore);

			Candidates.update(e._id, {
				$set: {
					score: total
				}
			});

		});
	}
});
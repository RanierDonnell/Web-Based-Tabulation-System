ProductionNumbers = new Mongo.Collection('productionNumbers');

ProductionNumbers.allow({
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
	addProductionNumberScore: function(doc) {

		check(doc.candidateId, String);
		check(doc.eventId, String);
		check(doc.judgeId, String);
		check(doc.criteria1, String);
		check(doc.criteria2, String);

		ProductionNumbers.update({
			candidateId: doc.candidateId,
			eventId: doc.eventId,
			judgeId: doc.judgeId
		}, doc, {
			upsert: true
		});
	}
});
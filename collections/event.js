Events = new Mongo.Collection('events');

Events.allow({
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
	addEvent: function(doc) {
		check(doc.name, String);

		return Events.insert(doc);
	},
	editEvent: function(doc) {
		var nonEmptyString = Match.Where(function(x) {
			check(x, String);
			return x.length > 0;
		});

		check(doc._id, nonEmptyString);
		check(doc.name, String);

		return Events.update(doc._id, {
			$set: {
				name: doc.name
			}
		});
	},
	deleteEvent: function(doc) {
		return Events.remove(doc._id);
	},
	activate: function(doc) {
		check(doc._id, String);

		Events.update({activate: 1}, {
			$set: {
				activate: 0
			}
		}, {
			multi: true
		});

		return Events.update(doc._id, {
			$set: {
				activate: 1
			}
		});
	},
	deactivateAll: function() {
		return Events.update({}, {
			$set: {
				activate: 0
			}
		}, {
			multi: true
		});
	}
});
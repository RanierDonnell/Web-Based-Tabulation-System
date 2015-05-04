Template.bestInMenInShorts.onCreated(function() {
	this.subscribe('menInShorts');
	this.subscribe('judges');
});

Template.bestInMenInShorts.helpers({
	best: function() {
		var menInShorts = [];

		MenInShorts.find().forEach(function(e) {
			var total = parseFloat(e.total);

			if(menInShorts.length == 0) {
				menInShorts.push({
					candidateId: e.candidateId,
					criteria1: e.criteria1,
					criteria2: e.criteria2,
					total: total.toFixed(2)
				});
			}
			else {
				var found = false;
				for(var i = 0; i < menInShorts.length; i++) {
					if(menInShorts[i].candidateId == e.candidateId) {
						menInShorts[i].criteria1 = parseFloat(menInShorts[i].criteria1) + parseFloat(e.criteria1);
						menInShorts[i].criteria2 = parseFloat(menInShorts[i].criteria2) + parseFloat(e.criteria2);
						menInShorts[i].total = (parseFloat(menInShorts[i].total) + parseFloat(total)).toFixed(2);
						found = true;
						break;
					}
				}

				if(!found) {
					menInShorts.push({
						candidateId: e.candidateId,
						criteria1: e.criteria1,
						criteria2: e.criteria2,
						total: total.toFixed(2)
					});
				}
			}
		});
		
		var sortedMenInShorts = _.sortBy(menInShorts, function(obj) {
			return parseFloat(obj.total);
		}).reverse();

		return _.first(sortedMenInShorts);
	},
	candidate: function(id) {
		var candidate = Candidates.findOne({_id: id});
		return candidate.number + '. ' + candidate.fname + ' ' + candidate.lname;
	},
	average: function(score) {
		var ave = 0;
		var judgeCount = Meteor.users.find({'profile.deleted': 0, 'profile.roles': {$in: ['judge']}}).count();
		ave = parseFloat(score) / parseFloat(judgeCount);
		return ave.toFixed(2);
	}
});
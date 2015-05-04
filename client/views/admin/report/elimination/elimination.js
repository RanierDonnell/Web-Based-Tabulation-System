Template.eliminationReport.onCreated(function() {
	this.subscribe('productionNumbers');
	this.subscribe('festivalAttires');
	this.subscribe('menInShorts');
	this.subscribe('formalAttires');
	this.subscribe('casualInterviews');
});

Template.eliminationReport.helpers({
	candidates: function() {
		var candidate = [];
		Candidates.find().forEach(function(e) {
			var productionNumber = 0;
			ProductionNumbers.find({candidateId: e._id}).forEach(function(e) {
				productionNumber = productionNumber + parseFloat(e.total);
			});

			var festivalAttire = 0;
			FestivalAttires.find({candidateId: e._id}).forEach(function(e) {
				festivalAttire = festivalAttire + parseFloat(e.total);
			});

			var menInShorts = 0;
			MenInShorts.find({candidateId: e._id}).forEach(function(e) {
				menInShorts = menInShorts + parseFloat(e.total);
			});

			var formalAttire = 0;
			FormalAttires.find({candidateId: e._id}).forEach(function(e) {
				formalAttire = formalAttire + parseFloat(e.total);
			});

			var casualInterview = 0;
			CasualInterviews.find({candidateId: e._id}).forEach(function(e) {
				casualInterview = casualInterview + parseFloat(e.total);
			});

			productionNumber = typeof productionNumber != 'undefined' ? productionNumber : '';
			festivalAttire = typeof festivalAttire != 'undefined' ? festivalAttire : '';
			menInShorts = typeof menInShorts != 'undefined' ? menInShorts : '';
			formalAttire = typeof formalAttire != 'undefined' ? formalAttire : '';
			casualInterview = typeof casualInterview != 'undefined' ? casualInterview : '';

			var prod = productionNumber != '' ? parseFloat(productionNumber) : 0;
			var fest = festivalAttire != '' ? parseFloat(festivalAttire) : 0;
			var men = menInShorts != '' ? parseFloat(menInShorts) : 0;
			var formal = formalAttire != '' ? parseFloat(formalAttire) : 0;
			var casual = casualInterview != '' ? parseFloat(casualInterview) : 0;

			var total = prod + fest + men + formal + casual;

			productionNumber = productionNumber != '' ? parseFloat(productionNumber).toFixed(2) : '';
			festivalAttire = festivalAttire != '' ? parseFloat(festivalAttire).toFixed(2) : '';
			menInShorts = menInShorts != '' ? parseFloat(menInShorts).toFixed(2) : '';
			formalAttire = formalAttire != '' ? parseFloat(formalAttire).toFixed(2) : '';
			casualInterview = casualInterview != '' ? parseFloat(casualInterview).toFixed(2) : '';

			candidate.push({
				number: e.number,
				name: e.fname + ' ' + e.mname + ' ' + e.lname,
				productionNumber: productionNumber,
				festivalAttire: festivalAttire,
				menInShorts: menInShorts,
				formalAttire: formalAttire,
				casualInterview: casualInterview,
				total: parseFloat(total).toFixed(2)
			});

		});
		
		return candidate;
	}
});
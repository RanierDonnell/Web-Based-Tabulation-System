Template.eliminationReport.onCreated(function() {
	this.subscribe('talents');
	this.subscribe('swimwears');
	this.subscribe('gowns');
	this.subscribe('interviews');
});

Template.eliminationReport.helpers({
	candidates: function() {
		var candidate = [];
		Candidates.find().forEach(function(e) {
			var talent = 0;
			Talents.find({candidateId: e._id}).forEach(function(e) {
				talent = talent + parseFloat(e.total);
			});

			var swimwear = 0;
			Swimwears.find({candidateId: e._id}).forEach(function(e) {
				swimwear = swimwear + parseFloat(e.total);
			});

			var gown = 0;
			Gowns.find({candidateId: e._id}).forEach(function(e) {
				gown = gown + parseFloat(e.total);
			});

			var interview = 0;
			Interviews.find({candidateId: e._id}).forEach(function(e) {
				interview = interview + parseFloat(e.total);
			});

			talent = typeof talent != 'undefined' ? talent : '';
			swimwear = typeof swimwear != 'undefined' ? swimwear : '';
			gown = typeof gown != 'undefined' ? gown : '';
			interview = typeof interview != 'undefined' ? interview : '';

			var t = talent != '' ? parseFloat(talent) : 0;
			var s = swimwear != '' ? parseFloat(swimwear) : 0;
			var g = gown != '' ? parseFloat(gown) : 0;
			var i = interview != '' ? parseFloat(interview) : 0;

			var total = t + s + g + i;

			talent = talent != '' ? parseFloat(talent).toFixed(2) : '';
			swimwear = swimwear != '' ? parseFloat(swimwear).toFixed(2) : '';
			gown = gown != '' ? parseFloat(gown).toFixed(2) : '';
			interview = interview != '' ? parseFloat(interview).toFixed(2) : '';

			candidate.push({
				number: e.number,
				name: e.fname + ' ' + e.mname + ' ' + e.lname,
				talent: talent,
				swimwear: swimwear,
				gown: gown,
				interview: interview,
				total: parseFloat(total).toFixed(2)
			});

		});
		
		return candidate;
	}
});
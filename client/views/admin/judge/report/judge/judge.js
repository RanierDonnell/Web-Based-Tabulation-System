Template.judgeTable.onCreated(function() {
	this.subscribe('talents');
	this.subscribe('swimwears');
	this.subscribe('gowns');
	this.subscribe('interviews');
});

Template.judgeTable.helpers({
	candidates: function() {
		var candidate = [];
		Candidates.find().forEach(function(e) {
			var talent = Talents.findOne({candidateId: e._id, judgeId: Session.get('selectedJudgeId')});
			var swimwear = Swimwears.findOne({candidateId: e._id, judgeId: Session.get('selectedJudgeId')});
			var gown = Gowns.findOne({candidateId: e._id, judgeId: Session.get('selectedJudgeId')});
			var interview = Interviews.findOne({candidateId: e._id, judgeId: Session.get('selectedJudgeId')});

			talent = typeof talent != 'undefined' ? talent.total : '';
			swimwear = typeof swimwear != 'undefined' ? swimwear.total : '';
			gown = typeof gown != 'undefined' ? gown.total : '';
			interview = typeof interview != 'undefined' ? interview.total : '';

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
		
		return _.sortBy(candidate, function(obj) {
			return obj.total;
		}).reverse();
	}
});
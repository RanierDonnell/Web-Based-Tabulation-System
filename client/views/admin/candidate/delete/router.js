Router.route('/candidate/:_id/delete', {
	name: 'deleteCandidate',
	template: 'deleteCandidate',
	title: 'Delete Candidate',
	layoutTemplate: 'adminLayout'
});
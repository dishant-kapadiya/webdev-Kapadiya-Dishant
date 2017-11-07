module.exports = function (app) {
	require('./model/models.server');
	require('./services/user.service.server')(app);
	require('./services/website.service.server')(app);
};

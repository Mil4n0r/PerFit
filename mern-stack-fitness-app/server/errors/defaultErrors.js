const logErrors = (err, req, res, next) => {
	console.error(err)
	next(err);
}

const errorHandler = (err, req, res, next) => {
	return res.status(500).send(err.message);
}

exports.logErrors = logErrors;
exports.errorHandler = errorHandler;
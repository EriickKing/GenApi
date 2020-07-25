function ValidateJoi(req, res, validate) {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({
    success: false,
    message: error.details[0].message
  });
}

exports.ValidateJoi = ValidateJoi;
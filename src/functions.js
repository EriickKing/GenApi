var fs = require('fs');

function content(dir) {
  return fs.readFileSync(dir, 'utf8')
}

async function Save(res, model) {
  const saved = await model.save();
  if (saved) return res.status(200).json({
    success: true,
    message: "Saved"
  });
}


exports.content = content;
exports.Save = Save;
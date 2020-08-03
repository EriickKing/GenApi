function modelExample(req, res) {


  var json = {};
  for (let index = 0; index < req.body.keyModel.length; index++) {
    for (let o = 0; o < req.body.typeModel.length; o++) {
      // console.log(req.body.typeModel[o].type)
      json[req.body.keyModel[index]] = req.body.typeModel[o]
    }    
  }
  // console.log(JSON.stringify(json));
  // const schema = new Schema(json);
  return json;
}

exports.modelExample = modelExample;
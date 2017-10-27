const model = require('./models/Sake');
const SakeModel = model.Sake;
const SakeTypeModel = model.SakeType;
const TemperatureModel = model.Temperature;

const kuheiji = new SakeModel({
  brand: '醸し人九平次',
  type: 9,
  impressions: [
    { temperature: 7, impression: 'めちゃうま' },
    { temperature: 10, impression: '激うま' }
  ]
});

kuheiji.save((err) => {
  if (err) throw err;
});

SakeModel.find({}, (err, sake) => {
  if (err) throw err;
  console.log(sake);
});

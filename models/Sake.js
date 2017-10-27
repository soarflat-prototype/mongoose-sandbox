const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// スキーマ
const SakeType = new Schema({
  _id: Number,
  type: String
});

const Temperature = new Schema({
  _id: Number,
  temperature: String
});

const Sake = new Schema({
  brand: String,
  type: {
    type: Number,
    ref: 'SakeType'
  },
  impressions: [
    {
      temperature: {
        type: Number,
        ref: 'Temperature'
      },
      impression: String
    }
  ]
});

// MongoDBへの接続
mongoose.connect('mongodb://localhost/sake');

// スキーマからモデルをコンパイルし、エクスポートする
exports.Temperature = mongoose.model('Temperature', Temperature);
exports.SakeType = mongoose.model('SakeType', SakeType);
exports.Sake = mongoose.model('Sake', Sake);

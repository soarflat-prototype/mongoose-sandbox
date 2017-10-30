const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actressSchema = Schema({
  // SchemaTypesを指定する
  // 種類は以下の通り
  // String
  // Number
  // Boolean | Bool
  // Array
  // Buffer
  // Date
  // ObjectId | Oid
  // Mixed
  // 今回はObjectIdを指定する
  // ObjectIdとはMongoDBがコレクションのプライマリキー（_id）
  // として生成できるユニークな12バイトの識別子のこと
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    index: true,
    unique: true
  },
  age: Number,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const productSchema = Schema({
  actress: {
    type: Schema.Types.ObjectId,
    ref: 'Actress'
  },
  title: {
    type: String,
    index: true,
    unique: true
  },
  fans: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Actress'
    }
  ]
});

// スキーマからモデルをコンパイルし、エクスポートする
exports.Product = mongoose.model('Product', productSchema);
exports.Actress = mongoose.model('Actress', actressSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
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
  name: String,
  // name: {
  //   type: String,
  //   index: true,
  //   unique: true
  // },
  age: Number,
  stories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Story'
    }
  ]
});

const storySchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  title: String,
  fans: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    }
  ]
});

// スキーマからモデルをコンパイルし、エクスポートする
exports.Story = mongoose.model('Story', storySchema);
exports.Person = mongoose.model('Person', personSchema);

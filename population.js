const mongoose = require('mongoose');
const model = require('./models/Population');
const Actress = model.Actress;
const Product = model.Product;

// MongoDBへの接続
mongoose.connect('mongodb://localhost/population');

Actress.remove({}, (err) => {
  if (err) throw err;
  console.log('remove all Actress');
});

Product.remove({}, (err) => {
  if (err) throw err;
  console.log('remove all Product');
});

const actress = new Actress({
  _id: new mongoose.Types.ObjectId,
  name: '梶谷ひまり',
  age: 27,
});

actress.save((err, actress) => {
  if (err) throw err;

  // actressプロパティにpersonドキュメントへの参照を保存する
  const product = new Product({
    title: '可愛すぎる新人保母さん3人目 梶谷ひまり',
    // 今回は保存したactressの_idを割当てる
    // productは以下のドキュメントを参照できる
    // new Actress({
    //   _id: new mongoose.Types.ObjectId,
    //   name: '梶谷ひまり',
    //   age: 27,
    // });
    actress: actress._id
  });

  product.save((err, product) => {
    if (err) throw err;

    actress.products.push(product);
    actress.save((err) => {
      if (err) throw err;
      Actress
        .find({}, (err, actress) => {
          if (err) throw err;
          console.log(actress);
        });

      Product
        .find({}, (err, product) => {
          if (err) throw err;
          console.log(product);
        });
    });

    Product
      .findOne({ title: '可愛すぎる新人保母さん3人目 梶谷ひまり' })
      .populate('actress')
      .exec((err, product) => {
        if (err) throw err;
        console.log(product.actress.name);
        console.log(product.actress.age);
      });

    Actress
      .findOne({ name: '梶谷ひまり' })
      .populate('products')
      .exec((err, actress) => {
        if (err) throw err;
        console.log(actress.products[0]);
      });
  });
});
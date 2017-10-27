const mongoose = require('mongoose');
const model = require('./models/Population');
const Person = model.Person;
const Story = model.Story;

// MongoDBへの接続
mongoose.connect('mongodb://localhost/population');

// populate()を利用すれば、他のコレクションのドキュメントを参照できる
const author = new Person({
  _id: new mongoose.Types.ObjectId,
  name: 'Jhon Fleming',
  age: 50,
  stories: []
});

author.save((err) => {
  if (err) throw err;

  // authorプロパティにpersonドキュメントへの参照を保存する
  const story1 = new Story({
    title: 'Casino Royale',
    // 今回は保存したpersonの_idを割当てる
    // story1は以下のドキュメントを参照できる
    // new Person({
    //  _id: new mongoose.Types.ObjectId,
    //  name: 'Ian Fleming',
    //  age: 50
    // });
    author: author._id
  });

  // const story2 = new Story({
  //   title: 'Doraemon',
  //   // 今回は保存したpersonの_idを割当てる
  //   // story1は以下のドキュメントを参照できる
  //   // new Person({
  //   //  _id: new mongoose.Types.ObjectId,
  //   //  name: 'Ian Fleming',
  //   //  age: 50
  //   // });
  //   author: author._id
  // });

  story1.save((err) => {
    if (err) throw err;
    console.log('thats it!');

    author.stories.push(story1);
    author.save((err) => {
      if (err) throw err;
      console.log('thats it!');
    });
  });

  // story2.save((err) => {
  //   if (err) throw err;
  //   console.log('thats it!');
  //
  //   author.stories.push(story2);
  //   author.save((err) => {
  //     if (err) throw err;
  //     console.log('thats it!');
  //   });
  // });
});

// Story
//   .find({}, (err, story) => {
//     if (err) throw err;
//     console.log(story);
//     // console.log('The author is %s', story.author.name);
//     // console.log('The author age is %s', story.author.age);
//   });

// Person
//   .findOne({ name: 'Ian Fleming' }, (err, person) => {
//     if (err) throw err;
//     console.log(stories);
//     // console.log('The author is %s', story.author.name);
//     // console.log('The author age is %s', story.author.age);
//   });

// Story
//   .findOne({ title: 'Casino Royale' })
//   .populate('author')
//   .exec((err, story) => {
//     if (err) throw err;
//     console.log(story.author.name);
//   });
// //
// Person.findOne({ name: 'Ian Fleming' })
//   .populate('stories')
//   .exec((err, person) => {
//     if (err) throw err;
//     console.log(person.stories);
//   });
//
// Person.remove({ name: 'Ian Fleming' }, (err, person) => {
//   console.log(person);
// });

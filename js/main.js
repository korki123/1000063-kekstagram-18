'use strict';

var NUMBER_OF_PHOTOS = 25;
var DESCRIPTIONS = ['descriptions1', 'descriptions2', 'descriptions3', 'descriptions4', 'descriptions5', 'descriptions6', 'descriptions7'];
var COMMENTS_USER = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NAMES_USER = ['Азарий', 'Смарагд', 'Терентий', 'Руслан', 'Козьма', 'Доримедонт', 'Ростислав', 'Амвросий', 'Леонтий', 'Харисий', 'Кондрат', 'Иларий', 'Зинон', 'Илиодор', 'Урван', 'Иероним', 'Касьян', 'Иларий', 'Авраам', 'Автоном', 'Макарий', 'Евстахий', 'Феодор', 'Максимилиан', 'Гервасий', 'Сатир', 'Анастасий', 'Милослав', 'Юлий', 'Борислав'];

var PICTURES = document.querySelector('.pictures');
var PICTURE = document.querySelector('#picture').content.querySelector('.picture');

// var comments = COMMENTS_USER;
// var names = NAMES_USER;

var getPhotosList = function () {
  var photos = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    photos.push('photos/' + (i + 1) + '.jpg');
  }
  return photos;
};

var RANGE_NAME_PHOTOS = getPhotosList();

var getRandomUniqueItem = function (arg) {
  var UniqueItem = Math.floor(Math.random() * arg.length);
  return arg.splice(UniqueItem, 1);
};

var getGenerateNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomizeItem = function (arg) {
  var randNames = Math.floor(Math.random() * arg.length);
  return arg[randNames];
};

var getMessage = function () {
  for (var i = 0; i < 3; i++) {
    var oneOrTwo = getGenerateNumber(1, 2);
    var messages = [];
    var messageItem = oneOrTwo < 1 ? randomizeItem(COMMENTS_USER) + randomizeItem(COMMENTS_USER) : randomizeItem(COMMENTS_USER);
    messages[i] = messageItem;
  }
  return messages;
};
console.log('послания ' +  getMessage());

var getGenerateAvatar = function () {
  var oneOfSix = getGenerateNumber(1, 6);
  var avatar = 'img/avatar-' + oneOfSix + '.svg'
  return avatar;
};
console.log('аватар ' +  getGenerateAvatar());

var getReview = function () {

  var reviews = [];

  reviews.push({
    avatar: getGenerateAvatar(),
    message: getMessage(),
    name: randomizeItem(NAMES_USER),
  });
  return reviews;
};
console.log('сборка ' +  getReview());



var collectItemsPhoto = function () {

  var photoDescription = [];

  for (var j = 0; j < NUMBER_OF_PHOTOS; j++) {

    photoDescription.push({
      photo: getRandomUniqueItem(RANGE_NAME_PHOTOS),
      description: randomizeItem(DESCRIPTIONS),
      // comments: randomizeItem(COMMENTS_USER) + randomizeItem(COMMENTS_USER),
      like: getGenerateNumber(15, 200),
    });
  }
  return photoDescription;
};

var collectPhotoCard = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {

    var photoComplite = PICTURE.cloneNode(true);
    var preparePhoto = collectItemsPhoto([i]);

    photoComplite.querySelector('.picture__comments').textContent = preparePhoto[i].comments;
    photoComplite.querySelector('.picture__likes').textContent = preparePhoto[i].like;
    photoComplite.querySelector('.picture__img').name = preparePhoto[i].getRandomUniqueItem;

    fragment.appendChild(photoComplite);
  }
  PICTURES.appendChild(fragment);
};

collectPhotoCard();

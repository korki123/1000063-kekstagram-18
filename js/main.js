'use strict';

var NUMBER_OF_PHOTOS = 25;
// var DESCRIPTIONS = ['descriptions1', 'descriptions2', 'descriptions3', 'descriptions4', 'descriptions5', 'descriptions6', 'descriptions7'];
var COMMENTS_USER = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NAMES_AUTHOR = ['Азарий', 'Смарагд', 'Терентий', 'Руслан', 'Козьма', 'Доримедонт', 'Ростислав', 'Амвросий', 'Леонтий', 'Харисий', 'Кондрат', 'Иларий', 'Зинон', 'Илиодор', 'Урван', 'Иероним', 'Касьян', 'Иларий', 'Авраам', 'Автоном', 'Макарий', 'Евстахий', 'Феодор', 'Максимилиан', 'Гервасий', 'Сатир', 'Анастасий', 'Милослав', 'Юлий', 'Борислав'];

var PICTURES = document.querySelector('.pictures');
var PICTURE = document.querySelector('#picture').content.querySelector('.picture');
var BIG_PICTURE = document.querySelector('.big-picture');


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

var oneOrTwo = getGenerateNumber(1, 2);

var getMessage = function () {
  for (var i = 0; i < 3; i++) {
    var messages = [];
    var messageItem = oneOrTwo > 1 ? randomizeItem(COMMENTS_USER) + randomizeItem(COMMENTS_USER) : randomizeItem(COMMENTS_USER);
    messages[i] = messageItem;
  }
  return messages;
};

var getGenerateAvatar = function () {
  var oneOfSix = getGenerateNumber(1, 6);
  var avatar = 'img/avatar-' + oneOfSix + '.svg';
  return avatar;
};

var getComments = function () {
  var comments = [];
  // for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    comments.push({
      avatar: getGenerateAvatar(),
      message: getMessage(),
      name: randomizeItem(NAMES_AUTHOR),
    });
  // }
  return comments;
};

// var REVIEW = getReview();

var collectItemsPhoto = function () {
  var photoItem = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    photoItem.push({
      photo: getRandomUniqueItem(RANGE_NAME_PHOTOS),
      // description: randomizeItem(DESCRIPTIONS),
      like: getGenerateNumber(15, 200),
      comments: getComments(),
    });
  }
  return photoItem;
};

var COLLECT_ALL_ITEMS = collectItemsPhoto();

var collectPhotoCard = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {

    var photoComplite = PICTURE.cloneNode(true);
    // photoComplite.querySelector('.picture__comments').textContent = COLLECT_ALL_ITEMS[i].message;
    photoComplite.querySelector('.picture__comments').textContent = COLLECT_ALL_ITEMS[i].comments;
    photoComplite.querySelector('.picture__likes').textContent = COLLECT_ALL_ITEMS[i].like;
    photoComplite.querySelector('.picture__img').src = COLLECT_ALL_ITEMS[i].photo;

    fragment.appendChild(photoComplite);
  }
  PICTURES.appendChild(fragment);
};

collectPhotoCard();
// ======================================== большие фото ========================================

for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {

  var photoCompliteBigPicture = BIG_PICTURE;
  photoCompliteBigPicture.querySelector('img').src = COLLECT_ALL_ITEMS[i].photo;
  photoCompliteBigPicture.querySelector('.likes-count').textContent = COLLECT_ALL_ITEMS[i].like;
  photoCompliteBigPicture.querySelector('.comments-count').textContent = COLLECT_ALL_ITEMS[i].comments;

}

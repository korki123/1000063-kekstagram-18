'use strict';

var NUMBER_OF_PHOTOS = 25;
// var DESCRIPTIONS = ['descriptions1', 'descriptions2', 'descriptions3', 'descriptions4', 'descriptions5', 'descriptions6', 'descriptions7'];
var MESSAGE_USER = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NAMES_AUTHOR = ['Азарий', 'Смарагд', 'Терентий', 'Руслан', 'Козьма', 'Доримедонт', 'Ростислав', 'Амвросий', 'Леонтий', 'Харисий', 'Кондрат', 'Иларий', 'Зинон', 'Илиодор', 'Урван', 'Иероним', 'Касьян', 'Иларий', 'Авраам', 'Автоном', 'Макарий', 'Евстахий', 'Феодор', 'Максимилиан', 'Гервасий', 'Сатир', 'Анастасий', 'Милослав', 'Юлий', 'Борислав'];

var PICTURES = document.querySelector('.pictures');
var PICTURE = document.querySelector('#picture').content.querySelector('.picture');
// var BIG_PICTURE = document.querySelector('.big-picture');


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

var getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomizeItem = function (arg) {
  var getGenerateNumber = getRandomBetween(0, arg.length);
  return arg[getGenerateNumber];
};

// комментарии
var getPhotoComments = function () {
  var oneOrTwo = getRandomBetween(1, 2);
  // var commentsCount = getRandomBetween(1, 6);
  // var messages = [];
  // for (var i = 0; i < commentsCount; i++) {
    var messageItem = oneOrTwo > 1 ? randomizeItem(MESSAGE_USER) + randomizeItem(MESSAGE_USER) : randomizeItem(MESSAGE_USER);
    // messages[i] = messageItem;
  // }
  return messageItem;
};

// аватарки
var getGenerateAvatar = function () {
  var oneOfSix = getRandomBetween(1, 6);
  var avatar = 'img/avatar-' + oneOfSix + '.svg';
  return avatar;
};

// комментарии, аватаки и имена
var getComments = function () {
  var comments = [];
  var commentsCount = getRandomBetween(1, 6);
  for (var i = 0; i < commentsCount; i++) {
    comments.push({
      avatar: getGenerateAvatar(),
      message: getPhotoComments(),
      name: randomizeItem(NAMES_AUTHOR),
    });
  }
  return comments;
};

// все собрано в кучу фотографии, лайки, комменты и т.д.

var collectItemsPhoto = function () {
  var photoItem = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    photoItem.push({
      photo: getRandomUniqueItem(RANGE_NAME_PHOTOS),
      like: getRandomBetween(15, 200),
      comments: getComments(),
    });
  }
  return photoItem;
};

// console.log(collectItemsPhoto());

var COLLECT_ALL_ITEMS = collectItemsPhoto();

var collectPhotoCard = function () {
  var fragment = document.createDocumentFragment();

  COLLECT_ALL_ITEMS.forEach(function (item) {
    var photoComplite = PICTURE.cloneNode(true);
    photoComplite.querySelector('.picture__comments').textContent = item.comments.length;
    photoComplite.querySelector('.picture__likes').textContent = item.like;
    photoComplite.querySelector('.picture__img').src = item.photo;

    fragment.appendChild(photoComplite);
  });

  PICTURES.appendChild(fragment);
};

collectPhotoCard();

// ======================================== большие фото ========================================

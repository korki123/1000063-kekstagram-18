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
var getCommentMessage = function () {
  var messageItem = getRandomBetween(1, 2) > 1 ? randomizeItem(MESSAGE_USER) + randomizeItem(MESSAGE_USER) : randomizeItem(MESSAGE_USER);
  return messageItem;
};

// аватарки
var getGenerateAvatar = function () {
  var avatar = 'img/avatar-' + getRandomBetween(1, 6) + '.svg';
  return avatar;
};

// комментарии, аватаки и имена
// var randomComments = getRandomBetween(1, 6);

var getComments = function () {
  var comments = [];
  for (var i = 0; i < getRandomBetween(1, 6); i++) {
    comments.push({
      avatar: getGenerateAvatar() ,
      message: getCommentMessage(),
      name: randomizeItem(NAMES_AUTHOR),
    });
  }
  return comments;
};

console.log(getComments());

var rangeNamePhotos = RANGE_NAME_PHOTOS;

// все собрано в кучу фотографии, лайки, комменты и т.д.

var getPhotosData = function () {
  var photoItem = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    photoItem.push({
      photo: getRandomUniqueItem(rangeNamePhotos),
      like: getRandomBetween(15, 200),
      comments: getComments(),
    });
  }
  return photoItem;
};

// console.log(collectItemsPhoto());

var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  var COLLECT_ALL_ITEMS = getPhotosData();

  COLLECT_ALL_ITEMS.forEach(function (item) {
    var photoComplite = PICTURE.cloneNode(true);
    photoComplite.querySelector('.picture__comments').textContent = item.comments.length;
    photoComplite.querySelector('.picture__likes').textContent = item.like;
    photoComplite.querySelector('.picture__img').src = item.photo;

    fragment.appendChild(photoComplite);
  });

  PICTURES.appendChild(fragment);
};

renderPictures();

// ======================================== большие фото ========================================

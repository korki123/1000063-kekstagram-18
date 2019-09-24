'use strict';

var NUMBER_OF_PHOTOS = 25;
var DESCRIPTIONS = ['descriptions1', 'descriptions2', 'descriptions3', 'descriptions4', 'descriptions5', 'descriptions6', 'descriptions7'];
var COMMENTS_USER = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NAMES_AUTHOR = ['Азарий', 'Смарагд', 'Терентий', 'Руслан', 'Козьма', 'Доримедонт', 'Ростислав', 'Амвросий', 'Леонтий', 'Харисий', 'Кондрат', 'Иларий', 'Зинон', 'Илиодор', 'Урван', 'Иероним', 'Касьян', 'Иларий', 'Авраам', 'Автоном', 'Макарий', 'Евстахий', 'Феодор', 'Максимилиан', 'Гервасий', 'Сатир', 'Анастасий', 'Милослав', 'Юлий', 'Борислав'];

var PICTURES = document.querySelector('.pictures');
var PICTURE = document.querySelector('#picture').content.querySelector('.picture');

// получаем список из последовательно пронумерванных фото
var getPhotosList = function () {
  var photos = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    photos.push('photos/' + (i + 1) + '.jpg');
  }
  return photos;
};

console.log('пронумерванные фото ' + getPhotosList());
var RANGE_NAME_PHOTOS = getPhotosList();

// уникальный случайный номер
var getRandomUniqueItem = function (arg) {
  var UniqueItem = Math.floor(Math.random() * arg.length);
  return arg.splice(UniqueItem, 1);
};

// случайное число из диапазона
var getGenerateNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


// случайный номер, может повторяться
var randomizeItem = function (arg) {
  var randNames = Math.floor(Math.random() * arg.length);
  return arg[randNames];
};


// собираем 3 случайных сообщения для одной фотографии
var oneOrTwo = getGenerateNumber(1, 2);
var getMessage = function () {
  for (var i = 0; i < 3; i++) {
    console.log(oneOrTwo);
    var messages = [];
    var messageItem = oneOrTwo > 1 ? randomizeItem(COMMENTS_USER) + randomizeItem(COMMENTS_USER) : randomizeItem(COMMENTS_USER);
    messages[i] = messageItem;
  }
  return messages;
};
console.log('случайные сообщения ' + getMessage());

// случайный выбор аватарки
var getGenerateAvatar = function () {
  var oneOfSix = getGenerateNumber(1, 6);
  var avatar = 'img/avatar-' + oneOfSix + '.svg'
  return avatar;
};
console.log('аватар ' + getGenerateAvatar());

// попытка собрать массив комментариев из объектов (случайного сообщения, аватарки и имени)
var getReview = function () {

  var comments = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    comments.push({
      avatar: getGenerateAvatar(),
      message: getMessage(),
      name: randomizeItem(NAMES_AUTHOR),
    });
  }
  return comments;
};
var review = getReview().slice();


console.log('сборка не собирается ',  getReview());

console.log('случайное фото ', getRandomUniqueItem(RANGE_NAME_PHOTOS));

// сборка второго массива из случайного фото, описания, и лайков

var collectItemsPhoto = function () {

  var photoItem = [];

  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {

    photoItem.push({
      photo: getRandomUniqueItem(RANGE_NAME_PHOTOS),
      // description: randomizeItem(DESCRIPTIONS),
      like: getGenerateNumber(15, 200),
    });
  }
  return photoItem;
};

var preparePhoto = collectItemsPhoto().slice();

// console.log('фото, описание и лайки ' , collectItemsPhoto());
// console.log('фото ' , getRandomUniqueItem(RANGE_NAME_PHOTOS));
//
// console.log('передал в ' , preparePhoto);

// надо собрать все вместе. Сообщения, аватарки, имена, фото, описания, лайки

var collectPhotoCard = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {

    var photoComplite = PICTURE.cloneNode(true);

    photoComplite.querySelector('.picture__comments').textContent = review[i];
    photoComplite.querySelector('.picture__likes').textContent = preparePhoto[i].like;
    photoComplite.querySelector('.picture__img').src = preparePhoto[i].photo;

    fragment.appendChild(photoComplite);
  }
  PICTURES.appendChild(fragment);
};

collectPhotoCard();

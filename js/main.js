'use strict';

var NUMBER_OF_PHOTOS = 25;
var MESSAGE_USER = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NAMES_AUTHOR = ['Азарий', 'Смарагд', 'Терентий', 'Руслан', 'Козьма', 'Доримедонт', 'Ростислав', 'Амвросий', 'Леонтий', 'Харисий', 'Кондрат', 'Иларий', 'Зинон', 'Илиодор', 'Урван', 'Иероним', 'Касьян', 'Иларий', 'Авраам', 'Автоном', 'Макарий', 'Евстахий', 'Феодор', 'Максимилиан', 'Гервасий', 'Сатир', 'Анастасий', 'Милослав', 'Юлий', 'Борислав'];

var PICTURES = document.querySelector('.pictures');
var PICTURE = document.querySelector('#picture').content.querySelector('.picture');

var getPhotosList = function () {
  var photos = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    photos.push('photos/' + (i + 1) + '.jpg');
  }
  return photos;
};

var RANGE_NAME_PHOTOS = getPhotosList();

var getRandomUniqueItem = function (arg) {
  var UniqueItem = getRandomBetween(0, (arg.length - 1));

  return arg.splice(UniqueItem, 1);
};

var getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomizeItem = function (arg) {
  return getRandomBetween(0, arg.length);
};

var getCommentMessage = function () {
  return randomizeItem(MESSAGE_USER) + (getRandomBetween(1, 2) > 1 ? randomizeItem(MESSAGE_USER) : '');
};

var getGenerateAvatar = function () {
  return 'img/avatar-' + getRandomBetween(1, 6) + '.svg';
};

var getComments = function (randomComments) {
  var comments = [];
  for (var i = 0; i < randomComments; i++) {
    comments.push({
      avatar: getGenerateAvatar(),
      message: getCommentMessage(),
      name: randomizeItem(NAMES_AUTHOR),
    });
  }
  return comments;
};

var getPhotosData = function () {
  var rangeNamePhotos = RANGE_NAME_PHOTOS.slice();
  var photoItem = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    photoItem.push({
      photo: getRandomUniqueItem(rangeNamePhotos),
      like: getRandomBetween(15, 200),
      comments: getComments(getRandomBetween(1, 6)),
    });
  }
  return photoItem;
};

var renderPictures = function (pictures) {
  var fragment = document.createDocumentFragment();

  pictures.forEach(function (item) {
    var photoComplite = PICTURE.cloneNode(true);
    photoComplite.querySelector('.picture__comments').textContent = item.comments.length;
    photoComplite.querySelector('.picture__likes').textContent = item.like;
    photoComplite.querySelector('.picture__img').src = item.photo;

    fragment.appendChild(photoComplite);
  });

  PICTURES.appendChild(fragment);
};

renderPictures(getPhotosData());

// ========================================  большие фото  ========================================


// ========================================  Загрузка изображения  ========================================

// При клике на .img-upload__cancel добавить .img-upload__overlay класс .hidden
// при keydown 27 добавить .img-upload__overlay hidden

var UPLOAD_FILE = document.querySelector('#upload-file'); // переменная для #upload-file которая ждет change, поиск по document
var IMG_UPLOAD__OVERLAY = document.querySelector('.img-upload__overlay'); //переменная для .img-upload__overlay, которая отвечает за показ окна поиск по document
var closeUploadWindow = document.querySelector('#upload-cancel'); //кнопка закрытия (button)

var keyCode = {
  ESC_KEYCODE: 27,
  ENTER_KEYCODE: 13,
};

// открытие-закрытие кликом

var onOpenLoadWindow = function () {
  IMG_UPLOAD__OVERLAY.classList.remove('hidden');
};

UPLOAD_FILE.addEventListener('change', function () {
  onOpenLoadWindow();
  openEnterKey();
  closedEscKey();
});

var onCloseLoadWindow = function () {
  IMG_UPLOAD__OVERLAY.classList.add('hidden');
  closedEscKey();
};

closeUploadWindow.addEventListener('click', function () {
  onCloseLoadWindow();
});

var closedEscKey = function () {
  document.addEventListener('keydown', onEscClose());
};

var removeEscKey = function () {
  document.removeEventListener('keydown', onEscClose());
};

var openEnterKey = function (evt) {
  if (evt.keyCode === keyCode.ENTER_KEYCODE) {
    onOpenLoadWindow();
  }
};

// события для ESC_KEYCODE

var onEscClose = function (etv) {
  if (etv.keyCode === keyCode.ESC_KEYCODE) {
    onCloseLoadWindow();
  }
};

//передвижение кнопки

// Добавляю строку специально для гита

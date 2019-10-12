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
var IMG_UPLOAD__OVERLAY = document.querySelector('.img-upload__overlay'); // переменная для .img-upload__overlay, которая отвечает за показ окна поиск по document
var UPLOAD_MODAL_X = document.querySelector('#upload-cancel');
var closeUploadWindow = document.querySelector('#upload-cancel'); // кнопка закрытия (button)

var KEY_CODES = {
  ESC: 27,
  ENTER: 13,
};

// открытие-закрытие кликом

var onOpenLoadWindow = function (evt) {
  IMG_UPLOAD__OVERLAY.classList.remove('hidden');
  addEscPressHandler();
};

var onCloseLoadWindow = function (evt) {
  IMG_UPLOAD__OVERLAY.classList.add('hidden');
  removeEscPressHandler();
};

var addEscPressHandler = function () {
  document.addEventListener('keydown', handleEscPress);
};

var removeEscPressHandler = function () {
  document.removeEventListener('keydown', handleEscPress);
};

// события для ESC

var handleEnterPress = function (evt) {
  if (evt.keyCode === KEY_CODES.ENTER_KEYCODE) {
    onOpenLoadWindow(evt);
  }
};

UPLOAD_FILE.addEventListener('change', onOpenLoadWindow);
UPLOAD_MODAL_X.addEventListener('click', onCloseLoadWindow);

var handleEscPress = function (evt) {
  if (evt.keyCode === KEY_CODES.ESC) {
    UPLOAD_FILE.value = null;
    onCloseLoadWindow(evt);
  }
};

// передвижение кнопки

var EFFECT_HANDLE = document.querySelector('.effect-level__pin');

EFFECT_HANDLE.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startPoint = {
    x: evt.clientX,
    y: evt.clientY,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startPoint.x - moveEvt.clientX,
      y: startPoint.y - startPoint.y,
    };

    startPoint = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    var movementX = EFFECT_HANDLE.style.left + shift.x;
    // var movementY = EFFECT_HANDLE.style.left + shift.y;

    EFFECT_HANDLE.style.left = movementX + startPoint.x + 'px';

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

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

//======================================== открытие-закрытие кликом

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

//======================================== события для ESC

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

// ======================================== передвижение кнопки

var EFFECT_HANDLE = document.querySelector('.effect-level__pin');
var EFFECT_LINE = document.querySelector('.effect-level__depth');
var LEVEL_LINE = 453;

EFFECT_HANDLE.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startPoint = EFFECT_LINE.getBoundingClientRect();

  var onMouseMove = function (moveEvt, movement) {
    moveEvt.preventDefault();

    movement = moveEvt.clientX - startPoint.x;

    if (movement < 0) {
      movement = 0;
    } if (movement > LEVEL_LINE) {
      movement = LEVEL_LINE;
    }

    EFFECT_HANDLE.style.left = movement + 'px';
    EFFECT_LINE.style.width = movement + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// ======================================== хештеги

var HASHTAG = IMG_UPLOAD__OVERLAY.querySelector('.text__hashtags');
HASHTAG.addEventListener('change', onTagMassageInput);

var HASHTAG_LENGTH = 20;
var HASHTAG_NUMBER = 5;

var hashtagText = HASHTAG.value;
hashtags = hashtagText.toLowerCase().split('');

var hashtags = [];

var onTagMassageInput = function (number, arr) {
  if (arr.length > number) {
    HASHTAG.setCustomValidity = 'нельзя указать больше пяти хэш-тегов';
  }
  return false;
};

var isUnique = function (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        HASHTAG.setCustomValidity = 'один и тот же хэш-тег не может быть использован дважды'
      }
    }
  }
  return false;
};

var regular = /^#[\d\w]+/gi;
var regulafOcto = /^#/;

for (var i = 0; i < hashtags.length; i++) {
  if (hashtags[i].length > HASHTAG_LENGTH) {
    HASHTAG.setCustomValidity = 'максимальная длина одного хэш-тега 20 символов'
  } else if (hashtags[i] !== regulafOcto) {
    HASHTAG.setCustomValidity = 'хэш-тег начинается с символа #'
  } else if (hashtags[i] === regular) {
    HASHTAG.setCustomValidity = 'хеш-тег не может состоять только из одной решётки';
  }
  onTagMassageInput(hashtags);
  isUnique(hashtags);
}




// ======================================== "Эффекты"

// var EFFECTS = document.querySelector('.querySelector'); // контейнер с блоком эффектов
// var uploadPreview = EFECTS.querySelector('.img-upload__preview'); // обертка для фото
// var image = uploadPreview.querySelector('img'); // само фото
//
// EFFECTS = {
//   chrome: function() {filter: grayscale(0)},
//   sepia: function() { filter: sepia(0)},
//   marvin: function() { filter: invert(0)},
//   fobos: function() {filter: blur(0)},
//   heat: function() {filter: contrast(0)},
// };

// var EFFECTS_CHROME = EFECTS.querySelector('.effects__preview--chrome'); // хром
//
//
// uploadPreview.setAttribute()

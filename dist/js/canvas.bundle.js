/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight - 60;

var hit = false;

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight - 60;

    init();
});

addEventListener('click', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight - 60;

    init();
});

// Objects
function Star(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
        x: _utils2.default.randomIntFromRange(-4, 4),
        y: 3
    };
    this.friction = 0.8;
    this.gravity = 1;
    //this.hit = false
}

Star.prototype.draw = function () {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.shadowColor = '#e3eaef';
    c.shadowBlur = 20;
    c.fill();
    c.closePath();
    c.restore();
};

Star.prototype.update = function () {
    var _this = this;

    this.draw();
    // When star hits bottom of screen
    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
        this.velocity.y = -this.velocity.y * this.friction;
        this.shatter();
        console.log('?' + createbuilding.x);
    } else if (this.y + this.radius + this.velocity.y > canvas.height - buildingHeight - groundHeight && this.x + this.radius + this.velocity.x > 200 && this.x + this.radius + this.velocity.x < 900 + 100 && hit != true) {
        this.velocity.y = -this.velocity.y * this.friction;
        this.shatter();
        hit = true;
        createbuildings.forEach(function (createbuilding, index) {
            createbuilding.update();
            console.log("this " + createbuilding.x);
            if (hit == true) {
                createbuildings.splice(index, 1);
                for (var i = 0; i < 100; i++) {

                    miniBuildings.push(new MiniBuilding(_utils2.default.randomIntFromRange(canvas.width / 2, _this.x + 100), _utils2.default.randomIntFromRange(_this.y, _this.y + buildingHeight), 10, 'red'));
                    //console.log(createBuilding.x)
                }
            }
        });
    } else {
        this.velocity.y += this.gravity;
    }

    if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
        this.velocity.x = -this.velocity.x * this.friction;
        this.shatter();
    }

    // if (this.y + this.radius + this.velocity.y > canvas.height - buildingHeight - groundHeight){
    //     console.log('step 1')

    //     createbuildings.forEach(createBuilding, index => {
    //         console.log('did it work?' + createbuilding.x)
    //         console.log('step 2')
    //     if (this.x > createbuildings.x && this.x < createbuildings.x + 100) {
    //         console.log('test')
    //     }
    //     });
    // }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
};

Star.prototype.shatter = function () {
    this.radius -= 3;
    for (var i = 0; i < 8; i++) {
        miniStars.push(new MiniStar(this.x, this.y, 2));
    }
};

function MiniStar(x, y, radius, color) {
    Star.call(this, x, y, radius, color);
    this.velocity = {
        x: _utils2.default.randomIntFromRange(-5, 5),
        y: _utils2.default.randomIntFromRange(-15, 15)
    };
    this.friction = 0.8;
    this.gravity = 0.1;
    this.ttl = 200;
    this.opacity = 1;
}

MiniStar.prototype.draw = function () {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = 'rgba(277, 234, 239, ' + this.opacity + ')';
    c.shadowColor = '#e3eaef';
    c.shadowBlur = 20;
    c.fill();
    c.closePath();
    c.restore();
};

MiniStar.prototype.update = function () {
    this.draw();

    // When star hits bottom of screen
    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
        this.velocity.y = -this.velocity.y * this.friction;
    } else {
        this.velocity.y += this.gravity;
    }

    // Hits side
    if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
        this.velocity.x = -this.velocity.x;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;
};

function createBuilding(x, y, width, height, color) {
    //this.hit
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    c.fillStyle = color;
    this.buildingHeight = 200;
    //c.fillRect(canvas.width /2, canvas.height - groundHeight - buildingHeight, 100, 200)
}

createBuilding.prototype.draw = function () {
    c.save();
    c.fillStyle = '#384551';
    c.fillRect(this.x, canvas.height - groundHeight - buildingHeight, 100, 200);
    c.restore();
};

createBuilding.prototype.update = function () {
    this.draw();
};

function MiniBuilding(x, y, radius, color) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
        x: _utils2.default.randomIntFromRange(-4, 4),
        y: 3
    };
    this.friction = 0;
    this.gravity = 1;
    //this.hit = false
}

MiniBuilding.prototype.draw = function () {
    c.fillRect(this.x, this.y, 20, 20);
    //c.fillRect(utils.randomIntFromRange(this.x, this.x + 100), utils.randomIntFromRange(this.y, this.y - buildingHeight), 20, 20)
    //c.fillRect(100, 100, 100, 100)
};

MiniBuilding.prototype.update = function () {
    this.draw();

    // When star hits bottom of screen
    if (this.y + 10 + this.velocity.y > canvas.height - groundHeight - 10) {
        this.velocity.y = -this.velocity.y * this.friction;
        this.velocity.x = 0;
    } else {
        this.velocity.y += this.gravity;
    }

    // Hits side
    if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
        this.velocity.x = -this.velocity.x;
    }
    if (this.y != canvas.height - 60) {
        this.x += this.velocity.x;
    } else {
        this.velocity = 0;
    }

    this.y += this.velocity.y;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;

    // if (this.y + 20 + this.velocity.y > canvas.height - groundHeight) {
    //     this.velocity.y = -this.velocity.y * this.friction
    // } else {
    //     this.velocity.y += this.gravity
    // }
    // this.x += this.velocity.x;
    // this.y += this.velocity.y;
};

function createMountainRange(mountainAmount, height, color) {
    for (var i = 0; i < mountainAmount; i++) {
        var mountainWidth = canvas.width / mountainAmount;
        c.beginPath();
        c.moveTo(i * mountainWidth, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
        c.lineTo(i * mountainWidth - 325, canvas.height);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }
}
// Implementation
var backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, '#171e26');
backgroundGradient.addColorStop(1, '#3f586b');
var buildingX = void 0;
var stars = void 0;
var miniStars = void 0;
var backgroundStars = void 0;
var createbuildings = void 0;
var miniBuildings = void 0;
var ticker = 0;
//et hit = false
var randomSpawnRate = 75;
var groundHeight = 100;
var buildingHeight = 200;
function init() {
    stars = [];
    miniStars = [];
    backgroundStars = [];
    createbuildings = [];
    miniBuildings = [];

    // for (let i = 0; i < 1; i++) {
    //     stars.push(new Star(canvas.width / 2, 30, 30, '#e3eaef'));
    // }

    for (var i = 0; i < 150; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 3;
        backgroundStars.push(new Star(x, y, radius, 'white'));
    }

    for (var j = 0; j < 1; j++) {
        createbuildings.push(new createBuilding(_utils2.default.randomIntFromRange(0, canvas.width), canvas.width - 60 - 300, 100, 300, 'red'));
    }
}

// Animation Loop
function animate() {
    var hit = void 0;
    requestAnimationFrame(animate);
    c.fillStyle = backgroundGradient;
    c.fillRect(0, 0, canvas.width, canvas.height);

    backgroundStars.forEach(function (backgroundStar) {
        backgroundStar.draw();
    });

    createMountainRange(1, canvas.height - 50, '#384551');
    createMountainRange(2, canvas.height - 100, '#2b3843');
    createMountainRange(3, canvas.height - 300, '#26333e');
    c.fillStyle = '#182028';
    c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    createbuildings.forEach(function (createbuilding, index) {
        createbuilding.update();

        if (hit == true) {
            createbuildings.splice(index, 1);
            console.log('remove');
        }
    });

    stars.forEach(function (star, index) {
        star.update();
        if (star.radius == 0) {
            stars.splice(index, 1);
        }
    });

    miniStars.forEach(function (miniStar, index) {
        miniStar.update();
        if (miniStar.ttl == 0) {
            miniStars.splice(index, 1);
        }
    });

    miniBuildings.forEach(function (miniBuilding, index) {
        miniBuilding.update();
    });

    ticker++;

    if (ticker % randomSpawnRate == 0) {
        var radius = 12;
        var x = Math.max(Math.random() * canvas.width - radius);
        stars.push(new Star(x, -100, radius, 'white'));
        randomSpawnRate = _utils2.default.randomIntFromRange(200, 250);
    }
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map
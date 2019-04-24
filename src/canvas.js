import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight - 60

let hit = false

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight - 60

    init()
})

addEventListener('click', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight - 60

    init()
})

// Objects
function Star(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
        x: utils.randomIntFromRange(-4, 4),
        y: 3
    }
    this.friction = 0.8
    this.gravity = 1
    //this.hit = false
}

Star.prototype.draw = function() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.shadowColor = '#e3eaef'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
}

Star.prototype.update = function() {
    this.draw()
    // When star hits bottom of screen
    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
        this.velocity.y = -this.velocity.y * this.friction
        this.shatter()
        console.log('?' + createbuilding.x)
    } else if (this.y + this.radius + this.velocity.y > canvas.height - buildingHeight - groundHeight && (this.x + this.radius + this.velocity.x > 200 && this.x + this.radius + this.velocity.x  < 900 + 100) && hit != true) {
        this.velocity.y = -this.velocity.y * this.friction
        this.shatter()
        hit = true
        createbuildings.forEach((createbuilding, index) => {
            createbuilding.update()
            console.log("this " + createbuilding.x)
            if (hit == true){
                createbuildings.splice(index, 1)
                for (let i = 0; i < 100; i++) {

                    miniBuildings.push(new MiniBuilding(utils.randomIntFromRange(canvas.width / 2, this.x + 100), utils.randomIntFromRange(this.y, this.y + buildingHeight), 10, 'red'))
                    //console.log(createBuilding.x)
                }
            }
        })
    } else {
        this.velocity.y += this.gravity
    }

    if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
        this.velocity.x = -this.velocity.x * this.friction
        this.shatter()
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

    this.x += this.velocity.x
    this.y += this.velocity.y;
}

Star.prototype.shatter = function () {
    this.radius -= 3
    for (let i = 0; i < 8; i++) {
        miniStars.push(new MiniStar(this.x, this.y, 2))
        
    }
}


function MiniStar(x, y, radius, color){
    Star.call(this, x, y, radius, color)
    this.velocity = {
        x: utils.randomIntFromRange(-5, 5),
        y: utils.randomIntFromRange(-15, 15)
    }
    this.friction = 0.8
    this.gravity = 0.1
    this.ttl = 200
    this.opacity = 1
}

MiniStar.prototype.draw = function() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(277, 234, 239, ${this.opacity})`
    c.shadowColor = '#e3eaef'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
}

MiniStar.prototype.update = function() {
    this.draw()

    // When star hits bottom of screen
    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
        this.velocity.y = -this.velocity.y * this.friction
    } else {
        this.velocity.y += this.gravity
    }

    // Hits side
    if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
        this.velocity.x = -this.velocity.x
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl -= 1
    this.opacity -= 1 / this.ttl
}

function createBuilding(x, y, width, height, color) {
    //this.hit
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    c.fillStyle = color
    this.buildingHeight = 200
    //c.fillRect(canvas.width /2, canvas.height - groundHeight - buildingHeight, 100, 200)
    
}

createBuilding.prototype.draw = function() {
    c.save()
    c.fillStyle = '#384551'
    c.fillRect(this.x, canvas.height - groundHeight - buildingHeight, 100, 200)
    c.restore()
}

createBuilding.prototype.update = function() {
    this.draw()

}


function MiniBuilding(x, y, radius, color) {
    
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
        x: utils.randomIntFromRange(-4, 4),
        y: 3
    }
    this.friction = 0
    this.gravity = 1
    //this.hit = false
}

MiniBuilding.prototype.draw = function() {
    c.fillRect(this.x, this.y, 20, 20)
    //c.fillRect(utils.randomIntFromRange(this.x, this.x + 100), utils.randomIntFromRange(this.y, this.y - buildingHeight), 20, 20)
    //c.fillRect(100, 100, 100, 100)
}

MiniBuilding.prototype.update = function() {
    this.draw()

      // When star hits bottom of screen
      if (this.y + 10 + this.velocity.y > canvas.height - groundHeight - 10) {
        this.velocity.y = -this.velocity.y * this.friction
        this.velocity.x = 0
    } else {
        this.velocity.y += this.gravity
    }

    // Hits side
    if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
        this.velocity.x = -this.velocity.x
    }
    if (this.y != canvas.height - 60) {
        this.x += this.velocity.x;
    } else {
        this.velocity = 0
    }
    
    this.y += this.velocity.y;
    this.ttl -= 1
    this.opacity -= 1 / this.ttl

    // if (this.y + 20 + this.velocity.y > canvas.height - groundHeight) {
    //     this.velocity.y = -this.velocity.y * this.friction
    // } else {
    //     this.velocity.y += this.gravity
    // }
    // this.x += this.velocity.x;
    // this.y += this.velocity.y;
}

function createMountainRange(mountainAmount, height, color) {
    for (let i = 0; i < mountainAmount; i++) {
        const mountainWidth = canvas.width / mountainAmount
        c.beginPath()
        c.moveTo(i * mountainWidth, canvas.height)
        c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
        c.lineTo(i * mountainWidth - 325, canvas.height)
        c.fillStyle = color
        c.fill()
        c.closePath()
    }
}
// Implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')
let buildingX
let stars
let miniStars
let backgroundStars
let createbuildings
let miniBuildings
let ticker = 0
//et hit = false
let randomSpawnRate = 75
let groundHeight = 100
let buildingHeight = 200
function init() {
    stars = []
    miniStars = []
    backgroundStars = []
    createbuildings = []
    miniBuildings = []

    // for (let i = 0; i < 1; i++) {
    //     stars.push(new Star(canvas.width / 2, 30, 30, '#e3eaef'));
    // }

    for (let i = 0; i < 150; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 3
        backgroundStars.push(new Star(x, y, radius, 'white'))
    }

    for (let j = 0; j < 1; j++) {
        createbuildings.push(new createBuilding(utils.randomIntFromRange(0, canvas.width), canvas.width - 60 - 300, 100, 300, 'red'))
    }
}

// Animation Loop
function animate() {
    let hit
    requestAnimationFrame(animate)
    c.fillStyle = backgroundGradient
    c.fillRect(0, 0, canvas.width, canvas.height)

    backgroundStars.forEach(backgroundStar => {
        backgroundStar.draw()
    })

    createMountainRange(1, canvas.height - 50, '#384551')
    createMountainRange(2, canvas.height - 100, '#2b3843')
    createMountainRange(3, canvas.height - 300, '#26333e')
    c.fillStyle = '#182028'
    c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight)
    
    
    createbuildings.forEach((createbuilding, index) => {
        createbuilding.update()
        
        if (hit == true){
            createbuildings.splice(index, 1)
            console.log('remove')
        }
    })
    

    stars.forEach((star, index) => {
        star.update();
        if (star.radius == 0) {
           stars.splice(index, 1)
        }
       });
   
       miniStars.forEach((miniStar, index) => {
           miniStar.update()
           if (miniStar.ttl == 0) {
               miniStars.splice(index, 1)
            }
       })

       miniBuildings.forEach((miniBuilding, index) =>{
           miniBuilding.update()
       })

       ticker++

       if (ticker % randomSpawnRate == 0) {
           const radius = 12
           const x = Math.max(Math.random() * canvas.width - radius)
           stars.push(new Star(x, -100, radius, 'white'))
           randomSpawnRate = utils.randomIntFromRange(200, 250)
       }
}

init()
animate()

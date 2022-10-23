sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 100)
    music.powerDown.play()
}) //Decreases life when player and enemy collide

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy(effects.fire, 100)
    music.baDing.play()
    sprite.destroy()
}) //Adds score whenever bullet(projectile) hits the enemy(rocks)

controller.A.onEvent(ControllerButtonEvent.Pressed, function(){
    bullet = sprites.createProjectileFromSide(assets.image`Bullets`, 0, -100)
    bullet.setPosition(spaceship.x, spaceship.y)
    bullet.setKind(SpriteKind.Projectile)
}) //fires bullets from our spaceship

scene.setBackgroundColor(15) //This sets background color to black
effects.starField.startScreenEffect() //This adds a starField effect

let spaceship = sprites.create(assets.image`Spaceship`, SpriteKind.Player) //This creates our spaceship
let bullet: Sprite = null
let rocks: Sprite = null

controller.moveSprite(spaceship, 100, 0) //Allows sprite to move horizontally
spaceship.setFlag(SpriteFlag.StayInScreen, true) //Doesn't let our sprite move out of the screen
spaceship.setPosition(80, 110) //Sets the postion of our spaceship
info.setLife(5)
info.setScore(0)

game.onUpdateInterval(500,function () {
    rocks = sprites.createProjectileFromSide (assets.image`Asteriod`, Math.randomRange(-20, 20), Math.randomRange(60, 80))
    rocks.setPosition(Math.randomRange(0, 160), 0) 
    rocks.setKind(SpriteKind.Enemy)
}) //Every 500 milliseconds, rocks are spawned
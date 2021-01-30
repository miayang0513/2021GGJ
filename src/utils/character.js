import Phaser from 'phaser'
import itemJson from '../assets/json/item.json'
import store from '../store'

export default class Character extends Phaser.GameObjects.Sprite {

  constructor (scene, x, y, texture, frame, options) {

    super(scene, x, y, texture, frame)

    scene.add.existing(this)

    this.HP = options.HP //HP
    this.coordinateX = 0
    this.coordinateY = 0
    this.state = 'idle'
    this.floor = null

    this.InitAnimConfig(texture)
<<<<<<< HEAD
    this.CharacterEvent = new Phaser.Events.EventEmitter()
    this.CharacterEvent.on('moveCharacter_bytile', this._move_bytile, this)
    this.CharacterEvent.on('moveCharacter_bypath', this._move_path, this)
=======
    this.CharacterEvent = new Phaser.Events.EventEmitter();
    this.CharacterEvent.on('moveCharacter_bytile', this._move_bytile, this);
    this.CharacterEvent.on('moveCharacter_bypath', this._move_path, this);
>>>>>>> 6847e28 (Player can interactive with second floor.)

    this.setInteractive(this._interactArea, Phaser.Geom.Polygon.Contains)
      .on('pointerdown', () => {
        console.log('CharacterHp:' + this.HP)
      })
  }
<<<<<<< HEAD
  setFloor (Floor, Index, instant = false) {
    if (this.floor) this.floor.pathfinder.ClearPathHint()
    this.floor = Floor
    this._move_bytile(this.floor.getChildren()[Index], instant)
    this.floor.pathfinder.ClearPathHint()
  }

<<<<<<< HEAD

  _move_path ({ tilePath, targetTile }) {
    store.dispatch('cancelItemJitter')
    this.state = 'walking'
    var _tweens = []
    _tweens.length = tilePath.length
    for (let i = 0; i < tilePath.length; i++) {

      this.coordinateX = tilePath[i].coordinateX
      this.coordinateY = tilePath[i].coordinateY
=======
=======
>>>>>>> ba95dbd (fix: second floor bug)
  setFloor(Floor, Index, instant = false) {
    if (this.floor) this.floor.pathfinder.ClearPathHint()
    this.floor = Floor
    this._move_bytile(this.floor.getChildren()[Index], instant)
    this.floor.pathfinder.ClearPathHint()
  }

  _move_path(tile = []) {

  _move_path({ tilePath, targetTile }) {
    store.dispatch('cancelItemJitter')
    this.state = 'walking'
    var _tweens = []
    for (let i = 0; i < tilePath.length; i++) {

      this.coordinateX = tile[i].coordinateX
      this.coordinateY = tile[i].coordinateY
>>>>>>> 6847e28 (Player can interactive with second floor.)

<<<<<<< HEAD
      _tweens[i] =
      {
        targets: this,
<<<<<<< HEAD
        x: tilePath[i].x,
        y: tilePath[i].y - 100,
=======
        x: tile[i].x,
        y: tile[i].y - 100,
>>>>>>> 6847e28 (Player can interactive with second floor.)
        duration: 500,
        ease: 'Expo',
        easeParams: [],
        yoyo: false,
<<<<<<< HEAD
        onStart: function (tween, targets, depth, character) { character.depth = depth + 50 },
        onStartParams: [tilePath[i].depth, this],
        onComplete: (tween, targets, character) => {
          if (i === tilePath.length - 1) {
            character.anims.play('idle')
            character.state = 'idle'
            if (targetTile.hasOwnProperty('item')) {
              const item = itemJson.find(item => item.id === targetTile.item.id)
              store.dispatch('makeItemJitter', item.availableItems)
            }

            this.floor.pathfinder.ClearPathHint()
          }
        },
        onCompleteParams: [this]
=======
        onStart: function (tween, targets, depth, character) { character.depth = depth+50; },
        onStartParams: [tile[i].depth,this],
        onComplete: function (tween, targets, anims) { },
        onCompleteParams: [this]
      }
      //
      if (i == tile.length - 1) {
        _tweens[i].onComplete = function (tween, targets, character) { character.anims.play('idle'); character.state = 'idle' }
>>>>>>> 6847e28 (Player can interactive with second floor.)
      }
=======
      _tweens.push(
        {
          targets: this,
          x: tilePath[i].x,
          y: tilePath[i].y - 100,
          duration: 500,
          ease: 'Expo',
          easeParams: [],
          yoyo: false,
          onStart: function (tween, targets, depth, character) { character.depth = depth + 50 },
          onStartParams: [tilePath[i].depth, this],
          onComplete: function (tween, targets, character) {
            if (i === tilePath.length - 1) {
              character.anims.play('idle')
              character.state = 'idle'
              if (targetTile.hasOwnProperty('item')) {
                const item = itemJson.find(item => item.id === targetTile.item.id)
                store.dispatch('makeItemJitter', item.availableItems)
              }
            }
          },
          onCompleteParams: [this]
        }
      )
>>>>>>> ba95dbd (fix: second floor bug)
    }
    this.anims.play('walk')
    this.scene.tweens.timeline({ tweens: _tweens })
    this.TakeAction(tilePath.length)
  }

  _move_bytile (tile, instant) {
    this._move(tile.x, tile.y, tile.depth, instant)
    this.coordinateX = tile.coordinateX
    this.coordinateY = tile.coordinateY
    this.depth = tile.depth + 20
  }

  _move (x, y, depth, instant) {
    var tX = x
    var tY = y - 100 //FIXME: 因為希望角色顯示在正中間所以硬幹
    this.depth = depth + 300 //FIXME: 因為希望角色顯示在最上面所以硬幹

    if (instant) {
      this.x = tX
      this.y = tY
      return
    }

    this.anims.play('walk')
    this.tween = this.scene.tweens.add({
      targets: this,
      x: tX,
      y: tY,
      duration: 1000,
      ease: 'Expo',
      easeParams: [],
      yoyo: false,
      onComplete: function (tween, targets, anims) { anims.play('idle') },
      onCompleteParams: [this.anims]
    })
    this.TakeAction()
  }

  TakeAction (steps) {
    if (this.HP > 0) {
      this.HP -= steps
    }
    else {
      this.HP = 0
      //TODO: Call GameOver
    }
  }

  InitAnimConfig (an_init_texture) {
    const anim_walk = {
      key: 'walk',
      frames: an_init_texture,
      frameRate: 10,
      repeat: -1
    }
    const anim_idle = {
      key: 'idle',
      frames: an_init_texture,
      frameRate: 0,
      repeat: -1
    }
    this.anims.create(anim_idle)
    this.anims.create(anim_walk)
    this.anims.play('idle')
  }
}
import Phaser from 'phaser'
import PlayScene from '../scenes/play-scene'
import PathFinding from './pathfinding'

class Tile extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, options, frame) {
    super(scene, x, y, texture, frame)
    scene.add.existing(this)
    this.pathselecting = false
    this.coordinateX = options.coordinateX
    this.coordinateY = options.coordinateY
    this.depth = options.depth
    this.acceptable = options.acceptable
    this.playerevents = options.playerevents
    this.pathfinder = options.pathfinder
    this._interactArea = new Phaser.Geom.Polygon([
      0, 101,
      96, 150,
      192, 101,
      192, 89,
      96, 41,
      0, 89
    ])
    this.setInteractive(this._interactArea, Phaser.Geom.Polygon.Contains)
      .on('pointerdown', () => {
        console.log('here', this.coordinateX, this.coordinateY)
        this.CheckPosition()
      })
    this.scene.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTint(0xff0000)
    });
    this.scene.input.on('pointerout', function (event, gameObjects) {
      this.pathselecting = false;
      gameObjects[0].clearTint() //FIXME: 當被選中時顏色會被清除
    });

  }

  CheckPosition(playerevents = this.playerevents) {
    if (this.pathselecting == false) {
      this.pathselecting = true;
      this.pathfinder.Find(this,function(){})
      return
    }
    else {
      this.pathfinder.Find(this,function(result){
        playerevents.emit('moveCharacter_bypath', result)})
        
    }
  }

}

export default class Floor extends Phaser.GameObjects.Group {
  constructor (scene, { column, row, floor }) {
    super(scene)
    this.scene = scene
    this.centerX = screen.width / 2
    this.centerY = screen.height / 2
    this.column = column
    this.row = row
    this.floor = floor
    this.placeTiles()
  }
  placeTiles () {
    const tileWidth = 192
    const tileHeight = 96
    const tileWidthHalf = tileWidth / 2
    const tileHeightHalf = tileHeight / 2

    for (let y = 0; y < this.row; y++) {
      for (let x = 0; x < this.column; x++) {
        let tx = (x - y) * tileWidthHalf
        let ty = (x + y) * tileHeightHalf
        const options = {
          x: this.centerX + tx,
          y: this.centerY + ty - (this.floor - 1) * tileHeight * 2,
          texture: (x + y) % 2 === 0 ? 'tile-light' : 'tile-dark',
          depth: this.centerY + ty,
          coordinateX: x,
          coordinateY: y,
          floor: this.floor
        }
        const tile = new Tile(this.scene, options).setOrigin(0.5, 1)
        if (x < 7 && y < 3 && this.floor === 1) {
          tile.setTint(0X1F3B4A)
        }
        this.add(tile)
      }
    }
  }
}
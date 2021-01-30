import { Scene } from 'phaser'
import Floor from '../utils/floor'
import Wall from '../utils/wall'
<<<<<<< HEAD
import store from '../store'
=======
import Character from '../utils/character'
>>>>>>> 585106d (Player can move by tile with tween. (teleport))

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
    this.centerX = screen.width / 2
    this.centerY = screen.height / 2
    this.firstFloor = null
    this.secondFloor = null
    this.wall = null
  }
  init () {
    this.tileGroup = this.add.group()
    const PlayerSettings = { HP: 4 }
    this.Character_instance = new Character(this, 40, 40, 'character_atlas', 'frame_0000', PlayerSettings)
  }
  preload () {
  }
  async create () {
    console.log('play scene created')
<<<<<<< HEAD
    store.dispatch('showNotification', 'GET a broken bottle')

=======
    this.Character_instance.CharacterEvent.emit('moveCharacter_bytile', this.tileGroup.getChildren()[0], true)
>>>>>>> 585106d (Player can move by tile with tween. (teleport))
    this.cameras.main.setZoom(0.6)
    const shadow = this.add.image(this.centerX, this.centerY + 900, 'tile-shadow').setOrigin(0.5, 1).setDepth(0.1)
    this.wall = new Wall(this, {
      x: this.centerX,
      y: this.centerY + 295,
      texture: 'wall',
      depth: 0
    }).setOrigin(0.5, 1)

    this.firstFloor = new Floor(this, { column: 9, row: 9, floor: 1 })
    this.secondFloor = new Floor(this, { column: 7, row: 3, floor: 2 })
    this.mountDragEvent()
  }
  mountDragEvent () {
    const pinch = this.rexGestures.add.pinch()
    const camera = this.cameras.main
    pinch
      .on('drag1', function (pinch) {
        const drag1Vector = pinch.drag1Vector
        camera.scrollX -= drag1Vector.x / camera.zoom
        camera.scrollY -= drag1Vector.y / camera.zoom
      })
  }
}

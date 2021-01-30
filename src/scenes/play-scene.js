import { Scene } from 'phaser'
import Floor from '../utils/floor'
import Wall from '../utils/wall'
import Item from '../utils/item'
import store from '../store'
import Character from '../utils/character'
import PathFinding from '../utils/pathfinding'
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
    const PlayerSettings = { HP: 4 }
    this.Character_instance = new Character(this, 40, 40, 'character_atlas', 'frame_0000', PlayerSettings)
    this.Pathfinding = new PathFinding(this.Character_instance)
  }
  preload () {
  }
  async create () {
    console.log('play scene created')
    store.dispatch('showNotification', 'GET a broken bottle')
    this.cameras.main.setZoom(0.7)
    const shadow = this.add.image(this.centerX, this.centerY + 900, 'tile-shadow').setOrigin(0.5, 1).setDepth(0.1)
    this.wall = new Wall(this, {
      x: this.centerX,
      y: this.centerY + 295,
      texture: 'wall',
      depth: 0
    }).setOrigin(0.5, 1)

    this.firstFloor = new Floor(this, { column: 9, row: 9, floor: 1 }, { acceptable: true, pathfinder: this.Pathfinding, playerevents: this.Character_instance.CharacterEvent })
    this.secondFloor = new Floor(this, { column: 7, row: 3, floor: 2 }, { acceptable: true, pathfinder: this.Pathfinding, playerevents: this.Character_instance.CharacterEvent })
    // item setting
    this.pliers = new Item(this, 'pliers', 'ground', { column: 9, row: 6, floor: 1 }).setOrigin(0.5, 1)
    this.window = new Item(this, 'window', 'wall', { depth: 1000, x: this.centerX - 192 * 1.5, y: this.centerY + 400 }).setOrigin(0.5, 1)
    this.groove = new Item(this, 'groove', 'wall', { depth: 1000, x: this.centerX + 192 * 2.25, y: this.centerY - 192 }).setOrigin(0.5, 1)
    this.curtain = new Item(this, 'curtain', 'wall', { depth: 1000, x: this.centerX - 192 * 0.8, y: this.centerY - 192 * 1.2 }).setOrigin(0.5, 1)
    this.pipe = new Item(this, 'pipe', 'wall', { depth: 1000, x: this.centerX + 192 * 1.2, y: this.centerY - 192 * 2 }).setOrigin(0.5, 1)
    this.nail = new Item(this, 'nail', 'wall', { depth: 1000, x: this.centerX + 192 * 1.3, y: this.centerY + 192 * 1.3}).setOrigin(0.5, 1)
    this.table = new Item(this, 'table', 'ground', { column: 1, row: 8, floor: 1 }).setOrigin(0.5, 1)

    this.mountDragEvent()

    this.Pathfinding.init(this.firstFloor.getChildren())
    this.Character_instance.CharacterEvent.emit('moveCharacter_bytile', this.firstFloor.getChildren()[40], true)
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
  update () {
    this.Pathfinding.Finder.calculate()
  }
}

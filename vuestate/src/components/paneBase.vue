<template>
<div/>
</template>

<script>
export default {
  name: 'PaneBase',
  props: {
    id: String,
    customAtts: Object,
    holderId: String
  },
  data() {
      return {
        div: '',
        paneType: '',
        ctrlDown: false,
        shiftDown: false,
        altDown: false,
        sizeDirection: {
          x: 0,
          y: 0
        },
        sizePos: {
          x: 0,
          y: 0
        },
        sizeStart: {
          x: 0,
          y: 0
        },
        rotatePos: {
          x: 0,
          y: 0,
          z: 0,
          spin: 0
        },
        rotateStart: {
          set: false,
          x: 0,
          y: 0,
          z: 0,
          spin: 0
        },
        angleStart: {
          set: false,
          x: 0,
          y: 0,
          z: 0,
          spin: 0
        },
        mousePos: {
          x: 0,
          y: 0
        },
        mouseOffset:{
          x: 0,
          y: 0
        },
        paneStyle: {
          id: 0,
          top: '',
          left: '',
          'z-index': '',
          width: '',
          height: '',
          background: '',
          border: '',
          transform: '',
          'line-height': ''
        },
        paneAttributes: {}
    }
  },
  watch: {
    sizeDirection: function() {
      let h = this.paneAttributes.size.height + this.sizeDirection.y * 3
      let w = this.paneAttributes.size.width + this.sizeDirection.x * 3
      h = Math.max(h, 0)
      w = Math.max(w, 0)
      this.updateSize(h, w)
    },
    mousePos: function() {
      const top = this.mousePos.y + this.mouseOffset.y
      const left = this.mousePos.x + this.mouseOffset.x
      const zIndex = this.paneAttributes.position.zIndex
      this.updatePosition(top, left, zIndex)
    },
    rotatePos: function() {
      const xRot = this.angleStart.x + this.rotatePos.x - this.rotateStart.x
      const yRot = this.angleStart.y + this.rotatePos.y - this.rotateStart.y
      const zDist = this.angleStart.z + this.rotatePos.z - this.rotateStart.z
      const spin = this.angleStart.spin + this.rotatePos.spin - this.rotateStart.spin
      this.updateRotation(xRot, yRot, zDist, spin, this.paneAttributes.rotations.perspective)
    }
  },
  methods: {
    setBaseDefaults() {
      this.div = document.getElementById(this.id)
      this.setAtts()
      this.setRotations()
      this.setSize()
      this.setPosition()
      this.setColors()
      // this.setZIndex()
      this.updateActive(false)
      this.addActivate()
      this.div.addEventListener("dblclick", this.updateActive)
      this.div.addEventListener("mousedown", this.setOffset)
    },
    addActivate () {
      const payload = {
        paneType: this.paneType,
        id: this.id,
        updateActive: this.updateActive
      }
      this.$store.commit('addActivateMethod', payload)
    },
    setAtts() {
      if (this.customAtts) {
        this.paneAttributes = this.customAtts
      } else {
        if (this.paneType == 'holder') {
          this.paneAttributes = {
            rotations: {
              x: 0,
              y: 0,
              z: 0,
              spin: 0,
              perspective: 600
            },
            size: {
              height: 250,
              width: 250
            },
            position: {
              top: 0,
              left: 500,
              zIndex: 1
            },
            colors: {
              red: 250,
              green: 250,
              blue: 255,
              opacity: 0
            }
            // zIndex: 1
          }
        } else if (this.paneType == 'pane') {
          this.paneAttributes = {
            rotations: {
              x: 0,
              y: 0,
              z: 0,
              spin: 0,
              perspective: 0
            },
            size: {
              height: 100,
              width: 100
            },
            position: {
              top: 100,
              left: 100,
              zIndex: 1
            },
            colors: {
              red: 255,
              green: 200,
              blue: 150,
              opacity: .9
            }
            // zIndex: 1
          }
        }
      }
    },
    updateSize(h, w) {
      this.paneAttributes.size.height = h
      this.paneAttributes.size.width = w
      this.setSize()
    },
    setSize(){
      this.paneStyle.height = `${this.paneAttributes.size.height}px`
      this.paneStyle.width = `${this.paneAttributes.size.width}px`
      this.paneStyle['line-height'] = `${this.paneAttributes.size.height}px`
    },
    updateRotation(sideRot, upRot, z, spin, p) {
      this.paneAttributes.rotations.x = sideRot
      this.paneAttributes.rotations.y = upRot
      this.paneAttributes.rotations.z = z
      this.paneAttributes.rotations.spin = spin
      this.paneAttributes.rotations.perspective = p
      this.setRotations()
    },
    setRotations() {
      this.paneStyle.transform = `perspective(${this.paneAttributes.rotations.perspective}px)
      rotateY(${this.paneAttributes.rotations.x}deg) rotateX(${this.paneAttributes.rotations.y}deg) 
      rotateZ(${this.paneAttributes.rotations.spin}deg) translateZ(${this.paneAttributes.rotations.z}px)`
    },
    updateColor(r, g, b, o) {
      this.paneAttributes.colors.red = r
      this.paneAttributes.colors.green = g
      this.paneAttributes.colors.blue = b
      this.paneAttributes.colors.opacity = o
      this.setColors()
    },
    setColors() {
      const backStr = `rgba(${this.paneAttributes.colors.red},${this.paneAttributes.colors.green},${this.paneAttributes.colors.blue}, ${this.paneAttributes.colors.opacity})`
    //   const backStr = `rgb(${this.paneAttributes.colors.red},${this.paneAttributes.colors.green},${this.paneAttributes.colors.blue})`
      const borderStr = `rgb(${this.paneAttributes.colors.red * 1.5}, ${this.paneAttributes.colors.green * 1.5}, ${this.paneAttributes.colors.blue * 1.5})`
      this.paneStyle.background = backStr
      this.paneStyle.border = `3px solid ${borderStr}`
    },
    updatePosition(t, l, z) {
      this.paneAttributes.position.top = t
      this.paneAttributes.position.left = l
      this.paneAttributes.position.zIndex = z
      this.setPosition()
    },
    setPosition() {
      this.paneStyle.top = `${this.paneAttributes.position.top}px`
      this.paneStyle.left = `${this.paneAttributes.position.left}px`
      this.paneStyle['z-index'] = this.paneAttributes.position.zIndex
    },
    setOffset(e) {
      // console.log('movin')
      // this.$store.commit('updateMouseDown', true)
      this.mouseOffset.x = this.div.offsetLeft - e.clientX
      this.mouseOffset.y = this.div.offsetTop - e.clientY
      this.addListener(e)
    },
    addListener(e){
      e.cancelBubble = true
      // console.log('adding listener')
      document.addEventListener('mousemove', this.mouseListener)
    },
    mouseListener(e) {
      e.preventDefault()
      e.cancelBubble = true
      document.addEventListener('dblclick', this.removeListener)
      if (e.ctrlKey || e.shiftKey) {
        document.addEventListener('keyup', this.removeListener)
        // document.addEventListener('mouseup', this.removeListener)
        if (e.ctrlKey && e.shiftKey) {
            this.shiftDown = true
            this.ctrlDown = true
            if (!this.rotateStart.set) {
              this.shiftDown = true
              this.ctrlDown = true
              this.rotateStart.set = true
              this.rotateStart.z = e.clientX
              // this.rotate
            }
            this.rotatePos = {
              x: this.rotatePos.x,
              y: this.rotatePos.y,
              z: e.clientX,
              spin: this.rotatePos.spin
            }
        }
        else if (e.ctrlKey) {
          if (!this.rotateStart.set) {
            this.ctrlDown = true
            this.rotateStart.set = true
            this.rotateStart.x = e.clientX
            this.rotateStart.y = e.clientY
          }
          console.log(this.rotatePos)
          this.rotatePos = {
            x: e.clientX,
            y: e.clientY,
            z: this.rotatePos.z,
            spin: this.rotatePos.spin
          }
        } else if (e.shiftKey) {
          if (!this.rotateStart.set) {
            this.shiftDown = true
            this.rotateStart.set = true
            this.rotateStart.spin = e.clientX
          }
          console.log(this.rotatePos)
          this.rotatePos = {
            x: this.rotatePos.x,
            y: this.rotatePos.y,
            z: this.rotatePos.z,
            spin: e.clientX
          }
        }
      } else if (e.altKey) {
        document.addEventListener('keyup', this.removeListener)
        document.removeEventListener("mouseup", this.removeListener)
        if (!this.altDown) {
          this.altDown = true
        }
          let xDir = this.sizeDirection.x
          let yDir = this.sizeDirection.y

          if (e.clientX > this.sizeStart.x && this.sizeDirection.x <= 0) {
            xDir = 1
          } else if (e.clientX < this.sizeStart.x && this.sizeDirection.x >= 0) {
            xDir = -1
          } else if (e.clientX == this.sizeStart.x && this.sizeDirection.x != 0) {
            xDir = 0
          }
          
          if (e.clientY > this.sizeStart.y && this.sizeDirection.y <= 0) {
            yDir = 1
          } else if (e.clientY < this.sizeStart.y && this.sizeDirection.y >= 0) {
            yDir = -1
          } else if (e.clientY == this.sizeStart.y && this.sizeDirection.y != 0) {
            yDir = 0
          }

          this.sizeStart.y = e.clientY
          this.sizeStart.x = e.clientX
          this.sizeDirection = {
            x: xDir,
            y: yDir
          }
      
      } else {
        document.addEventListener("mouseup", this.removeListener)
        this.mousePos = {
          x: e.clientX,
          y: e.clientY
        }
      }
    },
    removeListener(e, key=false){
      e.cancelBubble = true
      // console.log('removing listener')
      this.rotateStart.set = false
      this.sizeStart.set = false
      document.removeEventListener('mousemove', this.mouseListener)
      document.removeEventListener('dblclick', this.removeListener)
      if (this.ctrlDown || this.shiftDown) {
        // tracking this means the angle doesn't get reset when rotating in two separate clicks
        // records last found angle when shift/control down
        if (this.ctrlDown && this.shiftDown) {
          this.angleStart.z = this.paneAttributes.rotations.z
        }
        else if (this.ctrlDown) {
          this.angleStart.x = this.paneAttributes.rotations.x
          this.angleStart.y = this.paneAttributes.rotations.y
        }
        else if (this.shiftDown) {
          this.angleStart.spin = this.paneAttributes.rotations.spin
        }
        document.removeEventListener('keyup', this.removeListener)
      }
      this.ctrlDown = false
      this.shiftDown = false
      this.altDown = false  
    },
    updateActive(e){
      if (e) {
        console.log('dbl clicked')
        e.cancelBubble = true
      }
      const activePane = {
        id: this.id,
        attributes: this.paneAttributes,
        methods: {
          updatePosition: this.updatePosition,
          updateSize: this.updateSize,
          updateRotation: this.updateRotation,
          updateColor: this.updateColor,
          updateZIndex: this.updateZIndex
        }
      }
      if (this.paneType == 'pane') {
        activePane.holderId = this.holderId
        this.$store.commit('updateActive', activePane)
      } else {
        this.$store.commit('updateActiveHolder', activePane)
      }
    }
  }
}
</script>
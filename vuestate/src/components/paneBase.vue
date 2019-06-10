<script>
export default {
  name: 'Pane',
  props: {
    id: Number
  },
  data() {
      return {
        div: '',
        internalPanes: [],
        ctrlDown: false,
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
        paneAttributes: {
          id: 0,
          rotations: {
            x: 0,
            y: 0,
            z: 0,
            spin: 0,
            perspective: 0
          },
          size: {
            height: 0,
            width: 0
          },
          position: {
            top: 0,
            left: 0
          },
          colors: {
            red: 0,
            green: 0,
            blue: 0,
            opacity: 0
          },
        }
    }
  },
  watch: {
    mousePos: function() {
      const top = this.mousePos.y + this.mouseOffset.y
      const left = this.mousePos.x + this.mouseOffset.x
      this.setLocation(top, left)
    },
    rotatePos: function() {
      const xRot = this.angleStart.x + this.rotatePos.x - this.rotateStart.x
      const yRot = this.angleStart.y + this.rotatePos.y - this.rotateStart.y
      const zDist = this.angleStart.z + this.rotatePos.z - this.rotateStart.z
      const spin = this.angleStart.spin + this.rotatePos.spin - this.rotateStart.spin
      // rotating after transforming or vice versa will have glitchy effect
      // due to rotating changing the location of the axis of which the transform takes place
      console.log(zDist)
      this.setRotations(xRot, yRot, zDist, spin)
    }
  },
  methods: {
    setBaseDefaults(paneType) {
      console.log(this.div)
      this.setRotations()
      this.setSize()
      this.setLocation(0,0)
      console.log('hello')
      this.div.addEventListener("dblclick", this.updateActive)
      this.div.addEventListener("mousedown", this.setOffset)
      // this.div.addEventListener("mouseup", this.$store.commit('updateMouseDown', false))
      this.div.addEventListener("mouseup", this.removeListener)
      this.paneAttributes.id = this.id
    },
    setSize(){
      this.paneStyle.width = `${this.paneAttributes.size.width}px`
      this.paneStyle.height = `${this.paneAttributes.size.height}px`
      this.paneStyle['line-height'] = `${this.paneAttributes.size.height}px`
    },
    setRotations(sideRot, upRot, z, spin) {
      this.paneAttributes.rotations.y = upRot
      this.paneAttributes.rotations.x = sideRot
      this.paneAttributes.rotations.z = z
      this.paneAttributes.rotations.spin = spin
      this.paneStyle.transform = `perspective(${this.paneAttributes.rotations.perspective}px)
      rotateY(${sideRot}deg) rotateX(${upRot}deg) rotateZ(${spin}deg) translateZ(${z}px)`
    },
    setBackgrounds() {
      const backStr = `rgba(${this.paneAttributes.colors.red},${this.paneAttributes.colors.green},${this.paneAttributes.colors.blue}, ${this.paneAttributes.colors.opacity})`
    //   const backStr = `rgb(${this.paneAttributes.colors.red},${this.paneAttributes.colors.green},${this.paneAttributes.colors.blue})`
      const borderStr = `rgb(${this.paneAttributes.colors.red * 1.5}, ${this.paneAttributes.colors.green * 1.5}, ${this.paneAttributes.colors.blue * 1.5})`
      this.paneStyle.background = backStr
      this.paneStyle.border = `3px solid ${borderStr}`
    },
    setLocation(t, l) {
      this.paneAttributes.position.top = t
      this.paneAttributes.position.left = l
      this.paneStyle.top = `${t}px`
      this.paneStyle.left = `${l}px`
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
      console.log('adding listener')
      document.addEventListener('mousemove', this.mouseListener)
    },
    mouseListener(e) {
      e.preventDefault()
      e.cancelBubble = true
      if (e.ctrlKey || e.shiftKey) {
        document.addEventListener('keyup', this.removeListener)
        document.addEventListener('mouseup', this.removeListener)
        document.addEventListener('dblclick', this.removeListener)
        if (e.ctrlKey && e.shiftKey) {
            console.log('both keys')
            this.shifDown = true
            this.ctrlDown = true
            if (!this.rotateStart.set) {
                this.rotateStart.set = true
                this.rotateStart.z = e.clientX
            }
            this.rotatePos = {
                x: this.rotatePos.x,
                y: this.rotatePos.y,
                z: e.clientX,
                spin: this.rotatePos.spin
            }
        }
        else if (e.ctrlKey) {
          this.ctrlDown = true
          if (!this.rotateStart.set) {
            this.rotateStart.set = true
            this.rotateStart.x = e.clientX
            this.rotateStart.y = e.clientY
          }
          this.rotatePos = {
            x: e.clientX,
            y: e.clientY,
            z: this.rotatePos.z,
            spin: this.rotatePos.spin
          }
        } else if (e.shiftKey) {
          this.shiftDown = true
          if (!this.rotateStart.set) {
            this.rotateStart.set = true
            this.rotateStart.spin = e.clientX
          }
          this.rotatePos = {
            x: this.rotatePos.x,
            y: this.rotatePos.y,
            z: this.rotatePos.z,
            spin: e.clientX
          }
        }
      } else {
        this.mousePos = {
          x: e.clientX,
          y: e.clientY
        }
      }
    },
    removeListener(e){
      e.cancelBubble = true
      console.log('removing listener')
      this.rotateStart.set = false
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
    },
    updateActive(e){
      console.log('dbl clicked')
      e.cancelBubble = true
      this.$store.commit('updateActive', this.paneAttributes)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
div{
  position: absolute;
  color: white;
  font-weight: bolder;
}

.active {
  box-shadow: 0 0 5px 0 rgba(255, 215, 0, 0.8), 0 0 5px 0 rgba(255, 215, 0, 0.8);
}
</style>

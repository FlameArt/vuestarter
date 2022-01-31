<template lang="pug">

// Это один перемещаемый блок, сделанный нативно

// Тут находится обёртка
div.block( block, :class="isSelected ? 'SelectedBox' : ''", @mousedown="dragMouseDown($event)", :style="'top:' + Y + 'px; left: ' + X + 'px; width:'+width+'px;height:'+height+'px;'")
  slot(name="Content")
    div TestContent

</template>

<script>

export default {
  name: "BaseBlock",
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    X: {
      type: Number,
      default: 500
    },
    Y: {
      type: Number,
      default: 500
    },
  },
  data: function () {
    return {

      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
        test: 0
      },

      block: {
        width: 300,
        height: 300,
        X: 0,
        Y: 0
      },

      element: null,
      blockElement: null,

      isSelected: false

    }
  },
  components: {},
  methods: {

    getEl: function () {
      return this.$el;
    },

    dragMouseDown: function (event) {

      event.preventDefault();
      event.stopPropagation();

      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY

      this.element = event.target;
      this.blockElement = event.target;

      // Если блок не найден, значит это баблинг из дочерних элемов, и нужно найти родителя
      if(!this.blockElement.hasAttribute('block')) {
        let finded = this.blockElement;
        while(finded=finded.parentNode) {
          if(finded.hasAttribute('block')){
            this.blockElement = finded;
            break;
          }
        }
      }

      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      this.Y = (this.blockElement.offsetTop - this.positions.movementY);
      this.X = (this.blockElement.offsetLeft - this.positions.movementX);
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }

  }
}
</script>

<style scoped lang="scss">

.block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: none;
}

.SelectedBox {
  border: #605c46 1px solid;
}

</style>

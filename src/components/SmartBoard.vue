<template lang="pug">
// Это статическая доска, которая просто располагается на экране каким-либо образом
div#SmartBoard
  // Это свободное пространство, по которому будут двигать основную доску
  div.SpaceBoard
    // Это основная доска, которую можно двигать
    div.MainBoard(MainBoard, @mousedown="dragMouseDown($event)", :style="'height:' + board.height + 'px; width: ' + board.width + 'px;'")
      BaseBlock.BaseBlock(v-for="block in Blocks")
</template>

<script>
import BaseBlock from "./BaseBlock.vue";
export default {
    name: "SmartBoard",
    components: {BaseBlock},
    data: function () {
        return {

          Blocks: [],

          positions: {
            clientX: undefined,
            clientY: undefined,
            movementX: 0,
            movementY: 0,
            test: 0
          },

          board: {
            height: 2600,
            width: 2600,
            X: 0,
            Y: 0,
          },

          element: null,
          blockElement: null,

          isSelected: false
        }
    },
  mounted() {
    this.Blocks.push({
      height: 300,
      width: 300,
      X: 500,
      Y: 500,
    })
  },
  methods: {
    dragMouseDown: function (event) {

      event.preventDefault();

      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY

      this.element = event.target;
      this.blockElement = event.target;

      // Если блок не найден, значит это баблинг из дочерних элемов, и нужно найти родителя
      if(!this.blockElement.hasAttribute('MainBoard')) {
        let finded = this.blockElement;
        while(finded=finded.parentNode) {
          if(finded.hasAttribute('MainBoard')){
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
      let calcTop = (this.blockElement.offsetTop - this.positions.movementY);
      let calcLeft = (this.blockElement.offsetLeft - this.positions.movementX);

      if(calcTop>-30) {
        this.board.height += (30 + calcTop);
        this.board.Y += (30 + calcTop);
      }
      else {
        this.board.Y = calcTop;
      }

      this.blockElement.style.top = this.board.Y + 'px'
      this.blockElement.style.left = calcLeft + 'px'

    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
</script>

<style scoped lang="scss">

#SmartBoard {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .SpaceBoard {

    width: 100%;
    height: 100%;
    background: #ddd;
    overflow: hidden;

    .MainBoard {
      width: 2600px;
      height: 2600px;
      position: absolute;
      left: -25%;
      top: -25%;
      cursor: grab;

      background: linear-gradient( #bbb, transparent 1px), linear-gradient( 90deg, #bbb, transparent 1px);
      background-size: 150px 150px;
      background-position: center center;

      .BaseBlock {
        background: #42b983;
        width: 300px;
        height: 300px;
      }

    }

  }

}

</style>

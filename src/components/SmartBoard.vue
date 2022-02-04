<template lang="pug">
// Это статическая доска, которая просто располагается на экране каким-либо образом
div#SmartBoard
  // Это свободное пространство, по которому будут двигать основную доску
  div.SpaceBoard
    // Это основная доска, которую можно двигать
    div.MainBoard(MainBoard, @mousedown="dragMouseDown($event)", :style="'top:' + board.Y + 'px; left: ' + board.X + 'px;height:' + board.height + 'px; width: ' + board.width + 'px;'")
      BaseBlock.BaseBlock(v-for="thisBlock in Blocks", :block="thisBlock", :Blocks="Blocks", :helpers="blockHelpers", :style="thisBlock.isSelected ? 'border: 1px solid #ff0000' : 'border: 1px solid transparent'")

      // Горизонтальная линия для подсказки куда пристыковаться
      div.helperHorizontal(:style="'top:' + blockHelpers.horizontal.Y + 'px; left: ' + blockHelpers.horizontal.X + 'px;height:' + blockHelpers.horizontal.height + 'px; width: ' + blockHelpers.horizontal.width + 'px;'")
      div.helperHorizontal(:style="'top:' + blockHelpers.horizontal.Y + 'px; left: ' + blockHelpers.horizontal.X + 'px;height:' + blockHelpers.horizontal.height + 'px; width: ' + blockHelpers.horizontal.width + 'px;'")

      div.helperSelect(v-show="this.blockHelpers.selector.isShow", ref="helperSelect",:style="'top:' + blockHelpers.selector.top + 'px; left: ' + blockHelpers.selector.left + 'px;height:' + blockHelpers.selector.height + 'px; width: ' + blockHelpers.selector.width + 'px;'")
        div {{this.blockHelpers.selector.startX + 'x' + this.blockHelpers.selector.startY + ' - ' + (this.blockHelpers.selector.width + this.blockHelpers.selector.startX)}}
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
        height: 10000,
        width: 10000,
        X: -3500,
        Y: -4000,
      },

      blockHelpers: {
        // Линии для подсказок
        horizontal: [{
          height: 1,
          width: 0,
          X: 0,
          Y: 0,
        }],
        vertical: [{
          height: 0,
          width: 1,
          X: 0,
          Y: 0,
        }],
        // Бокс для выделения элементов
        selector: {
          startX: 0,
          startY: 0,
          left: 0,
          top: 0,
          X: 0,
          Y: 0,
          height: 0,
          width: 0,
          isShow: false,
        }
      },

      SelectedBlocks: [],

      element: null,
      blockElement: null,

      isSelected: false
    }
  },
  mounted() {
    this.Blocks.push({
      height: 300,
      width: 300,
      X: -this.board.X,
      Y: -this.board.Y + 300,
      startX: 0,
      startY: 0,
      isSelected: false
    }, {
      height: 200,
      width: 200,
      X: -this.board.X + 500,
      Y: -this.board.Y + 300,
      startX: 0,
      startY: 0,
      isSelected: false
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
      if (!this.blockElement.hasAttribute('MainBoard')) {
        let finded = this.blockElement;
        while (finded = finded.parentNode) {
          if (finded.hasAttribute('MainBoard')) {
            this.blockElement = finded;
            break;
          }
        }
      }

      switch (event.button) {
        // Левой кнопкой мыши селектим
        case 0:
          this.blockHelpers.selector.startX = (Math.abs(this.blockElement.offsetLeft) + event.clientX);
          this.blockHelpers.selector.startY = (Math.abs(this.blockElement.offsetTop) + event.clientY);
          this.SelectedBlocks.splice(0);
          this.blockHelpers.selector.isShow = true;
          this.blockHelpers.selector.width = 0;
          this.blockHelpers.selector.height = 0;
          document.onmousemove = this.selectorBox;
          break;
        // Правой и средней кнопкой мыши перемещаем
        case 1:
        case 2:
          document.onmousemove = this.elementDrag;
          break;
      }
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

      // Добавляем новое пространство
      // TODO: можно улучшить производительность, а может и не нужно, а достаточно просто большого холста
      // TODO: всё работает, только одна проблема: при перемещении елозит фон
      /*
      // сверху
      if(calcTop>-30) {
        calcTop = calcTop - 250;
        this.board.height += 250;
        for (const block of this.Blocks) {
          block.Y += 250;
        }
      }
      // снизу
      if(calcTop + this.board.height>window.innerHeight+30) {
        this.board.height += 250;
      }
      // слева
      if(calcLeft>-30) {
        calcLeft = calcLeft - 250;
        this.board.width += 250;
        for (const block of this.Blocks) {
          block.X += 250;
        }
      }
      // справа
      if(calcLeft + this.board.width>window.innerWidth+30) {
        this.board.width += 250;
      }

       */

      this.board.Y = calcTop;
      this.board.X = calcLeft;

    },
    closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
      this.blockHelpers.selector.isShow = false;
    },

    selectorBox: function (event) {

      let movementX = this.positions.clientX - event.clientX
      let movementY = this.positions.clientY - event.clientY
      let calcTop = (Math.abs(this.blockElement.offsetTop) + event.clientY);
      let calcLeft = (Math.abs(this.blockElement.offsetLeft) + event.clientX);
      let calcBottom = this.blockHelpers.selector.startY + this.blockHelpers.selector.height;
      let calcRight = this.blockHelpers.selector.startX + this.blockHelpers.selector.width;

      this.blockHelpers.selector.top = calcTop - this.blockHelpers.selector.startY > 0 ? this.blockHelpers.selector.startY : calcTop;
      this.blockHelpers.selector.left = calcLeft - this.blockHelpers.selector.startX > 0 ? this.blockHelpers.selector.startX : calcLeft;

      //if(calcLeft - this.blockHelpers.selector.startX < 0) debugger;
      this.blockHelpers.selector.width = Math.abs(calcLeft - this.blockHelpers.selector.startX);
      this.blockHelpers.selector.height = Math.abs(calcTop - this.blockHelpers.selector.startY);

      // определяем селекченные элемы
      for (const block of this.Blocks) {
        if(
            this.blockHelpers.selector.left < block.X + block.width && calcRight > block.X &&
            this.blockHelpers.selector.top < block.Y + block.height && calcBottom > block.Y ){
          if(this.SelectedBlocks.find(r=>r===block)===undefined) {
            this.SelectedBlocks.push(block);
          }
          block.isSelected = true;
        }
        else {
          block.isSelected = false;
        }
      }

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
      cursor: grab;

      background: linear-gradient(#bbb, transparent 1px), linear-gradient(90deg, #bbb, transparent 1px);
      background-size: 150px 150px;
      background-position: center center;

      .BaseBlock {
        background: #42b983;
        width: 300px;
        height: 300px;
      }

      // Горизонтальная линия для подсказок стакинга
      .helperHorizontal {
        height: 1px;
        background: gray;
        position: absolute;
      }

      // Вертикальная линия для хелпера
      .helperVertical {
        height: 1px;
        background: gray;
        position: absolute;
      }


      // Селектор
      .helperSelect {
        background: blue;
        opacity: 0.3;
        position: absolute;
      }

    }

  }

}

</style>

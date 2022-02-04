<template lang="pug">

// Это один перемещаемый блок, сделанный нативно

// Тут находится обёртка
div.block( block, :class="isSelected ? 'SelectedBox' : ''", @mousedown="dragMouseDown($event)", :style="'top:' + block.Y + 'px; left: ' + block.X + 'px; width:'+block.width+'px;height:'+block.height+'px;'")
  slot(name="Content")
    div {{block.X + 'x' + block.Y}}

</template>

<script>

// Сколько пикселей должно быть до блока чтобы к нему прикрепиться
const MOVE_PX_TO_STACK = 5;
const IS_STACK = true;

export default {
  name: "BaseBlock",
  props: {
    // Ссылка на объект текущего блока в общем состоянии
    block: {
      type: Object,
      default: {
        width: 300,
        height: 300,
        X: 300,
        Y: 300,
        startX: 0,
        startY: 0
      }
    },
    helpers: {
      type: Object
    },
    // Ссылка на все блоки, чтобы видеть их позиции
    Blocks: {}
  },
  data: function () {
    return {

      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
        isStacked: false
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
      if (!this.blockElement.hasAttribute('block')) {
        let finded = this.blockElement;
        while (finded = finded.parentNode) {
          if (finded.hasAttribute('block')) {
            this.blockElement = finded;
            break;
          }
        }
      }

      let elemPos = this.blockElement.getBoundingClientRect();

      this.block.startX = elemPos.x
      this.block.startY = elemPos.y

      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault();
      event.stopPropagation();

      let calculatedY = (this.blockElement.offsetTop - this.positions.movementY);
      let calculatedX = (this.blockElement.offsetLeft - this.positions.movementX);

      // общие расчёты
      let isStackedY = ((Math.abs(this.positions.clientY - event.clientY) > MOVE_PX_TO_STACK));
      let isStackedX = ((Math.abs(this.positions.clientX - event.clientX) > MOVE_PX_TO_STACK));

      // Пристыковываемся к границам других блоков
      let needStopY = false;
      let needStopX = false;
      if (IS_STACK) {
        for (const block of this.Blocks) {

          // свой блок не трогаем
          if (block === this.block) continue;

          if (!isStackedY) {
            //Верхняя к верхней
            if (Math.abs(calculatedY - block.Y) < MOVE_PX_TO_STACK) {
              calculatedY = block.Y;
              this.positions.isStacked = true;
              needStopY = true;
            }
            // Нижняя [перемещаемого блока] к верхней [статичного]
            if (Math.abs(calculatedY + this.block.height - block.Y) < MOVE_PX_TO_STACK) {
              calculatedY = block.Y - this.block.height;
              this.positions.isStacked = true;
              needStopY = true;
            }
            // Нижняя к нижней
            if (Math.abs(calculatedY + this.block.height - (block.height + block.Y)) < MOVE_PX_TO_STACK) {
              calculatedY = block.Y+block.height-this.block.height;
              this.positions.isStacked = true;
              needStopY = true;
            }
            // Верхняя [перемещаемого блока] к нижней [статичного]
            if (Math.abs(calculatedY - (block.Y+block.height)) < MOVE_PX_TO_STACK) {
              calculatedY = block.Y + block.height;
              this.positions.isStacked = true;
              needStopY = true;
            }
          }

          if (!isStackedX) {
            //Левая к левой
            if (Math.abs(calculatedX - block.X) < MOVE_PX_TO_STACK) {
              calculatedX = block.X;
              this.positions.isStacked = true;
              needStopX = true;
            }
            // Правая [перемещаемого блока] к левой [статичного]
            if (Math.abs(calculatedX + this.block.width - block.X) < MOVE_PX_TO_STACK) {
              calculatedX = block.X - this.block.width;
              this.positions.isStacked = true;
              needStopX = true;
            }
            // Правая к правой
            if (Math.abs(calculatedX + this.block.width - (block.width + block.X)) < MOVE_PX_TO_STACK) {
              calculatedX = block.X+block.width-this.block.width;
              this.positions.isStacked = true;
              needStopX = true;
            }
            // Левая [перемещаемого блока] к правой [статичного]
            if (Math.abs(calculatedX - (block.X+block.width)) < MOVE_PX_TO_STACK) {
              calculatedX = block.X + block.width;
              this.positions.isStacked = true;
              needStopX = true;
            }
          }

        }
      }

      this.block.Y = calculatedY;
      this.block.X = calculatedX;

      if (!needStopY) {
        this.positions.movementY = this.positions.clientY - event.clientY
        this.positions.clientY = event.clientY
      }

      if (!needStopX) {
        this.positions.movementX = this.positions.clientX - event.clientX
        this.positions.clientX = event.clientX
      }

    },
    closeDragElement() {
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

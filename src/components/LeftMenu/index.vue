<template>
  <div class="left-menu-component-container">
    <div class="left-menu-component-box">
      <div class="menu-list-ul">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          :class="[
            'menu-list-li',
            { 'menu-list-li-active': activeItem.path === item.path },
          ]"
          @click="changeView(item)"
        >
          <div class="menu-icon">
            <i :class="item.icon"></i>
          </div>
          <div class="menu-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-menu-component',
  props: ['menuList', 'activeItem'],
  components: {},
  data () {
    return {}
  },
  methods: {
    changeView (item) {
      this.$emit('activeMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

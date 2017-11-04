<template>
  <div>
    <Button type="primary" @click="open">Primary</Button>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data () {
      return {
      };
    },
    components: {
    },
    methods: {
      open () {
        this.$electron.shell.openExternal('https://www.baidu.com');
      }
    }
  };
</script>

<style>
</style>

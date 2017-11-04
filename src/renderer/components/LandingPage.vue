<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <FormItem label="Input">
        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data () {
      return {
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      };
    },
    components: {
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link);
      }
    }
  };
</script>

<style>
</style>

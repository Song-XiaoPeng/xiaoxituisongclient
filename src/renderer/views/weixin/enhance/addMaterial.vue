<style scoped lang="less">

</style>
<template>
    <div class="" style="margin-top: 10px">
        <div>
            <Form label-position="right" :label-width="100">
                <FormItem label="标题：">
                    <Input placeholder="请输入" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="作者：">
                    <Input placeholder="请输入" style="width: 300px"></Input>
                </FormItem>
                <FormItem label="内容：">
                    <editor :config="editorTxt"></editor>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
  import editor from '../editor';
  export default {
    data () {
      return {
        editorTxt: '内容区域'
      };
    },
    components: {
      editor
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {}
  };
</script>

<template>
    <div id="index">
        <VueUEditor @ready="editorReady" style="width: 100%"></VueUEditor>
    </div>
</template>

<script>
  import VueUEditor from './UEditor';
  export default {
    name: 'app',
    components: { VueUEditor },
    props: {
      config: {
        type: String,
        default: 'Hello world!<br>你可以在这里初始化编辑器的初始内容。'
      }
    },
    methods: {
      editorReady (editorInstance) {
        console.log(this.config, 123456);
        editorInstance.setContent(this.config);
        editorInstance.addListener('contentChange', () => {
          console.log('编辑器内容发生了变化：', editorInstance.getContent());
        });
      }
    }
  };
</script>

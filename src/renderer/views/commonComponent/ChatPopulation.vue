<style scoped lang="less">
  .btn{
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      color: #1a1a1a;
      box-sizing: border-box;
      border-bottom: 1px #eaeaea solid;
      transition: all .3s;
      cursor: pointer;
  }
  .active{
      background-color: #3399ff;
      color: #fff;
  }
  .btn:hover{
      background-color: #2db7f5;
      color: #fff;
  }
    .person{
        box-sizing: border-box;
        padding: 0 5px;
    }
</style>
<template>
   <div>
       <Row>
           <Col :xs="24"  :lg="12">
             <div class="btn active">
               访客
             </div>
           </Col>
           <Col :xs="24"  :lg="12">
              <div class="btn">
                 团队
              </div>
           </Col>
       </Row>
       <div class="person">
           <Tree :data="data1"></Tree>
           <Tree :data="data2"></Tree>
           <Tree :data="data3"></Tree>
           <Tree :data="data4"></Tree>
       </div>
   </div>
</template>
<script>
    export default {
      data () {
        return {
          data1: [
            {
              title: '对话中',
              expand: true,
              children: [
                {
                  title: 'parent 1-1',
                  expand: true
                },
                {
                  title: 'parent 1-2',
                  expand: true
                }
              ]
            }
          ],
          data2: [
            {
              title: '等待中',
              expand: true,
              children: [
                {
                  title: 'parent 1-1',
                  expand: true
                },
                {
                  title: 'parent 1-2',
                  expand: true
                }
              ]
            }
          ],
          data3: [
            {
              title: '排队中',
              expand: true,
              children: [
                {
                  title: 'parent 1-1',
                  expand: true
                },
                {
                  title: 'parent 1-2',
                  expand: true
                }
              ]
            }
          ],
          data4: [
            {
              title: '最近沟通',
              expand: true,
              children: [
                {
                  title: 'parent 1-1',
                  expand: true
                },
                {
                  title: 'parent 1-2',
                  expand: true
                }
              ]
            }
          ]
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {}
    };
</script>

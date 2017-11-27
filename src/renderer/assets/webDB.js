/**
 * Created by IT on 2017-11-26.
 */
// 暂时性  数据库
// 数据库类
class webDB {
  constructor (nema) {
    this.name = name;
    //第一个参数是数据库的名称，第二个参数是数据库的版本号
    this.myDB =  window.indexedDB.open('mysql');
    // 如果打开失败
    this.myDB.onerror = function(event){
      console.log("打开IndexedDB失败", event);
    };
    //onupgradeneeded事件在 第一次打开页面初始化数据库 或 当有版本号变化 时 会被调用
    this.myDB.onupgradeneeded   = function(event){
      var db = event.target.result;
      //@@@  创建会话人员列表（储存对象）  @@@//
      // 创建一个对象存储空间来持有有关我们客户的信息。
      // 我们将使用 "ssn" 作为我们的 key path 因为它保证是唯一的。
      var objectStore = db.createObjectStore("visitor", { autoIncrement: true });
      // var objectStore = db.createObjectStore("visitor", { keyPath: "session_id" });

      // 创建一个索引来通过 name 搜索客户。
      // 可能会有重复的，因此我们不能使用 unique 索引。
      objectStore.createIndex("session_id", "session_id", { unique: false });
      objectStore.createIndex("customer_wx_nickname", "customer_wx_nickname", { unique: false });

      // 我们希望确保不会有两个客户使用相同的 appid ，
      objectStore.createIndex("appid", "appid", { unique: true });
      // 客户微信openid
      objectStore.createIndex('customer_wx_openid' ,"customer_wx_openid", { unique: false });
      // 图像
      objectStore.createIndex('customer_wx_portrait' ,"customer_wx_portrait", { unique: false });
      // 客户id
      objectStore.createIndex('customer_service_id' ,"customer_service_id", { unique: false });
      // 添加事件
      objectStore.createIndex('add_time' ,"add_time", { unique: false });
      // 商户
      objectStore.createIndex('app_name' ,"app_name", { unique: false });
      // 会话状态 -2超时关闭 -1会话关闭 0等待接入 1会话中
      objectStore.createIndex('state' ,"state", { unique: false });
      // 客服id
      objectStore.createIndex('uid' ,"uid", { unique: true });
      // 所属商户id
      objectStore.createIndex('company_id' ,"company_id", { unique: true });
      // 是否已读
      objectStore.createIndex('is_get' ,"is_get", { unique: true });
      //
      objectStore.createIndex('session_frequency' ,"session_frequency", { unique: false });

      objectStore.createIndex('invitation_frequency' ,"invitation_frequency", { unique: false });



      //@@@  创建会话数据表（储存对象）  @@@//
      var objectStore1 = db.createObjectStore("message", { keyPath: "message_id" });

      // 创建一个索引来通过 name 搜索客户。
      // 可能会有重复的，因此我们不能使用 unique 索引。
      objectStore1.createIndex("name", "session_id", { unique: false });

      // 我们希望确保不会有两个客户使用相同的 appid ，
      objectStore1.createIndex("appid", "appid", { unique: true });
      // 客户微信openid
      objectStore1.createIndex('customer_wx_openid' ,"customer_wx_openid", { unique: false });
      // 图像
      objectStore1.createIndex('customer_wx_portrait' ,"customer_wx_portrait", { unique: false });
      // 客户id
      objectStore1.createIndex('customer_service_id' ,"customer_portrait_id", { unique: false });
      // 添加事件
      objectStore1.createIndex('add_time' ,"add_time", { unique: false });
      // 操作码 1客服发送消息 2客服接受消息
      objectStore1.createIndex('opercode' ,"opercode", { unique: false });
      // 消息文本内容
      objectStore1.createIndex('text' ,"text", { unique: false });
      // 消息类型 0其他 1文本 2图片 3语言 4视频 5坐标 6链接
      objectStore1.createIndex('message_type' ,"message_type", { unique: false });
      // 文件链接
      objectStore1.createIndex('file_url' ,"file_url", { unique: false });
      // 经度
      objectStore1.createIndex('lng' ,"lng", { unique: false });
      // 纬度
      objectStore1.createIndex('lat' ,"lat", { unique: false });
      // 是否已读
      objectStore1.createIndex('is_read' ,"is_read", { unique: false });
      // 会话id
      objectStore1.createIndex('session_id' ,"session_id", { unique: false });
      // 客服id
      objectStore1.createIndex('uid' ,"uid", { unique: false });
      // 素材id
      objectStore1.createIndex('media_id' ,"media_id", { unique: false });
      // 链接页面标题
      objectStore1.createIndex('page_title' ,"page_title", { unique: false });
      // 链接页面描述
      objectStore1.createIndex('page_desc' ,"page_desc", { unique: false });
      // 地图缩放大小
      objectStore1.createIndex('map_scale' ,"map_scale", { unique: false });
      // 地图位置描述
      objectStore1.createIndex('map_label' ,"map_label", { unique: false });
      // 地图静态图url
      objectStore1.createIndex('map_img' ,"map_img", { unique: false });
      // 系统本地资源id
      objectStore1.createIndex('resources_id' ,"resources_id", { unique: false });
    };
  }
  addData (obj) {
    // obj{
    //   name 表名称
    //   data 表数据
    // }
    this.myDB.onsuccess  = function(event){
      var db = event.target.result;
      var transaction = db.transaction([obj.name], 'readwrite');
      // 当所有的数据都被增加到数据库时执行一些操作
      transaction.oncomplete = function(event) {
        console.log('添加成功1322123');
      };

      transaction.onerror = function(event) {
        // 不要忘记进行错误处理！
      };

      var objectStore = transaction.objectStore(obj.name);
      for (var i in obj.data) {
        console.log(obj.data[i]);
        var request = objectStore.put(obj.data[i]);
        request.onsuccess = function(event) {
          console.log(event);
          // event.target.result == customerData[i].ssn
        };
      }
    }
  }
}
export default webDB
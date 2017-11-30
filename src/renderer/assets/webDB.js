/**
 * Created by IT on 2017-11-26.
 */
// 暂时性  数据库
// 数据库类
class IndexedDB{
  constructor(tabName, type, key, fun ,storeName, data, version){
    this.storeName = storeName;
    const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
    const request = indexedDB.open('mysql', version);
    this.db = null;
    this.tabName = tabName;
    this.type = type;
    this.fun = fun;
    this.key = key;
    this.data = data;
    request.onsuccess = e => {
      this.db = e.target.result;
      if(this.type == 'get'){
        this.get(this.tabName, this.fun, this.key);
      } else if (this.type == 'set') {
        this.set(this.tabName, this.data, this.fun, this.key)
      } else if (this.type == 'remove') {
        this.remove(this.tabName, this.fun, this.key);
      } else if(this.type === 'update'){
        this.update(this.tabName, this.data, this.fun, this.key)
      }
    };
    request.onupgradeneeded = e => {
      this.db = e.target.result;

      // if(!this.db.objectStoreNames.contains(storeName)){
      //   this.store = this.db.createObjectStore(storeName);
      // }

      var db = event.target.result;




      //@@@  创建会话人员列表（储存对象）  @@@//
      // 创建一个对象存储空间来持有有关我们客户的信息。
      // 我们将使用 "customer_wx_openid" 作为我们的 key path 因为它保证是唯一的。
      var objectStore = db.createObjectStore("visitor", { keyPath: 'customer_wx_openid' });
      // var objectStore = db.createObjectStore("visitor", { keyPath: "session_id" });

      // 创建一个索引来通过 name 搜索客户。
      // 可能会有重复的，因此我们不能使用 unique 索引。
      objectStore.createIndex("session_id", "session_id", { unique: false });
      objectStore.createIndex("customer_wx_nickname", "customer_wx_nickname", { unique: false });

      // 我们希望确保不会有两个客户使用相同的 appid ，
      objectStore.createIndex("appid", "appid", { unique: false });
      // 客户微信openid
      // objectStore.createIndex('customer_wx_openid' ,"customer_wx_openid", { unique: false });
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
      objectStore.createIndex('uid' ,"uid", { unique: false });
      // 所属商户id
      objectStore.createIndex('company_id' ,"company_id", { unique: false });
      // 是否已读
      objectStore.createIndex('is_get' ,"is_get", { unique: false });
      //
      objectStore.createIndex('session_frequency' ,"session_frequency", { unique: false });

      objectStore.createIndex('invitation_frequency' ,"invitation_frequency", { unique: false });





      //@@@  waiting 等待会话数据表（储存对象）  @@@//
      // 创建一个对象存储空间来持有有关我们客户的信息。
      // 我们将使用 "customer_wx_openid" 作为我们的 key path 因为它保证是唯一的。
      var objectStore2 = db.createObjectStore("waiting", { keyPath: 'customer_wx_openid' });
      // var objectStore = db.createObjectStore("visitor", { keyPath: "session_id" });

      // 创建一个索引来通过 name 搜索客户。
      // 可能会有重复的，因此我们不能使用 unique 索引。
      objectStore2.createIndex("session_id", "session_id", { unique: false });
      objectStore2.createIndex("customer_wx_nickname", "customer_wx_nickname", { unique: false });

      // 我们希望确保不会有两个客户使用相同的 appid ，
      objectStore2.createIndex("appid", "appid", { unique: false });
      // 客户微信openid
      // objectStore.createIndex('customer_wx_openid' ,"customer_wx_openid", { unique: false });
      // 图像
      objectStore2.createIndex('customer_wx_portrait' ,"customer_wx_portrait", { unique: false });
      // 客户id
      objectStore2.createIndex('customer_service_id' ,"customer_service_id", { unique: false });
      // 添加事件
      objectStore2.createIndex('add_time' ,"add_time", { unique: false });
      // 商户
      objectStore2.createIndex('app_name' ,"app_name", { unique: false });
      // 会话状态 -2超时关闭 -1会话关闭 0等待接入 1会话中
      objectStore2.createIndex('state' ,"state", { unique: false });
      // 客服id
      objectStore2.createIndex('uid' ,"uid", { unique: false });
      // 所属商户id
      objectStore2.createIndex('company_id' ,"company_id", { unique: false });
      // 是否已读
      objectStore2.createIndex('is_get' ,"is_get", { unique: false });
      //
      objectStore2.createIndex('session_frequency' ,"session_frequency", { unique: false });

      objectStore2.createIndex('invitation_frequency' ,"invitation_frequency", { unique: false });





      //@@@  queue_up 排队数据表（储存对象）  @@@//
      // 创建一个对象存储空间来持有有关我们客户的信息。
      // 我们将使用 "customer_wx_openid" 作为我们的 key path 因为它保证是唯一的。
      var objectStore3 = db.createObjectStore("queue_up", { keyPath: 'customer_wx_openid' });
      // var objectStore = db.createObjectStore("visitor", { keyPath: "session_id" });

      // 创建一个索引来通过 name 搜索客户。
      // 可能会有重复的，因此我们不能使用 unique 索引。
      objectStore3.createIndex("session_id", "session_id", { unique: false });
      objectStore3.createIndex("customer_wx_nickname", "customer_wx_nickname", { unique: false });

      // 我们希望确保不会有两个客户使用相同的 appid ，
      objectStore3.createIndex("appid", "appid", { unique: false });
      // 客户微信openid
      // objectStore.createIndex('customer_wx_openid' ,"customer_wx_openid", { unique: false });
      // 图像
      objectStore3.createIndex('customer_wx_portrait' ,"customer_wx_portrait", { unique: false });
      // 客户id
      objectStore3.createIndex('customer_service_id' ,"customer_service_id", { unique: false });
      // 添加事件
      objectStore3.createIndex('add_time' ,"add_time", { unique: false });
      // 商户
      objectStore3.createIndex('app_name' ,"app_name", { unique: false });
      // 会话状态 -2超时关闭 -1会话关闭 0等待接入 1会话中
      objectStore3.createIndex('state' ,"state", { unique: false });
      // 客服id
      objectStore3.createIndex('uid' ,"uid", { unique: false });
      // 所属商户id
      objectStore3.createIndex('company_id' ,"company_id", { unique: false });
      // 是否已读
      objectStore3.createIndex('is_get' ,"is_get", { unique: false });
      //
      objectStore3.createIndex('session_frequency' ,"session_frequency", { unique: false });

      objectStore3.createIndex('invitation_frequency' ,"invitation_frequency", { unique: false });




      //@@@  创建会话数据表（储存对象）  @@@//
      var objectStore1 = db.createObjectStore("message", { autoIncrement: true });

      // 创建一个索引来通过 name 搜索客户。
      // 可能会有重复的，因此我们不能使用 unique 索引。
      objectStore1.createIndex("name", "session_id", { unique: false });
      objectStore1.createIndex("customer_wx_openid", "customer_wx_openid", { unique: false });

      // 我们希望确保不会有两个客户使用相同的 appid ，
      objectStore1.createIndex("appid", "appid", { unique: false });
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
      console.log('DB version changed, db version: ', this.db.version);
    };
    request.onerror = e => {console.info('Can not open indexedDB', e);};
  }
  get(tabName, callback, key){
      const transaction = this.db.transaction(this.tabName);
      const objectStore = transaction.objectStore(this.tabName);
      let request = null;
      if (this.key) {
        request = objectStore.get(this.key);
      } else {
        request = objectStore.getAll();
      }
      request.onerror = e => {
        console.info(e);
      };
      request.onsuccess = e => {callback(e.target.result);};
  }
  set(tabName ,data, callback, key){
    const transaction = this.db.transaction(tabName, 'readwrite');
    const objectStore = transaction.objectStore(tabName);
    for (var i in data) {
      console.log(data[i])
      var request = objectStore.add(data[i]);
      request.onsuccess = function(event) {
        var result = event.target.result;
        callback(event.target.result);
      };
      request.onerror = e => {
        console.info('Can not add value ....', e);
      };
    }
    // let oldValue;
    // this.get(key, function(res){oldValue = res;});
    //
    // if(oldValue){
    //   console.info('You should use function update');
    // }else{
    //   const transaction = this.db.transaction(this.storeName, 'readwrite');
    //   const objectStore = transaction.objectStore(this.storeName);
      // const request = objectStore.add(value, key);


  }
  update(tabName ,data, callback, key){
    const transaction = this.db.transaction(tabName, 'readwrite');
    const objectStore = transaction.objectStore(tabName);
    for (var i in data) {
      console.log(data[i])
      var request = objectStore.put(data[i]);
      request.onsuccess = function(event) {
        var result = event.target.result;
        callback(event.target.result);
      };
      request.onerror = e => {
        console.info('Can not add value', e);
      };
    }
  }
  remove(tabName, fun, key){
    const request = this.db.transaction(tabName, 'readwrite')
      .objectStore(tabName)
      .delete(key);
    request.onsuccess = function(event) {
      fun(event.target.result);
    };
    request.onerror = e => {console.info('Can not remove value', e);};
  }
  close(){
    this.db.close();
  }







// class webDB {
//   constructor (nema) {
//     console.log('哈哈哈');
//     this.name = name;
//     this.db = null;
//     //第一个参数是数据库的名称，第二个参数是数据库的版本号
//     this.myDB =  window.indexedDB.open('mysql');
//     // 如果打开失败
//     this.myDB.onerror = function(event){
//       console.log("打开IndexedDB失败", event);
//     };
//     //onupgradeneeded事件在 第一次打开页面初始化数据库 或 当有版本号变化 时 会被调用
//     this.myDB.onupgradeneeded   = function(event){
//       console.log('执行了onupgradeneeded');
//       var db = event.target.result;
//       //@@@  创建会话人员列表（储存对象）  @@@//
//       // 创建一个对象存储空间来持有有关我们客户的信息。
//       // 我们将使用 "customer_wx_openid" 作为我们的 key path 因为它保证是唯一的。
//       var objectStore = db.createObjectStore("visitor", { keyPath: 'customer_wx_openid' });
//       // var objectStore = db.createObjectStore("visitor", { keyPath: "session_id" });
//
//       // 创建一个索引来通过 name 搜索客户。
//       // 可能会有重复的，因此我们不能使用 unique 索引。
//       objectStore.createIndex("session_id", "session_id", { unique: false });
//       objectStore.createIndex("customer_wx_nickname", "customer_wx_nickname", { unique: false });
//
//       // 我们希望确保不会有两个客户使用相同的 appid ，
//       objectStore.createIndex("appid", "appid", { unique: false });
//       // 客户微信openid
//       // objectStore.createIndex('customer_wx_openid' ,"customer_wx_openid", { unique: false });
//       // 图像
//       objectStore.createIndex('customer_wx_portrait' ,"customer_wx_portrait", { unique: false });
//       // 客户id
//       objectStore.createIndex('customer_service_id' ,"customer_service_id", { unique: false });
//       // 添加事件
//       objectStore.createIndex('add_time' ,"add_time", { unique: false });
//       // 商户
//       objectStore.createIndex('app_name' ,"app_name", { unique: false });
//       // 会话状态 -2超时关闭 -1会话关闭 0等待接入 1会话中
//       objectStore.createIndex('state' ,"state", { unique: false });
//       // 客服id
//       objectStore.createIndex('uid' ,"uid", { unique: false });
//       // 所属商户id
//       objectStore.createIndex('company_id' ,"company_id", { unique: false });
//       // 是否已读
//       objectStore.createIndex('is_get' ,"is_get", { unique: false });
//       //
//       objectStore.createIndex('session_frequency' ,"session_frequency", { unique: false });
//
//       objectStore.createIndex('invitation_frequency' ,"invitation_frequency", { unique: false });
//
//       //@@@  waiting 等待会话数据表（储存对象）  @@@//
//       // 创建一个对象存储空间来持有有关我们客户的信息。
//       // 我们将使用 "customer_wx_openid" 作为我们的 key path 因为它保证是唯一的。
//       var objectStore2 = db.createObjectStore("waiting", { keyPath: 'customer_wx_openid' });
//       // var objectStore = db.createObjectStore("visitor", { keyPath: "session_id" });
//
//       // 创建一个索引来通过 name 搜索客户。
//       // 可能会有重复的，因此我们不能使用 unique 索引。
//       objectStore2.createIndex("session_id", "session_id", { unique: false });
//       objectStore2.createIndex("customer_wx_nickname", "customer_wx_nickname", { unique: false });
//
//       // 我们希望确保不会有两个客户使用相同的 appid ，
//       objectStore2.createIndex("appid", "appid", { unique: false });
//       // 客户微信openid
//       // objectStore.createIndex('customer_wx_openid' ,"customer_wx_openid", { unique: false });
//       // 图像
//       objectStore2.createIndex('customer_wx_portrait' ,"customer_wx_portrait", { unique: false });
//       // 客户id
//       objectStore2.createIndex('customer_service_id' ,"customer_service_id", { unique: false });
//       // 添加事件
//       objectStore2.createIndex('add_time' ,"add_time", { unique: false });
//       // 商户
//       objectStore2.createIndex('app_name' ,"app_name", { unique: false });
//       // 会话状态 -2超时关闭 -1会话关闭 0等待接入 1会话中
//       objectStore2.createIndex('state' ,"state", { unique: false });
//       // 客服id
//       objectStore2.createIndex('uid' ,"uid", { unique: false });
//       // 所属商户id
//       objectStore2.createIndex('company_id' ,"company_id", { unique: false });
//       // 是否已读
//       objectStore2.createIndex('is_get' ,"is_get", { unique: false });
//       //
//       objectStore2.createIndex('session_frequency' ,"session_frequency", { unique: false });
//
//       objectStore2.createIndex('invitation_frequency' ,"invitation_frequency", { unique: false });
//
//
//
//       //@@@  创建会话数据表（储存对象）  @@@//
//       var objectStore1 = db.createObjectStore("message", { keyPath: "message_id" });
//
//       // 创建一个索引来通过 name 搜索客户。
//       // 可能会有重复的，因此我们不能使用 unique 索引。
//       objectStore1.createIndex("name", "session_id", { unique: false });
//
//       // 我们希望确保不会有两个客户使用相同的 appid ，
//       objectStore1.createIndex("appid", "appid", { unique: false });
//       // 客户微信openid
//       objectStore1.createIndex('customer_wx_openid' ,"customer_wx_openid", { unique: false });
//       // 图像
//       objectStore1.createIndex('customer_wx_portrait' ,"customer_wx_portrait", { unique: false });
//       // 客户id
//       objectStore1.createIndex('customer_service_id' ,"customer_portrait_id", { unique: false });
//       // 添加事件
//       objectStore1.createIndex('add_time' ,"add_time", { unique: false });
//       // 操作码 1客服发送消息 2客服接受消息
//       objectStore1.createIndex('opercode' ,"opercode", { unique: false });
//       // 消息文本内容
//       objectStore1.createIndex('text' ,"text", { unique: false });
//       // 消息类型 0其他 1文本 2图片 3语言 4视频 5坐标 6链接
//       objectStore1.createIndex('message_type' ,"message_type", { unique: false });
//       // 文件链接
//       objectStore1.createIndex('file_url' ,"file_url", { unique: false });
//       // 经度
//       objectStore1.createIndex('lng' ,"lng", { unique: false });
//       // 纬度
//       objectStore1.createIndex('lat' ,"lat", { unique: false });
//       // 是否已读
//       objectStore1.createIndex('is_read' ,"is_read", { unique: false });
//       // 会话id
//       objectStore1.createIndex('session_id' ,"session_id", { unique: false });
//       // 客服id
//       objectStore1.createIndex('uid' ,"uid", { unique: false });
//       // 素材id
//       objectStore1.createIndex('media_id' ,"media_id", { unique: false });
//       // 链接页面标题
//       objectStore1.createIndex('page_title' ,"page_title", { unique: false });
//       // 链接页面描述
//       objectStore1.createIndex('page_desc' ,"page_desc", { unique: false });
//       // 地图缩放大小
//       objectStore1.createIndex('map_scale' ,"map_scale", { unique: false });
//       // 地图位置描述
//       objectStore1.createIndex('map_label' ,"map_label", { unique: false });
//       // 地图静态图url
//       objectStore1.createIndex('map_img' ,"map_img", { unique: false });
//       // 系统本地资源id
//       objectStore1.createIndex('resources_id' ,"resources_id", { unique: false });
//     };
//   }
  // addData (obj) {
  //   this.myDB.onerror = function(event){
  //     console.log("打开IndexedDB失败", event);
  //   };
  //   this.myDB.onsuccess  = function(event){
  //     var db = event.target.result;
  //     var transaction = db.transaction([obj.name], 'readwrite');
  //     // 当所有的数据都被增加到数据库时执行一些操作
  //     transaction.oncomplete = function(event) {
  //       console.log('添加成功13221');
  //     };
  //     transaction.onerror = function(event) {
  //       console.log(event);
  //       // 错误处理!
  //     };
  //     var objectStore = transaction.objectStore(obj.name);
  //     for (var i in obj.data) {
  //       console.log(obj.data[i]);
  //       var request = objectStore.put(obj.data[i]);
  //       request.onsuccess = function(event) {
  //         var result = event.target.result;
  //         console.log(result);
  //         db.close()
  //         // event.target.result == customerData[i].ssn
  //       };
  //     }
  //   }
  // }
  // 查询数据
  // getting (obj) {
  //   let request;
  //   this.myDB.onerror = function(event){
  //     console.log("打开IndexedDB失败", event);
  //   };
  //   this.myDB.onsuccess  = function(event){
  //     var db = event.target.result;
  //     var transaction = db.transaction([obj.name], 'readwrite');
  //     transaction.onerror = function(event) {
  //       // 不要忘记进行错误处理！
  //       console.log('报错了', event);
  //       obj.error(event.target.errorCode)
  //     };
  //     var objectStore = transaction.objectStore(obj.name);
  //     if(obj.key){
  //       request = objectStore.get(obj.key);
  //     } else {
  //       request = objectStore.getAll();
  //     }
  //     request.onsuccess = function(event) {
  //       var result = event.target.result;
  //       obj.success(result);
  //       db.close()
  //       console.log('数据库已关闭')
  //     };
  //   }
  // }
  // 删除数据
  // delData (obj) {
  //   let request;
  //   this.myDB.onerror = function(event){
  //     console.log("打开IndexedDB失败", event);
  //   };
  //   this.myDB.onsuccess  = function(event){
  //     conosle.log(event);
  //     var db = event.target.result;
  //     var transaction = db.transaction([obj.name], 'readwrite');
  //     transaction.onerror = function(event) {
  //       // 不要忘记进行错误处理！
  //       console.log('报错了1321', event);
  //       obj.error(event.target.errorCode)
  //     };
  //     var objectStore = transaction.objectStore(obj.name);
  //     request = objectStore.delete(obj.delKey);
  //     request.onsuccess = function(event) {
  //       var result = event.target.result;
  //       obj.success(result);
  //       db.close()
  //     };
  //   }
  // }
}
export default IndexedDB
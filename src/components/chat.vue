<template>
  <div class="container bootstrap snippet">
  <div class="row">
    <div class="col-md-4 bg-white ">
      <div class=" row border-bottom padding-sm " style="height: 40px;">
      <strong>好友列表</strong>
      </div>
      <!-- =============================================================== -->
      <!-- member list -->
      <ul class="friend-list" v-for="friend in friends">
        <li>
          <a href="#" class="clearfix">
            <img :src="friend.Avatar" alt="" class="img-circle">
            <div class="friend-name">
              <strong>{{ friend.Username }}</strong>
            </div>
            <div class="last-message text-muted">{{ friend.LastMessage }}</div>
            <small class="time text-muted">{{ friend.LastMessageTime }}</small>
            <small class="chat-alert label label-danger" v-if=" friend.UnreadCount > 0">{{ friend.UnreadCount }}</small>
          </a>
        </li>
      </ul>
    </div>
    <!--=========================================================-->
    <!-- selected chat -->
    <div class="col-md-8 bg-white ">
    <div class="chat-message">
      <ul class="chat" v-for="message in messages">
            <div v-if="message.Sender == self.UserID">
            <li class="right clearfix">
                <span class="chat-img pull-right">
                <img :src="self.Avatar" alt="User Avatar">
                </span>
                <div class="chat-body clearfix">
                   <div class="header">
                      <strong class="primary-font">{{ self.Username }}</strong>
                      <small class="pull-right text-muted"><i class="fa fa-clock-o"></i>{{ message.InsertTime }}</small>
                   </div>
                   <p>{{ message.Content }}</p>
                </div>
            </li>
            </div>
            <div v-else>
            <li class="left clearfix">
                <span class="chat-img pull-left">
                <img :src="friend.Avatar" alt="User Avatar">
                </span>
                <div class="chat-body clearfix">
                   <div class="header">
                      <strong class="primary-font">{{ friend.Username }}</strong>
                      <small class="pull-right text-muted"><i class="fa fa-clock-o"></i>{{ message.InsertTime }}</small>
                   </div>
                   <p>{{ message.Content }}</p>
                </div>
            </li>
            </div>

      </ul>
    </div>
    <div class="chat-box bg-white">
      <div class="input-group">
        <input class="form-control border no-shadow no-rounded" placeholder="Type your message here">
        <span class="input-group-btn">
        <button class="btn btn-success no-rounded" type="button">Send</button>
        </span>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data () {
    return {
      friends: [
        {Username: 'zpc', Avatar: 'http://p.sootoo.com/son_media/msg/2014/09/02/652581.jpeg', LastMessage: 'nono', LastMessageTime: '11:00', UnreadCount: 2, UserID: 1},
        {Username: 'wzy', Avatar: 'http://square.b0.upaiyun.com/2013/09/17/Ekd8I2gM.jpg', LastMessage: 'nadsono', LastMessageTime: '', UnreadCount: 0, UserID: 2}
      ],
      self: {Username: 'zeng', Avatar: 'http://square.b0.upaiyun.com/2013/09/17/Ekd8I2gM.jpg', UserID: 123},
      friend: {Username: 'wang', Avatar: 'http://p.sootoo.com/son_media/msg/2014/09/02/652581.jpeg', UserID: 133},
      messages: [
        {MessageID: 12, Content: 'aaabbb', Sender: 123, Receiver: 133, InsertTime: 1333},
        {MessageID: 13, Content: 'aaabbbad', Sender: 133, Receiver: 123, InsertTime: 13334},
        {MessageID: 14, Content: '---', Sender: 133, Receiver: 123, InsertTime: 133345},
        {MessageID: 15, Content: '-**--', Sender: 123, Receiver: 133, InsertTime: 133346}
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

body {
  padding-top: 0;
  font-size: 12px;
  color: #777;
  background: #f9f9f9;
  font-family: 'Open Sans',sans-serif;
  margin-top:20px;
}

.bg-white {
  background-color: #fff;
}

.friend-list {
  list-style: none;
margin-left: -40px;
}

.friend-list li {
  border-bottom: 1px solid #eee;
}

.friend-list li a img {
  float: left;
  width: 45px;
  height: 45px;
  margin-right: 0px;
}

 .friend-list li a {
  position: relative;
  display: block;
  padding: 10px;
  transition: all .2s ease;
  -webkit-transition: all .2s ease;
  -moz-transition: all .2s ease;
  -ms-transition: all .2s ease;
  -o-transition: all .2s ease;
}

.friend-list li.active a {
  background-color: #f1f5fc;
}

.friend-list li a .friend-name, 
.friend-list li a .friend-name:hover {
  color: #777;
}

.friend-list li a .last-message {
  width: 65%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.friend-list li a .time {
  position: absolute;
  top: 10px;
  right: 8px;
}

small, .small {
  font-size: 85%;
}

.friend-list li a .chat-alert {
  position: absolute;
  right: 8px;
  top: 27px;
  font-size: 10px;
  padding: 3px 5px;
}

.chat-message {
  padding: 60px 20px 115px;
}

.chat {
    list-style: none;
    margin: 0;
}

.chat-message{
    background: #f9f9f9;  
}

.chat li img {
  width: 45px;
  height: 45px;
  border-radius: 50em;
  -moz-border-radius: 50em;
  -webkit-border-radius: 50em;
}

img {
  max-width: 100%;
}

.chat-body {
  padding-bottom: 20px;
}

.chat li.left .chat-body {
  margin-left: 70px;
  background-color: #fff;
}

.chat li .chat-body {
  position: relative;
  font-size: 11px;
  padding: 10px;
  border: 1px solid #f1f5fc;
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
  -moz-box-shadow: 0 1px 1px rgba(0,0,0,.05);
  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
}

.chat li .chat-body .header {
  padding-bottom: 5px;
  border-bottom: 1px solid #f1f5fc;
}

.chat li .chat-body p {
  margin: 0;
}

.chat li.left .chat-body:before {
  position: absolute;
  top: 10px;
  left: -8px;
  display: inline-block;
  background: #fff;
  width: 16px;
  height: 16px;
  border-top: 1px solid #f1f5fc;
  border-left: 1px solid #f1f5fc;
  content: '';
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
}

.chat li.right .chat-body:before {
  position: absolute;
  top: 10px;
  right: -8px;
  display: inline-block;
  background: #fff;
  width: 16px;
  height: 16px;
  border-top: 1px solid #f1f5fc;
  border-right: 1px solid #f1f5fc;
  content: '';
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}

.chat li {
  margin: 15px 0;
}

.chat li.right .chat-body {
  margin-right: 70px;
  background-color: #fff;
}

.chat-box {
  position: fixed;
  bottom: 0;
  left: 444px;
  right: 0;
  padding: 15px;
  border-top: 1px solid #eee;
  transition: all .5s ease;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -ms-transition: all .5s ease;
  -o-transition: all .5s ease;
}

.primary-font {
  color: #3c8dbc;
}

a:hover, a:active, a:focus {
  text-decoration: none;
  outline: 0;
}
</style>

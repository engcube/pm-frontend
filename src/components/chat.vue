<template>
  <div class="container bootstrap snippet">
  <div class="row">
    <div class="col-md-4 bg-white ">
      <div class=" row border-bottom padding-sm " style="height: 40px;">
      <strong>好友列表</strong>
      </div>
      <!-- =============================================================== -->
      <!-- member list -->
      <ul class="friend-list" v-for="f in orderedFriends">
        <li :class="{ 'active bounceInDown': f.UserID == friend.UserID }" >
          <a href="#" class="clearfix">
            <img :src="f.Avatar" alt="" class="img-circle" @click="showMsg(f)">
            <div class="friend-name" @click="showMsg(f)">
              <strong>{{ f.Username }}</strong>
            </div>
            <small class="chat-alert label label-danger" v-if=" f.UnreadCount > 0">{{ f.UnreadCount }}</small>
            <div>
            <span class="btn remove_fields pull-right" @click="deleteFriend(f)"><i class="icon-trash icon-white"></i> Delete</span>
            </div>
          </a>
        </li>
      </ul>
    <div class="add-box bg-white">
      <div class="input-group">
        <input class="form-control border no-shadow no-rounded" placeholder="Add Friend Email Here" v-model="email">
        <span class="input-group-btn">
        <button class="btn btn-success no-rounded" type="button" v-on:click="newFriend">添加</button>
        </span>
      </div>
    </div>

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
                  <span class="btn remove_fields pull-right" @click="deleteMessage(message)" v-if=" message.Sender === self.UserID "><i class="icon-trash icon-white"></i> Delete</span>
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
        <input class="form-control border no-shadow no-rounded" placeholder="Type your message here" v-model="messageContent">
        <span class="input-group-btn">
        <button class="btn btn-success no-rounded" type="button" v-on:click="newMessage">Send</button>
        </span>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'chat',
  data () {
    return {
      email: '',
      messageContent: '',
      friends: [],
      self: {},
      friend: {},
      messages: []
      // {MessageID: 12, Content: 'aaabbb', Sender: 123, Receiver: 133, InsertTime: 1333},
    }
  },
  created: function () {
    this.initData()
  },
  computed: {
    orderedFriends: function () {
      return _.orderBy(this.friends, 'UserID')
    }
  },
  methods: {
    initData () {
      this.friend = {}
      let apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/user'
      this.$http.get(apiurl, {timeout: 3000}).then(res => {
        if (res.body.hasOwnProperty('Error')) {
          console.log(res.body.Error)
          return
        }
        this.self.Username = res.body.Username
        this.self.Avatar = global.User1Avatar
        this.self.UserID = res.body.UserID
        apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/friend'
        this.$http.get(apiurl, {timeout: 3000}).then(res => {
          if (res.body.hasOwnProperty('Error')) {
            console.log(res.body.Error)
            return
          }
          let tmpFriends = []
          for (var i = 0; i < res.body.length; i++) {
            let friend = res.body[i]
            let itime = ''
            if (friend.LastMessage.InsertTime !== null) {
              itime = (new Date(friend.LastMessage.InsertTime * 1000)).toISOString()
            }
            let fd = {Username: friend.Nickname, Avatar: global.Avatars[i % 2], LastMessage: friend.LastMessage.Content, LastMessageTime: itime, UnreadCount: friend.UnreadCount, UserID: friend.FriendUserID, FriendID: friend.FriendID, Email: friend.Email}
            tmpFriends[i] = fd
          }
          this.friends = tmpFriends
          if (this.friends.length > 0) {
            this.friend = this.friends[0]
            this.listMessages()
          }
        }, res => {
          console.log('error')
        })
      }, res => {
        console.log('error')
      })
    },
    deleteMessage (message) {
      console.log(message)
      let apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/message'
      this.$http.delete(apiurl, {body: {MessageID: message.MessageID}, timeout: 3000}).then(res => {
        if (res.body.hasOwnProperty('Error')) {
          console.log(res.body)
          return
        }
        this.listMessages()
      }, res => {
        console.log('http post error')
      })
    },
    showMsg (user) {
      this.friend = user
      this.messages = []
      this.listMessages()
      this.listFriends()
    },
    deleteFriend (user) {
      console.log(user)
      console.log(user.FriendID)
      let apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/friend'
      this.$http.delete(apiurl, {body: {FriendID: user.FriendID}, timeout: 3000}).then(res => {
        if (res.body.hasOwnProperty('Error')) {
          console.log(res.body)
          return
        }
        this.listFriends()
        if (this.friend.UserID === user.UserID) {
          this.friend = {}
          this.messages = []
        }
        this.listMessages()
      }, res => {
        console.log('http post error')
      })
    },
    addFriend () {
      let apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/friend'
      this.$http.post(apiurl, {Email: this.email}, {timeout: 3000}).then(res => {
        if (res.body.hasOwnProperty('Error')) {
          console.log(res.body)
          return
        }
        this.listFriends()
      }, res => {
        console.log('http post error')
      })
    },
    sendMessage () {
      let apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/message'
      this.$http.post(apiurl, {RecieverEmail: this.friend.Email, Content: this.messageContent}, {timeout: 3000}).then(res => {
        if (res.body.hasOwnProperty('Error')) {
          console.log(res.body)
          return
        }
        this.listMessages()
      }, res => {
        console.log('http post error')
      })
    },
    newFriend () {
      if (this.email !== '') {
        this.addFriend()
      }
      this.email = ''
    },
    newMessage () {
      if (this.messageContent !== '') {
        this.sendMessage()
      }
      this.messageContent = ''
    },
    describeMyself () {
      let apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/user'
      this.$http.get(apiurl, {timeout: 3000}).then(res => {
        if (res.body.hasOwnProperty('Error')) {
          console.log(res.body.Error)
          return
        }
        this.self.Username = res.body.Username
        this.self.Avatar = global.User1Avatar
        this.self.UserID = res.body.UserID
      }, res => {
        console.log('error')
      })
    },
    listFriends () {
      let apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/friend'
      this.$http.get(apiurl, {timeout: 3000}).then(res => {
        if (res.body.hasOwnProperty('Error')) {
          console.log(res.body.Error)
          return
        }
        let tmpFriends = []
        for (var i = 0; i < res.body.length; i++) {
          let friend = res.body[i]
          let itime = ''
          if (friend.LastMessage.InsertTime !== null) {
            itime = (new Date(friend.LastMessage.InsertTime * 1000)).toISOString()
          }
          let fd = {Username: friend.Nickname, Avatar: global.Avatars[i % 2], LastMessage: friend.LastMessage.Content, LastMessageTime: itime, UnreadCount: friend.UnreadCount, UserID: friend.FriendUserID, FriendID: friend.FriendID, Email: friend.Email}
          console.log(fd)
          tmpFriends[i] = fd
        }
        this.friends = tmpFriends
      }, res => {
      })
    },
    listMessages () {
      let apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/message/' + this.friend.UserID
      this.$http.get(apiurl, {timeout: 3000}).then(res => {
        if (res.body.hasOwnProperty('Error')) {
          console.log(res.body.Error)
          return
        }
        let tmpMessages = []
        let i = 0
        let j = 0
        let k = 0
        if (res.body.length === 0) {
          return
        }
        let user = res.body[0]
        let rmsgs = user.RecieveMsgs
        let smsgs = user.SentMsgs
        if (rmsgs === null) {
          rmsgs = []
        }
        if (smsgs === null) {
          smsgs = []
        }
        for (; i < rmsgs.length && j < smsgs.length;) {
          let message = {}
          if (rmsgs[i].InsertTime < smsgs[j].InsertTime) {
            message = rmsgs[i]
            i++
          } else {
            message = smsgs[j]
            j++
          }
          let msg = {MessageID: message.MessageID, Content: message.Content, Sender: message.Sender, Reveiver: message.Receiver, InsertTime: (new Date(message.InsertTime * 1000)).toISOString()}
          tmpMessages[k] = msg
          k++
        }
        for (; i < rmsgs.length; i++) {
          let message = rmsgs[i]
          let msg = {MessageID: message.MessageID, Content: message.Content, Sender: message.Sender, Reveiver: message.Receiver, InsertTime: (new Date(message.InsertTime * 1000)).toISOString()}
          tmpMessages[k] = msg
          k++
        }
        for (; j < smsgs.length; j++) {
          let message = smsgs[j]
          let msg = {MessageID: message.MessageID, Content: message.Content, Sender: message.Sender, Reveiver: message.Receiver, InsertTime: (new Date(message.InsertTime * 1000)).toISOString()}
          tmpMessages[k] = msg
          k++
        }
        this.messages = tmpMessages
      }, res => {
        console.log('error')
      })
    }
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

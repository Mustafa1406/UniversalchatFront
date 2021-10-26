import { Component } from '@angular/core';
import { ChatService } from '../app/service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Chat';
    user:String;
    room:String;
    messageText:String;
    messageArray = [];
  constructor(private chatservice : ChatService) {}

  ngOnInit() {
// Service Function called
    this.chatservice.newUserJoined()
    .subscribe((data)=>{ 
      console.log("newUserJoin",data);
      this.messageArray.push(data);
    });

    this.chatservice.userLeftRoom()
    .subscribe((data)=>{
      console.log("userLeft Room",data);
      this.messageArray.push(data);
    });

    this.chatservice.newMessageReceived()
    .subscribe((data)=>{
      console.log("newMessageReceived",data);
      this.messageArray.push(data);
    });

  }

  join(){
    this.chatservice.joinRoom({user:this.user, room:this.room});
  }

  leave(){
      this.chatservice.leaveRoom({user:this.user, room:this.room});
  }

  sendMessage()
  {
      this.chatservice.sendMessage({user:this.user, room:this.room, message:this.messageText});
      this.messageText = '';
  }

}

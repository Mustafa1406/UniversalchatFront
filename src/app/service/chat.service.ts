import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('https://universalchatapp.herokuapp.com');
  

  joinRoom(data)
  {
      this.socket.emit('join',data);
  }

  newUserJoined()
  {
      let observable = new Observable(observer=>{
        //   console.log();
          this.socket.on('new user joined', (data)=>{
            console.log('service data',data);
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  leaveRoom(data){
      this.socket.emit('leave',data);
  }

  userLeftRoom(){
      let observable = new Observable(observer=>{
          this.socket.on('left room', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  sendMessage(data)
  {
      this.socket.emit('message',data);
  }

  newMessageReceived(){
      let observable = new Observable(observer=>{
          this.socket.on('new message', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

}

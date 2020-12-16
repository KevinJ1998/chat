import { Component, OnInit } from '@angular/core';
import { TaskI } from '../models/task.interface';
import { TodoService } from '../services/todo.service';

@Component( {
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ],
} )
export class HomePage implements OnInit {
  chats: TaskI[];
  chatToSend: TaskI = {
    message: '',
    name: ''
  };

  names: any = [ 'Nico', 'Kev', 'Sebas', 'Chanty', 'Isra' ];

  constructor( private todoService: TodoService ) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe( ( todos ) => {
      console.log( 'Todoss', todos );
      this.chats = todos;
    } );
  }

  onRemove( idTask: string ) {
    this.todoService.removeTodo( idTask );
  }

  sendMessage() {
    const randomNumber = Math.floor( Math.random() * this.names.length );
    this.chatToSend.name = this.names[ randomNumber ];

    console.log( 'data', this.chatToSend, randomNumber );
    this.todoService.addTodo( this.chatToSend ).then( () => {
      this.chatToSend.message = '';
    } );
  }
}

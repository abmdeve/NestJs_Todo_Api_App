// import { Controller } from '@nestjs/common';

// @Controller('todos')
// export class TodosController {}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  //   @Param()
  @Get(':id')
  findOneTodo(@Param('id') id: string) {
    return this.todosService.findOneTodo(id);
  }

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto) {
    //tslint:disable-next-line: no-console
    console.log('newTodo', newTodo);
    this.todosService.create(newTodo);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto) {
    return this.todosService.updateTodo(id, todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }
}

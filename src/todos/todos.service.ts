// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TodosService {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
    todos: Todo[] = [
        {
            id: 1,
            title: 'Todos app',
            description: 'Create NestJS todo app',
            done: false,
        },
        {
            id: 2,
            title: 'Bread',
            description: 'Buy bread',
            done: true,
        },
        {
            id: 3,
            title: 'Wine',
            description: 'Buy wine',
            done: true,
        },
    ];
    findAll(): Todo[]{
        return this.todos;
    }

    findOneTodo(id: string){
        return this.todos.find(todo => todo.id === Number(id));
    }

    create(todo: CreateTodoDto) {
        this.todos = [...this.todos, todo];
    }

    updateTodo(id: string, todo: Todo) {
        // Retrieve to todo to updatte
        const todoToUpdate = this.todos.find(todo => todo.id === +id);
        if (!todoToUpdate) {
            return new NotFoundException('Booooo did you find this todo')
        }
        // Apply to granulary update a single property
    }
}

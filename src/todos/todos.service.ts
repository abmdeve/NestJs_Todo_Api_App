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
        return this.todos.find(todo => todo.id === +id);
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
        if (todo.hasOwnProperty('done')) {
            todoToUpdate.done = todo.done;
        }
        if (todo.title) {
            todoToUpdate.title = todo.title;
        }
        if (todo.description) {
            todoToUpdate.description = todo.description;
        }
        const updatedTodos = this.todos.map(t => t.id !== +id ? t : todoToUpdate);
        this.todos = [...updatedTodos];
        return { updatedTodo: 1, todo: todoToUpdate };
    }

    deleteTodo(id: string){
        const nbrOfBeforeDelete = this.todos.length;
        this.todos = [...this.todos.filter(t => t.id !== +id)]
        if (this.todos.length < nbrOfBeforeDelete) {
            return {deletedTodos: 1, nbrTodos: this.todos.length};
        }else{
            return { deletedTodos: 0, nbrTodos: this.todos.length }; 
        }
    }
}

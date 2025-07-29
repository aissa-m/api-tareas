import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/tasks/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private tasksRepository: Repository<Task>
    ) {}

    async create(taskData: Partial<Task>): Promise<Task> {
        const task = this.tasksRepository.create(taskData);
        return this.tasksRepository.save(task);
    }
    async getAll(): Promise<Task[]> {
        return this.tasksRepository.find();
    }
    
    async getTaskById(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        return task;
    }
    async update(id: number, taskData: Partial<Task>): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        await this.tasksRepository.update(id, taskData);
        return this.getTaskById(id);
    }
    async delete(id: number): Promise<void> {
        await this.tasksRepository.delete(id);
    }
}

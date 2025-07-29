import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/tasks/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private tasksRepository: Repository<Task>
    ) { }

    async create(dto:CreateTaskDto, userId:number){
        const task = this.tasksRepository.create({ titulo: dto.title, user: { id: userId } });
        return this.tasksRepository.save(task);
    }
    async findAll(userId: number) {
        return this.tasksRepository.find({ where: { user: { id: userId } } });
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new Error(`Tarea no encontrada con id ${id}`);
        }
        return task;
    }
    async update(id: number, dto: UpdateTaskDto, userId: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task) throw new Error(`Tarea no encontrada con id ${id}`);
        if (task.user.id !== userId) throw new Error(`No tienes permiso para eliminar esta tarea`);

        Object.assign(task, dto);
        return this.tasksRepository.save(task);
    }

    async delete(id: number, userId: number): Promise<void> {
        const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task) throw new Error(`Tarea no encontrada con id ${id}`);
        if (task.user.id !== userId) throw new Error(`No tienes permiso para eliminar esta tarea`);

        await this.tasksRepository.delete(task);
    }
}

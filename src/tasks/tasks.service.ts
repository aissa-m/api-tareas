import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/tasks/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/entities/users/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private tasksRepository: Repository<Task>
    ) { }

    async create(dto: CreateTaskDto, userId: number) {
        const user = await this.tasksRepository.manager.findOneByOrFail(User, { id: userId });

        const task = this.tasksRepository.create({
            titulo: dto.titulo,
            completed: dto.completed ?? false,
            user, // ← usuario real
        });

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
    async update(id: number, dto: UpdateTaskDto, userId: number) {
        const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task) throw new Error(`Tarea no encontrada con id ${id}`);
        console.log('task.user.id:', task.user.id);
        console.log('userId:', userId);
        if (task.user.id !== userId) throw new Error(`No tienes permiso para modificar esta tarea`);

        if (!dto.titulo && dto.completed === undefined) {
            throw new Error('No se proporcionaron campos para actualizar');
        }

        Object.assign(task, dto);
        console.log('DTO recibido para update:', dto);
        console.log('Task antes de guardar:', task);
        return this.tasksRepository.save(task);
    }

    async delete(id: number, userId: number): Promise<void> {
        const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task) throw new Error(`Tarea no encontrada con id ${id}`);
        if (task.user.id !== userId) throw new Error(`No tienes permiso para eliminar esta tarea`);

        await this.tasksRepository.delete(task);
    }
}

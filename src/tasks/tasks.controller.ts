import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(
        private tasksService: TasksService,
    ) { }

    @Get()
    findAll(@Req() req: Request) {
        const user = req.user as { id: number };
        return this.tasksService.findAll(user['id']);
    }
    @Get(':id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(+id);
    }

    @Post()
    create(@Body() dto: CreateTaskDto, @Req() req: Request) {
        const user = req.user as { id: number };
        return this.tasksService.create(dto, user['id']);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req: Request) {
        const user = req.user as { id: number };
        return this.tasksService.update(+id, dto, user['id']);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string, @Req() req: Request) {
        const user = req.user as { id: number };
        return this.tasksService.delete(+id, user['id']);
    }
}



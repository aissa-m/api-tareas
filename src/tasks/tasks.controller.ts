import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { Request } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(
        private tasksService: TasksService,
    ) { }

    @Get()
    findAll(@Request() req) {
        const user = req.user as { id: number };
        return this.tasksService.findAll(user['id']);
    }
    @Get(':id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(+id);
    }

    @Post()
    create(@Body() dto: CreateTaskDto, @Request() req) {
        const user = req.user as { id: number };
        return this.tasksService.create(dto, user['id']);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Request() req) {
        const userId = req.user?.id;
        console.log('DTO:', dto);
        console.log('userId:', userId);
        console.log('User', req.user);
        return this.tasksService.update(+id, dto, userId);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Request() req) {
        const userId = req.user?.id;
        return this.tasksService.delete(+id, userId);
    }
}



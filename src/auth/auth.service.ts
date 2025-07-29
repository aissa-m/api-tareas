import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService:JwtService) {}
    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({email:dto.email, password:hashedPassword});
        await this.userRepo.save(user);
        return {message: 'Usuario creado exitosamente', userId: user.id};
    }

    async login(dto: LoginDto) {
        const user = await this.userRepo.findOne({ where: { email: dto.email } });
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = this.jwtService.sign({ userId: user.id, email: user.email });
        return {
            access_token: token
        };
    }
}

import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

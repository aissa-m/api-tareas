import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

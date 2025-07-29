import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    titulo:string

    @Column({default: false})
    completed:boolean

    @ManyToOne(() => User, user => user.tasks)
    user:User;
}
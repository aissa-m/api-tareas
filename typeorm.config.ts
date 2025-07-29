import { TypeOrmModule } from "@nestjs/typeorm";

TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'tareasdb',
  autoLoadEntities: true,
  synchronize: true,
})

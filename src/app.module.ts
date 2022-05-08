import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { InstituteModule } from './api/institutes/institutes.module';
import { Institute } from './api/institutes/institutes.enity';

import { DirectionModule } from './api/direction/direction.module';
import { Direction } from './api/direction/direction.enity';

import { GroupModule } from './api/group/group.module';
import { Group } from './api/group/group.enity';

import { StudentModule } from './api/student/student.module';
import { Student } from './api/student/student.enity';

import { TeacherModule } from './api/teacher/teacher.module';
import { Teacher } from './api/teacher/teacher.enity';

import { SubjectModule } from './api/subject/subject.module';
import { Subject } from './api/subject/subject.enity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'University',
      entities: [Institute, Direction, Group, Student, Teacher, Subject],
      synchronize: false,
    }),
    InstituteModule,
    DirectionModule,
    GroupModule,
    StudentModule,
    TeacherModule,
    SubjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

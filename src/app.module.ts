import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { InstituteModule } from './api/institutes/institutes.module';
import { Institute } from './api/institutes/institutes.entity';

import { DirectionModule } from './api/direction/direction.module';
import { Direction } from './api/direction/direction.entity';

import { GroupModule } from './api/group/group.module';
import { Group } from './api/group/group.entity';

import { StudentModule } from './api/student/student.module';
import { Student } from './api/student/student.entity';

import { TeacherModule } from './api/teacher/teacher.module';
import { Teacher } from './api/teacher/teacher.entity';

import { SubjectModule } from './api/subject/subject.module';
import { Subject } from './api/subject/subject.entity';
import { Connection } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true
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
// TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'University',
//   entities: [Institute, Direction, Group, Student, Teacher, Subject],
//   synchronize: false,
// }),
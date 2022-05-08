import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstituteModule } from './api/institutes/institutes.module';
import { DirectionModule } from './api/direction/direction.module';
import { GroupModule } from './api/group/group.module';
import { StudentModule } from './api/student/student.module';
import { TeacherModule } from './api/teacher/teacher.module';
import { SubjectModule } from './api/subject/subject.module';
import { StudyPlanModule } from './api/studyPlan/StudyPlan.module';



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
    SubjectModule,
    StudyPlanModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
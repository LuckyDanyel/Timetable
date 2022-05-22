import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from './group.entity';
import { Direction } from "../direction/direction.entity";

@Injectable()
export class GroupService {

    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>,
        @InjectRepository(Direction) private directionRepository: Repository<Direction>
    ){}
    
    async createGroups(groupedGroups: any): Promise<void> {
        for(let numberStroke in groupedGroups) {
            const name = groupedGroups[numberStroke][1];
            const direction = await this.directionRepository.findOne({ name });
            if(!direction) throw `This name not found ${name}`
            const group = new Group();
            group.name = groupedGroups[numberStroke][0];
            group.course = groupedGroups[numberStroke][2];
            group.direction = direction;
            await this.groupRepository.save(group);
        }
    }

    async getInstiuteByIdGroup(idGroup: number): Promise<any> {

    }
    
}
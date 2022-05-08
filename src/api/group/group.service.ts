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
            const nameDirection = groupedGroups[numberStroke][1];
            const direction = await this.directionRepository.findOne({ nameDirection });
            if(!direction) throw `This nameDirection not found ${nameDirection}`
            const group = new Group();
            group.nameGroup = groupedGroups[numberStroke][0];
            group.direction = direction;
            await this.groupRepository.save(group);
        }
    }
    
}
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Restaurant {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({ unique: true })
    name: string;

    @ApiProperty()
    @Column()
    document: string;

    @ApiProperty()
    @Column()
    type: string;

    @ApiProperty()
    @CreateDateColumn()
    created_at?: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updated_at?: Date;
}

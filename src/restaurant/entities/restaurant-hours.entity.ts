import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

export class hoursRange {
    @ApiProperty({ example: '00:00' })
    startTime: string;

    @ApiProperty({ example: '00:00' })
    endTime: string;
}

@Entity()
export class RestaurantHours {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: string;

    @ApiProperty()
    @Column('simple-json', { nullable: true })
    sunday?: hoursRange[];

    @ApiProperty()
    @Column('simple-json', { nullable: true })
    monday?: hoursRange[];

    @ApiProperty()
    @Column('simple-json', { nullable: true })
    tuesday?: hoursRange[];

    @ApiProperty()
    @Column('simple-json', { nullable: true })
    wednesday?: hoursRange[];

    @ApiProperty()
    @Column('simple-json', { nullable: true })
    thursday?: hoursRange[];

    @ApiProperty()
    @Column('simple-json', { nullable: true })
    friday?: hoursRange[];

    @ApiProperty()
    @Column('simple-json', { nullable: true })
    saturday?: hoursRange[];

    @ApiProperty({ type: () => Restaurant })
    @OneToOne(() => Restaurant, restaurant => restaurant.restaurantHours)
    restaurant: Restaurant;

    @ApiProperty()
    @CreateDateColumn()
    created_at?: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updated_at?: Date;
}
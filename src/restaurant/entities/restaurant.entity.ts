import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RestaurantHours } from "./restaurant-hours.entity";

@Entity()
export class Restaurant {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
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

    @ApiProperty({ type: () => RestaurantHours, nullable: true })
    @OneToOne(() => RestaurantHours, restaurantHours => restaurantHours.restaurant)
    @JoinColumn()
    restaurantHours?: RestaurantHours;

    @ApiProperty()
    @CreateDateColumn()
    created_at?: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updated_at?: Date;
}

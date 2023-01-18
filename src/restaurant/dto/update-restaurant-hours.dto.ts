import { ApiProperty } from "@nestjs/swagger";
import { hoursRange } from "../entities/restaurant-hours.entity";

export class UpdateRestaurantHoursDto {
    @ApiProperty({ type: [hoursRange], nullable: true })
    sunday: hoursRange[];

    @ApiProperty({ type: [hoursRange], nullable: true })
    monday: hoursRange[];

    @ApiProperty({ type: [hoursRange], nullable: true })
    tuesday: hoursRange[];

    @ApiProperty({ type: [hoursRange], nullable: true })
    wednesday: hoursRange[];

    @ApiProperty({ type: [hoursRange], nullable: true })
    thursday: hoursRange[];

    @ApiProperty({ type: [hoursRange], nullable: true })
    friday: hoursRange[];

    @ApiProperty({ type: [hoursRange], nullable: true })
    saturday: hoursRange[];
}
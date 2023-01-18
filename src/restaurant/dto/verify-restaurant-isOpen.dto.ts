import { ApiProperty } from "@nestjs/swagger";

export class VerifyIfRestaurantIsOpenDto {
    @ApiProperty({ format: 'date-time', example: '2023-01-18T20:12' })
    dateTime: Date;
}
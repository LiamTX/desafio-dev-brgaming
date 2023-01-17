import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    document: string;

    @ApiProperty()
    type: string;
}

import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;
}
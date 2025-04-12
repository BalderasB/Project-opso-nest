import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isString, IsString, MinLength } from "class-validator";

export class LoginUserDto{
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsString()
    @IsEmail()
    userEmail: string;

    @ApiProperty({
        default: "12345678"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
}
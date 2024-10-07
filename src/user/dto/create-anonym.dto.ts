import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnonymDto {
  @ApiProperty()
  @MaxLength(23, { message: 'Username zu lang' })
  @MinLength(4, { message: 'Username zu kurz' })
  @IsNotEmpty({ message: 'Username fehlt' })
  readonly name: string;
}

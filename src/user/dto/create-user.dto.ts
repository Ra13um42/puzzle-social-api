import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Keine gültige Email-Adresse' })
  @IsNotEmpty({ message: 'Email fehlt' })
  readonly email: string;

  @ApiProperty()
  @MaxLength(23, { message: 'Username zu lang' })
  @MinLength(2, { message: 'Username zu kurz' })
  @IsNotEmpty({ message: 'Username fehlt' })
  readonly name: string;

  @ApiProperty()
  @MinLength(7, { message: 'Passwort zu kurz' })
  @MaxLength(64, { message: 'Passwort zu lang' })
  @IsNotEmpty({ message: 'Passwort fehlt' })
  readonly password: string;
}

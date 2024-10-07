import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email fehlt' })
  readonly email: string;
  @IsNotEmpty({ message: 'Passwort fehlt' })
  readonly password: string;
}

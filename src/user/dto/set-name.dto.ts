import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SetNameDto {
  @MinLength(4, { message: 'Name zu kurz' })
  @MaxLength(24, { message: 'Name zu lang' })
  @IsNotEmpty({ message: 'Name darf nicht leer sein' })
  readonly name: string;
}

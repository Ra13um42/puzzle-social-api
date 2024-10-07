import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SetAboutDto {
  @MinLength(5, { message: 'Text zu kurz' })
  @MaxLength(128, { message: 'Text zu lang' })
  @IsNotEmpty({ message: 'Text darf nicht leer sein' })
  readonly about: string;
}

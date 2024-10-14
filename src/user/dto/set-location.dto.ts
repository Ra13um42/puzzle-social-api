import { location } from '../../location/models/location.type';
import { country } from '../../location/models/country.type';

export class SetLocationDto {
  readonly location: location;
  readonly country: country;
}

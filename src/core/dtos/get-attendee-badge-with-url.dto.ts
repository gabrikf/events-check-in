import {
  GetAttendeeBadgeDto,
  IGetAttendeeBadgeConstructorProps,
} from "./get-attendee-badge.dto";

interface IGetAttendeesBadgeWithUrlConstructorProps
  extends IGetAttendeeBadgeConstructorProps {
  checkInUrl: string;
}

export class GetAttendeeBadgeWithUrl extends GetAttendeeBadgeDto {
  checkInUrl: string;
  constructor({
    name,
    email,
    eventTitle,
    checkInUrl,
  }: IGetAttendeesBadgeWithUrlConstructorProps) {
    super({
      email,
      eventTitle,
      name,
    });
    this.checkInUrl = checkInUrl;
  }
}

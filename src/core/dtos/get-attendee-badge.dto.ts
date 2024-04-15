export interface IGetAttendeeBadgeConstructorProps {
  name: string;
  email: string;
  eventTitle: string;
  checkedInAt?: Date | null;
}
export class GetAttendeeBadgeDto {
  name: string;
  email: string;
  eventTitle: string;
  checkedInAt: Date | null;

  constructor(props: IGetAttendeeBadgeConstructorProps) {
    this.name = props.name;
    this.email = props.email;
    this.eventTitle = props.eventTitle;
    this.checkedInAt = props.checkedInAt ?? null;
  }
}

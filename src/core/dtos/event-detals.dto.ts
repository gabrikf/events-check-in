interface IEventDetailConstructorProps {
  id: string;
  title: string;
  details?: string | null;
  slug: string;
  maximumAttendees: number | null;
  attendeesAmount: number;
}

export class EventDetailDto {
  id: string;
  title: string;
  details: string | null;
  slug: string;
  maximumAttendees: number | null;
  attendeesAmount: number;

  constructor(props: IEventDetailConstructorProps) {
    this.id = props.id;
    this.title = props.title;
    this.details = props.details ?? null;
    this.slug = props.slug;
    this.maximumAttendees = props.maximumAttendees;
    this.attendeesAmount = props.attendeesAmount;
  }
}

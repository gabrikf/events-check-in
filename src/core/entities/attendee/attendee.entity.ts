import { Attendee } from "@prisma/client";

interface AttendeeConstructorProps {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  eventId: string;
  checkedInAt?: Date | null;
}

interface AttendeeCreateInput {
  name: string;
  email: string;
  eventId: string;
}

export class AttendeeEntity {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  eventId: string;
  checkedInAt: Date | null;

  private static lastId = 0;
  constructor(props: AttendeeConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.createdAt = props.createdAt;
    this.eventId = props.eventId;
    this.checkedInAt = props.checkedInAt ?? null;
  }

  static create({ email, eventId, name }: AttendeeCreateInput) {
    const id = ++AttendeeEntity.lastId;
    const createdAt = new Date();
    const attendee = new AttendeeEntity({
      id,
      name,
      email,
      createdAt,
      eventId,
    });
    return attendee;
  }

  checkIn(date?: Date) {
    this.checkedInAt = date ?? new Date();
    return this;
  }
  static reset() {
    AttendeeEntity.lastId = 0;
  }
}

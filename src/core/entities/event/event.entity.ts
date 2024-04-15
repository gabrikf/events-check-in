import { randomUUID } from "crypto";
import { generateSlug } from "../../../utils/generate-slug";
export interface EventCreateInput {
  title: string;
  details?: string | null | undefined;
  maximumAttendees?: number | null | undefined;
}

export interface EventConstructorProps {
  id: string;
  title: string;
  details?: string | null | undefined;
  slug: string;
  maximumAttendees?: number | null | undefined;
}

export class EventEntity {
  id: string;
  title: string;
  details: string | null;
  slug: string;
  maximumAttendees: number | null;
  constructor(props: EventConstructorProps) {
    this.id = props.id;
    this.title = props.title;
    this.details = props.details ?? null;
    this.slug = props.slug;
    this.maximumAttendees = props.maximumAttendees ?? null;
  }

  static create({ title, details, maximumAttendees }: EventCreateInput) {
    const id = randomUUID();
    const slug = generateSlug(title);
    const event = new EventEntity({
      id,
      title,
      details,
      slug,
      maximumAttendees,
    });
    return event;
  }
}

import { EventDetailDto } from "../../dtos/event-detals.dto";
import { EventEntity } from "../../entities/event/event.entity";
import { IAttendeeRepository } from "../attendee.repository";
import { IEventRepository } from "../event.repository";

export class InMemoryEventRepository implements IEventRepository {
  public attendeeRepository: IAttendeeRepository | null = null;
  private events: EventEntity[] = [];
  async insert(data: EventEntity): Promise<EventEntity> {
    this.events.push(data);
    return data;
  }
  async findBySlug(slug: string): Promise<EventEntity | null> {
    return this.events.find((obj) => obj.slug === slug) ?? null;
  }
  async findDetailsById(id: string): Promise<EventDetailDto | null> {
    if (!this.attendeeRepository) {
      throw new Error("attendee repository not initialized.");
    }
    const event = this.events.find((obj) => obj.id === id);
    if (!event) {
      return null;
    }
    const attendeesAmount =
      await this.attendeeRepository.countAttendeesByEventId(event.id);
    return new EventDetailDto({
      id: event.id,
      title: event.title,
      slug: event.slug,
      details: event.details,
      attendeesAmount,
      maximumAttendees: event.maximumAttendees,
    });
  }
}

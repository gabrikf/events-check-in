import { EventDetailDto } from "../dtos/event-detals.dto";
import { EventEntity } from "../entities/event/event.entity";

export interface IEventRepository {
  insert(data: EventEntity): Promise<EventEntity>;
  findBySlug(slug: string): Promise<EventEntity | null>;
  findDetailsById(id: string): Promise<EventDetailDto | null>;
}

import { CreateEventInput } from "../../../infra/schema/create-event.schema";
import { IEventRepository } from "../../repositories/event.repository";

import { inject, injectable } from "tsyringe";
import { EContainer } from "../../../infra/container/container.enum";
import { EventEntity } from "../../entities/event/event.entity";
import { ConflictError } from "../../errors/conflict.error";

@injectable()
export class CreateEventUseCase {
  constructor(
    @inject(EContainer.Event) private eventRepository: IEventRepository
  ) {}
  async execute(args: CreateEventInput): Promise<EventEntity> {
    const event = EventEntity.create(args);
    const slugAlreadyUsed = await this.eventRepository.findBySlug(event.slug);

    if (slugAlreadyUsed) {
      throw new ConflictError("This slug is already being used");
    }
    const createdEvent = await this.eventRepository.insert(event);
    return createdEvent;
  }
}

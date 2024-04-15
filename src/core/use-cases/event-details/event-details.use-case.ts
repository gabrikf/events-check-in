import { inject, injectable } from "tsyringe";
import { EContainer } from "../../../infra/container/container.enum";
import { IEventRepository } from "../../repositories/event.repository";
import { NotFoundError } from "../../errors/not-found.error";

@injectable()
export class EventDetailsUseCase {
  constructor(
    @inject(EContainer.Event) private readonly eventRepository: IEventRepository
  ) {}

  async execute(id: string) {
    const event = await this.eventRepository.findDetailsById(id);
    if (!event) {
      throw new NotFoundError("Event not found");
    }
    return event;
  }
}

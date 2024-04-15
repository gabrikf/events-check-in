import { inject, injectable } from "tsyringe";
import { EContainer } from "../../../infra/container/container.enum";
import { IAttendeeRepository } from "../../repositories/attendee.repository";
import { AttendeeEntity } from "../../entities/attendee/attendee.entity";
import { IEventRepository } from "../../repositories/event.repository";
import { ForbiddenError } from "../../errors/forbidden.error";
import { ConflictError } from "../../errors/conflict.error";
import { NotFoundError } from "../../errors/not-found.error";

export interface IRegisterInput {
  name: string;
  email: string;
  eventId: string;
}

@injectable()
export class RegisterUseCase {
  constructor(
    @inject(EContainer.Attendee)
    private readonly attendeeRepository: IAttendeeRepository,
    @inject(EContainer.Event)
    private readonly eventRepository: IEventRepository
  ) {}
  async execute(data: IRegisterInput) {
    const entity = AttendeeEntity.create(data);

    const alreadyRegistered = await this.attendeeRepository.findByEmailAndEvent(
      {
        email: entity.email,
        eventId: entity.eventId,
      }
    );
    if (alreadyRegistered) {
      throw new ConflictError(
        "This email is already registered for this event"
      );
    }
    const [event, amountOfAttendeesInEvent] = await Promise.all([
      this.eventRepository.findDetailsById(entity.eventId),
      this.attendeeRepository.countAttendeesByEventId(entity.eventId),
    ]);
    if (!event) {
      throw new NotFoundError("Event not found.");
    }
    if (
      event?.maximumAttendees &&
      amountOfAttendeesInEvent >= event.maximumAttendees
    ) {
      throw new ForbiddenError(
        "The maximum number of attendees for this event has been reached."
      );
    }
    const createdAttendee = await this.attendeeRepository.insert(entity);
    return createdAttendee;
  }
}

import { inject, injectable } from "tsyringe";
import { EContainer } from "../../../infra/container/container.enum";
import { ConflictError } from "../../errors/conflict.error";
import { NotFoundError } from "../../errors/not-found.error";
import { IAttendeeRepository } from "../../repositories/attendee.repository";

@injectable()
export class CheckInUseCase {
  constructor(
    @inject(EContainer.Attendee)
    private readonly attendeeRepository: IAttendeeRepository
  ) {}

  async execute(id: number) {
    const attendee = await this.attendeeRepository.findById(id);
    if (!attendee) {
      throw new NotFoundError("Attendee not found.");
    }
    if (attendee?.checkedInAt) {
      throw new ConflictError("Attendee already checked-in for this event.");
    }
    attendee.checkIn();
    const updated = await this.attendeeRepository.update({
      id,
      data: attendee,
    });
    return updated;
  }
}

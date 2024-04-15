import { inject, injectable } from "tsyringe";
import { EContainer } from "../../../infra/container/container.enum";
import { IAttendeeRepository } from "../../repositories/attendee.repository";
import { GetAttendeeBadgeWithUrl } from "../../dtos/get-attendee-badge-with-url.dto";
import { NotFoundError } from "../../errors/not-found.error";

export interface IGetAttendeeBadgeUseCaseInput {
  id: number;
  protocol: string;
  hostname: string;
}

@injectable()
export class GetAttendeeBadgeUseCase {
  constructor(
    @inject(EContainer.Attendee)
    private readonly attendeeRepository: IAttendeeRepository
  ) {}

  async execute(
    props: IGetAttendeeBadgeUseCaseInput
  ): Promise<GetAttendeeBadgeWithUrl> {
    const attendeeBadge = await this.attendeeRepository.findAttendeeBadgeById(
      props.id
    );
    if (!attendeeBadge) {
      throw new NotFoundError("Attendee not found.");
    }
    const baseUrl = `${props.protocol}://${props.hostname}`;
    const checkInPath = `/attendee/${props.id}/check-in`;
    const checkInUrl = new URL(checkInPath, baseUrl);
    return new GetAttendeeBadgeWithUrl({
      ...attendeeBadge,
      checkInUrl: checkInUrl.toString(),
    });
  }
}

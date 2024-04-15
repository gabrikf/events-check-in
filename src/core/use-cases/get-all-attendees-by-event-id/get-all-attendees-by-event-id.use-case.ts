import { inject, injectable } from "tsyringe";
import { EContainer } from "../../../infra/container/container.enum";
import { IAttendeeRepository } from "../../repositories/attendee.repository";
import { GetAllAttendeesPaginated } from "../../dtos/get-all-attendees-paginated.dto";

interface IGetAllAttendeesInput {
  eventId: string;
  page: number;
  limit: number;
  searchText?: string | null;
}

@injectable()
export class GetAllAttendeesByEventUseCase {
  constructor(
    @inject(EContainer.Attendee)
    private readonly attendeeRepository: IAttendeeRepository
  ) {}
  async execute(props: IGetAllAttendeesInput) {
    const result = await this.attendeeRepository.findAllPaginated(
      new GetAllAttendeesPaginated({
        eventId: props.eventId,
        page: props.page,
        limit: props.limit,
        query: props.searchText,
      })
    );
    return result;
  }
}

import {
  PaginationInputConstructorProps,
  PaginationInputDto,
} from "./shared/pagination.dto";

interface GetAllAttendeesPaginatedConstructorProps
  extends PaginationInputConstructorProps {
  eventId: string;
}

export class GetAllAttendeesPaginated extends PaginationInputDto {
  eventId: string;
  constructor({ eventId, ...rest }: GetAllAttendeesPaginatedConstructorProps) {
    super(rest);
    this.eventId = eventId;
  }
}

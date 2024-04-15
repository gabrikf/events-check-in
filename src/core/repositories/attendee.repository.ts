import { GetAllAttendeesPaginated } from "../dtos/get-all-attendees-paginated.dto";
import { GetAttendeeBadgeDto } from "../dtos/get-attendee-badge.dto";
import {
  PaginationInputDto,
  PaginationOutputDto,
} from "../dtos/shared/pagination.dto";
import { AttendeeEntity } from "../entities/attendee/attendee.entity";

export interface IFindByEmailAndEventInput {
  email: string;
  eventId: string;
}

export interface IUpdateAttendeeInput {
  id: number;
  data: AttendeeEntity;
}

export interface IAttendeeRepository {
  insert(data: AttendeeEntity): Promise<AttendeeEntity>;
  findByEmailAndEvent(
    params: IFindByEmailAndEventInput
  ): Promise<AttendeeEntity | null>;
  countAttendeesByEventId(eventId: string): Promise<number>;
  findAttendeeBadgeById(id: number): Promise<GetAttendeeBadgeDto | null>;
  findById(id: number): Promise<AttendeeEntity | null>;
  findAllPaginated(
    props: GetAllAttendeesPaginated
  ): Promise<PaginationOutputDto<AttendeeEntity>>;
  update(props: IUpdateAttendeeInput): Promise<AttendeeEntity>;
  bulkInsert(data: AttendeeEntity[]): Promise<AttendeeEntity[]>;
}

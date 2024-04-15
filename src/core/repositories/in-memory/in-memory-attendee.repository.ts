import { GetAllAttendeesPaginated } from "../../dtos/get-all-attendees-paginated.dto";
import { GetAttendeeBadgeDto } from "../../dtos/get-attendee-badge.dto";
import { PaginationOutputDto } from "../../dtos/shared/pagination.dto";
import { AttendeeEntity } from "../../entities/attendee/attendee.entity";
import {
  IAttendeeRepository,
  IFindByEmailAndEventInput,
  IUpdateAttendeeInput,
} from "../attendee.repository";
import { IEventRepository } from "../event.repository";

export class InMemoryAttendeeRepository implements IAttendeeRepository {
  constructor(private readonly eventRepository: IEventRepository) {}
  async bulkInsert(data: AttendeeEntity[]): Promise<AttendeeEntity[]> {
    this.attendees.push(...data);
    return data;
  }
  private attendees: AttendeeEntity[] = [];
  async insert(data: AttendeeEntity): Promise<AttendeeEntity> {
    this.attendees.push(data);
    return data;
  }
  async findByEmailAndEvent(
    params: IFindByEmailAndEventInput
  ): Promise<AttendeeEntity | null> {
    const attendee = this.attendees.find(
      (obj) => obj.email === params.email && obj.eventId === params.eventId
    );
    if (!attendee) {
      return null;
    }
    return attendee;
  }
  async countAttendeesByEventId(eventId: string): Promise<number> {
    const attendees = this.attendees.filter((obj) => obj.eventId === eventId);
    return attendees.length;
  }
  async findAttendeeBadgeById(id: number): Promise<GetAttendeeBadgeDto | null> {
    const attendee = this.attendees.find((obj) => obj.id === id);
    if (!attendee) {
      return null;
    }
    const event = await this.eventRepository.findDetailsById(attendee.eventId);
    if (!event) {
      return null;
    }
    return new GetAttendeeBadgeDto({
      email: attendee.email,
      name: attendee.name,
      eventTitle: event.title,
      checkedInAt: attendee.checkedInAt,
    });
  }
  async findById(id: number): Promise<AttendeeEntity | null> {
    return this.attendees.find((obj) => obj.id === id) ?? null;
  }
  async findAllPaginated(
    props: GetAllAttendeesPaginated
  ): Promise<PaginationOutputDto<AttendeeEntity>> {
    const filteredData = props.query
      ? this.attendees.filter(
          (obj) =>
            obj.name.includes(props.query as string) ||
            obj.email.includes(props.query as string)
        )
      : this.attendees;
    const paginatedValues = filteredData.slice(
      props.skip,
      props.skip + props.take
    );
    return new PaginationOutputDto({
      data: paginatedValues,
      count: filteredData.length,
    });
  }

  async update(props: IUpdateAttendeeInput): Promise<AttendeeEntity> {
    const attendeeIndex = this.attendees.findIndex(
      (obj) => obj.id === props.id
    );
    if (attendeeIndex > 0) {
      this.attendees[attendeeIndex] = props.data;
    }
    return props.data;
  }
}

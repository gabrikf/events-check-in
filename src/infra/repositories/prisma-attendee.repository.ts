import { Prisma } from "@prisma/client";
import { AttendeeEntity } from "../../core/entities/attendee/attendee.entity";
import {
  IAttendeeRepository,
  IFindByEmailAndEventInput,
  IUpdateAttendeeInput,
} from "../../core/repositories/attendee.repository";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma";
import { GetAttendeeBadgeDto } from "../../core/dtos/get-attendee-badge.dto";
import {
  PaginationInputDto,
  PaginationOutputDto,
} from "../../core/dtos/shared/pagination.dto";
import { GetAllAttendeesPaginated } from "../../core/dtos/get-all-attendees-paginated.dto";

export class PrismaAttendeeRepository implements IAttendeeRepository {
  private repository: Prisma.AttendeeDelegate<DefaultArgs>;
  constructor() {
    this.repository = prisma.attendee;
  }
  async bulkInsert(data: AttendeeEntity[]): Promise<AttendeeEntity[]> {
    const items = await prisma.$transaction(async (tx) => {
      return await Promise.all(
        data.map((item) =>
          tx.attendee.create({
            data: item,
          })
        )
      );
    });
    return items.map((attendee) => new AttendeeEntity(attendee));
  }
  async findAllPaginated(
    props: GetAllAttendeesPaginated
  ): Promise<PaginationOutputDto<AttendeeEntity>> {
    const [data, count] = await Promise.all([
      this.repository.findMany({
        take: props.take,
        skip: props.skip,
        where: props.query
          ? {
              eventId: props.eventId,
              OR: [
                {
                  name: {
                    contains: props.query,
                  },
                },
                {
                  email: {
                    contains: props.query,
                  },
                },
              ],
            }
          : {
              eventId: props.eventId,
            },
      }),
      this.repository.count({
        where: props.query
          ? {
              eventId: props.eventId,
              OR: [
                {
                  name: {
                    contains: props.query,
                  },
                },
                {
                  email: {
                    contains: props.query,
                  },
                },
              ],
            }
          : {
              eventId: props.eventId,
            },
      }),
    ]);
    const result = new PaginationOutputDto({
      data: data.map(
        (attendee) =>
          new AttendeeEntity({
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            eventId: attendee.eventId,
            createdAt: attendee.createdAt,
            checkedInAt: attendee.checkedInAt,
          })
      ),
      count,
    });
    return result;
  }
  async findById(id: number): Promise<AttendeeEntity | null> {
    const attendee = await this.repository.findUnique({
      where: {
        id,
      },
    });
    if (!attendee) {
      return null;
    }
    return new AttendeeEntity(attendee);
  }
  async update({ id, data }: IUpdateAttendeeInput): Promise<AttendeeEntity> {
    const updatedAttendee = await this.repository.update({
      where: {
        id,
      },
      data,
    });
    return new AttendeeEntity(updatedAttendee);
  }

  async findAttendeeBadgeById(id: number): Promise<GetAttendeeBadgeDto | null> {
    const attendee = await this.repository.findUnique({
      select: {
        email: true,
        name: true,
        event: {
          select: {
            title: true,
          },
        },
      },
      where: {
        id,
      },
    });
    if (!attendee) {
      return null;
    }
    const parsed = new GetAttendeeBadgeDto({
      name: attendee?.name,
      email: attendee.email,
      eventTitle: attendee.event.title,
    });
    return parsed;
  }
  async countAttendeesByEventId(eventId: string): Promise<number> {
    return this.repository.count({
      where: {
        eventId,
      },
    });
  }
  async findByEmailAndEvent({
    email,
    eventId,
  }: IFindByEmailAndEventInput): Promise<AttendeeEntity | null> {
    const attendee = await this.repository.findUnique({
      where: {
        email_eventId: {
          email,
          eventId,
        },
      },
    });
    if (!attendee) {
      return null;
    }

    return new AttendeeEntity({
      id: attendee.id,
      createdAt: attendee.createdAt,
      email: attendee.email,
      eventId: attendee.eventId,
      name: attendee.name,
      checkedInAt: attendee.checkedInAt,
    });
  }
  async insert(data: AttendeeEntity): Promise<AttendeeEntity> {
    const createdAttendee = await this.repository.create({
      data,
    });
    return new AttendeeEntity({
      id: createdAttendee.id,
      createdAt: createdAttendee.createdAt,
      email: createdAttendee.email,
      eventId: createdAttendee.eventId,
      name: createdAttendee.name,
      checkedInAt: createdAttendee.checkedInAt,
    });
  }
}

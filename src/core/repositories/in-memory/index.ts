import { InMemoryAttendeeRepository } from "./in-memory-attendee.repository";
import { InMemoryEventRepository } from "./in-memory-event.repository";

export function getInMemoryFactory() {
  const inMemoryEventRepository = new InMemoryEventRepository();
  const inMemoryAttendeeRepository = new InMemoryAttendeeRepository(
    inMemoryEventRepository
  );
  inMemoryEventRepository.attendeeRepository = inMemoryAttendeeRepository;
  return {
    inMemoryEventRepository,
    inMemoryAttendeeRepository,
  };
}

export interface PaginationInputConstructorProps {
  page: number;
  limit: number;
  query?: string | null;
}

export interface PaginationOutputConstructorProps<T> {
  data: T[];
  count: number;
}

export class PaginationInputDto {
  take: number;
  skip: number;
  query: string | null;
  constructor(props: PaginationInputConstructorProps) {
    this.take = props.limit;
    this.skip = (props.page - 1) * props.limit;
    this.query = props.query ?? null;
  }
}

export class PaginationOutputDto<T> {
  data: T[];
  count: number;
  constructor(props: PaginationOutputConstructorProps<T>) {
    this.data = props.data;
    this.count = props.count;
  }
}

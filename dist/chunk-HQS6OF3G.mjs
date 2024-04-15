// src/core/dtos/shared/pagination.dto.ts
var PaginationInputDto = class {
  take;
  skip;
  query;
  constructor(props) {
    this.take = props.limit;
    this.skip = (props.page - 1) * props.limit;
    this.query = props.query ?? null;
  }
};
var PaginationOutputDto = class {
  data;
  count;
  constructor(props) {
    this.data = props.data;
    this.count = props.count;
  }
};

export {
  PaginationInputDto,
  PaginationOutputDto
};

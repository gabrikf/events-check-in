"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/dtos/shared/pagination.dto.ts
var pagination_dto_exports = {};
__export(pagination_dto_exports, {
  PaginationInputDto: () => PaginationInputDto,
  PaginationOutputDto: () => PaginationOutputDto
});
module.exports = __toCommonJS(pagination_dto_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PaginationInputDto,
  PaginationOutputDto
});

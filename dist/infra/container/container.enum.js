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

// src/infra/container/container.enum.ts
var container_enum_exports = {};
__export(container_enum_exports, {
  EContainer: () => EContainer
});
module.exports = __toCommonJS(container_enum_exports);
var EContainer = /* @__PURE__ */ ((EContainer2) => {
  EContainer2["Event"] = "EventRepository";
  EContainer2["Attendee"] = "AttendeeRepository";
  return EContainer2;
})(EContainer || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EContainer
});

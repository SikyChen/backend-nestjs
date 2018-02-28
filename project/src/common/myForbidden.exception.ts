import { HttpException, HttpStatus } from "@nestjs/common";

export class MyForbiddenException extends HttpException {
  constructor() {
    super('发生已知错误', HttpStatus.FORBIDDEN)
  }
} 
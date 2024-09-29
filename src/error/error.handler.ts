export class ErrorNotFound extends Error {
    constructor(public message: string) {
        super(message)
    }
  }
export class BadRequest extends Error {
  constructor(public message: string) {
      super(message)
  }
}

export class InvalidData extends Error {
  constructor(public message: string) {
      super(message)
  }
}

export class UnAuthorized extends Error {
  constructor(public message: string) {
      super(message)
  }
}

export class Conflict extends Error {
  constructor(public message: string) {
      super(message)
  }
}
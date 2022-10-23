export class ApiResponseError extends Error {
  public readonly data: Record<string, unknown>;

  constructor(msg: string, data: Record<string, unknown>) {
    super(msg);
    this.name = "ApiResponseError";
    this.data = data;
  }
}

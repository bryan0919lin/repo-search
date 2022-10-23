export class ApiParamError extends Error {
  public readonly param: Record<string, unknown>;

  constructor(msg: string, param: Record<string, unknown>) {
    super(msg);
    this.name = "ApiParamError";
    this.param = param;
  }
}

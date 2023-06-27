export class Result<T> {
  success = true;
  msg = '操作成功！';
  code = 200;
  data: T;

  static success<T>(data: T): Result<T> {
    const response = new Result<T>();
    response.data = data;
    return response;
  }

  static fail<T>(msg: string): Result<T> {
    const response = new Result<T>();
    response.success = false;
    response.msg = msg || '系统异常';
    response.code = 500000;
    return response;
  }
}

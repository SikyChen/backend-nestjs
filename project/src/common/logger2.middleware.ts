// 功能中间件
export const Logger2Middleware = (req, res, next) => {
  console.log(`[logger] request ...`);
  next();
}
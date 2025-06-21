import rateLimit from 'express-rate-limit';
 
export const sensitiveLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: { message: 'Too many requests, please try again later.' },
}); 
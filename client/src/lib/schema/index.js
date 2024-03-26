import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  username: z.string().trim().min(5, {
    message: 'Username must be at least 5 characters.',
  }),

  password: z.string().trim().min(1, {
    message: 'Password must not be empty.',
  }),
  // password: z
  //   .string()
  //   .transform((value) => value.replace(/\s+/g, ''))
  //   .pipe(z.string().min(1, { message: 'Password must not be empty.' })),
});

// User Schema
export const userSchema = z.object({
  username: z.string().trim().min(5, {
    message: 'Username must be at least 5 characters.',
  }),

  fullName: z.string().trim().min(1, {
    message: 'Full name must not be empty.',
  }),

  // fullName: z.string().refine(
  //   (val) => val.trim().length !== 0,
  //   () => ({ message: 'Please provide the Users Complete Name' })
  // ),

  role: z.string().trim().min(1, {
    message: 'Role must not be empty.',
  }),

  // role: z
  //   .string()
  //   .transform((value) => value.replace(/\s+/g, ''))
  //   .pipe(z.string().min(1, { message: 'Full name must not be empty.' })),

  email: z.string().trim().email({ message: 'Please provide a correct email' }),

  judgeNumber: z.preprocess(
    (args) => (args === '' ? undefined : args),
    z.coerce
      .number({ invalid_type_error: 'Must be an integer' })
      .nonnegative('Positive numbers only')
      .optional()
  ),

  eventId: z.string().optional(),
});

// Reset Password Schema
export const resetPasswordSchema = z.object({
  email: z.string().trim().email({ message: 'Please provide a correct email' }),
});

// Candidate Schedma
export const candidateSchema = z.object({
  number: z.preprocess(
    (args) => (args === '' ? undefined : args),
    z.coerce
      .number({ invalid_type_error: 'Must be an integer' })
      .positive('Positive numbers only')
  ),

  fullName: z.string().trim().min(1, {
    message: 'Candidate name must not be empty.',
  }),

  // fullName: z.string().refine(
  //   (val) => val.trim().length !== 0,
  //   () => ({ message: 'Please provide a Candidate Name' })
  // ),

  course: z.string().trim().min(1, {
    message: 'Additional Info must not be empty.',
  }),
});

// Competition Schema
export const competitionSchema = z.object({
  number: z.preprocess(
    (args) => (args === '' ? undefined : args),
    z.coerce
      .number({ invalid_type_error: 'Must be an integer' })
      .positive('Positive numbers only')
  ),

  name: z.string().trim().min(1, {
    message: 'Competition name must not be empty.',
  }),

  multiplier: z.preprocess(
    (args) => (args === '' ? undefined : args),
    z.coerce
      .number({ invalid_type_error: 'Must be an integer' })
      .nonnegative('Positive numbers only')
      .default(0)
  ),

  finalists: z.preprocess(
    (args) => (args === '' ? undefined : args),
    z.coerce
      .number({ invalid_type_error: 'Must be an integer' })
      .nonnegative('Positive numbers only')
      .default(0)
  ),

  isFinalist: z.string(),
});

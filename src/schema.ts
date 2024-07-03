import { z } from 'zod';

const fileSchema = z
  .object({
    originalname: z.string(),
    key: z.string(),
    location: z.string(),
  })
  .transform((value) => ({
    name: value.originalname,
    key: value.key,
    url: value.location,
  }));

const APISchema = {
  utils: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flatObjectToNested: (obj: { [key: string]: any }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: { [key: string]: any } = {};
      for (const key in obj) {
        const keys = key.split('.');
        const lastKey = keys.pop();
        if (!lastKey) {
          throw new Error('lastKey is undefined');
        }
        let nested = result;
        for (const key of keys) {
          if (!nested[key]) {
            nested[key] = {};
          }
          nested = nested[key];
        }
        nested[lastKey] = obj[key];
      }
      return result;
    },
  },
  Account: {
    signup: {
      payload: z.object({
        name: z
          .string({ message: 'name must be a string' })
          .min(3, {
            message:
              'name must be at least 3 character long',
          })
          .max(255, {
            message:
              'name must be at most 255 character long',
          }),
        email: z
          .string({ message: 'email must be a string' })
          .email({
            message: 'email must be a valid email address',
          }),
        password: z
          .string({ message: 'password must be a string' })
          .min(8, {
            message:
              'password must be at least 8 character long',
          })
          .regex(/[A-Z]/, {
            message:
              'password must contain at least 1 uppercase letter',
          })
          .regex(/[a-z]/, {
            message:
              'password must contain at least 1 lowercase letter',
          })
          .regex(/[0-9]/, {
            message:
              'password must contain at least 1 digit',
          })
          .max(255, {
            message:
              'password must be at most 255 character long',
          }),
        role: z
          .union([z.literal('user'), z.literal('admin')])
          .default('user'),
      }),
    },
    requestForgotPassword: {
      payload: z.object({
        email: z
          .string({ message: 'email must be a string' })
          .email({
            message: 'email must be a valid email address',
          })
          .optional(),
      }),
    },
    resetPassword: {
      payload: z.object({
        password: z
          .string({ message: 'password must be a string' })
          .min(8, {
            message:
              'password must be at least 8 character long',
          })
          .regex(/[A-Z]/, {
            message:
              'password must contain at least 1 uppercase letter',
          })
          .regex(/[a-z]/, {
            message:
              'password must contain at least 1 lowercase letter',
          })
          .regex(/[0-9]/, {
            message:
              'password must contain at least 1 digit',
          })
          .max(255, {
            message:
              'password must be at most 255 character long',
          }),
      }),
    },
  },
  UserApplication: {
    toggleLock: {
      payload: z.object({
        application: z.string(),
        step: z.number().int().min(1).max(4),
        status: z.union([
          z.literal('locked'),
          z.literal('unlocked'),
        ]),
      }),
    },
    step1: {
      payload: z.object({
        name: z.string(),
        dateOfBirth: z
          .string()
          .refine(
            (value) => {
              const date = new Date(value);
              return !isNaN(date.getTime());
            },
            { message: 'dateOfBirth must be a valid date' }
          )
          .transform((value) => new Date(value)),
        address: z.string(),
        phoneNumber: z.string(),
        whatsappNumber: z.string().optional(),
        email: z.string().email(),
        emergencyContactName: z.string(),
        emergencyContactPhoneNumber: z.string(),
        emergencyContactEmail: z.string().email(),
        experience2years: z.union([
          z.literal('true'),
          z.literal('false'),
        ]),
      }),
      files: z.object({
        degree: z.array(fileSchema),
        license: z.array(fileSchema),
        idCard: z.array(fileSchema),
        passport: z.array(fileSchema).optional(),
        resume: z.array(fileSchema),
      }),
    },
    step2: {
      files: z.object({
        idCard: z.array(fileSchema),
        passport: z.array(fileSchema).optional(),
        photo: z.array(fileSchema),
        highSchoolDiploma: z.array(fileSchema).optional(),
        highSchoolTranscript: z
          .array(fileSchema)
          .optional(),
        nursingDiploma: z.array(fileSchema),
        nursingTranscript: z.array(fileSchema).optional(),
        nursingLicense: z.array(fileSchema),
        nursingExperienceCertificate: z
          .array(fileSchema)
          .optional(),
      }),
    },
    step3: {
      payload: z.object({
        application: z.string(),
      }),
      files: z.object({
        toeflExamResult: z.array(fileSchema),
        nursingEvaluation: z.array(fileSchema),
        cgfnsCertificate: z.array(fileSchema),
        visaScreen: z.array(fileSchema),
        jobOffer: z.array(fileSchema),
      }),
    },
    step4: {
      payload: z.object({
        spouseName: z.string(),
        spouseDateOfBirth: z
          .string()
          .refine(
            (value) => {
              const date = new Date(value);
              return !isNaN(date.getTime());
            },
            { message: 'dateOfBirth must be a valid date' }
          )
          .transform((value) => new Date(value)),
        spouseAddress: z.string(),
        spousePhoneNumber: z.string(),
        spouseWhatsappNumber: z.string().optional(),
        spouseEmail: z.string().email(),
        spouseEmergencyContactName: z.string(),
        spouseEmergencyContactPhoneNumber: z.string(),
        spouseEmergencyContactEmail: z.string().email(),
      }),
      files: z.object({
        socialSecurityCard: z.array(fileSchema).optional(),
        greenCard: z.array(fileSchema).optional(),
        birthCertificate: z.array(fileSchema),
        marriageCertificate: z.array(fileSchema),
        spouseBirthCertificate: z.array(fileSchema),
        spousePhoto: z.array(fileSchema),
        spousePassport: z.array(fileSchema),
        kids: z
          .record(
            z.object({
              birthCertificate: z.array(fileSchema),
              photo: z.array(fileSchema),
              immunizationRecord: z.array(fileSchema),
            })
          )
          .transform((value) => {
            const result: {
              birthCertificate: z.infer<
                typeof fileSchema
              >[];
              photo: z.infer<typeof fileSchema>[];
              immunizationRecord: z.infer<
                typeof fileSchema
              >[];
            }[] = [];
            for (const key in value) {
              const kid = value[key];
              if (!kid) {
                throw new Error('kid is undefined');
              }
              result.push({
                birthCertificate: kid.birthCertificate,
                photo: kid.photo,
                immunizationRecord: kid.immunizationRecord,
              });
            }
            return result;
          }),
      }),
    },
  },
};

type FileRequest<T> = {
  [key in keyof T]: FileList;
};

export type AccountSignupPayload = z.infer<
  typeof APISchema.Account.signup.payload
>;
export type AccountRequestForgotPasswordPayload = z.infer<
  typeof APISchema.Account.requestForgotPassword.payload
>;
export type AccountResetPasswordPayload = z.infer<
  typeof APISchema.Account.resetPassword.payload
>;
export type AccountCodeValidationPayload = { code: string };

export type UserApplicationToggleLockPayload = Omit<
  z.infer<
    typeof APISchema.UserApplication.toggleLock.payload
  >,
  'application'
> & { application: string };
export type UserApplicationStep1Payload = z.infer<
  typeof APISchema.UserApplication.step1.payload
> &
  FileRequest<
    z.infer<typeof APISchema.UserApplication.step1.files>
  >;
export type UserApplicationStep2Payload = FileRequest<
  z.infer<typeof APISchema.UserApplication.step2.files>
>;
export type UserApplicationStep3Payload = z.infer<
  typeof APISchema.UserApplication.step3.payload
> &
  FileRequest<
    z.infer<typeof APISchema.UserApplication.step3.files>
  >;
export type UserApplicationStep4Payload = z.infer<
  typeof APISchema.UserApplication.step4.payload
> &
  FileRequest<
    z.infer<typeof APISchema.UserApplication.step4.files>
  >;

export default APISchema;

export type BaseResponse = {
  success: boolean;
  message: string;
};
export type AccountResponse = {
  success: boolean;
  message: string;
  account: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    isVerified: boolean;
  };
};
export type TokenResponse = {
  success: boolean;
  message: string;
  expiresAt: number;
};

export type UserApplicationResponse = BaseResponse & {
  userApplication: {
    id: string;
    account: string;
    1: {
      status: 'locked' | 'unlocked';
      data?: {
        name: string;
        dateOfBirth: Date;
        address: string;
        phoneNumber: string;
        whatsappNumber?: string;
        email: string;
        emergencyContact: {
          name: string;
          phoneNumber: string;
          email: string;
        };
        degree: TDocument;
        license: TDocument;
        idCard: TDocument;
        passport?: TDocument;
      };
    };
    2: {
      status: 'locked' | 'unlocked';
      data?: {
        idCard: TDocument;
        passport?: TDocument;
        photo: TDocument;
        highSchoolDiploma?: TDocument;
        highSchoolTranscript?: TDocument;
        nursingDiploma: TDocument;
        nursingTranscript?: TDocument;
        nursingLicense: TDocument;
        nursingExperienceCertificate?: TDocument;
      };
    };
    3: {
      status: 'locked' | 'unlocked';
      data?: {
        toeflExamResult: TDocument;
        nursingEvaluation: TDocument;
        cgfnsCertificate: TDocument;
        visaScreen: TDocument;
        jobOffer: TDocument;
      };
    };
    4: {
      status: 'locked' | 'unlocked';
      data?: {
        socialSecurityCard?: TDocument;
        greenCard?: TDocument;
        birthCertificate: TDocument;
        marriageCertificate: TDocument;
        spouse: {
          name: string;
          dateOfBirth: Date;
          address: string;
          phoneNumber: string;
          whatsappNumber?: string;
          email: string;
          emergencyContact: {
            name: string;
            phoneNumber: string;
            email: string;
          };
          birthCertificate: TDocument;
          photo: TDocument;
          passport: TDocument;
        };
        kids: {
          birthCertificate: TDocument;
          photo: TDocument;
          immunizationRecord: TDocument;
        }[];
      };
    };
  };
};
export type UserApplicationListResponse = BaseResponse & {
  numberOfApplications: number;
  userApplications: UserApplicationResponse['userApplication'][];
};

export type TDocument = {
  name: string;
  key: string;
  url: string;
};

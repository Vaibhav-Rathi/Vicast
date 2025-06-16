
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Podcast
 * 
 */
export type Podcast = $Result.DefaultSelection<Prisma.$PodcastPayload>
/**
 * Model Schedule
 * 
 */
export type Schedule = $Result.DefaultSelection<Prisma.$SchedulePayload>
/**
 * Model RecordingSession
 * 
 */
export type RecordingSession = $Result.DefaultSelection<Prisma.$RecordingSessionPayload>
/**
 * Model SessionParticipant
 * 
 */
export type SessionParticipant = $Result.DefaultSelection<Prisma.$SessionParticipantPayload>
/**
 * Model RecordingChunk
 * 
 */
export type RecordingChunk = $Result.DefaultSelection<Prisma.$RecordingChunkPayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SessionStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PROCESSING: 'PROCESSING'
};

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus]


export const UploadStatus: {
  PENDING: 'PENDING',
  UPLOADING: 'UPLOADING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  RETRYING: 'RETRYING'
};

export type UploadStatus = (typeof UploadStatus)[keyof typeof UploadStatus]

}

export type SessionStatus = $Enums.SessionStatus

export const SessionStatus: typeof $Enums.SessionStatus

export type UploadStatus = $Enums.UploadStatus

export const UploadStatus: typeof $Enums.UploadStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.podcast`: Exposes CRUD operations for the **Podcast** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Podcasts
    * const podcasts = await prisma.podcast.findMany()
    * ```
    */
  get podcast(): Prisma.PodcastDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule`: Exposes CRUD operations for the **Schedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedules
    * const schedules = await prisma.schedule.findMany()
    * ```
    */
  get schedule(): Prisma.ScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recordingSession`: Exposes CRUD operations for the **RecordingSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecordingSessions
    * const recordingSessions = await prisma.recordingSession.findMany()
    * ```
    */
  get recordingSession(): Prisma.RecordingSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sessionParticipant`: Exposes CRUD operations for the **SessionParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SessionParticipants
    * const sessionParticipants = await prisma.sessionParticipant.findMany()
    * ```
    */
  get sessionParticipant(): Prisma.SessionParticipantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recordingChunk`: Exposes CRUD operations for the **RecordingChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecordingChunks
    * const recordingChunks = await prisma.recordingChunk.findMany()
    * ```
    */
  get recordingChunk(): Prisma.RecordingChunkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Podcast: 'Podcast',
    Schedule: 'Schedule',
    RecordingSession: 'RecordingSession',
    SessionParticipant: 'SessionParticipant',
    RecordingChunk: 'RecordingChunk',
    Contact: 'Contact'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "podcast" | "schedule" | "recordingSession" | "sessionParticipant" | "recordingChunk" | "contact"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Podcast: {
        payload: Prisma.$PodcastPayload<ExtArgs>
        fields: Prisma.PodcastFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PodcastFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PodcastFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          findFirst: {
            args: Prisma.PodcastFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PodcastFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          findMany: {
            args: Prisma.PodcastFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>[]
          }
          create: {
            args: Prisma.PodcastCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          createMany: {
            args: Prisma.PodcastCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PodcastCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>[]
          }
          delete: {
            args: Prisma.PodcastDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          update: {
            args: Prisma.PodcastUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          deleteMany: {
            args: Prisma.PodcastDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PodcastUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PodcastUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>[]
          }
          upsert: {
            args: Prisma.PodcastUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PodcastPayload>
          }
          aggregate: {
            args: Prisma.PodcastAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePodcast>
          }
          groupBy: {
            args: Prisma.PodcastGroupByArgs<ExtArgs>
            result: $Utils.Optional<PodcastGroupByOutputType>[]
          }
          count: {
            args: Prisma.PodcastCountArgs<ExtArgs>
            result: $Utils.Optional<PodcastCountAggregateOutputType> | number
          }
        }
      }
      Schedule: {
        payload: Prisma.$SchedulePayload<ExtArgs>
        fields: Prisma.ScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findMany: {
            args: Prisma.ScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          create: {
            args: Prisma.ScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          createMany: {
            args: Prisma.ScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          delete: {
            args: Prisma.ScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          update: {
            args: Prisma.ScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          upsert: {
            args: Prisma.ScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule>
          }
          groupBy: {
            args: Prisma.ScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleCountAggregateOutputType> | number
          }
        }
      }
      RecordingSession: {
        payload: Prisma.$RecordingSessionPayload<ExtArgs>
        fields: Prisma.RecordingSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecordingSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecordingSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload>
          }
          findFirst: {
            args: Prisma.RecordingSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecordingSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload>
          }
          findMany: {
            args: Prisma.RecordingSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload>[]
          }
          create: {
            args: Prisma.RecordingSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload>
          }
          createMany: {
            args: Prisma.RecordingSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecordingSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload>[]
          }
          delete: {
            args: Prisma.RecordingSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload>
          }
          update: {
            args: Prisma.RecordingSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload>
          }
          deleteMany: {
            args: Prisma.RecordingSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecordingSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecordingSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload>[]
          }
          upsert: {
            args: Prisma.RecordingSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingSessionPayload>
          }
          aggregate: {
            args: Prisma.RecordingSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecordingSession>
          }
          groupBy: {
            args: Prisma.RecordingSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecordingSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecordingSessionCountArgs<ExtArgs>
            result: $Utils.Optional<RecordingSessionCountAggregateOutputType> | number
          }
        }
      }
      SessionParticipant: {
        payload: Prisma.$SessionParticipantPayload<ExtArgs>
        fields: Prisma.SessionParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload>
          }
          findFirst: {
            args: Prisma.SessionParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload>
          }
          findMany: {
            args: Prisma.SessionParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload>[]
          }
          create: {
            args: Prisma.SessionParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload>
          }
          createMany: {
            args: Prisma.SessionParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload>[]
          }
          delete: {
            args: Prisma.SessionParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload>
          }
          update: {
            args: Prisma.SessionParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload>
          }
          deleteMany: {
            args: Prisma.SessionParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionParticipantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload>[]
          }
          upsert: {
            args: Prisma.SessionParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionParticipantPayload>
          }
          aggregate: {
            args: Prisma.SessionParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSessionParticipant>
          }
          groupBy: {
            args: Prisma.SessionParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<SessionParticipantCountAggregateOutputType> | number
          }
        }
      }
      RecordingChunk: {
        payload: Prisma.$RecordingChunkPayload<ExtArgs>
        fields: Prisma.RecordingChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecordingChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecordingChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          findFirst: {
            args: Prisma.RecordingChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecordingChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          findMany: {
            args: Prisma.RecordingChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>[]
          }
          create: {
            args: Prisma.RecordingChunkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          createMany: {
            args: Prisma.RecordingChunkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecordingChunkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>[]
          }
          delete: {
            args: Prisma.RecordingChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          update: {
            args: Prisma.RecordingChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          deleteMany: {
            args: Prisma.RecordingChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecordingChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecordingChunkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>[]
          }
          upsert: {
            args: Prisma.RecordingChunkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          aggregate: {
            args: Prisma.RecordingChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecordingChunk>
          }
          groupBy: {
            args: Prisma.RecordingChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecordingChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecordingChunkCountArgs<ExtArgs>
            result: $Utils.Optional<RecordingChunkCountAggregateOutputType> | number
          }
        }
      }
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    podcast?: PodcastOmit
    schedule?: ScheduleOmit
    recordingSession?: RecordingSessionOmit
    sessionParticipant?: SessionParticipantOmit
    recordingChunk?: RecordingChunkOmit
    contact?: ContactOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Podacst: number
    createdBy: number
    recordingSessions: number
    recordingChunks: number
    sessionParticipants: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Podacst?: boolean | UserCountOutputTypeCountPodacstArgs
    createdBy?: boolean | UserCountOutputTypeCountCreatedByArgs
    recordingSessions?: boolean | UserCountOutputTypeCountRecordingSessionsArgs
    recordingChunks?: boolean | UserCountOutputTypeCountRecordingChunksArgs
    sessionParticipants?: boolean | UserCountOutputTypeCountSessionParticipantsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPodacstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PodcastWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecordingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecordingChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingChunkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionParticipantWhereInput
  }


  /**
   * Count Type RecordingSessionCountOutputType
   */

  export type RecordingSessionCountOutputType = {
    participants: number
    chunks: number
  }

  export type RecordingSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | RecordingSessionCountOutputTypeCountParticipantsArgs
    chunks?: boolean | RecordingSessionCountOutputTypeCountChunksArgs
  }

  // Custom InputTypes
  /**
   * RecordingSessionCountOutputType without action
   */
  export type RecordingSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSessionCountOutputType
     */
    select?: RecordingSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecordingSessionCountOutputType without action
   */
  export type RecordingSessionCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionParticipantWhereInput
  }

  /**
   * RecordingSessionCountOutputType without action
   */
  export type RecordingSessionCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingChunkWhereInput
  }


  /**
   * Count Type SessionParticipantCountOutputType
   */

  export type SessionParticipantCountOutputType = {
    chunks: number
  }

  export type SessionParticipantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | SessionParticipantCountOutputTypeCountChunksArgs
  }

  // Custom InputTypes
  /**
   * SessionParticipantCountOutputType without action
   */
  export type SessionParticipantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipantCountOutputType
     */
    select?: SessionParticipantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionParticipantCountOutputType without action
   */
  export type SessionParticipantCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingChunkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    verified: boolean | null
    token: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    verified: boolean | null
    token: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    password: number
    verified: number
    token: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    verified?: true
    token?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    verified?: true
    token?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    verified?: true
    token?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    firstName: string
    lastName: string | null
    email: string
    password: string
    verified: boolean
    token: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    verified?: boolean
    token?: boolean
    createdAt?: boolean
    Podacst?: boolean | User$PodacstArgs<ExtArgs>
    createdBy?: boolean | User$createdByArgs<ExtArgs>
    recordingSessions?: boolean | User$recordingSessionsArgs<ExtArgs>
    recordingChunks?: boolean | User$recordingChunksArgs<ExtArgs>
    sessionParticipants?: boolean | User$sessionParticipantsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    verified?: boolean
    token?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    verified?: boolean
    token?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    verified?: boolean
    token?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "password" | "verified" | "token" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Podacst?: boolean | User$PodacstArgs<ExtArgs>
    createdBy?: boolean | User$createdByArgs<ExtArgs>
    recordingSessions?: boolean | User$recordingSessionsArgs<ExtArgs>
    recordingChunks?: boolean | User$recordingChunksArgs<ExtArgs>
    sessionParticipants?: boolean | User$sessionParticipantsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Podacst: Prisma.$PodcastPayload<ExtArgs>[]
      createdBy: Prisma.$SchedulePayload<ExtArgs>[]
      recordingSessions: Prisma.$RecordingSessionPayload<ExtArgs>[]
      recordingChunks: Prisma.$RecordingChunkPayload<ExtArgs>[]
      sessionParticipants: Prisma.$SessionParticipantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string | null
      email: string
      password: string
      verified: boolean
      token: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Podacst<T extends User$PodacstArgs<ExtArgs> = {}>(args?: Subset<T, User$PodacstArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdBy<T extends User$createdByArgs<ExtArgs> = {}>(args?: Subset<T, User$createdByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recordingSessions<T extends User$recordingSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$recordingSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recordingChunks<T extends User$recordingChunksArgs<ExtArgs> = {}>(args?: Subset<T, User$recordingChunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessionParticipants<T extends User$sessionParticipantsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionParticipantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly verified: FieldRef<"User", 'Boolean'>
    readonly token: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Podacst
   */
  export type User$PodacstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    where?: PodcastWhereInput
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    cursor?: PodcastWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PodcastScalarFieldEnum | PodcastScalarFieldEnum[]
  }

  /**
   * User.createdBy
   */
  export type User$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * User.recordingSessions
   */
  export type User$recordingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    where?: RecordingSessionWhereInput
    orderBy?: RecordingSessionOrderByWithRelationInput | RecordingSessionOrderByWithRelationInput[]
    cursor?: RecordingSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecordingSessionScalarFieldEnum | RecordingSessionScalarFieldEnum[]
  }

  /**
   * User.recordingChunks
   */
  export type User$recordingChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    where?: RecordingChunkWhereInput
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    cursor?: RecordingChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * User.sessionParticipants
   */
  export type User$sessionParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    where?: SessionParticipantWhereInput
    orderBy?: SessionParticipantOrderByWithRelationInput | SessionParticipantOrderByWithRelationInput[]
    cursor?: SessionParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionParticipantScalarFieldEnum | SessionParticipantScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Podcast
   */

  export type AggregatePodcast = {
    _count: PodcastCountAggregateOutputType | null
    _avg: PodcastAvgAggregateOutputType | null
    _sum: PodcastSumAggregateOutputType | null
    _min: PodcastMinAggregateOutputType | null
    _max: PodcastMaxAggregateOutputType | null
  }

  export type PodcastAvgAggregateOutputType = {
    userId: number | null
  }

  export type PodcastSumAggregateOutputType = {
    userId: number | null
  }

  export type PodcastMinAggregateOutputType = {
    id: string | null
    key: string | null
    name: string | null
    createdAt: Date | null
    userId: number | null
  }

  export type PodcastMaxAggregateOutputType = {
    id: string | null
    key: string | null
    name: string | null
    createdAt: Date | null
    userId: number | null
  }

  export type PodcastCountAggregateOutputType = {
    id: number
    key: number
    name: number
    createdAt: number
    userId: number
    _all: number
  }


  export type PodcastAvgAggregateInputType = {
    userId?: true
  }

  export type PodcastSumAggregateInputType = {
    userId?: true
  }

  export type PodcastMinAggregateInputType = {
    id?: true
    key?: true
    name?: true
    createdAt?: true
    userId?: true
  }

  export type PodcastMaxAggregateInputType = {
    id?: true
    key?: true
    name?: true
    createdAt?: true
    userId?: true
  }

  export type PodcastCountAggregateInputType = {
    id?: true
    key?: true
    name?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type PodcastAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Podcast to aggregate.
     */
    where?: PodcastWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Podcasts to fetch.
     */
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PodcastWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Podcasts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Podcasts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Podcasts
    **/
    _count?: true | PodcastCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PodcastAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PodcastSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PodcastMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PodcastMaxAggregateInputType
  }

  export type GetPodcastAggregateType<T extends PodcastAggregateArgs> = {
        [P in keyof T & keyof AggregatePodcast]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePodcast[P]>
      : GetScalarType<T[P], AggregatePodcast[P]>
  }




  export type PodcastGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PodcastWhereInput
    orderBy?: PodcastOrderByWithAggregationInput | PodcastOrderByWithAggregationInput[]
    by: PodcastScalarFieldEnum[] | PodcastScalarFieldEnum
    having?: PodcastScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PodcastCountAggregateInputType | true
    _avg?: PodcastAvgAggregateInputType
    _sum?: PodcastSumAggregateInputType
    _min?: PodcastMinAggregateInputType
    _max?: PodcastMaxAggregateInputType
  }

  export type PodcastGroupByOutputType = {
    id: string
    key: string
    name: string
    createdAt: Date
    userId: number
    _count: PodcastCountAggregateOutputType | null
    _avg: PodcastAvgAggregateOutputType | null
    _sum: PodcastSumAggregateOutputType | null
    _min: PodcastMinAggregateOutputType | null
    _max: PodcastMaxAggregateOutputType | null
  }

  type GetPodcastGroupByPayload<T extends PodcastGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PodcastGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PodcastGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PodcastGroupByOutputType[P]>
            : GetScalarType<T[P], PodcastGroupByOutputType[P]>
        }
      >
    >


  export type PodcastSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["podcast"]>

  export type PodcastSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["podcast"]>

  export type PodcastSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["podcast"]>

  export type PodcastSelectScalar = {
    id?: boolean
    key?: boolean
    name?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type PodcastOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "name" | "createdAt" | "userId", ExtArgs["result"]["podcast"]>
  export type PodcastInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PodcastIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PodcastIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PodcastPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Podcast"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      name: string
      createdAt: Date
      userId: number
    }, ExtArgs["result"]["podcast"]>
    composites: {}
  }

  type PodcastGetPayload<S extends boolean | null | undefined | PodcastDefaultArgs> = $Result.GetResult<Prisma.$PodcastPayload, S>

  type PodcastCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PodcastFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PodcastCountAggregateInputType | true
    }

  export interface PodcastDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Podcast'], meta: { name: 'Podcast' } }
    /**
     * Find zero or one Podcast that matches the filter.
     * @param {PodcastFindUniqueArgs} args - Arguments to find a Podcast
     * @example
     * // Get one Podcast
     * const podcast = await prisma.podcast.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PodcastFindUniqueArgs>(args: SelectSubset<T, PodcastFindUniqueArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Podcast that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PodcastFindUniqueOrThrowArgs} args - Arguments to find a Podcast
     * @example
     * // Get one Podcast
     * const podcast = await prisma.podcast.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PodcastFindUniqueOrThrowArgs>(args: SelectSubset<T, PodcastFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Podcast that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastFindFirstArgs} args - Arguments to find a Podcast
     * @example
     * // Get one Podcast
     * const podcast = await prisma.podcast.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PodcastFindFirstArgs>(args?: SelectSubset<T, PodcastFindFirstArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Podcast that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastFindFirstOrThrowArgs} args - Arguments to find a Podcast
     * @example
     * // Get one Podcast
     * const podcast = await prisma.podcast.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PodcastFindFirstOrThrowArgs>(args?: SelectSubset<T, PodcastFindFirstOrThrowArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Podcasts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Podcasts
     * const podcasts = await prisma.podcast.findMany()
     * 
     * // Get first 10 Podcasts
     * const podcasts = await prisma.podcast.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const podcastWithIdOnly = await prisma.podcast.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PodcastFindManyArgs>(args?: SelectSubset<T, PodcastFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Podcast.
     * @param {PodcastCreateArgs} args - Arguments to create a Podcast.
     * @example
     * // Create one Podcast
     * const Podcast = await prisma.podcast.create({
     *   data: {
     *     // ... data to create a Podcast
     *   }
     * })
     * 
     */
    create<T extends PodcastCreateArgs>(args: SelectSubset<T, PodcastCreateArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Podcasts.
     * @param {PodcastCreateManyArgs} args - Arguments to create many Podcasts.
     * @example
     * // Create many Podcasts
     * const podcast = await prisma.podcast.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PodcastCreateManyArgs>(args?: SelectSubset<T, PodcastCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Podcasts and returns the data saved in the database.
     * @param {PodcastCreateManyAndReturnArgs} args - Arguments to create many Podcasts.
     * @example
     * // Create many Podcasts
     * const podcast = await prisma.podcast.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Podcasts and only return the `id`
     * const podcastWithIdOnly = await prisma.podcast.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PodcastCreateManyAndReturnArgs>(args?: SelectSubset<T, PodcastCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Podcast.
     * @param {PodcastDeleteArgs} args - Arguments to delete one Podcast.
     * @example
     * // Delete one Podcast
     * const Podcast = await prisma.podcast.delete({
     *   where: {
     *     // ... filter to delete one Podcast
     *   }
     * })
     * 
     */
    delete<T extends PodcastDeleteArgs>(args: SelectSubset<T, PodcastDeleteArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Podcast.
     * @param {PodcastUpdateArgs} args - Arguments to update one Podcast.
     * @example
     * // Update one Podcast
     * const podcast = await prisma.podcast.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PodcastUpdateArgs>(args: SelectSubset<T, PodcastUpdateArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Podcasts.
     * @param {PodcastDeleteManyArgs} args - Arguments to filter Podcasts to delete.
     * @example
     * // Delete a few Podcasts
     * const { count } = await prisma.podcast.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PodcastDeleteManyArgs>(args?: SelectSubset<T, PodcastDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Podcasts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Podcasts
     * const podcast = await prisma.podcast.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PodcastUpdateManyArgs>(args: SelectSubset<T, PodcastUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Podcasts and returns the data updated in the database.
     * @param {PodcastUpdateManyAndReturnArgs} args - Arguments to update many Podcasts.
     * @example
     * // Update many Podcasts
     * const podcast = await prisma.podcast.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Podcasts and only return the `id`
     * const podcastWithIdOnly = await prisma.podcast.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PodcastUpdateManyAndReturnArgs>(args: SelectSubset<T, PodcastUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Podcast.
     * @param {PodcastUpsertArgs} args - Arguments to update or create a Podcast.
     * @example
     * // Update or create a Podcast
     * const podcast = await prisma.podcast.upsert({
     *   create: {
     *     // ... data to create a Podcast
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Podcast we want to update
     *   }
     * })
     */
    upsert<T extends PodcastUpsertArgs>(args: SelectSubset<T, PodcastUpsertArgs<ExtArgs>>): Prisma__PodcastClient<$Result.GetResult<Prisma.$PodcastPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Podcasts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastCountArgs} args - Arguments to filter Podcasts to count.
     * @example
     * // Count the number of Podcasts
     * const count = await prisma.podcast.count({
     *   where: {
     *     // ... the filter for the Podcasts we want to count
     *   }
     * })
    **/
    count<T extends PodcastCountArgs>(
      args?: Subset<T, PodcastCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PodcastCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Podcast.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PodcastAggregateArgs>(args: Subset<T, PodcastAggregateArgs>): Prisma.PrismaPromise<GetPodcastAggregateType<T>>

    /**
     * Group by Podcast.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PodcastGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PodcastGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PodcastGroupByArgs['orderBy'] }
        : { orderBy?: PodcastGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PodcastGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPodcastGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Podcast model
   */
  readonly fields: PodcastFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Podcast.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PodcastClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Podcast model
   */
  interface PodcastFieldRefs {
    readonly id: FieldRef<"Podcast", 'String'>
    readonly key: FieldRef<"Podcast", 'String'>
    readonly name: FieldRef<"Podcast", 'String'>
    readonly createdAt: FieldRef<"Podcast", 'DateTime'>
    readonly userId: FieldRef<"Podcast", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Podcast findUnique
   */
  export type PodcastFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcast to fetch.
     */
    where: PodcastWhereUniqueInput
  }

  /**
   * Podcast findUniqueOrThrow
   */
  export type PodcastFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcast to fetch.
     */
    where: PodcastWhereUniqueInput
  }

  /**
   * Podcast findFirst
   */
  export type PodcastFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcast to fetch.
     */
    where?: PodcastWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Podcasts to fetch.
     */
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Podcasts.
     */
    cursor?: PodcastWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Podcasts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Podcasts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Podcasts.
     */
    distinct?: PodcastScalarFieldEnum | PodcastScalarFieldEnum[]
  }

  /**
   * Podcast findFirstOrThrow
   */
  export type PodcastFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcast to fetch.
     */
    where?: PodcastWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Podcasts to fetch.
     */
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Podcasts.
     */
    cursor?: PodcastWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Podcasts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Podcasts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Podcasts.
     */
    distinct?: PodcastScalarFieldEnum | PodcastScalarFieldEnum[]
  }

  /**
   * Podcast findMany
   */
  export type PodcastFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter, which Podcasts to fetch.
     */
    where?: PodcastWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Podcasts to fetch.
     */
    orderBy?: PodcastOrderByWithRelationInput | PodcastOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Podcasts.
     */
    cursor?: PodcastWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Podcasts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Podcasts.
     */
    skip?: number
    distinct?: PodcastScalarFieldEnum | PodcastScalarFieldEnum[]
  }

  /**
   * Podcast create
   */
  export type PodcastCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * The data needed to create a Podcast.
     */
    data: XOR<PodcastCreateInput, PodcastUncheckedCreateInput>
  }

  /**
   * Podcast createMany
   */
  export type PodcastCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Podcasts.
     */
    data: PodcastCreateManyInput | PodcastCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Podcast createManyAndReturn
   */
  export type PodcastCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * The data used to create many Podcasts.
     */
    data: PodcastCreateManyInput | PodcastCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Podcast update
   */
  export type PodcastUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * The data needed to update a Podcast.
     */
    data: XOR<PodcastUpdateInput, PodcastUncheckedUpdateInput>
    /**
     * Choose, which Podcast to update.
     */
    where: PodcastWhereUniqueInput
  }

  /**
   * Podcast updateMany
   */
  export type PodcastUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Podcasts.
     */
    data: XOR<PodcastUpdateManyMutationInput, PodcastUncheckedUpdateManyInput>
    /**
     * Filter which Podcasts to update
     */
    where?: PodcastWhereInput
    /**
     * Limit how many Podcasts to update.
     */
    limit?: number
  }

  /**
   * Podcast updateManyAndReturn
   */
  export type PodcastUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * The data used to update Podcasts.
     */
    data: XOR<PodcastUpdateManyMutationInput, PodcastUncheckedUpdateManyInput>
    /**
     * Filter which Podcasts to update
     */
    where?: PodcastWhereInput
    /**
     * Limit how many Podcasts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Podcast upsert
   */
  export type PodcastUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * The filter to search for the Podcast to update in case it exists.
     */
    where: PodcastWhereUniqueInput
    /**
     * In case the Podcast found by the `where` argument doesn't exist, create a new Podcast with this data.
     */
    create: XOR<PodcastCreateInput, PodcastUncheckedCreateInput>
    /**
     * In case the Podcast was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PodcastUpdateInput, PodcastUncheckedUpdateInput>
  }

  /**
   * Podcast delete
   */
  export type PodcastDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
    /**
     * Filter which Podcast to delete.
     */
    where: PodcastWhereUniqueInput
  }

  /**
   * Podcast deleteMany
   */
  export type PodcastDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Podcasts to delete
     */
    where?: PodcastWhereInput
    /**
     * Limit how many Podcasts to delete.
     */
    limit?: number
  }

  /**
   * Podcast without action
   */
  export type PodcastDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Podcast
     */
    select?: PodcastSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Podcast
     */
    omit?: PodcastOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PodcastInclude<ExtArgs> | null
  }


  /**
   * Model Schedule
   */

  export type AggregateSchedule = {
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  export type ScheduleAvgAggregateOutputType = {
    createdById: number | null
  }

  export type ScheduleSumAggregateOutputType = {
    createdById: number | null
  }

  export type ScheduleMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    scheduledAt: Date | null
    createdById: number | null
    createdAt: Date | null
  }

  export type ScheduleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    scheduledAt: Date | null
    createdById: number | null
    createdAt: Date | null
  }

  export type ScheduleCountAggregateOutputType = {
    id: number
    title: number
    description: number
    scheduledAt: number
    createdById: number
    participants: number
    createdAt: number
    _all: number
  }


  export type ScheduleAvgAggregateInputType = {
    createdById?: true
  }

  export type ScheduleSumAggregateInputType = {
    createdById?: true
  }

  export type ScheduleMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    scheduledAt?: true
    createdById?: true
    createdAt?: true
  }

  export type ScheduleMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    scheduledAt?: true
    createdById?: true
    createdAt?: true
  }

  export type ScheduleCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    scheduledAt?: true
    createdById?: true
    participants?: true
    createdAt?: true
    _all?: true
  }

  export type ScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedule to aggregate.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schedules
    **/
    _count?: true | ScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleMaxAggregateInputType
  }

  export type GetScheduleAggregateType<T extends ScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule[P]>
      : GetScalarType<T[P], AggregateSchedule[P]>
  }




  export type ScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithAggregationInput | ScheduleOrderByWithAggregationInput[]
    by: ScheduleScalarFieldEnum[] | ScheduleScalarFieldEnum
    having?: ScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleCountAggregateInputType | true
    _avg?: ScheduleAvgAggregateInputType
    _sum?: ScheduleSumAggregateInputType
    _min?: ScheduleMinAggregateInputType
    _max?: ScheduleMaxAggregateInputType
  }

  export type ScheduleGroupByOutputType = {
    id: string
    title: string
    description: string | null
    scheduledAt: Date
    createdById: number
    participants: string[]
    createdAt: Date
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  type GetScheduleGroupByPayload<T extends ScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    scheduledAt?: boolean
    createdById?: boolean
    participants?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    scheduledAt?: boolean
    createdById?: boolean
    participants?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    scheduledAt?: boolean
    createdById?: boolean
    participants?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    scheduledAt?: boolean
    createdById?: boolean
    participants?: boolean
    createdAt?: boolean
  }

  export type ScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "scheduledAt" | "createdById" | "participants" | "createdAt", ExtArgs["result"]["schedule"]>
  export type ScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Schedule"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      scheduledAt: Date
      createdById: number
      participants: string[]
      createdAt: Date
    }, ExtArgs["result"]["schedule"]>
    composites: {}
  }

  type ScheduleGetPayload<S extends boolean | null | undefined | ScheduleDefaultArgs> = $Result.GetResult<Prisma.$SchedulePayload, S>

  type ScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleCountAggregateInputType | true
    }

  export interface ScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Schedule'], meta: { name: 'Schedule' } }
    /**
     * Find zero or one Schedule that matches the filter.
     * @param {ScheduleFindUniqueArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleFindUniqueArgs>(args: SelectSubset<T, ScheduleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleFindUniqueOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleFindFirstArgs>(args?: SelectSubset<T, ScheduleFindFirstArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedules
     * const schedules = await prisma.schedule.findMany()
     * 
     * // Get first 10 Schedules
     * const schedules = await prisma.schedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleWithIdOnly = await prisma.schedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleFindManyArgs>(args?: SelectSubset<T, ScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule.
     * @param {ScheduleCreateArgs} args - Arguments to create a Schedule.
     * @example
     * // Create one Schedule
     * const Schedule = await prisma.schedule.create({
     *   data: {
     *     // ... data to create a Schedule
     *   }
     * })
     * 
     */
    create<T extends ScheduleCreateArgs>(args: SelectSubset<T, ScheduleCreateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedules.
     * @param {ScheduleCreateManyArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleCreateManyArgs>(args?: SelectSubset<T, ScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schedules and returns the data saved in the database.
     * @param {ScheduleCreateManyAndReturnArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Schedule.
     * @param {ScheduleDeleteArgs} args - Arguments to delete one Schedule.
     * @example
     * // Delete one Schedule
     * const Schedule = await prisma.schedule.delete({
     *   where: {
     *     // ... filter to delete one Schedule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleDeleteArgs>(args: SelectSubset<T, ScheduleDeleteArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule.
     * @param {ScheduleUpdateArgs} args - Arguments to update one Schedule.
     * @example
     * // Update one Schedule
     * const schedule = await prisma.schedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleUpdateArgs>(args: SelectSubset<T, ScheduleUpdateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedules.
     * @param {ScheduleDeleteManyArgs} args - Arguments to filter Schedules to delete.
     * @example
     * // Delete a few Schedules
     * const { count } = await prisma.schedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleDeleteManyArgs>(args?: SelectSubset<T, ScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleUpdateManyArgs>(args: SelectSubset<T, ScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules and returns the data updated in the database.
     * @param {ScheduleUpdateManyAndReturnArgs} args - Arguments to update many Schedules.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Schedule.
     * @param {ScheduleUpsertArgs} args - Arguments to update or create a Schedule.
     * @example
     * // Update or create a Schedule
     * const schedule = await prisma.schedule.upsert({
     *   create: {
     *     // ... data to create a Schedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleUpsertArgs>(args: SelectSubset<T, ScheduleUpsertArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleCountArgs} args - Arguments to filter Schedules to count.
     * @example
     * // Count the number of Schedules
     * const count = await prisma.schedule.count({
     *   where: {
     *     // ... the filter for the Schedules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleCountArgs>(
      args?: Subset<T, ScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleAggregateArgs>(args: Subset<T, ScheduleAggregateArgs>): Prisma.PrismaPromise<GetScheduleAggregateType<T>>

    /**
     * Group by Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Schedule model
   */
  readonly fields: ScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Schedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Schedule model
   */
  interface ScheduleFieldRefs {
    readonly id: FieldRef<"Schedule", 'String'>
    readonly title: FieldRef<"Schedule", 'String'>
    readonly description: FieldRef<"Schedule", 'String'>
    readonly scheduledAt: FieldRef<"Schedule", 'DateTime'>
    readonly createdById: FieldRef<"Schedule", 'Int'>
    readonly participants: FieldRef<"Schedule", 'String[]'>
    readonly createdAt: FieldRef<"Schedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Schedule findUnique
   */
  export type ScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findUniqueOrThrow
   */
  export type ScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findFirst
   */
  export type ScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findFirstOrThrow
   */
  export type ScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findMany
   */
  export type ScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedules to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule create
   */
  export type ScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a Schedule.
     */
    data: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
  }

  /**
   * Schedule createMany
   */
  export type ScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Schedule createManyAndReturn
   */
  export type ScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule update
   */
  export type ScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a Schedule.
     */
    data: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
    /**
     * Choose, which Schedule to update.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule updateMany
   */
  export type ScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
  }

  /**
   * Schedule updateManyAndReturn
   */
  export type ScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule upsert
   */
  export type ScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the Schedule to update in case it exists.
     */
    where: ScheduleWhereUniqueInput
    /**
     * In case the Schedule found by the `where` argument doesn't exist, create a new Schedule with this data.
     */
    create: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
    /**
     * In case the Schedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
  }

  /**
   * Schedule delete
   */
  export type ScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter which Schedule to delete.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule deleteMany
   */
  export type ScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedules to delete
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to delete.
     */
    limit?: number
  }

  /**
   * Schedule without action
   */
  export type ScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
  }


  /**
   * Model RecordingSession
   */

  export type AggregateRecordingSession = {
    _count: RecordingSessionCountAggregateOutputType | null
    _avg: RecordingSessionAvgAggregateOutputType | null
    _sum: RecordingSessionSumAggregateOutputType | null
    _min: RecordingSessionMinAggregateOutputType | null
    _max: RecordingSessionMaxAggregateOutputType | null
  }

  export type RecordingSessionAvgAggregateOutputType = {
    createdBy: number | null
  }

  export type RecordingSessionSumAggregateOutputType = {
    createdBy: number | null
  }

  export type RecordingSessionMinAggregateOutputType = {
    id: string | null
    roomName: string | null
    sessionKey: string | null
    status: $Enums.SessionStatus | null
    startTime: Date | null
    endTime: Date | null
    createdBy: number | null
  }

  export type RecordingSessionMaxAggregateOutputType = {
    id: string | null
    roomName: string | null
    sessionKey: string | null
    status: $Enums.SessionStatus | null
    startTime: Date | null
    endTime: Date | null
    createdBy: number | null
  }

  export type RecordingSessionCountAggregateOutputType = {
    id: number
    roomName: number
    sessionKey: number
    status: number
    startTime: number
    endTime: number
    createdBy: number
    _all: number
  }


  export type RecordingSessionAvgAggregateInputType = {
    createdBy?: true
  }

  export type RecordingSessionSumAggregateInputType = {
    createdBy?: true
  }

  export type RecordingSessionMinAggregateInputType = {
    id?: true
    roomName?: true
    sessionKey?: true
    status?: true
    startTime?: true
    endTime?: true
    createdBy?: true
  }

  export type RecordingSessionMaxAggregateInputType = {
    id?: true
    roomName?: true
    sessionKey?: true
    status?: true
    startTime?: true
    endTime?: true
    createdBy?: true
  }

  export type RecordingSessionCountAggregateInputType = {
    id?: true
    roomName?: true
    sessionKey?: true
    status?: true
    startTime?: true
    endTime?: true
    createdBy?: true
    _all?: true
  }

  export type RecordingSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordingSession to aggregate.
     */
    where?: RecordingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingSessions to fetch.
     */
    orderBy?: RecordingSessionOrderByWithRelationInput | RecordingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecordingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecordingSessions
    **/
    _count?: true | RecordingSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecordingSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecordingSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecordingSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecordingSessionMaxAggregateInputType
  }

  export type GetRecordingSessionAggregateType<T extends RecordingSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateRecordingSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecordingSession[P]>
      : GetScalarType<T[P], AggregateRecordingSession[P]>
  }




  export type RecordingSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingSessionWhereInput
    orderBy?: RecordingSessionOrderByWithAggregationInput | RecordingSessionOrderByWithAggregationInput[]
    by: RecordingSessionScalarFieldEnum[] | RecordingSessionScalarFieldEnum
    having?: RecordingSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecordingSessionCountAggregateInputType | true
    _avg?: RecordingSessionAvgAggregateInputType
    _sum?: RecordingSessionSumAggregateInputType
    _min?: RecordingSessionMinAggregateInputType
    _max?: RecordingSessionMaxAggregateInputType
  }

  export type RecordingSessionGroupByOutputType = {
    id: string
    roomName: string
    sessionKey: string
    status: $Enums.SessionStatus
    startTime: Date
    endTime: Date | null
    createdBy: number
    _count: RecordingSessionCountAggregateOutputType | null
    _avg: RecordingSessionAvgAggregateOutputType | null
    _sum: RecordingSessionSumAggregateOutputType | null
    _min: RecordingSessionMinAggregateOutputType | null
    _max: RecordingSessionMaxAggregateOutputType | null
  }

  type GetRecordingSessionGroupByPayload<T extends RecordingSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecordingSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecordingSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecordingSessionGroupByOutputType[P]>
            : GetScalarType<T[P], RecordingSessionGroupByOutputType[P]>
        }
      >
    >


  export type RecordingSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomName?: boolean
    sessionKey?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    createdBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    participants?: boolean | RecordingSession$participantsArgs<ExtArgs>
    chunks?: boolean | RecordingSession$chunksArgs<ExtArgs>
    _count?: boolean | RecordingSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recordingSession"]>

  export type RecordingSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomName?: boolean
    sessionKey?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    createdBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recordingSession"]>

  export type RecordingSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomName?: boolean
    sessionKey?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    createdBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recordingSession"]>

  export type RecordingSessionSelectScalar = {
    id?: boolean
    roomName?: boolean
    sessionKey?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    createdBy?: boolean
  }

  export type RecordingSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomName" | "sessionKey" | "status" | "startTime" | "endTime" | "createdBy", ExtArgs["result"]["recordingSession"]>
  export type RecordingSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    participants?: boolean | RecordingSession$participantsArgs<ExtArgs>
    chunks?: boolean | RecordingSession$chunksArgs<ExtArgs>
    _count?: boolean | RecordingSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RecordingSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RecordingSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RecordingSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecordingSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      participants: Prisma.$SessionParticipantPayload<ExtArgs>[]
      chunks: Prisma.$RecordingChunkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomName: string
      sessionKey: string
      status: $Enums.SessionStatus
      startTime: Date
      endTime: Date | null
      createdBy: number
    }, ExtArgs["result"]["recordingSession"]>
    composites: {}
  }

  type RecordingSessionGetPayload<S extends boolean | null | undefined | RecordingSessionDefaultArgs> = $Result.GetResult<Prisma.$RecordingSessionPayload, S>

  type RecordingSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecordingSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecordingSessionCountAggregateInputType | true
    }

  export interface RecordingSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecordingSession'], meta: { name: 'RecordingSession' } }
    /**
     * Find zero or one RecordingSession that matches the filter.
     * @param {RecordingSessionFindUniqueArgs} args - Arguments to find a RecordingSession
     * @example
     * // Get one RecordingSession
     * const recordingSession = await prisma.recordingSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecordingSessionFindUniqueArgs>(args: SelectSubset<T, RecordingSessionFindUniqueArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecordingSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecordingSessionFindUniqueOrThrowArgs} args - Arguments to find a RecordingSession
     * @example
     * // Get one RecordingSession
     * const recordingSession = await prisma.recordingSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecordingSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, RecordingSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecordingSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingSessionFindFirstArgs} args - Arguments to find a RecordingSession
     * @example
     * // Get one RecordingSession
     * const recordingSession = await prisma.recordingSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecordingSessionFindFirstArgs>(args?: SelectSubset<T, RecordingSessionFindFirstArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecordingSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingSessionFindFirstOrThrowArgs} args - Arguments to find a RecordingSession
     * @example
     * // Get one RecordingSession
     * const recordingSession = await prisma.recordingSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecordingSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, RecordingSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecordingSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecordingSessions
     * const recordingSessions = await prisma.recordingSession.findMany()
     * 
     * // Get first 10 RecordingSessions
     * const recordingSessions = await prisma.recordingSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recordingSessionWithIdOnly = await prisma.recordingSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecordingSessionFindManyArgs>(args?: SelectSubset<T, RecordingSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecordingSession.
     * @param {RecordingSessionCreateArgs} args - Arguments to create a RecordingSession.
     * @example
     * // Create one RecordingSession
     * const RecordingSession = await prisma.recordingSession.create({
     *   data: {
     *     // ... data to create a RecordingSession
     *   }
     * })
     * 
     */
    create<T extends RecordingSessionCreateArgs>(args: SelectSubset<T, RecordingSessionCreateArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecordingSessions.
     * @param {RecordingSessionCreateManyArgs} args - Arguments to create many RecordingSessions.
     * @example
     * // Create many RecordingSessions
     * const recordingSession = await prisma.recordingSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecordingSessionCreateManyArgs>(args?: SelectSubset<T, RecordingSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecordingSessions and returns the data saved in the database.
     * @param {RecordingSessionCreateManyAndReturnArgs} args - Arguments to create many RecordingSessions.
     * @example
     * // Create many RecordingSessions
     * const recordingSession = await prisma.recordingSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecordingSessions and only return the `id`
     * const recordingSessionWithIdOnly = await prisma.recordingSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecordingSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, RecordingSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecordingSession.
     * @param {RecordingSessionDeleteArgs} args - Arguments to delete one RecordingSession.
     * @example
     * // Delete one RecordingSession
     * const RecordingSession = await prisma.recordingSession.delete({
     *   where: {
     *     // ... filter to delete one RecordingSession
     *   }
     * })
     * 
     */
    delete<T extends RecordingSessionDeleteArgs>(args: SelectSubset<T, RecordingSessionDeleteArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecordingSession.
     * @param {RecordingSessionUpdateArgs} args - Arguments to update one RecordingSession.
     * @example
     * // Update one RecordingSession
     * const recordingSession = await prisma.recordingSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecordingSessionUpdateArgs>(args: SelectSubset<T, RecordingSessionUpdateArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecordingSessions.
     * @param {RecordingSessionDeleteManyArgs} args - Arguments to filter RecordingSessions to delete.
     * @example
     * // Delete a few RecordingSessions
     * const { count } = await prisma.recordingSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecordingSessionDeleteManyArgs>(args?: SelectSubset<T, RecordingSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecordingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecordingSessions
     * const recordingSession = await prisma.recordingSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecordingSessionUpdateManyArgs>(args: SelectSubset<T, RecordingSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecordingSessions and returns the data updated in the database.
     * @param {RecordingSessionUpdateManyAndReturnArgs} args - Arguments to update many RecordingSessions.
     * @example
     * // Update many RecordingSessions
     * const recordingSession = await prisma.recordingSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecordingSessions and only return the `id`
     * const recordingSessionWithIdOnly = await prisma.recordingSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecordingSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, RecordingSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecordingSession.
     * @param {RecordingSessionUpsertArgs} args - Arguments to update or create a RecordingSession.
     * @example
     * // Update or create a RecordingSession
     * const recordingSession = await prisma.recordingSession.upsert({
     *   create: {
     *     // ... data to create a RecordingSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecordingSession we want to update
     *   }
     * })
     */
    upsert<T extends RecordingSessionUpsertArgs>(args: SelectSubset<T, RecordingSessionUpsertArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecordingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingSessionCountArgs} args - Arguments to filter RecordingSessions to count.
     * @example
     * // Count the number of RecordingSessions
     * const count = await prisma.recordingSession.count({
     *   where: {
     *     // ... the filter for the RecordingSessions we want to count
     *   }
     * })
    **/
    count<T extends RecordingSessionCountArgs>(
      args?: Subset<T, RecordingSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecordingSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecordingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecordingSessionAggregateArgs>(args: Subset<T, RecordingSessionAggregateArgs>): Prisma.PrismaPromise<GetRecordingSessionAggregateType<T>>

    /**
     * Group by RecordingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecordingSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecordingSessionGroupByArgs['orderBy'] }
        : { orderBy?: RecordingSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecordingSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecordingSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecordingSession model
   */
  readonly fields: RecordingSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecordingSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecordingSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participants<T extends RecordingSession$participantsArgs<ExtArgs> = {}>(args?: Subset<T, RecordingSession$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chunks<T extends RecordingSession$chunksArgs<ExtArgs> = {}>(args?: Subset<T, RecordingSession$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecordingSession model
   */
  interface RecordingSessionFieldRefs {
    readonly id: FieldRef<"RecordingSession", 'String'>
    readonly roomName: FieldRef<"RecordingSession", 'String'>
    readonly sessionKey: FieldRef<"RecordingSession", 'String'>
    readonly status: FieldRef<"RecordingSession", 'SessionStatus'>
    readonly startTime: FieldRef<"RecordingSession", 'DateTime'>
    readonly endTime: FieldRef<"RecordingSession", 'DateTime'>
    readonly createdBy: FieldRef<"RecordingSession", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RecordingSession findUnique
   */
  export type RecordingSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    /**
     * Filter, which RecordingSession to fetch.
     */
    where: RecordingSessionWhereUniqueInput
  }

  /**
   * RecordingSession findUniqueOrThrow
   */
  export type RecordingSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    /**
     * Filter, which RecordingSession to fetch.
     */
    where: RecordingSessionWhereUniqueInput
  }

  /**
   * RecordingSession findFirst
   */
  export type RecordingSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    /**
     * Filter, which RecordingSession to fetch.
     */
    where?: RecordingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingSessions to fetch.
     */
    orderBy?: RecordingSessionOrderByWithRelationInput | RecordingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordingSessions.
     */
    cursor?: RecordingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordingSessions.
     */
    distinct?: RecordingSessionScalarFieldEnum | RecordingSessionScalarFieldEnum[]
  }

  /**
   * RecordingSession findFirstOrThrow
   */
  export type RecordingSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    /**
     * Filter, which RecordingSession to fetch.
     */
    where?: RecordingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingSessions to fetch.
     */
    orderBy?: RecordingSessionOrderByWithRelationInput | RecordingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordingSessions.
     */
    cursor?: RecordingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordingSessions.
     */
    distinct?: RecordingSessionScalarFieldEnum | RecordingSessionScalarFieldEnum[]
  }

  /**
   * RecordingSession findMany
   */
  export type RecordingSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    /**
     * Filter, which RecordingSessions to fetch.
     */
    where?: RecordingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingSessions to fetch.
     */
    orderBy?: RecordingSessionOrderByWithRelationInput | RecordingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecordingSessions.
     */
    cursor?: RecordingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingSessions.
     */
    skip?: number
    distinct?: RecordingSessionScalarFieldEnum | RecordingSessionScalarFieldEnum[]
  }

  /**
   * RecordingSession create
   */
  export type RecordingSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a RecordingSession.
     */
    data: XOR<RecordingSessionCreateInput, RecordingSessionUncheckedCreateInput>
  }

  /**
   * RecordingSession createMany
   */
  export type RecordingSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecordingSessions.
     */
    data: RecordingSessionCreateManyInput | RecordingSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecordingSession createManyAndReturn
   */
  export type RecordingSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * The data used to create many RecordingSessions.
     */
    data: RecordingSessionCreateManyInput | RecordingSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecordingSession update
   */
  export type RecordingSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a RecordingSession.
     */
    data: XOR<RecordingSessionUpdateInput, RecordingSessionUncheckedUpdateInput>
    /**
     * Choose, which RecordingSession to update.
     */
    where: RecordingSessionWhereUniqueInput
  }

  /**
   * RecordingSession updateMany
   */
  export type RecordingSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecordingSessions.
     */
    data: XOR<RecordingSessionUpdateManyMutationInput, RecordingSessionUncheckedUpdateManyInput>
    /**
     * Filter which RecordingSessions to update
     */
    where?: RecordingSessionWhereInput
    /**
     * Limit how many RecordingSessions to update.
     */
    limit?: number
  }

  /**
   * RecordingSession updateManyAndReturn
   */
  export type RecordingSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * The data used to update RecordingSessions.
     */
    data: XOR<RecordingSessionUpdateManyMutationInput, RecordingSessionUncheckedUpdateManyInput>
    /**
     * Filter which RecordingSessions to update
     */
    where?: RecordingSessionWhereInput
    /**
     * Limit how many RecordingSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecordingSession upsert
   */
  export type RecordingSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the RecordingSession to update in case it exists.
     */
    where: RecordingSessionWhereUniqueInput
    /**
     * In case the RecordingSession found by the `where` argument doesn't exist, create a new RecordingSession with this data.
     */
    create: XOR<RecordingSessionCreateInput, RecordingSessionUncheckedCreateInput>
    /**
     * In case the RecordingSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecordingSessionUpdateInput, RecordingSessionUncheckedUpdateInput>
  }

  /**
   * RecordingSession delete
   */
  export type RecordingSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
    /**
     * Filter which RecordingSession to delete.
     */
    where: RecordingSessionWhereUniqueInput
  }

  /**
   * RecordingSession deleteMany
   */
  export type RecordingSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordingSessions to delete
     */
    where?: RecordingSessionWhereInput
    /**
     * Limit how many RecordingSessions to delete.
     */
    limit?: number
  }

  /**
   * RecordingSession.participants
   */
  export type RecordingSession$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    where?: SessionParticipantWhereInput
    orderBy?: SessionParticipantOrderByWithRelationInput | SessionParticipantOrderByWithRelationInput[]
    cursor?: SessionParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionParticipantScalarFieldEnum | SessionParticipantScalarFieldEnum[]
  }

  /**
   * RecordingSession.chunks
   */
  export type RecordingSession$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    where?: RecordingChunkWhereInput
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    cursor?: RecordingChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * RecordingSession without action
   */
  export type RecordingSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingSession
     */
    select?: RecordingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingSession
     */
    omit?: RecordingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingSessionInclude<ExtArgs> | null
  }


  /**
   * Model SessionParticipant
   */

  export type AggregateSessionParticipant = {
    _count: SessionParticipantCountAggregateOutputType | null
    _avg: SessionParticipantAvgAggregateOutputType | null
    _sum: SessionParticipantSumAggregateOutputType | null
    _min: SessionParticipantMinAggregateOutputType | null
    _max: SessionParticipantMaxAggregateOutputType | null
  }

  export type SessionParticipantAvgAggregateOutputType = {
    userId: number | null
  }

  export type SessionParticipantSumAggregateOutputType = {
    userId: number | null
  }

  export type SessionParticipantMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userId: number | null
    username: string | null
    joinedAt: Date | null
    leftAt: Date | null
  }

  export type SessionParticipantMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userId: number | null
    username: string | null
    joinedAt: Date | null
    leftAt: Date | null
  }

  export type SessionParticipantCountAggregateOutputType = {
    id: number
    sessionId: number
    userId: number
    username: number
    joinedAt: number
    leftAt: number
    _all: number
  }


  export type SessionParticipantAvgAggregateInputType = {
    userId?: true
  }

  export type SessionParticipantSumAggregateInputType = {
    userId?: true
  }

  export type SessionParticipantMinAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    username?: true
    joinedAt?: true
    leftAt?: true
  }

  export type SessionParticipantMaxAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    username?: true
    joinedAt?: true
    leftAt?: true
  }

  export type SessionParticipantCountAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    username?: true
    joinedAt?: true
    leftAt?: true
    _all?: true
  }

  export type SessionParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionParticipant to aggregate.
     */
    where?: SessionParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionParticipants to fetch.
     */
    orderBy?: SessionParticipantOrderByWithRelationInput | SessionParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SessionParticipants
    **/
    _count?: true | SessionParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionParticipantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionParticipantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionParticipantMaxAggregateInputType
  }

  export type GetSessionParticipantAggregateType<T extends SessionParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateSessionParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSessionParticipant[P]>
      : GetScalarType<T[P], AggregateSessionParticipant[P]>
  }




  export type SessionParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionParticipantWhereInput
    orderBy?: SessionParticipantOrderByWithAggregationInput | SessionParticipantOrderByWithAggregationInput[]
    by: SessionParticipantScalarFieldEnum[] | SessionParticipantScalarFieldEnum
    having?: SessionParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionParticipantCountAggregateInputType | true
    _avg?: SessionParticipantAvgAggregateInputType
    _sum?: SessionParticipantSumAggregateInputType
    _min?: SessionParticipantMinAggregateInputType
    _max?: SessionParticipantMaxAggregateInputType
  }

  export type SessionParticipantGroupByOutputType = {
    id: string
    sessionId: string
    userId: number
    username: string
    joinedAt: Date
    leftAt: Date | null
    _count: SessionParticipantCountAggregateOutputType | null
    _avg: SessionParticipantAvgAggregateOutputType | null
    _sum: SessionParticipantSumAggregateOutputType | null
    _min: SessionParticipantMinAggregateOutputType | null
    _max: SessionParticipantMaxAggregateOutputType | null
  }

  type GetSessionParticipantGroupByPayload<T extends SessionParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], SessionParticipantGroupByOutputType[P]>
        }
      >
    >


  export type SessionParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    username?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    chunks?: boolean | SessionParticipant$chunksArgs<ExtArgs>
    _count?: boolean | SessionParticipantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionParticipant"]>

  export type SessionParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    username?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionParticipant"]>

  export type SessionParticipantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    username?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionParticipant"]>

  export type SessionParticipantSelectScalar = {
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    username?: boolean
    joinedAt?: boolean
    leftAt?: boolean
  }

  export type SessionParticipantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "userId" | "username" | "joinedAt" | "leftAt", ExtArgs["result"]["sessionParticipant"]>
  export type SessionParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    chunks?: boolean | SessionParticipant$chunksArgs<ExtArgs>
    _count?: boolean | SessionParticipantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionParticipantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SessionParticipant"
    objects: {
      session: Prisma.$RecordingSessionPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      chunks: Prisma.$RecordingChunkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      userId: number
      username: string
      joinedAt: Date
      leftAt: Date | null
    }, ExtArgs["result"]["sessionParticipant"]>
    composites: {}
  }

  type SessionParticipantGetPayload<S extends boolean | null | undefined | SessionParticipantDefaultArgs> = $Result.GetResult<Prisma.$SessionParticipantPayload, S>

  type SessionParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionParticipantCountAggregateInputType | true
    }

  export interface SessionParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SessionParticipant'], meta: { name: 'SessionParticipant' } }
    /**
     * Find zero or one SessionParticipant that matches the filter.
     * @param {SessionParticipantFindUniqueArgs} args - Arguments to find a SessionParticipant
     * @example
     * // Get one SessionParticipant
     * const sessionParticipant = await prisma.sessionParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionParticipantFindUniqueArgs>(args: SelectSubset<T, SessionParticipantFindUniqueArgs<ExtArgs>>): Prisma__SessionParticipantClient<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SessionParticipant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionParticipantFindUniqueOrThrowArgs} args - Arguments to find a SessionParticipant
     * @example
     * // Get one SessionParticipant
     * const sessionParticipant = await prisma.sessionParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionParticipantClient<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SessionParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionParticipantFindFirstArgs} args - Arguments to find a SessionParticipant
     * @example
     * // Get one SessionParticipant
     * const sessionParticipant = await prisma.sessionParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionParticipantFindFirstArgs>(args?: SelectSubset<T, SessionParticipantFindFirstArgs<ExtArgs>>): Prisma__SessionParticipantClient<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SessionParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionParticipantFindFirstOrThrowArgs} args - Arguments to find a SessionParticipant
     * @example
     * // Get one SessionParticipant
     * const sessionParticipant = await prisma.sessionParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionParticipantClient<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SessionParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SessionParticipants
     * const sessionParticipants = await prisma.sessionParticipant.findMany()
     * 
     * // Get first 10 SessionParticipants
     * const sessionParticipants = await prisma.sessionParticipant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionParticipantWithIdOnly = await prisma.sessionParticipant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionParticipantFindManyArgs>(args?: SelectSubset<T, SessionParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SessionParticipant.
     * @param {SessionParticipantCreateArgs} args - Arguments to create a SessionParticipant.
     * @example
     * // Create one SessionParticipant
     * const SessionParticipant = await prisma.sessionParticipant.create({
     *   data: {
     *     // ... data to create a SessionParticipant
     *   }
     * })
     * 
     */
    create<T extends SessionParticipantCreateArgs>(args: SelectSubset<T, SessionParticipantCreateArgs<ExtArgs>>): Prisma__SessionParticipantClient<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SessionParticipants.
     * @param {SessionParticipantCreateManyArgs} args - Arguments to create many SessionParticipants.
     * @example
     * // Create many SessionParticipants
     * const sessionParticipant = await prisma.sessionParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionParticipantCreateManyArgs>(args?: SelectSubset<T, SessionParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SessionParticipants and returns the data saved in the database.
     * @param {SessionParticipantCreateManyAndReturnArgs} args - Arguments to create many SessionParticipants.
     * @example
     * // Create many SessionParticipants
     * const sessionParticipant = await prisma.sessionParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SessionParticipants and only return the `id`
     * const sessionParticipantWithIdOnly = await prisma.sessionParticipant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SessionParticipant.
     * @param {SessionParticipantDeleteArgs} args - Arguments to delete one SessionParticipant.
     * @example
     * // Delete one SessionParticipant
     * const SessionParticipant = await prisma.sessionParticipant.delete({
     *   where: {
     *     // ... filter to delete one SessionParticipant
     *   }
     * })
     * 
     */
    delete<T extends SessionParticipantDeleteArgs>(args: SelectSubset<T, SessionParticipantDeleteArgs<ExtArgs>>): Prisma__SessionParticipantClient<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SessionParticipant.
     * @param {SessionParticipantUpdateArgs} args - Arguments to update one SessionParticipant.
     * @example
     * // Update one SessionParticipant
     * const sessionParticipant = await prisma.sessionParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionParticipantUpdateArgs>(args: SelectSubset<T, SessionParticipantUpdateArgs<ExtArgs>>): Prisma__SessionParticipantClient<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SessionParticipants.
     * @param {SessionParticipantDeleteManyArgs} args - Arguments to filter SessionParticipants to delete.
     * @example
     * // Delete a few SessionParticipants
     * const { count } = await prisma.sessionParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionParticipantDeleteManyArgs>(args?: SelectSubset<T, SessionParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SessionParticipants
     * const sessionParticipant = await prisma.sessionParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionParticipantUpdateManyArgs>(args: SelectSubset<T, SessionParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionParticipants and returns the data updated in the database.
     * @param {SessionParticipantUpdateManyAndReturnArgs} args - Arguments to update many SessionParticipants.
     * @example
     * // Update many SessionParticipants
     * const sessionParticipant = await prisma.sessionParticipant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SessionParticipants and only return the `id`
     * const sessionParticipantWithIdOnly = await prisma.sessionParticipant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionParticipantUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SessionParticipant.
     * @param {SessionParticipantUpsertArgs} args - Arguments to update or create a SessionParticipant.
     * @example
     * // Update or create a SessionParticipant
     * const sessionParticipant = await prisma.sessionParticipant.upsert({
     *   create: {
     *     // ... data to create a SessionParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SessionParticipant we want to update
     *   }
     * })
     */
    upsert<T extends SessionParticipantUpsertArgs>(args: SelectSubset<T, SessionParticipantUpsertArgs<ExtArgs>>): Prisma__SessionParticipantClient<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SessionParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionParticipantCountArgs} args - Arguments to filter SessionParticipants to count.
     * @example
     * // Count the number of SessionParticipants
     * const count = await prisma.sessionParticipant.count({
     *   where: {
     *     // ... the filter for the SessionParticipants we want to count
     *   }
     * })
    **/
    count<T extends SessionParticipantCountArgs>(
      args?: Subset<T, SessionParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SessionParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionParticipantAggregateArgs>(args: Subset<T, SessionParticipantAggregateArgs>): Prisma.PrismaPromise<GetSessionParticipantAggregateType<T>>

    /**
     * Group by SessionParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionParticipantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionParticipantGroupByArgs['orderBy'] }
        : { orderBy?: SessionParticipantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SessionParticipant model
   */
  readonly fields: SessionParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SessionParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends RecordingSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecordingSessionDefaultArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chunks<T extends SessionParticipant$chunksArgs<ExtArgs> = {}>(args?: Subset<T, SessionParticipant$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SessionParticipant model
   */
  interface SessionParticipantFieldRefs {
    readonly id: FieldRef<"SessionParticipant", 'String'>
    readonly sessionId: FieldRef<"SessionParticipant", 'String'>
    readonly userId: FieldRef<"SessionParticipant", 'Int'>
    readonly username: FieldRef<"SessionParticipant", 'String'>
    readonly joinedAt: FieldRef<"SessionParticipant", 'DateTime'>
    readonly leftAt: FieldRef<"SessionParticipant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SessionParticipant findUnique
   */
  export type SessionParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    /**
     * Filter, which SessionParticipant to fetch.
     */
    where: SessionParticipantWhereUniqueInput
  }

  /**
   * SessionParticipant findUniqueOrThrow
   */
  export type SessionParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    /**
     * Filter, which SessionParticipant to fetch.
     */
    where: SessionParticipantWhereUniqueInput
  }

  /**
   * SessionParticipant findFirst
   */
  export type SessionParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    /**
     * Filter, which SessionParticipant to fetch.
     */
    where?: SessionParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionParticipants to fetch.
     */
    orderBy?: SessionParticipantOrderByWithRelationInput | SessionParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionParticipants.
     */
    cursor?: SessionParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionParticipants.
     */
    distinct?: SessionParticipantScalarFieldEnum | SessionParticipantScalarFieldEnum[]
  }

  /**
   * SessionParticipant findFirstOrThrow
   */
  export type SessionParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    /**
     * Filter, which SessionParticipant to fetch.
     */
    where?: SessionParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionParticipants to fetch.
     */
    orderBy?: SessionParticipantOrderByWithRelationInput | SessionParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionParticipants.
     */
    cursor?: SessionParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionParticipants.
     */
    distinct?: SessionParticipantScalarFieldEnum | SessionParticipantScalarFieldEnum[]
  }

  /**
   * SessionParticipant findMany
   */
  export type SessionParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    /**
     * Filter, which SessionParticipants to fetch.
     */
    where?: SessionParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionParticipants to fetch.
     */
    orderBy?: SessionParticipantOrderByWithRelationInput | SessionParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SessionParticipants.
     */
    cursor?: SessionParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionParticipants.
     */
    skip?: number
    distinct?: SessionParticipantScalarFieldEnum | SessionParticipantScalarFieldEnum[]
  }

  /**
   * SessionParticipant create
   */
  export type SessionParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a SessionParticipant.
     */
    data: XOR<SessionParticipantCreateInput, SessionParticipantUncheckedCreateInput>
  }

  /**
   * SessionParticipant createMany
   */
  export type SessionParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SessionParticipants.
     */
    data: SessionParticipantCreateManyInput | SessionParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SessionParticipant createManyAndReturn
   */
  export type SessionParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * The data used to create many SessionParticipants.
     */
    data: SessionParticipantCreateManyInput | SessionParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SessionParticipant update
   */
  export type SessionParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a SessionParticipant.
     */
    data: XOR<SessionParticipantUpdateInput, SessionParticipantUncheckedUpdateInput>
    /**
     * Choose, which SessionParticipant to update.
     */
    where: SessionParticipantWhereUniqueInput
  }

  /**
   * SessionParticipant updateMany
   */
  export type SessionParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SessionParticipants.
     */
    data: XOR<SessionParticipantUpdateManyMutationInput, SessionParticipantUncheckedUpdateManyInput>
    /**
     * Filter which SessionParticipants to update
     */
    where?: SessionParticipantWhereInput
    /**
     * Limit how many SessionParticipants to update.
     */
    limit?: number
  }

  /**
   * SessionParticipant updateManyAndReturn
   */
  export type SessionParticipantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * The data used to update SessionParticipants.
     */
    data: XOR<SessionParticipantUpdateManyMutationInput, SessionParticipantUncheckedUpdateManyInput>
    /**
     * Filter which SessionParticipants to update
     */
    where?: SessionParticipantWhereInput
    /**
     * Limit how many SessionParticipants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SessionParticipant upsert
   */
  export type SessionParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the SessionParticipant to update in case it exists.
     */
    where: SessionParticipantWhereUniqueInput
    /**
     * In case the SessionParticipant found by the `where` argument doesn't exist, create a new SessionParticipant with this data.
     */
    create: XOR<SessionParticipantCreateInput, SessionParticipantUncheckedCreateInput>
    /**
     * In case the SessionParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionParticipantUpdateInput, SessionParticipantUncheckedUpdateInput>
  }

  /**
   * SessionParticipant delete
   */
  export type SessionParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
    /**
     * Filter which SessionParticipant to delete.
     */
    where: SessionParticipantWhereUniqueInput
  }

  /**
   * SessionParticipant deleteMany
   */
  export type SessionParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionParticipants to delete
     */
    where?: SessionParticipantWhereInput
    /**
     * Limit how many SessionParticipants to delete.
     */
    limit?: number
  }

  /**
   * SessionParticipant.chunks
   */
  export type SessionParticipant$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    where?: RecordingChunkWhereInput
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    cursor?: RecordingChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * SessionParticipant without action
   */
  export type SessionParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionParticipant
     */
    select?: SessionParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionParticipant
     */
    omit?: SessionParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionParticipantInclude<ExtArgs> | null
  }


  /**
   * Model RecordingChunk
   */

  export type AggregateRecordingChunk = {
    _count: RecordingChunkCountAggregateOutputType | null
    _avg: RecordingChunkAvgAggregateOutputType | null
    _sum: RecordingChunkSumAggregateOutputType | null
    _min: RecordingChunkMinAggregateOutputType | null
    _max: RecordingChunkMaxAggregateOutputType | null
  }

  export type RecordingChunkAvgAggregateOutputType = {
    userId: number | null
    chunkNumber: number | null
    fileSize: number | null
    duration: number | null
  }

  export type RecordingChunkSumAggregateOutputType = {
    userId: number | null
    chunkNumber: number | null
    fileSize: bigint | null
    duration: number | null
  }

  export type RecordingChunkMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    participantId: string | null
    userId: number | null
    chunkNumber: number | null
    s3Key: string | null
    s3Bucket: string | null
    fileSize: bigint | null
    duration: number | null
    mimeType: string | null
    uploadStatus: $Enums.UploadStatus | null
    uploadedAt: Date | null
    createdAt: Date | null
  }

  export type RecordingChunkMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    participantId: string | null
    userId: number | null
    chunkNumber: number | null
    s3Key: string | null
    s3Bucket: string | null
    fileSize: bigint | null
    duration: number | null
    mimeType: string | null
    uploadStatus: $Enums.UploadStatus | null
    uploadedAt: Date | null
    createdAt: Date | null
  }

  export type RecordingChunkCountAggregateOutputType = {
    id: number
    sessionId: number
    participantId: number
    userId: number
    chunkNumber: number
    s3Key: number
    s3Bucket: number
    fileSize: number
    duration: number
    mimeType: number
    uploadStatus: number
    uploadedAt: number
    createdAt: number
    _all: number
  }


  export type RecordingChunkAvgAggregateInputType = {
    userId?: true
    chunkNumber?: true
    fileSize?: true
    duration?: true
  }

  export type RecordingChunkSumAggregateInputType = {
    userId?: true
    chunkNumber?: true
    fileSize?: true
    duration?: true
  }

  export type RecordingChunkMinAggregateInputType = {
    id?: true
    sessionId?: true
    participantId?: true
    userId?: true
    chunkNumber?: true
    s3Key?: true
    s3Bucket?: true
    fileSize?: true
    duration?: true
    mimeType?: true
    uploadStatus?: true
    uploadedAt?: true
    createdAt?: true
  }

  export type RecordingChunkMaxAggregateInputType = {
    id?: true
    sessionId?: true
    participantId?: true
    userId?: true
    chunkNumber?: true
    s3Key?: true
    s3Bucket?: true
    fileSize?: true
    duration?: true
    mimeType?: true
    uploadStatus?: true
    uploadedAt?: true
    createdAt?: true
  }

  export type RecordingChunkCountAggregateInputType = {
    id?: true
    sessionId?: true
    participantId?: true
    userId?: true
    chunkNumber?: true
    s3Key?: true
    s3Bucket?: true
    fileSize?: true
    duration?: true
    mimeType?: true
    uploadStatus?: true
    uploadedAt?: true
    createdAt?: true
    _all?: true
  }

  export type RecordingChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordingChunk to aggregate.
     */
    where?: RecordingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingChunks to fetch.
     */
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecordingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecordingChunks
    **/
    _count?: true | RecordingChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecordingChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecordingChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecordingChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecordingChunkMaxAggregateInputType
  }

  export type GetRecordingChunkAggregateType<T extends RecordingChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateRecordingChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecordingChunk[P]>
      : GetScalarType<T[P], AggregateRecordingChunk[P]>
  }




  export type RecordingChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingChunkWhereInput
    orderBy?: RecordingChunkOrderByWithAggregationInput | RecordingChunkOrderByWithAggregationInput[]
    by: RecordingChunkScalarFieldEnum[] | RecordingChunkScalarFieldEnum
    having?: RecordingChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecordingChunkCountAggregateInputType | true
    _avg?: RecordingChunkAvgAggregateInputType
    _sum?: RecordingChunkSumAggregateInputType
    _min?: RecordingChunkMinAggregateInputType
    _max?: RecordingChunkMaxAggregateInputType
  }

  export type RecordingChunkGroupByOutputType = {
    id: string
    sessionId: string
    participantId: string
    userId: number
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint
    duration: number | null
    mimeType: string
    uploadStatus: $Enums.UploadStatus
    uploadedAt: Date | null
    createdAt: Date
    _count: RecordingChunkCountAggregateOutputType | null
    _avg: RecordingChunkAvgAggregateOutputType | null
    _sum: RecordingChunkSumAggregateOutputType | null
    _min: RecordingChunkMinAggregateOutputType | null
    _max: RecordingChunkMaxAggregateOutputType | null
  }

  type GetRecordingChunkGroupByPayload<T extends RecordingChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecordingChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecordingChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecordingChunkGroupByOutputType[P]>
            : GetScalarType<T[P], RecordingChunkGroupByOutputType[P]>
        }
      >
    >


  export type RecordingChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    participantId?: boolean
    userId?: boolean
    chunkNumber?: boolean
    s3Key?: boolean
    s3Bucket?: boolean
    fileSize?: boolean
    duration?: boolean
    mimeType?: boolean
    uploadStatus?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    participant?: boolean | SessionParticipantDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recordingChunk"]>

  export type RecordingChunkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    participantId?: boolean
    userId?: boolean
    chunkNumber?: boolean
    s3Key?: boolean
    s3Bucket?: boolean
    fileSize?: boolean
    duration?: boolean
    mimeType?: boolean
    uploadStatus?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    participant?: boolean | SessionParticipantDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recordingChunk"]>

  export type RecordingChunkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    participantId?: boolean
    userId?: boolean
    chunkNumber?: boolean
    s3Key?: boolean
    s3Bucket?: boolean
    fileSize?: boolean
    duration?: boolean
    mimeType?: boolean
    uploadStatus?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    participant?: boolean | SessionParticipantDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recordingChunk"]>

  export type RecordingChunkSelectScalar = {
    id?: boolean
    sessionId?: boolean
    participantId?: boolean
    userId?: boolean
    chunkNumber?: boolean
    s3Key?: boolean
    s3Bucket?: boolean
    fileSize?: boolean
    duration?: boolean
    mimeType?: boolean
    uploadStatus?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
  }

  export type RecordingChunkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "participantId" | "userId" | "chunkNumber" | "s3Key" | "s3Bucket" | "fileSize" | "duration" | "mimeType" | "uploadStatus" | "uploadedAt" | "createdAt", ExtArgs["result"]["recordingChunk"]>
  export type RecordingChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    participant?: boolean | SessionParticipantDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RecordingChunkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    participant?: boolean | SessionParticipantDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RecordingChunkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RecordingSessionDefaultArgs<ExtArgs>
    participant?: boolean | SessionParticipantDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RecordingChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecordingChunk"
    objects: {
      session: Prisma.$RecordingSessionPayload<ExtArgs>
      participant: Prisma.$SessionParticipantPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      participantId: string
      userId: number
      chunkNumber: number
      s3Key: string
      s3Bucket: string
      fileSize: bigint
      duration: number | null
      mimeType: string
      uploadStatus: $Enums.UploadStatus
      uploadedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["recordingChunk"]>
    composites: {}
  }

  type RecordingChunkGetPayload<S extends boolean | null | undefined | RecordingChunkDefaultArgs> = $Result.GetResult<Prisma.$RecordingChunkPayload, S>

  type RecordingChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecordingChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecordingChunkCountAggregateInputType | true
    }

  export interface RecordingChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecordingChunk'], meta: { name: 'RecordingChunk' } }
    /**
     * Find zero or one RecordingChunk that matches the filter.
     * @param {RecordingChunkFindUniqueArgs} args - Arguments to find a RecordingChunk
     * @example
     * // Get one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecordingChunkFindUniqueArgs>(args: SelectSubset<T, RecordingChunkFindUniqueArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecordingChunk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecordingChunkFindUniqueOrThrowArgs} args - Arguments to find a RecordingChunk
     * @example
     * // Get one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecordingChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, RecordingChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecordingChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkFindFirstArgs} args - Arguments to find a RecordingChunk
     * @example
     * // Get one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecordingChunkFindFirstArgs>(args?: SelectSubset<T, RecordingChunkFindFirstArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecordingChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkFindFirstOrThrowArgs} args - Arguments to find a RecordingChunk
     * @example
     * // Get one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecordingChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, RecordingChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecordingChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecordingChunks
     * const recordingChunks = await prisma.recordingChunk.findMany()
     * 
     * // Get first 10 RecordingChunks
     * const recordingChunks = await prisma.recordingChunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recordingChunkWithIdOnly = await prisma.recordingChunk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecordingChunkFindManyArgs>(args?: SelectSubset<T, RecordingChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecordingChunk.
     * @param {RecordingChunkCreateArgs} args - Arguments to create a RecordingChunk.
     * @example
     * // Create one RecordingChunk
     * const RecordingChunk = await prisma.recordingChunk.create({
     *   data: {
     *     // ... data to create a RecordingChunk
     *   }
     * })
     * 
     */
    create<T extends RecordingChunkCreateArgs>(args: SelectSubset<T, RecordingChunkCreateArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecordingChunks.
     * @param {RecordingChunkCreateManyArgs} args - Arguments to create many RecordingChunks.
     * @example
     * // Create many RecordingChunks
     * const recordingChunk = await prisma.recordingChunk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecordingChunkCreateManyArgs>(args?: SelectSubset<T, RecordingChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecordingChunks and returns the data saved in the database.
     * @param {RecordingChunkCreateManyAndReturnArgs} args - Arguments to create many RecordingChunks.
     * @example
     * // Create many RecordingChunks
     * const recordingChunk = await prisma.recordingChunk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecordingChunks and only return the `id`
     * const recordingChunkWithIdOnly = await prisma.recordingChunk.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecordingChunkCreateManyAndReturnArgs>(args?: SelectSubset<T, RecordingChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecordingChunk.
     * @param {RecordingChunkDeleteArgs} args - Arguments to delete one RecordingChunk.
     * @example
     * // Delete one RecordingChunk
     * const RecordingChunk = await prisma.recordingChunk.delete({
     *   where: {
     *     // ... filter to delete one RecordingChunk
     *   }
     * })
     * 
     */
    delete<T extends RecordingChunkDeleteArgs>(args: SelectSubset<T, RecordingChunkDeleteArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecordingChunk.
     * @param {RecordingChunkUpdateArgs} args - Arguments to update one RecordingChunk.
     * @example
     * // Update one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecordingChunkUpdateArgs>(args: SelectSubset<T, RecordingChunkUpdateArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecordingChunks.
     * @param {RecordingChunkDeleteManyArgs} args - Arguments to filter RecordingChunks to delete.
     * @example
     * // Delete a few RecordingChunks
     * const { count } = await prisma.recordingChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecordingChunkDeleteManyArgs>(args?: SelectSubset<T, RecordingChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecordingChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecordingChunks
     * const recordingChunk = await prisma.recordingChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecordingChunkUpdateManyArgs>(args: SelectSubset<T, RecordingChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecordingChunks and returns the data updated in the database.
     * @param {RecordingChunkUpdateManyAndReturnArgs} args - Arguments to update many RecordingChunks.
     * @example
     * // Update many RecordingChunks
     * const recordingChunk = await prisma.recordingChunk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecordingChunks and only return the `id`
     * const recordingChunkWithIdOnly = await prisma.recordingChunk.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecordingChunkUpdateManyAndReturnArgs>(args: SelectSubset<T, RecordingChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecordingChunk.
     * @param {RecordingChunkUpsertArgs} args - Arguments to update or create a RecordingChunk.
     * @example
     * // Update or create a RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.upsert({
     *   create: {
     *     // ... data to create a RecordingChunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecordingChunk we want to update
     *   }
     * })
     */
    upsert<T extends RecordingChunkUpsertArgs>(args: SelectSubset<T, RecordingChunkUpsertArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecordingChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkCountArgs} args - Arguments to filter RecordingChunks to count.
     * @example
     * // Count the number of RecordingChunks
     * const count = await prisma.recordingChunk.count({
     *   where: {
     *     // ... the filter for the RecordingChunks we want to count
     *   }
     * })
    **/
    count<T extends RecordingChunkCountArgs>(
      args?: Subset<T, RecordingChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecordingChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecordingChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecordingChunkAggregateArgs>(args: Subset<T, RecordingChunkAggregateArgs>): Prisma.PrismaPromise<GetRecordingChunkAggregateType<T>>

    /**
     * Group by RecordingChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecordingChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecordingChunkGroupByArgs['orderBy'] }
        : { orderBy?: RecordingChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecordingChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecordingChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecordingChunk model
   */
  readonly fields: RecordingChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecordingChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecordingChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends RecordingSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecordingSessionDefaultArgs<ExtArgs>>): Prisma__RecordingSessionClient<$Result.GetResult<Prisma.$RecordingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participant<T extends SessionParticipantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionParticipantDefaultArgs<ExtArgs>>): Prisma__SessionParticipantClient<$Result.GetResult<Prisma.$SessionParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecordingChunk model
   */
  interface RecordingChunkFieldRefs {
    readonly id: FieldRef<"RecordingChunk", 'String'>
    readonly sessionId: FieldRef<"RecordingChunk", 'String'>
    readonly participantId: FieldRef<"RecordingChunk", 'String'>
    readonly userId: FieldRef<"RecordingChunk", 'Int'>
    readonly chunkNumber: FieldRef<"RecordingChunk", 'Int'>
    readonly s3Key: FieldRef<"RecordingChunk", 'String'>
    readonly s3Bucket: FieldRef<"RecordingChunk", 'String'>
    readonly fileSize: FieldRef<"RecordingChunk", 'BigInt'>
    readonly duration: FieldRef<"RecordingChunk", 'Float'>
    readonly mimeType: FieldRef<"RecordingChunk", 'String'>
    readonly uploadStatus: FieldRef<"RecordingChunk", 'UploadStatus'>
    readonly uploadedAt: FieldRef<"RecordingChunk", 'DateTime'>
    readonly createdAt: FieldRef<"RecordingChunk", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecordingChunk findUnique
   */
  export type RecordingChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunk to fetch.
     */
    where: RecordingChunkWhereUniqueInput
  }

  /**
   * RecordingChunk findUniqueOrThrow
   */
  export type RecordingChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunk to fetch.
     */
    where: RecordingChunkWhereUniqueInput
  }

  /**
   * RecordingChunk findFirst
   */
  export type RecordingChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunk to fetch.
     */
    where?: RecordingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingChunks to fetch.
     */
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordingChunks.
     */
    cursor?: RecordingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordingChunks.
     */
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * RecordingChunk findFirstOrThrow
   */
  export type RecordingChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunk to fetch.
     */
    where?: RecordingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingChunks to fetch.
     */
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordingChunks.
     */
    cursor?: RecordingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordingChunks.
     */
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * RecordingChunk findMany
   */
  export type RecordingChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunks to fetch.
     */
    where?: RecordingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingChunks to fetch.
     */
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecordingChunks.
     */
    cursor?: RecordingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingChunks.
     */
    skip?: number
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * RecordingChunk create
   */
  export type RecordingChunkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a RecordingChunk.
     */
    data: XOR<RecordingChunkCreateInput, RecordingChunkUncheckedCreateInput>
  }

  /**
   * RecordingChunk createMany
   */
  export type RecordingChunkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecordingChunks.
     */
    data: RecordingChunkCreateManyInput | RecordingChunkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecordingChunk createManyAndReturn
   */
  export type RecordingChunkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * The data used to create many RecordingChunks.
     */
    data: RecordingChunkCreateManyInput | RecordingChunkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecordingChunk update
   */
  export type RecordingChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a RecordingChunk.
     */
    data: XOR<RecordingChunkUpdateInput, RecordingChunkUncheckedUpdateInput>
    /**
     * Choose, which RecordingChunk to update.
     */
    where: RecordingChunkWhereUniqueInput
  }

  /**
   * RecordingChunk updateMany
   */
  export type RecordingChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecordingChunks.
     */
    data: XOR<RecordingChunkUpdateManyMutationInput, RecordingChunkUncheckedUpdateManyInput>
    /**
     * Filter which RecordingChunks to update
     */
    where?: RecordingChunkWhereInput
    /**
     * Limit how many RecordingChunks to update.
     */
    limit?: number
  }

  /**
   * RecordingChunk updateManyAndReturn
   */
  export type RecordingChunkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * The data used to update RecordingChunks.
     */
    data: XOR<RecordingChunkUpdateManyMutationInput, RecordingChunkUncheckedUpdateManyInput>
    /**
     * Filter which RecordingChunks to update
     */
    where?: RecordingChunkWhereInput
    /**
     * Limit how many RecordingChunks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecordingChunk upsert
   */
  export type RecordingChunkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the RecordingChunk to update in case it exists.
     */
    where: RecordingChunkWhereUniqueInput
    /**
     * In case the RecordingChunk found by the `where` argument doesn't exist, create a new RecordingChunk with this data.
     */
    create: XOR<RecordingChunkCreateInput, RecordingChunkUncheckedCreateInput>
    /**
     * In case the RecordingChunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecordingChunkUpdateInput, RecordingChunkUncheckedUpdateInput>
  }

  /**
   * RecordingChunk delete
   */
  export type RecordingChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter which RecordingChunk to delete.
     */
    where: RecordingChunkWhereUniqueInput
  }

  /**
   * RecordingChunk deleteMany
   */
  export type RecordingChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordingChunks to delete
     */
    where?: RecordingChunkWhereInput
    /**
     * Limit how many RecordingChunks to delete.
     */
    limit?: number
  }

  /**
   * RecordingChunk without action
   */
  export type RecordingChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordingChunk
     */
    omit?: RecordingChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
  }


  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    company: string | null
    subject: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    company: string | null
    subject: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    company: number
    subject: number
    message: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContactMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    company?: true
    subject?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    company?: true
    subject?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    company?: true
    subject?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    company: string | null
    subject: string
    message: string
    createdAt: Date
    updatedAt: Date
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    company?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    company?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    company?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    company?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "company" | "subject" | "message" | "createdAt" | "updatedAt", ExtArgs["result"]["contact"]>

  export type $ContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contact"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      company: string | null
      subject: string
      message: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contact"]>
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>

  type ContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactCountAggregateInputType | true
    }

  export interface ContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contact'], meta: { name: 'Contact' } }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactFindManyArgs>(args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
     */
    create<T extends ContactCreateArgs>(args: SelectSubset<T, ContactCreateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactCreateManyArgs>(args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {ContactCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
     */
    delete<T extends ContactDeleteArgs>(args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactUpdateArgs>(args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactDeleteManyArgs>(args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactUpdateManyArgs>(args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts and returns the data updated in the database.
     * @param {ContactUpdateManyAndReturnArgs} args - Arguments to update many Contacts.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contact model
   */
  readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly id: FieldRef<"Contact", 'String'>
    readonly firstName: FieldRef<"Contact", 'String'>
    readonly lastName: FieldRef<"Contact", 'String'>
    readonly email: FieldRef<"Contact", 'String'>
    readonly company: FieldRef<"Contact", 'String'>
    readonly subject: FieldRef<"Contact", 'String'>
    readonly message: FieldRef<"Contact", 'String'>
    readonly createdAt: FieldRef<"Contact", 'DateTime'>
    readonly updatedAt: FieldRef<"Contact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contact createManyAndReturn
   */
  export type ContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
  }

  /**
   * Contact updateManyAndReturn
   */
  export type ContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to delete.
     */
    limit?: number
  }

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    verified: 'verified',
    token: 'token',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PodcastScalarFieldEnum: {
    id: 'id',
    key: 'key',
    name: 'name',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type PodcastScalarFieldEnum = (typeof PodcastScalarFieldEnum)[keyof typeof PodcastScalarFieldEnum]


  export const ScheduleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    scheduledAt: 'scheduledAt',
    createdById: 'createdById',
    participants: 'participants',
    createdAt: 'createdAt'
  };

  export type ScheduleScalarFieldEnum = (typeof ScheduleScalarFieldEnum)[keyof typeof ScheduleScalarFieldEnum]


  export const RecordingSessionScalarFieldEnum: {
    id: 'id',
    roomName: 'roomName',
    sessionKey: 'sessionKey',
    status: 'status',
    startTime: 'startTime',
    endTime: 'endTime',
    createdBy: 'createdBy'
  };

  export type RecordingSessionScalarFieldEnum = (typeof RecordingSessionScalarFieldEnum)[keyof typeof RecordingSessionScalarFieldEnum]


  export const SessionParticipantScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    username: 'username',
    joinedAt: 'joinedAt',
    leftAt: 'leftAt'
  };

  export type SessionParticipantScalarFieldEnum = (typeof SessionParticipantScalarFieldEnum)[keyof typeof SessionParticipantScalarFieldEnum]


  export const RecordingChunkScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    participantId: 'participantId',
    userId: 'userId',
    chunkNumber: 'chunkNumber',
    s3Key: 's3Key',
    s3Bucket: 's3Bucket',
    fileSize: 'fileSize',
    duration: 'duration',
    mimeType: 'mimeType',
    uploadStatus: 'uploadStatus',
    uploadedAt: 'uploadedAt',
    createdAt: 'createdAt'
  };

  export type RecordingChunkScalarFieldEnum = (typeof RecordingChunkScalarFieldEnum)[keyof typeof RecordingChunkScalarFieldEnum]


  export const ContactScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    company: 'company',
    subject: 'subject',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SessionStatus'
   */
  export type EnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus'>
    


  /**
   * Reference to a field of type 'SessionStatus[]'
   */
  export type ListEnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'UploadStatus'
   */
  export type EnumUploadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadStatus'>
    


  /**
   * Reference to a field of type 'UploadStatus[]'
   */
  export type ListEnumUploadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    verified?: BoolFilter<"User"> | boolean
    token?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    Podacst?: PodcastListRelationFilter
    createdBy?: ScheduleListRelationFilter
    recordingSessions?: RecordingSessionListRelationFilter
    recordingChunks?: RecordingChunkListRelationFilter
    sessionParticipants?: SessionParticipantListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    Podacst?: PodcastOrderByRelationAggregateInput
    createdBy?: ScheduleOrderByRelationAggregateInput
    recordingSessions?: RecordingSessionOrderByRelationAggregateInput
    recordingChunks?: RecordingChunkOrderByRelationAggregateInput
    sessionParticipants?: SessionParticipantOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    token?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    verified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    Podacst?: PodcastListRelationFilter
    createdBy?: ScheduleListRelationFilter
    recordingSessions?: RecordingSessionListRelationFilter
    recordingChunks?: RecordingChunkListRelationFilter
    sessionParticipants?: SessionParticipantListRelationFilter
  }, "id" | "email" | "token">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    verified?: BoolWithAggregatesFilter<"User"> | boolean
    token?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PodcastWhereInput = {
    AND?: PodcastWhereInput | PodcastWhereInput[]
    OR?: PodcastWhereInput[]
    NOT?: PodcastWhereInput | PodcastWhereInput[]
    id?: StringFilter<"Podcast"> | string
    key?: StringFilter<"Podcast"> | string
    name?: StringFilter<"Podcast"> | string
    createdAt?: DateTimeFilter<"Podcast"> | Date | string
    userId?: IntFilter<"Podcast"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PodcastOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PodcastWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: PodcastWhereInput | PodcastWhereInput[]
    OR?: PodcastWhereInput[]
    NOT?: PodcastWhereInput | PodcastWhereInput[]
    name?: StringFilter<"Podcast"> | string
    createdAt?: DateTimeFilter<"Podcast"> | Date | string
    userId?: IntFilter<"Podcast"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "key">

  export type PodcastOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: PodcastCountOrderByAggregateInput
    _avg?: PodcastAvgOrderByAggregateInput
    _max?: PodcastMaxOrderByAggregateInput
    _min?: PodcastMinOrderByAggregateInput
    _sum?: PodcastSumOrderByAggregateInput
  }

  export type PodcastScalarWhereWithAggregatesInput = {
    AND?: PodcastScalarWhereWithAggregatesInput | PodcastScalarWhereWithAggregatesInput[]
    OR?: PodcastScalarWhereWithAggregatesInput[]
    NOT?: PodcastScalarWhereWithAggregatesInput | PodcastScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Podcast"> | string
    key?: StringWithAggregatesFilter<"Podcast"> | string
    name?: StringWithAggregatesFilter<"Podcast"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Podcast"> | Date | string
    userId?: IntWithAggregatesFilter<"Podcast"> | number
  }

  export type ScheduleWhereInput = {
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    id?: StringFilter<"Schedule"> | string
    title?: StringFilter<"Schedule"> | string
    description?: StringNullableFilter<"Schedule"> | string | null
    scheduledAt?: DateTimeFilter<"Schedule"> | Date | string
    createdById?: IntFilter<"Schedule"> | number
    participants?: StringNullableListFilter<"Schedule">
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ScheduleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    scheduledAt?: SortOrder
    createdById?: SortOrder
    participants?: SortOrder
    createdAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
  }

  export type ScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    title?: StringFilter<"Schedule"> | string
    description?: StringNullableFilter<"Schedule"> | string | null
    scheduledAt?: DateTimeFilter<"Schedule"> | Date | string
    createdById?: IntFilter<"Schedule"> | number
    participants?: StringNullableListFilter<"Schedule">
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    scheduledAt?: SortOrder
    createdById?: SortOrder
    participants?: SortOrder
    createdAt?: SortOrder
    _count?: ScheduleCountOrderByAggregateInput
    _avg?: ScheduleAvgOrderByAggregateInput
    _max?: ScheduleMaxOrderByAggregateInput
    _min?: ScheduleMinOrderByAggregateInput
    _sum?: ScheduleSumOrderByAggregateInput
  }

  export type ScheduleScalarWhereWithAggregatesInput = {
    AND?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    OR?: ScheduleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Schedule"> | string
    title?: StringWithAggregatesFilter<"Schedule"> | string
    description?: StringNullableWithAggregatesFilter<"Schedule"> | string | null
    scheduledAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    createdById?: IntWithAggregatesFilter<"Schedule"> | number
    participants?: StringNullableListFilter<"Schedule">
    createdAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
  }

  export type RecordingSessionWhereInput = {
    AND?: RecordingSessionWhereInput | RecordingSessionWhereInput[]
    OR?: RecordingSessionWhereInput[]
    NOT?: RecordingSessionWhereInput | RecordingSessionWhereInput[]
    id?: StringFilter<"RecordingSession"> | string
    roomName?: StringFilter<"RecordingSession"> | string
    sessionKey?: StringFilter<"RecordingSession"> | string
    status?: EnumSessionStatusFilter<"RecordingSession"> | $Enums.SessionStatus
    startTime?: DateTimeFilter<"RecordingSession"> | Date | string
    endTime?: DateTimeNullableFilter<"RecordingSession"> | Date | string | null
    createdBy?: IntFilter<"RecordingSession"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    participants?: SessionParticipantListRelationFilter
    chunks?: RecordingChunkListRelationFilter
  }

  export type RecordingSessionOrderByWithRelationInput = {
    id?: SortOrder
    roomName?: SortOrder
    sessionKey?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    user?: UserOrderByWithRelationInput
    participants?: SessionParticipantOrderByRelationAggregateInput
    chunks?: RecordingChunkOrderByRelationAggregateInput
  }

  export type RecordingSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionKey?: string
    AND?: RecordingSessionWhereInput | RecordingSessionWhereInput[]
    OR?: RecordingSessionWhereInput[]
    NOT?: RecordingSessionWhereInput | RecordingSessionWhereInput[]
    roomName?: StringFilter<"RecordingSession"> | string
    status?: EnumSessionStatusFilter<"RecordingSession"> | $Enums.SessionStatus
    startTime?: DateTimeFilter<"RecordingSession"> | Date | string
    endTime?: DateTimeNullableFilter<"RecordingSession"> | Date | string | null
    createdBy?: IntFilter<"RecordingSession"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    participants?: SessionParticipantListRelationFilter
    chunks?: RecordingChunkListRelationFilter
  }, "id" | "sessionKey">

  export type RecordingSessionOrderByWithAggregationInput = {
    id?: SortOrder
    roomName?: SortOrder
    sessionKey?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    _count?: RecordingSessionCountOrderByAggregateInput
    _avg?: RecordingSessionAvgOrderByAggregateInput
    _max?: RecordingSessionMaxOrderByAggregateInput
    _min?: RecordingSessionMinOrderByAggregateInput
    _sum?: RecordingSessionSumOrderByAggregateInput
  }

  export type RecordingSessionScalarWhereWithAggregatesInput = {
    AND?: RecordingSessionScalarWhereWithAggregatesInput | RecordingSessionScalarWhereWithAggregatesInput[]
    OR?: RecordingSessionScalarWhereWithAggregatesInput[]
    NOT?: RecordingSessionScalarWhereWithAggregatesInput | RecordingSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecordingSession"> | string
    roomName?: StringWithAggregatesFilter<"RecordingSession"> | string
    sessionKey?: StringWithAggregatesFilter<"RecordingSession"> | string
    status?: EnumSessionStatusWithAggregatesFilter<"RecordingSession"> | $Enums.SessionStatus
    startTime?: DateTimeWithAggregatesFilter<"RecordingSession"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"RecordingSession"> | Date | string | null
    createdBy?: IntWithAggregatesFilter<"RecordingSession"> | number
  }

  export type SessionParticipantWhereInput = {
    AND?: SessionParticipantWhereInput | SessionParticipantWhereInput[]
    OR?: SessionParticipantWhereInput[]
    NOT?: SessionParticipantWhereInput | SessionParticipantWhereInput[]
    id?: StringFilter<"SessionParticipant"> | string
    sessionId?: StringFilter<"SessionParticipant"> | string
    userId?: IntFilter<"SessionParticipant"> | number
    username?: StringFilter<"SessionParticipant"> | string
    joinedAt?: DateTimeFilter<"SessionParticipant"> | Date | string
    leftAt?: DateTimeNullableFilter<"SessionParticipant"> | Date | string | null
    session?: XOR<RecordingSessionScalarRelationFilter, RecordingSessionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    chunks?: RecordingChunkListRelationFilter
  }

  export type SessionParticipantOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrderInput | SortOrder
    session?: RecordingSessionOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    chunks?: RecordingChunkOrderByRelationAggregateInput
  }

  export type SessionParticipantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId_userId?: SessionParticipantSessionIdUserIdCompoundUniqueInput
    AND?: SessionParticipantWhereInput | SessionParticipantWhereInput[]
    OR?: SessionParticipantWhereInput[]
    NOT?: SessionParticipantWhereInput | SessionParticipantWhereInput[]
    sessionId?: StringFilter<"SessionParticipant"> | string
    userId?: IntFilter<"SessionParticipant"> | number
    username?: StringFilter<"SessionParticipant"> | string
    joinedAt?: DateTimeFilter<"SessionParticipant"> | Date | string
    leftAt?: DateTimeNullableFilter<"SessionParticipant"> | Date | string | null
    session?: XOR<RecordingSessionScalarRelationFilter, RecordingSessionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    chunks?: RecordingChunkListRelationFilter
  }, "id" | "sessionId_userId">

  export type SessionParticipantOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrderInput | SortOrder
    _count?: SessionParticipantCountOrderByAggregateInput
    _avg?: SessionParticipantAvgOrderByAggregateInput
    _max?: SessionParticipantMaxOrderByAggregateInput
    _min?: SessionParticipantMinOrderByAggregateInput
    _sum?: SessionParticipantSumOrderByAggregateInput
  }

  export type SessionParticipantScalarWhereWithAggregatesInput = {
    AND?: SessionParticipantScalarWhereWithAggregatesInput | SessionParticipantScalarWhereWithAggregatesInput[]
    OR?: SessionParticipantScalarWhereWithAggregatesInput[]
    NOT?: SessionParticipantScalarWhereWithAggregatesInput | SessionParticipantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SessionParticipant"> | string
    sessionId?: StringWithAggregatesFilter<"SessionParticipant"> | string
    userId?: IntWithAggregatesFilter<"SessionParticipant"> | number
    username?: StringWithAggregatesFilter<"SessionParticipant"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"SessionParticipant"> | Date | string
    leftAt?: DateTimeNullableWithAggregatesFilter<"SessionParticipant"> | Date | string | null
  }

  export type RecordingChunkWhereInput = {
    AND?: RecordingChunkWhereInput | RecordingChunkWhereInput[]
    OR?: RecordingChunkWhereInput[]
    NOT?: RecordingChunkWhereInput | RecordingChunkWhereInput[]
    id?: StringFilter<"RecordingChunk"> | string
    sessionId?: StringFilter<"RecordingChunk"> | string
    participantId?: StringFilter<"RecordingChunk"> | string
    userId?: IntFilter<"RecordingChunk"> | number
    chunkNumber?: IntFilter<"RecordingChunk"> | number
    s3Key?: StringFilter<"RecordingChunk"> | string
    s3Bucket?: StringFilter<"RecordingChunk"> | string
    fileSize?: BigIntFilter<"RecordingChunk"> | bigint | number
    duration?: FloatNullableFilter<"RecordingChunk"> | number | null
    mimeType?: StringFilter<"RecordingChunk"> | string
    uploadStatus?: EnumUploadStatusFilter<"RecordingChunk"> | $Enums.UploadStatus
    uploadedAt?: DateTimeNullableFilter<"RecordingChunk"> | Date | string | null
    createdAt?: DateTimeFilter<"RecordingChunk"> | Date | string
    session?: XOR<RecordingSessionScalarRelationFilter, RecordingSessionWhereInput>
    participant?: XOR<SessionParticipantScalarRelationFilter, SessionParticipantWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RecordingChunkOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    participantId?: SortOrder
    userId?: SortOrder
    chunkNumber?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrderInput | SortOrder
    mimeType?: SortOrder
    uploadStatus?: SortOrder
    uploadedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: RecordingSessionOrderByWithRelationInput
    participant?: SessionParticipantOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type RecordingChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    s3Key?: string
    sessionId_participantId_chunkNumber?: RecordingChunkSessionIdParticipantIdChunkNumberCompoundUniqueInput
    AND?: RecordingChunkWhereInput | RecordingChunkWhereInput[]
    OR?: RecordingChunkWhereInput[]
    NOT?: RecordingChunkWhereInput | RecordingChunkWhereInput[]
    sessionId?: StringFilter<"RecordingChunk"> | string
    participantId?: StringFilter<"RecordingChunk"> | string
    userId?: IntFilter<"RecordingChunk"> | number
    chunkNumber?: IntFilter<"RecordingChunk"> | number
    s3Bucket?: StringFilter<"RecordingChunk"> | string
    fileSize?: BigIntFilter<"RecordingChunk"> | bigint | number
    duration?: FloatNullableFilter<"RecordingChunk"> | number | null
    mimeType?: StringFilter<"RecordingChunk"> | string
    uploadStatus?: EnumUploadStatusFilter<"RecordingChunk"> | $Enums.UploadStatus
    uploadedAt?: DateTimeNullableFilter<"RecordingChunk"> | Date | string | null
    createdAt?: DateTimeFilter<"RecordingChunk"> | Date | string
    session?: XOR<RecordingSessionScalarRelationFilter, RecordingSessionWhereInput>
    participant?: XOR<SessionParticipantScalarRelationFilter, SessionParticipantWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "s3Key" | "sessionId_participantId_chunkNumber">

  export type RecordingChunkOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    participantId?: SortOrder
    userId?: SortOrder
    chunkNumber?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrderInput | SortOrder
    mimeType?: SortOrder
    uploadStatus?: SortOrder
    uploadedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RecordingChunkCountOrderByAggregateInput
    _avg?: RecordingChunkAvgOrderByAggregateInput
    _max?: RecordingChunkMaxOrderByAggregateInput
    _min?: RecordingChunkMinOrderByAggregateInput
    _sum?: RecordingChunkSumOrderByAggregateInput
  }

  export type RecordingChunkScalarWhereWithAggregatesInput = {
    AND?: RecordingChunkScalarWhereWithAggregatesInput | RecordingChunkScalarWhereWithAggregatesInput[]
    OR?: RecordingChunkScalarWhereWithAggregatesInput[]
    NOT?: RecordingChunkScalarWhereWithAggregatesInput | RecordingChunkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecordingChunk"> | string
    sessionId?: StringWithAggregatesFilter<"RecordingChunk"> | string
    participantId?: StringWithAggregatesFilter<"RecordingChunk"> | string
    userId?: IntWithAggregatesFilter<"RecordingChunk"> | number
    chunkNumber?: IntWithAggregatesFilter<"RecordingChunk"> | number
    s3Key?: StringWithAggregatesFilter<"RecordingChunk"> | string
    s3Bucket?: StringWithAggregatesFilter<"RecordingChunk"> | string
    fileSize?: BigIntWithAggregatesFilter<"RecordingChunk"> | bigint | number
    duration?: FloatNullableWithAggregatesFilter<"RecordingChunk"> | number | null
    mimeType?: StringWithAggregatesFilter<"RecordingChunk"> | string
    uploadStatus?: EnumUploadStatusWithAggregatesFilter<"RecordingChunk"> | $Enums.UploadStatus
    uploadedAt?: DateTimeNullableWithAggregatesFilter<"RecordingChunk"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RecordingChunk"> | Date | string
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    id?: StringFilter<"Contact"> | string
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    email?: StringFilter<"Contact"> | string
    company?: StringNullableFilter<"Contact"> | string | null
    subject?: StringFilter<"Contact"> | string
    message?: StringFilter<"Contact"> | string
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    company?: SortOrderInput | SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    email?: StringFilter<"Contact"> | string
    company?: StringNullableFilter<"Contact"> | string | null
    subject?: StringFilter<"Contact"> | string
    message?: StringFilter<"Contact"> | string
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
  }, "id">

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    company?: SortOrderInput | SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contact"> | string
    firstName?: StringWithAggregatesFilter<"Contact"> | string
    lastName?: StringWithAggregatesFilter<"Contact"> | string
    email?: StringWithAggregatesFilter<"Contact"> | string
    company?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    subject?: StringWithAggregatesFilter<"Contact"> | string
    message?: StringWithAggregatesFilter<"Contact"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
  }

  export type UserCreateInput = {
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastCreateNestedManyWithoutUserInput
    createdBy?: ScheduleCreateNestedManyWithoutCreatedByInput
    recordingSessions?: RecordingSessionCreateNestedManyWithoutUserInput
    recordingChunks?: RecordingChunkCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastUncheckedCreateNestedManyWithoutUserInput
    createdBy?: ScheduleUncheckedCreateNestedManyWithoutCreatedByInput
    recordingSessions?: RecordingSessionUncheckedCreateNestedManyWithoutUserInput
    recordingChunks?: RecordingChunkUncheckedCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUpdateManyWithoutUserNestedInput
    createdBy?: ScheduleUpdateManyWithoutCreatedByNestedInput
    recordingSessions?: RecordingSessionUpdateManyWithoutUserNestedInput
    recordingChunks?: RecordingChunkUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUncheckedUpdateManyWithoutUserNestedInput
    createdBy?: ScheduleUncheckedUpdateManyWithoutCreatedByNestedInput
    recordingSessions?: RecordingSessionUncheckedUpdateManyWithoutUserNestedInput
    recordingChunks?: RecordingChunkUncheckedUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PodcastCreateInput = {
    id?: string
    key: string
    name: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPodacstInput
  }

  export type PodcastUncheckedCreateInput = {
    id?: string
    key: string
    name: string
    createdAt?: Date | string
    userId: number
  }

  export type PodcastUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPodacstNestedInput
  }

  export type PodcastUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PodcastCreateManyInput = {
    id?: string
    key: string
    name: string
    createdAt?: Date | string
    userId: number
  }

  export type PodcastUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PodcastUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ScheduleCreateInput = {
    id?: string
    title: string
    description?: string | null
    scheduledAt: Date | string
    participants?: ScheduleCreateparticipantsInput | string[]
    createdAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedByInput
  }

  export type ScheduleUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    scheduledAt: Date | string
    createdById: number
    participants?: ScheduleCreateparticipantsInput | string[]
    createdAt?: Date | string
  }

  export type ScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ScheduleUpdateparticipantsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedByNestedInput
  }

  export type ScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: IntFieldUpdateOperationsInput | number
    participants?: ScheduleUpdateparticipantsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    scheduledAt: Date | string
    createdById: number
    participants?: ScheduleCreateparticipantsInput | string[]
    createdAt?: Date | string
  }

  export type ScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ScheduleUpdateparticipantsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: IntFieldUpdateOperationsInput | number
    participants?: ScheduleUpdateparticipantsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingSessionCreateInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    user: UserCreateNestedOneWithoutRecordingSessionsInput
    participants?: SessionParticipantCreateNestedManyWithoutSessionInput
    chunks?: RecordingChunkCreateNestedManyWithoutSessionInput
  }

  export type RecordingSessionUncheckedCreateInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    createdBy: number
    participants?: SessionParticipantUncheckedCreateNestedManyWithoutSessionInput
    chunks?: RecordingChunkUncheckedCreateNestedManyWithoutSessionInput
  }

  export type RecordingSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutRecordingSessionsNestedInput
    participants?: SessionParticipantUpdateManyWithoutSessionNestedInput
    chunks?: RecordingChunkUpdateManyWithoutSessionNestedInput
  }

  export type RecordingSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    participants?: SessionParticipantUncheckedUpdateManyWithoutSessionNestedInput
    chunks?: RecordingChunkUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type RecordingSessionCreateManyInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    createdBy: number
  }

  export type RecordingSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordingSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
  }

  export type SessionParticipantCreateInput = {
    id?: string
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
    session: RecordingSessionCreateNestedOneWithoutParticipantsInput
    user: UserCreateNestedOneWithoutSessionParticipantsInput
    chunks?: RecordingChunkCreateNestedManyWithoutParticipantInput
  }

  export type SessionParticipantUncheckedCreateInput = {
    id?: string
    sessionId: string
    userId: number
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
    chunks?: RecordingChunkUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type SessionParticipantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session?: RecordingSessionUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneRequiredWithoutSessionParticipantsNestedInput
    chunks?: RecordingChunkUpdateManyWithoutParticipantNestedInput
  }

  export type SessionParticipantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: RecordingChunkUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type SessionParticipantCreateManyInput = {
    id?: string
    sessionId: string
    userId: number
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
  }

  export type SessionParticipantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionParticipantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordingChunkCreateInput = {
    id?: string
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    session: RecordingSessionCreateNestedOneWithoutChunksInput
    participant: SessionParticipantCreateNestedOneWithoutChunksInput
    user: UserCreateNestedOneWithoutRecordingChunksInput
  }

  export type RecordingChunkUncheckedCreateInput = {
    id?: string
    sessionId: string
    participantId: string
    userId: number
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RecordingChunkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: RecordingSessionUpdateOneRequiredWithoutChunksNestedInput
    participant?: SessionParticipantUpdateOneRequiredWithoutChunksNestedInput
    user?: UserUpdateOneRequiredWithoutRecordingChunksNestedInput
  }

  export type RecordingChunkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingChunkCreateManyInput = {
    id?: string
    sessionId: string
    participantId: string
    userId: number
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RecordingChunkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingChunkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    company?: string | null
    subject: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    company?: string | null
    subject: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    company?: string | null
    subject: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PodcastListRelationFilter = {
    every?: PodcastWhereInput
    some?: PodcastWhereInput
    none?: PodcastWhereInput
  }

  export type ScheduleListRelationFilter = {
    every?: ScheduleWhereInput
    some?: ScheduleWhereInput
    none?: ScheduleWhereInput
  }

  export type RecordingSessionListRelationFilter = {
    every?: RecordingSessionWhereInput
    some?: RecordingSessionWhereInput
    none?: RecordingSessionWhereInput
  }

  export type RecordingChunkListRelationFilter = {
    every?: RecordingChunkWhereInput
    some?: RecordingChunkWhereInput
    none?: RecordingChunkWhereInput
  }

  export type SessionParticipantListRelationFilter = {
    every?: SessionParticipantWhereInput
    some?: SessionParticipantWhereInput
    none?: SessionParticipantWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PodcastOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecordingSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecordingChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PodcastCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type PodcastAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type PodcastMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type PodcastMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type PodcastSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    scheduledAt?: SortOrder
    createdById?: SortOrder
    participants?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduleAvgOrderByAggregateInput = {
    createdById?: SortOrder
  }

  export type ScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    scheduledAt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    scheduledAt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduleSumOrderByAggregateInput = {
    createdById?: SortOrder
  }

  export type EnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RecordingSessionCountOrderByAggregateInput = {
    id?: SortOrder
    roomName?: SortOrder
    sessionKey?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdBy?: SortOrder
  }

  export type RecordingSessionAvgOrderByAggregateInput = {
    createdBy?: SortOrder
  }

  export type RecordingSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    roomName?: SortOrder
    sessionKey?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdBy?: SortOrder
  }

  export type RecordingSessionMinOrderByAggregateInput = {
    id?: SortOrder
    roomName?: SortOrder
    sessionKey?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdBy?: SortOrder
  }

  export type RecordingSessionSumOrderByAggregateInput = {
    createdBy?: SortOrder
  }

  export type EnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RecordingSessionScalarRelationFilter = {
    is?: RecordingSessionWhereInput
    isNot?: RecordingSessionWhereInput
  }

  export type SessionParticipantSessionIdUserIdCompoundUniqueInput = {
    sessionId: string
    userId: number
  }

  export type SessionParticipantCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrder
  }

  export type SessionParticipantAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type SessionParticipantMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrder
  }

  export type SessionParticipantMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrder
  }

  export type SessionParticipantSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumUploadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadStatus | EnumUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadStatusFilter<$PrismaModel> | $Enums.UploadStatus
  }

  export type SessionParticipantScalarRelationFilter = {
    is?: SessionParticipantWhereInput
    isNot?: SessionParticipantWhereInput
  }

  export type RecordingChunkSessionIdParticipantIdChunkNumberCompoundUniqueInput = {
    sessionId: string
    participantId: string
    chunkNumber: number
  }

  export type RecordingChunkCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    participantId?: SortOrder
    userId?: SortOrder
    chunkNumber?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    mimeType?: SortOrder
    uploadStatus?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RecordingChunkAvgOrderByAggregateInput = {
    userId?: SortOrder
    chunkNumber?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
  }

  export type RecordingChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    participantId?: SortOrder
    userId?: SortOrder
    chunkNumber?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    mimeType?: SortOrder
    uploadStatus?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RecordingChunkMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    participantId?: SortOrder
    userId?: SortOrder
    chunkNumber?: SortOrder
    s3Key?: SortOrder
    s3Bucket?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    mimeType?: SortOrder
    uploadStatus?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RecordingChunkSumOrderByAggregateInput = {
    userId?: SortOrder
    chunkNumber?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumUploadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadStatus | EnumUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadStatusFilter<$PrismaModel>
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    company?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    company?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    company?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PodcastCreateNestedManyWithoutUserInput = {
    create?: XOR<PodcastCreateWithoutUserInput, PodcastUncheckedCreateWithoutUserInput> | PodcastCreateWithoutUserInput[] | PodcastUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PodcastCreateOrConnectWithoutUserInput | PodcastCreateOrConnectWithoutUserInput[]
    createMany?: PodcastCreateManyUserInputEnvelope
    connect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
  }

  export type ScheduleCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ScheduleCreateWithoutCreatedByInput, ScheduleUncheckedCreateWithoutCreatedByInput> | ScheduleCreateWithoutCreatedByInput[] | ScheduleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutCreatedByInput | ScheduleCreateOrConnectWithoutCreatedByInput[]
    createMany?: ScheduleCreateManyCreatedByInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type RecordingSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<RecordingSessionCreateWithoutUserInput, RecordingSessionUncheckedCreateWithoutUserInput> | RecordingSessionCreateWithoutUserInput[] | RecordingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecordingSessionCreateOrConnectWithoutUserInput | RecordingSessionCreateOrConnectWithoutUserInput[]
    createMany?: RecordingSessionCreateManyUserInputEnvelope
    connect?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
  }

  export type RecordingChunkCreateNestedManyWithoutUserInput = {
    create?: XOR<RecordingChunkCreateWithoutUserInput, RecordingChunkUncheckedCreateWithoutUserInput> | RecordingChunkCreateWithoutUserInput[] | RecordingChunkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutUserInput | RecordingChunkCreateOrConnectWithoutUserInput[]
    createMany?: RecordingChunkCreateManyUserInputEnvelope
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
  }

  export type SessionParticipantCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionParticipantCreateWithoutUserInput, SessionParticipantUncheckedCreateWithoutUserInput> | SessionParticipantCreateWithoutUserInput[] | SessionParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutUserInput | SessionParticipantCreateOrConnectWithoutUserInput[]
    createMany?: SessionParticipantCreateManyUserInputEnvelope
    connect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
  }

  export type PodcastUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PodcastCreateWithoutUserInput, PodcastUncheckedCreateWithoutUserInput> | PodcastCreateWithoutUserInput[] | PodcastUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PodcastCreateOrConnectWithoutUserInput | PodcastCreateOrConnectWithoutUserInput[]
    createMany?: PodcastCreateManyUserInputEnvelope
    connect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ScheduleCreateWithoutCreatedByInput, ScheduleUncheckedCreateWithoutCreatedByInput> | ScheduleCreateWithoutCreatedByInput[] | ScheduleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutCreatedByInput | ScheduleCreateOrConnectWithoutCreatedByInput[]
    createMany?: ScheduleCreateManyCreatedByInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type RecordingSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecordingSessionCreateWithoutUserInput, RecordingSessionUncheckedCreateWithoutUserInput> | RecordingSessionCreateWithoutUserInput[] | RecordingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecordingSessionCreateOrConnectWithoutUserInput | RecordingSessionCreateOrConnectWithoutUserInput[]
    createMany?: RecordingSessionCreateManyUserInputEnvelope
    connect?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
  }

  export type RecordingChunkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecordingChunkCreateWithoutUserInput, RecordingChunkUncheckedCreateWithoutUserInput> | RecordingChunkCreateWithoutUserInput[] | RecordingChunkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutUserInput | RecordingChunkCreateOrConnectWithoutUserInput[]
    createMany?: RecordingChunkCreateManyUserInputEnvelope
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
  }

  export type SessionParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionParticipantCreateWithoutUserInput, SessionParticipantUncheckedCreateWithoutUserInput> | SessionParticipantCreateWithoutUserInput[] | SessionParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutUserInput | SessionParticipantCreateOrConnectWithoutUserInput[]
    createMany?: SessionParticipantCreateManyUserInputEnvelope
    connect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PodcastUpdateManyWithoutUserNestedInput = {
    create?: XOR<PodcastCreateWithoutUserInput, PodcastUncheckedCreateWithoutUserInput> | PodcastCreateWithoutUserInput[] | PodcastUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PodcastCreateOrConnectWithoutUserInput | PodcastCreateOrConnectWithoutUserInput[]
    upsert?: PodcastUpsertWithWhereUniqueWithoutUserInput | PodcastUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PodcastCreateManyUserInputEnvelope
    set?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    disconnect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    delete?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    connect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    update?: PodcastUpdateWithWhereUniqueWithoutUserInput | PodcastUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PodcastUpdateManyWithWhereWithoutUserInput | PodcastUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PodcastScalarWhereInput | PodcastScalarWhereInput[]
  }

  export type ScheduleUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ScheduleCreateWithoutCreatedByInput, ScheduleUncheckedCreateWithoutCreatedByInput> | ScheduleCreateWithoutCreatedByInput[] | ScheduleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutCreatedByInput | ScheduleCreateOrConnectWithoutCreatedByInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutCreatedByInput | ScheduleUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ScheduleCreateManyCreatedByInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutCreatedByInput | ScheduleUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutCreatedByInput | ScheduleUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type RecordingSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecordingSessionCreateWithoutUserInput, RecordingSessionUncheckedCreateWithoutUserInput> | RecordingSessionCreateWithoutUserInput[] | RecordingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecordingSessionCreateOrConnectWithoutUserInput | RecordingSessionCreateOrConnectWithoutUserInput[]
    upsert?: RecordingSessionUpsertWithWhereUniqueWithoutUserInput | RecordingSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecordingSessionCreateManyUserInputEnvelope
    set?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
    disconnect?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
    delete?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
    connect?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
    update?: RecordingSessionUpdateWithWhereUniqueWithoutUserInput | RecordingSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecordingSessionUpdateManyWithWhereWithoutUserInput | RecordingSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecordingSessionScalarWhereInput | RecordingSessionScalarWhereInput[]
  }

  export type RecordingChunkUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecordingChunkCreateWithoutUserInput, RecordingChunkUncheckedCreateWithoutUserInput> | RecordingChunkCreateWithoutUserInput[] | RecordingChunkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutUserInput | RecordingChunkCreateOrConnectWithoutUserInput[]
    upsert?: RecordingChunkUpsertWithWhereUniqueWithoutUserInput | RecordingChunkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecordingChunkCreateManyUserInputEnvelope
    set?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    disconnect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    delete?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    update?: RecordingChunkUpdateWithWhereUniqueWithoutUserInput | RecordingChunkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecordingChunkUpdateManyWithWhereWithoutUserInput | RecordingChunkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
  }

  export type SessionParticipantUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionParticipantCreateWithoutUserInput, SessionParticipantUncheckedCreateWithoutUserInput> | SessionParticipantCreateWithoutUserInput[] | SessionParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutUserInput | SessionParticipantCreateOrConnectWithoutUserInput[]
    upsert?: SessionParticipantUpsertWithWhereUniqueWithoutUserInput | SessionParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionParticipantCreateManyUserInputEnvelope
    set?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    disconnect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    delete?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    connect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    update?: SessionParticipantUpdateWithWhereUniqueWithoutUserInput | SessionParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionParticipantUpdateManyWithWhereWithoutUserInput | SessionParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionParticipantScalarWhereInput | SessionParticipantScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PodcastUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PodcastCreateWithoutUserInput, PodcastUncheckedCreateWithoutUserInput> | PodcastCreateWithoutUserInput[] | PodcastUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PodcastCreateOrConnectWithoutUserInput | PodcastCreateOrConnectWithoutUserInput[]
    upsert?: PodcastUpsertWithWhereUniqueWithoutUserInput | PodcastUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PodcastCreateManyUserInputEnvelope
    set?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    disconnect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    delete?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    connect?: PodcastWhereUniqueInput | PodcastWhereUniqueInput[]
    update?: PodcastUpdateWithWhereUniqueWithoutUserInput | PodcastUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PodcastUpdateManyWithWhereWithoutUserInput | PodcastUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PodcastScalarWhereInput | PodcastScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ScheduleCreateWithoutCreatedByInput, ScheduleUncheckedCreateWithoutCreatedByInput> | ScheduleCreateWithoutCreatedByInput[] | ScheduleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutCreatedByInput | ScheduleCreateOrConnectWithoutCreatedByInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutCreatedByInput | ScheduleUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ScheduleCreateManyCreatedByInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutCreatedByInput | ScheduleUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutCreatedByInput | ScheduleUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type RecordingSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecordingSessionCreateWithoutUserInput, RecordingSessionUncheckedCreateWithoutUserInput> | RecordingSessionCreateWithoutUserInput[] | RecordingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecordingSessionCreateOrConnectWithoutUserInput | RecordingSessionCreateOrConnectWithoutUserInput[]
    upsert?: RecordingSessionUpsertWithWhereUniqueWithoutUserInput | RecordingSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecordingSessionCreateManyUserInputEnvelope
    set?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
    disconnect?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
    delete?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
    connect?: RecordingSessionWhereUniqueInput | RecordingSessionWhereUniqueInput[]
    update?: RecordingSessionUpdateWithWhereUniqueWithoutUserInput | RecordingSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecordingSessionUpdateManyWithWhereWithoutUserInput | RecordingSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecordingSessionScalarWhereInput | RecordingSessionScalarWhereInput[]
  }

  export type RecordingChunkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecordingChunkCreateWithoutUserInput, RecordingChunkUncheckedCreateWithoutUserInput> | RecordingChunkCreateWithoutUserInput[] | RecordingChunkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutUserInput | RecordingChunkCreateOrConnectWithoutUserInput[]
    upsert?: RecordingChunkUpsertWithWhereUniqueWithoutUserInput | RecordingChunkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecordingChunkCreateManyUserInputEnvelope
    set?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    disconnect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    delete?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    update?: RecordingChunkUpdateWithWhereUniqueWithoutUserInput | RecordingChunkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecordingChunkUpdateManyWithWhereWithoutUserInput | RecordingChunkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
  }

  export type SessionParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionParticipantCreateWithoutUserInput, SessionParticipantUncheckedCreateWithoutUserInput> | SessionParticipantCreateWithoutUserInput[] | SessionParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutUserInput | SessionParticipantCreateOrConnectWithoutUserInput[]
    upsert?: SessionParticipantUpsertWithWhereUniqueWithoutUserInput | SessionParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionParticipantCreateManyUserInputEnvelope
    set?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    disconnect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    delete?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    connect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    update?: SessionParticipantUpdateWithWhereUniqueWithoutUserInput | SessionParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionParticipantUpdateManyWithWhereWithoutUserInput | SessionParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionParticipantScalarWhereInput | SessionParticipantScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPodacstInput = {
    create?: XOR<UserCreateWithoutPodacstInput, UserUncheckedCreateWithoutPodacstInput>
    connectOrCreate?: UserCreateOrConnectWithoutPodacstInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPodacstNestedInput = {
    create?: XOR<UserCreateWithoutPodacstInput, UserUncheckedCreateWithoutPodacstInput>
    connectOrCreate?: UserCreateOrConnectWithoutPodacstInput
    upsert?: UserUpsertWithoutPodacstInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPodacstInput, UserUpdateWithoutPodacstInput>, UserUncheckedUpdateWithoutPodacstInput>
  }

  export type ScheduleCreateparticipantsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutCreatedByInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput
    connect?: UserWhereUniqueInput
  }

  export type ScheduleUpdateparticipantsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutCreatedByNestedInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput
    upsert?: UserUpsertWithoutCreatedByInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedByInput, UserUpdateWithoutCreatedByInput>, UserUncheckedUpdateWithoutCreatedByInput>
  }

  export type UserCreateNestedOneWithoutRecordingSessionsInput = {
    create?: XOR<UserCreateWithoutRecordingSessionsInput, UserUncheckedCreateWithoutRecordingSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecordingSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type SessionParticipantCreateNestedManyWithoutSessionInput = {
    create?: XOR<SessionParticipantCreateWithoutSessionInput, SessionParticipantUncheckedCreateWithoutSessionInput> | SessionParticipantCreateWithoutSessionInput[] | SessionParticipantUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutSessionInput | SessionParticipantCreateOrConnectWithoutSessionInput[]
    createMany?: SessionParticipantCreateManySessionInputEnvelope
    connect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
  }

  export type RecordingChunkCreateNestedManyWithoutSessionInput = {
    create?: XOR<RecordingChunkCreateWithoutSessionInput, RecordingChunkUncheckedCreateWithoutSessionInput> | RecordingChunkCreateWithoutSessionInput[] | RecordingChunkUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutSessionInput | RecordingChunkCreateOrConnectWithoutSessionInput[]
    createMany?: RecordingChunkCreateManySessionInputEnvelope
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
  }

  export type SessionParticipantUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<SessionParticipantCreateWithoutSessionInput, SessionParticipantUncheckedCreateWithoutSessionInput> | SessionParticipantCreateWithoutSessionInput[] | SessionParticipantUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutSessionInput | SessionParticipantCreateOrConnectWithoutSessionInput[]
    createMany?: SessionParticipantCreateManySessionInputEnvelope
    connect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
  }

  export type RecordingChunkUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<RecordingChunkCreateWithoutSessionInput, RecordingChunkUncheckedCreateWithoutSessionInput> | RecordingChunkCreateWithoutSessionInput[] | RecordingChunkUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutSessionInput | RecordingChunkCreateOrConnectWithoutSessionInput[]
    createMany?: RecordingChunkCreateManySessionInputEnvelope
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
  }

  export type EnumSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SessionStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutRecordingSessionsNestedInput = {
    create?: XOR<UserCreateWithoutRecordingSessionsInput, UserUncheckedCreateWithoutRecordingSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecordingSessionsInput
    upsert?: UserUpsertWithoutRecordingSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecordingSessionsInput, UserUpdateWithoutRecordingSessionsInput>, UserUncheckedUpdateWithoutRecordingSessionsInput>
  }

  export type SessionParticipantUpdateManyWithoutSessionNestedInput = {
    create?: XOR<SessionParticipantCreateWithoutSessionInput, SessionParticipantUncheckedCreateWithoutSessionInput> | SessionParticipantCreateWithoutSessionInput[] | SessionParticipantUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutSessionInput | SessionParticipantCreateOrConnectWithoutSessionInput[]
    upsert?: SessionParticipantUpsertWithWhereUniqueWithoutSessionInput | SessionParticipantUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: SessionParticipantCreateManySessionInputEnvelope
    set?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    disconnect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    delete?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    connect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    update?: SessionParticipantUpdateWithWhereUniqueWithoutSessionInput | SessionParticipantUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: SessionParticipantUpdateManyWithWhereWithoutSessionInput | SessionParticipantUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: SessionParticipantScalarWhereInput | SessionParticipantScalarWhereInput[]
  }

  export type RecordingChunkUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RecordingChunkCreateWithoutSessionInput, RecordingChunkUncheckedCreateWithoutSessionInput> | RecordingChunkCreateWithoutSessionInput[] | RecordingChunkUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutSessionInput | RecordingChunkCreateOrConnectWithoutSessionInput[]
    upsert?: RecordingChunkUpsertWithWhereUniqueWithoutSessionInput | RecordingChunkUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RecordingChunkCreateManySessionInputEnvelope
    set?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    disconnect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    delete?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    update?: RecordingChunkUpdateWithWhereUniqueWithoutSessionInput | RecordingChunkUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RecordingChunkUpdateManyWithWhereWithoutSessionInput | RecordingChunkUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
  }

  export type SessionParticipantUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<SessionParticipantCreateWithoutSessionInput, SessionParticipantUncheckedCreateWithoutSessionInput> | SessionParticipantCreateWithoutSessionInput[] | SessionParticipantUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutSessionInput | SessionParticipantCreateOrConnectWithoutSessionInput[]
    upsert?: SessionParticipantUpsertWithWhereUniqueWithoutSessionInput | SessionParticipantUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: SessionParticipantCreateManySessionInputEnvelope
    set?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    disconnect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    delete?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    connect?: SessionParticipantWhereUniqueInput | SessionParticipantWhereUniqueInput[]
    update?: SessionParticipantUpdateWithWhereUniqueWithoutSessionInput | SessionParticipantUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: SessionParticipantUpdateManyWithWhereWithoutSessionInput | SessionParticipantUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: SessionParticipantScalarWhereInput | SessionParticipantScalarWhereInput[]
  }

  export type RecordingChunkUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RecordingChunkCreateWithoutSessionInput, RecordingChunkUncheckedCreateWithoutSessionInput> | RecordingChunkCreateWithoutSessionInput[] | RecordingChunkUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutSessionInput | RecordingChunkCreateOrConnectWithoutSessionInput[]
    upsert?: RecordingChunkUpsertWithWhereUniqueWithoutSessionInput | RecordingChunkUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RecordingChunkCreateManySessionInputEnvelope
    set?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    disconnect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    delete?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    update?: RecordingChunkUpdateWithWhereUniqueWithoutSessionInput | RecordingChunkUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RecordingChunkUpdateManyWithWhereWithoutSessionInput | RecordingChunkUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
  }

  export type RecordingSessionCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<RecordingSessionCreateWithoutParticipantsInput, RecordingSessionUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: RecordingSessionCreateOrConnectWithoutParticipantsInput
    connect?: RecordingSessionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSessionParticipantsInput = {
    create?: XOR<UserCreateWithoutSessionParticipantsInput, UserUncheckedCreateWithoutSessionParticipantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionParticipantsInput
    connect?: UserWhereUniqueInput
  }

  export type RecordingChunkCreateNestedManyWithoutParticipantInput = {
    create?: XOR<RecordingChunkCreateWithoutParticipantInput, RecordingChunkUncheckedCreateWithoutParticipantInput> | RecordingChunkCreateWithoutParticipantInput[] | RecordingChunkUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutParticipantInput | RecordingChunkCreateOrConnectWithoutParticipantInput[]
    createMany?: RecordingChunkCreateManyParticipantInputEnvelope
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
  }

  export type RecordingChunkUncheckedCreateNestedManyWithoutParticipantInput = {
    create?: XOR<RecordingChunkCreateWithoutParticipantInput, RecordingChunkUncheckedCreateWithoutParticipantInput> | RecordingChunkCreateWithoutParticipantInput[] | RecordingChunkUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutParticipantInput | RecordingChunkCreateOrConnectWithoutParticipantInput[]
    createMany?: RecordingChunkCreateManyParticipantInputEnvelope
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
  }

  export type RecordingSessionUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<RecordingSessionCreateWithoutParticipantsInput, RecordingSessionUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: RecordingSessionCreateOrConnectWithoutParticipantsInput
    upsert?: RecordingSessionUpsertWithoutParticipantsInput
    connect?: RecordingSessionWhereUniqueInput
    update?: XOR<XOR<RecordingSessionUpdateToOneWithWhereWithoutParticipantsInput, RecordingSessionUpdateWithoutParticipantsInput>, RecordingSessionUncheckedUpdateWithoutParticipantsInput>
  }

  export type UserUpdateOneRequiredWithoutSessionParticipantsNestedInput = {
    create?: XOR<UserCreateWithoutSessionParticipantsInput, UserUncheckedCreateWithoutSessionParticipantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionParticipantsInput
    upsert?: UserUpsertWithoutSessionParticipantsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionParticipantsInput, UserUpdateWithoutSessionParticipantsInput>, UserUncheckedUpdateWithoutSessionParticipantsInput>
  }

  export type RecordingChunkUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<RecordingChunkCreateWithoutParticipantInput, RecordingChunkUncheckedCreateWithoutParticipantInput> | RecordingChunkCreateWithoutParticipantInput[] | RecordingChunkUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutParticipantInput | RecordingChunkCreateOrConnectWithoutParticipantInput[]
    upsert?: RecordingChunkUpsertWithWhereUniqueWithoutParticipantInput | RecordingChunkUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: RecordingChunkCreateManyParticipantInputEnvelope
    set?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    disconnect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    delete?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    update?: RecordingChunkUpdateWithWhereUniqueWithoutParticipantInput | RecordingChunkUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: RecordingChunkUpdateManyWithWhereWithoutParticipantInput | RecordingChunkUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
  }

  export type RecordingChunkUncheckedUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<RecordingChunkCreateWithoutParticipantInput, RecordingChunkUncheckedCreateWithoutParticipantInput> | RecordingChunkCreateWithoutParticipantInput[] | RecordingChunkUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutParticipantInput | RecordingChunkCreateOrConnectWithoutParticipantInput[]
    upsert?: RecordingChunkUpsertWithWhereUniqueWithoutParticipantInput | RecordingChunkUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: RecordingChunkCreateManyParticipantInputEnvelope
    set?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    disconnect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    delete?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    update?: RecordingChunkUpdateWithWhereUniqueWithoutParticipantInput | RecordingChunkUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: RecordingChunkUpdateManyWithWhereWithoutParticipantInput | RecordingChunkUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
  }

  export type RecordingSessionCreateNestedOneWithoutChunksInput = {
    create?: XOR<RecordingSessionCreateWithoutChunksInput, RecordingSessionUncheckedCreateWithoutChunksInput>
    connectOrCreate?: RecordingSessionCreateOrConnectWithoutChunksInput
    connect?: RecordingSessionWhereUniqueInput
  }

  export type SessionParticipantCreateNestedOneWithoutChunksInput = {
    create?: XOR<SessionParticipantCreateWithoutChunksInput, SessionParticipantUncheckedCreateWithoutChunksInput>
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutChunksInput
    connect?: SessionParticipantWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRecordingChunksInput = {
    create?: XOR<UserCreateWithoutRecordingChunksInput, UserUncheckedCreateWithoutRecordingChunksInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecordingChunksInput
    connect?: UserWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumUploadStatusFieldUpdateOperationsInput = {
    set?: $Enums.UploadStatus
  }

  export type RecordingSessionUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<RecordingSessionCreateWithoutChunksInput, RecordingSessionUncheckedCreateWithoutChunksInput>
    connectOrCreate?: RecordingSessionCreateOrConnectWithoutChunksInput
    upsert?: RecordingSessionUpsertWithoutChunksInput
    connect?: RecordingSessionWhereUniqueInput
    update?: XOR<XOR<RecordingSessionUpdateToOneWithWhereWithoutChunksInput, RecordingSessionUpdateWithoutChunksInput>, RecordingSessionUncheckedUpdateWithoutChunksInput>
  }

  export type SessionParticipantUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<SessionParticipantCreateWithoutChunksInput, SessionParticipantUncheckedCreateWithoutChunksInput>
    connectOrCreate?: SessionParticipantCreateOrConnectWithoutChunksInput
    upsert?: SessionParticipantUpsertWithoutChunksInput
    connect?: SessionParticipantWhereUniqueInput
    update?: XOR<XOR<SessionParticipantUpdateToOneWithWhereWithoutChunksInput, SessionParticipantUpdateWithoutChunksInput>, SessionParticipantUncheckedUpdateWithoutChunksInput>
  }

  export type UserUpdateOneRequiredWithoutRecordingChunksNestedInput = {
    create?: XOR<UserCreateWithoutRecordingChunksInput, UserUncheckedCreateWithoutRecordingChunksInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecordingChunksInput
    upsert?: UserUpsertWithoutRecordingChunksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecordingChunksInput, UserUpdateWithoutRecordingChunksInput>, UserUncheckedUpdateWithoutRecordingChunksInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUploadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadStatus | EnumUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadStatusFilter<$PrismaModel> | $Enums.UploadStatus
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumUploadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadStatus | EnumUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadStatusFilter<$PrismaModel>
  }

  export type PodcastCreateWithoutUserInput = {
    id?: string
    key: string
    name: string
    createdAt?: Date | string
  }

  export type PodcastUncheckedCreateWithoutUserInput = {
    id?: string
    key: string
    name: string
    createdAt?: Date | string
  }

  export type PodcastCreateOrConnectWithoutUserInput = {
    where: PodcastWhereUniqueInput
    create: XOR<PodcastCreateWithoutUserInput, PodcastUncheckedCreateWithoutUserInput>
  }

  export type PodcastCreateManyUserInputEnvelope = {
    data: PodcastCreateManyUserInput | PodcastCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    scheduledAt: Date | string
    participants?: ScheduleCreateparticipantsInput | string[]
    createdAt?: Date | string
  }

  export type ScheduleUncheckedCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    scheduledAt: Date | string
    participants?: ScheduleCreateparticipantsInput | string[]
    createdAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutCreatedByInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutCreatedByInput, ScheduleUncheckedCreateWithoutCreatedByInput>
  }

  export type ScheduleCreateManyCreatedByInputEnvelope = {
    data: ScheduleCreateManyCreatedByInput | ScheduleCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type RecordingSessionCreateWithoutUserInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    participants?: SessionParticipantCreateNestedManyWithoutSessionInput
    chunks?: RecordingChunkCreateNestedManyWithoutSessionInput
  }

  export type RecordingSessionUncheckedCreateWithoutUserInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    participants?: SessionParticipantUncheckedCreateNestedManyWithoutSessionInput
    chunks?: RecordingChunkUncheckedCreateNestedManyWithoutSessionInput
  }

  export type RecordingSessionCreateOrConnectWithoutUserInput = {
    where: RecordingSessionWhereUniqueInput
    create: XOR<RecordingSessionCreateWithoutUserInput, RecordingSessionUncheckedCreateWithoutUserInput>
  }

  export type RecordingSessionCreateManyUserInputEnvelope = {
    data: RecordingSessionCreateManyUserInput | RecordingSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecordingChunkCreateWithoutUserInput = {
    id?: string
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    session: RecordingSessionCreateNestedOneWithoutChunksInput
    participant: SessionParticipantCreateNestedOneWithoutChunksInput
  }

  export type RecordingChunkUncheckedCreateWithoutUserInput = {
    id?: string
    sessionId: string
    participantId: string
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RecordingChunkCreateOrConnectWithoutUserInput = {
    where: RecordingChunkWhereUniqueInput
    create: XOR<RecordingChunkCreateWithoutUserInput, RecordingChunkUncheckedCreateWithoutUserInput>
  }

  export type RecordingChunkCreateManyUserInputEnvelope = {
    data: RecordingChunkCreateManyUserInput | RecordingChunkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionParticipantCreateWithoutUserInput = {
    id?: string
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
    session: RecordingSessionCreateNestedOneWithoutParticipantsInput
    chunks?: RecordingChunkCreateNestedManyWithoutParticipantInput
  }

  export type SessionParticipantUncheckedCreateWithoutUserInput = {
    id?: string
    sessionId: string
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
    chunks?: RecordingChunkUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type SessionParticipantCreateOrConnectWithoutUserInput = {
    where: SessionParticipantWhereUniqueInput
    create: XOR<SessionParticipantCreateWithoutUserInput, SessionParticipantUncheckedCreateWithoutUserInput>
  }

  export type SessionParticipantCreateManyUserInputEnvelope = {
    data: SessionParticipantCreateManyUserInput | SessionParticipantCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PodcastUpsertWithWhereUniqueWithoutUserInput = {
    where: PodcastWhereUniqueInput
    update: XOR<PodcastUpdateWithoutUserInput, PodcastUncheckedUpdateWithoutUserInput>
    create: XOR<PodcastCreateWithoutUserInput, PodcastUncheckedCreateWithoutUserInput>
  }

  export type PodcastUpdateWithWhereUniqueWithoutUserInput = {
    where: PodcastWhereUniqueInput
    data: XOR<PodcastUpdateWithoutUserInput, PodcastUncheckedUpdateWithoutUserInput>
  }

  export type PodcastUpdateManyWithWhereWithoutUserInput = {
    where: PodcastScalarWhereInput
    data: XOR<PodcastUpdateManyMutationInput, PodcastUncheckedUpdateManyWithoutUserInput>
  }

  export type PodcastScalarWhereInput = {
    AND?: PodcastScalarWhereInput | PodcastScalarWhereInput[]
    OR?: PodcastScalarWhereInput[]
    NOT?: PodcastScalarWhereInput | PodcastScalarWhereInput[]
    id?: StringFilter<"Podcast"> | string
    key?: StringFilter<"Podcast"> | string
    name?: StringFilter<"Podcast"> | string
    createdAt?: DateTimeFilter<"Podcast"> | Date | string
    userId?: IntFilter<"Podcast"> | number
  }

  export type ScheduleUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutCreatedByInput, ScheduleUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ScheduleCreateWithoutCreatedByInput, ScheduleUncheckedCreateWithoutCreatedByInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutCreatedByInput, ScheduleUncheckedUpdateWithoutCreatedByInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutCreatedByInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ScheduleScalarWhereInput = {
    AND?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    OR?: ScheduleScalarWhereInput[]
    NOT?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    id?: StringFilter<"Schedule"> | string
    title?: StringFilter<"Schedule"> | string
    description?: StringNullableFilter<"Schedule"> | string | null
    scheduledAt?: DateTimeFilter<"Schedule"> | Date | string
    createdById?: IntFilter<"Schedule"> | number
    participants?: StringNullableListFilter<"Schedule">
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
  }

  export type RecordingSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: RecordingSessionWhereUniqueInput
    update: XOR<RecordingSessionUpdateWithoutUserInput, RecordingSessionUncheckedUpdateWithoutUserInput>
    create: XOR<RecordingSessionCreateWithoutUserInput, RecordingSessionUncheckedCreateWithoutUserInput>
  }

  export type RecordingSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: RecordingSessionWhereUniqueInput
    data: XOR<RecordingSessionUpdateWithoutUserInput, RecordingSessionUncheckedUpdateWithoutUserInput>
  }

  export type RecordingSessionUpdateManyWithWhereWithoutUserInput = {
    where: RecordingSessionScalarWhereInput
    data: XOR<RecordingSessionUpdateManyMutationInput, RecordingSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type RecordingSessionScalarWhereInput = {
    AND?: RecordingSessionScalarWhereInput | RecordingSessionScalarWhereInput[]
    OR?: RecordingSessionScalarWhereInput[]
    NOT?: RecordingSessionScalarWhereInput | RecordingSessionScalarWhereInput[]
    id?: StringFilter<"RecordingSession"> | string
    roomName?: StringFilter<"RecordingSession"> | string
    sessionKey?: StringFilter<"RecordingSession"> | string
    status?: EnumSessionStatusFilter<"RecordingSession"> | $Enums.SessionStatus
    startTime?: DateTimeFilter<"RecordingSession"> | Date | string
    endTime?: DateTimeNullableFilter<"RecordingSession"> | Date | string | null
    createdBy?: IntFilter<"RecordingSession"> | number
  }

  export type RecordingChunkUpsertWithWhereUniqueWithoutUserInput = {
    where: RecordingChunkWhereUniqueInput
    update: XOR<RecordingChunkUpdateWithoutUserInput, RecordingChunkUncheckedUpdateWithoutUserInput>
    create: XOR<RecordingChunkCreateWithoutUserInput, RecordingChunkUncheckedCreateWithoutUserInput>
  }

  export type RecordingChunkUpdateWithWhereUniqueWithoutUserInput = {
    where: RecordingChunkWhereUniqueInput
    data: XOR<RecordingChunkUpdateWithoutUserInput, RecordingChunkUncheckedUpdateWithoutUserInput>
  }

  export type RecordingChunkUpdateManyWithWhereWithoutUserInput = {
    where: RecordingChunkScalarWhereInput
    data: XOR<RecordingChunkUpdateManyMutationInput, RecordingChunkUncheckedUpdateManyWithoutUserInput>
  }

  export type RecordingChunkScalarWhereInput = {
    AND?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
    OR?: RecordingChunkScalarWhereInput[]
    NOT?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
    id?: StringFilter<"RecordingChunk"> | string
    sessionId?: StringFilter<"RecordingChunk"> | string
    participantId?: StringFilter<"RecordingChunk"> | string
    userId?: IntFilter<"RecordingChunk"> | number
    chunkNumber?: IntFilter<"RecordingChunk"> | number
    s3Key?: StringFilter<"RecordingChunk"> | string
    s3Bucket?: StringFilter<"RecordingChunk"> | string
    fileSize?: BigIntFilter<"RecordingChunk"> | bigint | number
    duration?: FloatNullableFilter<"RecordingChunk"> | number | null
    mimeType?: StringFilter<"RecordingChunk"> | string
    uploadStatus?: EnumUploadStatusFilter<"RecordingChunk"> | $Enums.UploadStatus
    uploadedAt?: DateTimeNullableFilter<"RecordingChunk"> | Date | string | null
    createdAt?: DateTimeFilter<"RecordingChunk"> | Date | string
  }

  export type SessionParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionParticipantWhereUniqueInput
    update: XOR<SessionParticipantUpdateWithoutUserInput, SessionParticipantUncheckedUpdateWithoutUserInput>
    create: XOR<SessionParticipantCreateWithoutUserInput, SessionParticipantUncheckedCreateWithoutUserInput>
  }

  export type SessionParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionParticipantWhereUniqueInput
    data: XOR<SessionParticipantUpdateWithoutUserInput, SessionParticipantUncheckedUpdateWithoutUserInput>
  }

  export type SessionParticipantUpdateManyWithWhereWithoutUserInput = {
    where: SessionParticipantScalarWhereInput
    data: XOR<SessionParticipantUpdateManyMutationInput, SessionParticipantUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionParticipantScalarWhereInput = {
    AND?: SessionParticipantScalarWhereInput | SessionParticipantScalarWhereInput[]
    OR?: SessionParticipantScalarWhereInput[]
    NOT?: SessionParticipantScalarWhereInput | SessionParticipantScalarWhereInput[]
    id?: StringFilter<"SessionParticipant"> | string
    sessionId?: StringFilter<"SessionParticipant"> | string
    userId?: IntFilter<"SessionParticipant"> | number
    username?: StringFilter<"SessionParticipant"> | string
    joinedAt?: DateTimeFilter<"SessionParticipant"> | Date | string
    leftAt?: DateTimeNullableFilter<"SessionParticipant"> | Date | string | null
  }

  export type UserCreateWithoutPodacstInput = {
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    createdBy?: ScheduleCreateNestedManyWithoutCreatedByInput
    recordingSessions?: RecordingSessionCreateNestedManyWithoutUserInput
    recordingChunks?: RecordingChunkCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPodacstInput = {
    id?: number
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    createdBy?: ScheduleUncheckedCreateNestedManyWithoutCreatedByInput
    recordingSessions?: RecordingSessionUncheckedCreateNestedManyWithoutUserInput
    recordingChunks?: RecordingChunkUncheckedCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPodacstInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPodacstInput, UserUncheckedCreateWithoutPodacstInput>
  }

  export type UserUpsertWithoutPodacstInput = {
    update: XOR<UserUpdateWithoutPodacstInput, UserUncheckedUpdateWithoutPodacstInput>
    create: XOR<UserCreateWithoutPodacstInput, UserUncheckedCreateWithoutPodacstInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPodacstInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPodacstInput, UserUncheckedUpdateWithoutPodacstInput>
  }

  export type UserUpdateWithoutPodacstInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: ScheduleUpdateManyWithoutCreatedByNestedInput
    recordingSessions?: RecordingSessionUpdateManyWithoutUserNestedInput
    recordingChunks?: RecordingChunkUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPodacstInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: ScheduleUncheckedUpdateManyWithoutCreatedByNestedInput
    recordingSessions?: RecordingSessionUncheckedUpdateManyWithoutUserNestedInput
    recordingChunks?: RecordingChunkUncheckedUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCreatedByInput = {
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastCreateNestedManyWithoutUserInput
    recordingSessions?: RecordingSessionCreateNestedManyWithoutUserInput
    recordingChunks?: RecordingChunkCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedByInput = {
    id?: number
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastUncheckedCreateNestedManyWithoutUserInput
    recordingSessions?: RecordingSessionUncheckedCreateNestedManyWithoutUserInput
    recordingChunks?: RecordingChunkUncheckedCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedByInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput>
  }

  export type UserUpsertWithoutCreatedByInput = {
    update: XOR<UserUpdateWithoutCreatedByInput, UserUncheckedUpdateWithoutCreatedByInput>
    create: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedByInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedByInput, UserUncheckedUpdateWithoutCreatedByInput>
  }

  export type UserUpdateWithoutCreatedByInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUpdateManyWithoutUserNestedInput
    recordingSessions?: RecordingSessionUpdateManyWithoutUserNestedInput
    recordingChunks?: RecordingChunkUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUncheckedUpdateManyWithoutUserNestedInput
    recordingSessions?: RecordingSessionUncheckedUpdateManyWithoutUserNestedInput
    recordingChunks?: RecordingChunkUncheckedUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRecordingSessionsInput = {
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastCreateNestedManyWithoutUserInput
    createdBy?: ScheduleCreateNestedManyWithoutCreatedByInput
    recordingChunks?: RecordingChunkCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecordingSessionsInput = {
    id?: number
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastUncheckedCreateNestedManyWithoutUserInput
    createdBy?: ScheduleUncheckedCreateNestedManyWithoutCreatedByInput
    recordingChunks?: RecordingChunkUncheckedCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecordingSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecordingSessionsInput, UserUncheckedCreateWithoutRecordingSessionsInput>
  }

  export type SessionParticipantCreateWithoutSessionInput = {
    id?: string
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
    user: UserCreateNestedOneWithoutSessionParticipantsInput
    chunks?: RecordingChunkCreateNestedManyWithoutParticipantInput
  }

  export type SessionParticipantUncheckedCreateWithoutSessionInput = {
    id?: string
    userId: number
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
    chunks?: RecordingChunkUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type SessionParticipantCreateOrConnectWithoutSessionInput = {
    where: SessionParticipantWhereUniqueInput
    create: XOR<SessionParticipantCreateWithoutSessionInput, SessionParticipantUncheckedCreateWithoutSessionInput>
  }

  export type SessionParticipantCreateManySessionInputEnvelope = {
    data: SessionParticipantCreateManySessionInput | SessionParticipantCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type RecordingChunkCreateWithoutSessionInput = {
    id?: string
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    participant: SessionParticipantCreateNestedOneWithoutChunksInput
    user: UserCreateNestedOneWithoutRecordingChunksInput
  }

  export type RecordingChunkUncheckedCreateWithoutSessionInput = {
    id?: string
    participantId: string
    userId: number
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RecordingChunkCreateOrConnectWithoutSessionInput = {
    where: RecordingChunkWhereUniqueInput
    create: XOR<RecordingChunkCreateWithoutSessionInput, RecordingChunkUncheckedCreateWithoutSessionInput>
  }

  export type RecordingChunkCreateManySessionInputEnvelope = {
    data: RecordingChunkCreateManySessionInput | RecordingChunkCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRecordingSessionsInput = {
    update: XOR<UserUpdateWithoutRecordingSessionsInput, UserUncheckedUpdateWithoutRecordingSessionsInput>
    create: XOR<UserCreateWithoutRecordingSessionsInput, UserUncheckedCreateWithoutRecordingSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecordingSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecordingSessionsInput, UserUncheckedUpdateWithoutRecordingSessionsInput>
  }

  export type UserUpdateWithoutRecordingSessionsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUpdateManyWithoutUserNestedInput
    createdBy?: ScheduleUpdateManyWithoutCreatedByNestedInput
    recordingChunks?: RecordingChunkUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecordingSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUncheckedUpdateManyWithoutUserNestedInput
    createdBy?: ScheduleUncheckedUpdateManyWithoutCreatedByNestedInput
    recordingChunks?: RecordingChunkUncheckedUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionParticipantUpsertWithWhereUniqueWithoutSessionInput = {
    where: SessionParticipantWhereUniqueInput
    update: XOR<SessionParticipantUpdateWithoutSessionInput, SessionParticipantUncheckedUpdateWithoutSessionInput>
    create: XOR<SessionParticipantCreateWithoutSessionInput, SessionParticipantUncheckedCreateWithoutSessionInput>
  }

  export type SessionParticipantUpdateWithWhereUniqueWithoutSessionInput = {
    where: SessionParticipantWhereUniqueInput
    data: XOR<SessionParticipantUpdateWithoutSessionInput, SessionParticipantUncheckedUpdateWithoutSessionInput>
  }

  export type SessionParticipantUpdateManyWithWhereWithoutSessionInput = {
    where: SessionParticipantScalarWhereInput
    data: XOR<SessionParticipantUpdateManyMutationInput, SessionParticipantUncheckedUpdateManyWithoutSessionInput>
  }

  export type RecordingChunkUpsertWithWhereUniqueWithoutSessionInput = {
    where: RecordingChunkWhereUniqueInput
    update: XOR<RecordingChunkUpdateWithoutSessionInput, RecordingChunkUncheckedUpdateWithoutSessionInput>
    create: XOR<RecordingChunkCreateWithoutSessionInput, RecordingChunkUncheckedCreateWithoutSessionInput>
  }

  export type RecordingChunkUpdateWithWhereUniqueWithoutSessionInput = {
    where: RecordingChunkWhereUniqueInput
    data: XOR<RecordingChunkUpdateWithoutSessionInput, RecordingChunkUncheckedUpdateWithoutSessionInput>
  }

  export type RecordingChunkUpdateManyWithWhereWithoutSessionInput = {
    where: RecordingChunkScalarWhereInput
    data: XOR<RecordingChunkUpdateManyMutationInput, RecordingChunkUncheckedUpdateManyWithoutSessionInput>
  }

  export type RecordingSessionCreateWithoutParticipantsInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    user: UserCreateNestedOneWithoutRecordingSessionsInput
    chunks?: RecordingChunkCreateNestedManyWithoutSessionInput
  }

  export type RecordingSessionUncheckedCreateWithoutParticipantsInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    createdBy: number
    chunks?: RecordingChunkUncheckedCreateNestedManyWithoutSessionInput
  }

  export type RecordingSessionCreateOrConnectWithoutParticipantsInput = {
    where: RecordingSessionWhereUniqueInput
    create: XOR<RecordingSessionCreateWithoutParticipantsInput, RecordingSessionUncheckedCreateWithoutParticipantsInput>
  }

  export type UserCreateWithoutSessionParticipantsInput = {
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastCreateNestedManyWithoutUserInput
    createdBy?: ScheduleCreateNestedManyWithoutCreatedByInput
    recordingSessions?: RecordingSessionCreateNestedManyWithoutUserInput
    recordingChunks?: RecordingChunkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionParticipantsInput = {
    id?: number
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastUncheckedCreateNestedManyWithoutUserInput
    createdBy?: ScheduleUncheckedCreateNestedManyWithoutCreatedByInput
    recordingSessions?: RecordingSessionUncheckedCreateNestedManyWithoutUserInput
    recordingChunks?: RecordingChunkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionParticipantsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionParticipantsInput, UserUncheckedCreateWithoutSessionParticipantsInput>
  }

  export type RecordingChunkCreateWithoutParticipantInput = {
    id?: string
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    session: RecordingSessionCreateNestedOneWithoutChunksInput
    user: UserCreateNestedOneWithoutRecordingChunksInput
  }

  export type RecordingChunkUncheckedCreateWithoutParticipantInput = {
    id?: string
    sessionId: string
    userId: number
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RecordingChunkCreateOrConnectWithoutParticipantInput = {
    where: RecordingChunkWhereUniqueInput
    create: XOR<RecordingChunkCreateWithoutParticipantInput, RecordingChunkUncheckedCreateWithoutParticipantInput>
  }

  export type RecordingChunkCreateManyParticipantInputEnvelope = {
    data: RecordingChunkCreateManyParticipantInput | RecordingChunkCreateManyParticipantInput[]
    skipDuplicates?: boolean
  }

  export type RecordingSessionUpsertWithoutParticipantsInput = {
    update: XOR<RecordingSessionUpdateWithoutParticipantsInput, RecordingSessionUncheckedUpdateWithoutParticipantsInput>
    create: XOR<RecordingSessionCreateWithoutParticipantsInput, RecordingSessionUncheckedCreateWithoutParticipantsInput>
    where?: RecordingSessionWhereInput
  }

  export type RecordingSessionUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: RecordingSessionWhereInput
    data: XOR<RecordingSessionUpdateWithoutParticipantsInput, RecordingSessionUncheckedUpdateWithoutParticipantsInput>
  }

  export type RecordingSessionUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutRecordingSessionsNestedInput
    chunks?: RecordingChunkUpdateManyWithoutSessionNestedInput
  }

  export type RecordingSessionUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    chunks?: RecordingChunkUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type UserUpsertWithoutSessionParticipantsInput = {
    update: XOR<UserUpdateWithoutSessionParticipantsInput, UserUncheckedUpdateWithoutSessionParticipantsInput>
    create: XOR<UserCreateWithoutSessionParticipantsInput, UserUncheckedCreateWithoutSessionParticipantsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionParticipantsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionParticipantsInput, UserUncheckedUpdateWithoutSessionParticipantsInput>
  }

  export type UserUpdateWithoutSessionParticipantsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUpdateManyWithoutUserNestedInput
    createdBy?: ScheduleUpdateManyWithoutCreatedByNestedInput
    recordingSessions?: RecordingSessionUpdateManyWithoutUserNestedInput
    recordingChunks?: RecordingChunkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionParticipantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUncheckedUpdateManyWithoutUserNestedInput
    createdBy?: ScheduleUncheckedUpdateManyWithoutCreatedByNestedInput
    recordingSessions?: RecordingSessionUncheckedUpdateManyWithoutUserNestedInput
    recordingChunks?: RecordingChunkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RecordingChunkUpsertWithWhereUniqueWithoutParticipantInput = {
    where: RecordingChunkWhereUniqueInput
    update: XOR<RecordingChunkUpdateWithoutParticipantInput, RecordingChunkUncheckedUpdateWithoutParticipantInput>
    create: XOR<RecordingChunkCreateWithoutParticipantInput, RecordingChunkUncheckedCreateWithoutParticipantInput>
  }

  export type RecordingChunkUpdateWithWhereUniqueWithoutParticipantInput = {
    where: RecordingChunkWhereUniqueInput
    data: XOR<RecordingChunkUpdateWithoutParticipantInput, RecordingChunkUncheckedUpdateWithoutParticipantInput>
  }

  export type RecordingChunkUpdateManyWithWhereWithoutParticipantInput = {
    where: RecordingChunkScalarWhereInput
    data: XOR<RecordingChunkUpdateManyMutationInput, RecordingChunkUncheckedUpdateManyWithoutParticipantInput>
  }

  export type RecordingSessionCreateWithoutChunksInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    user: UserCreateNestedOneWithoutRecordingSessionsInput
    participants?: SessionParticipantCreateNestedManyWithoutSessionInput
  }

  export type RecordingSessionUncheckedCreateWithoutChunksInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    createdBy: number
    participants?: SessionParticipantUncheckedCreateNestedManyWithoutSessionInput
  }

  export type RecordingSessionCreateOrConnectWithoutChunksInput = {
    where: RecordingSessionWhereUniqueInput
    create: XOR<RecordingSessionCreateWithoutChunksInput, RecordingSessionUncheckedCreateWithoutChunksInput>
  }

  export type SessionParticipantCreateWithoutChunksInput = {
    id?: string
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
    session: RecordingSessionCreateNestedOneWithoutParticipantsInput
    user: UserCreateNestedOneWithoutSessionParticipantsInput
  }

  export type SessionParticipantUncheckedCreateWithoutChunksInput = {
    id?: string
    sessionId: string
    userId: number
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
  }

  export type SessionParticipantCreateOrConnectWithoutChunksInput = {
    where: SessionParticipantWhereUniqueInput
    create: XOR<SessionParticipantCreateWithoutChunksInput, SessionParticipantUncheckedCreateWithoutChunksInput>
  }

  export type UserCreateWithoutRecordingChunksInput = {
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastCreateNestedManyWithoutUserInput
    createdBy?: ScheduleCreateNestedManyWithoutCreatedByInput
    recordingSessions?: RecordingSessionCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecordingChunksInput = {
    id?: number
    firstName: string
    lastName?: string | null
    email: string
    password: string
    verified?: boolean
    token: string
    createdAt?: Date | string
    Podacst?: PodcastUncheckedCreateNestedManyWithoutUserInput
    createdBy?: ScheduleUncheckedCreateNestedManyWithoutCreatedByInput
    recordingSessions?: RecordingSessionUncheckedCreateNestedManyWithoutUserInput
    sessionParticipants?: SessionParticipantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecordingChunksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecordingChunksInput, UserUncheckedCreateWithoutRecordingChunksInput>
  }

  export type RecordingSessionUpsertWithoutChunksInput = {
    update: XOR<RecordingSessionUpdateWithoutChunksInput, RecordingSessionUncheckedUpdateWithoutChunksInput>
    create: XOR<RecordingSessionCreateWithoutChunksInput, RecordingSessionUncheckedCreateWithoutChunksInput>
    where?: RecordingSessionWhereInput
  }

  export type RecordingSessionUpdateToOneWithWhereWithoutChunksInput = {
    where?: RecordingSessionWhereInput
    data: XOR<RecordingSessionUpdateWithoutChunksInput, RecordingSessionUncheckedUpdateWithoutChunksInput>
  }

  export type RecordingSessionUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutRecordingSessionsNestedInput
    participants?: SessionParticipantUpdateManyWithoutSessionNestedInput
  }

  export type RecordingSessionUncheckedUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    participants?: SessionParticipantUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionParticipantUpsertWithoutChunksInput = {
    update: XOR<SessionParticipantUpdateWithoutChunksInput, SessionParticipantUncheckedUpdateWithoutChunksInput>
    create: XOR<SessionParticipantCreateWithoutChunksInput, SessionParticipantUncheckedCreateWithoutChunksInput>
    where?: SessionParticipantWhereInput
  }

  export type SessionParticipantUpdateToOneWithWhereWithoutChunksInput = {
    where?: SessionParticipantWhereInput
    data: XOR<SessionParticipantUpdateWithoutChunksInput, SessionParticipantUncheckedUpdateWithoutChunksInput>
  }

  export type SessionParticipantUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session?: RecordingSessionUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneRequiredWithoutSessionParticipantsNestedInput
  }

  export type SessionParticipantUncheckedUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutRecordingChunksInput = {
    update: XOR<UserUpdateWithoutRecordingChunksInput, UserUncheckedUpdateWithoutRecordingChunksInput>
    create: XOR<UserCreateWithoutRecordingChunksInput, UserUncheckedCreateWithoutRecordingChunksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecordingChunksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecordingChunksInput, UserUncheckedUpdateWithoutRecordingChunksInput>
  }

  export type UserUpdateWithoutRecordingChunksInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUpdateManyWithoutUserNestedInput
    createdBy?: ScheduleUpdateManyWithoutCreatedByNestedInput
    recordingSessions?: RecordingSessionUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecordingChunksInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Podacst?: PodcastUncheckedUpdateManyWithoutUserNestedInput
    createdBy?: ScheduleUncheckedUpdateManyWithoutCreatedByNestedInput
    recordingSessions?: RecordingSessionUncheckedUpdateManyWithoutUserNestedInput
    sessionParticipants?: SessionParticipantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PodcastCreateManyUserInput = {
    id?: string
    key: string
    name: string
    createdAt?: Date | string
  }

  export type ScheduleCreateManyCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    scheduledAt: Date | string
    participants?: ScheduleCreateparticipantsInput | string[]
    createdAt?: Date | string
  }

  export type RecordingSessionCreateManyUserInput = {
    id?: string
    roomName: string
    sessionKey: string
    status?: $Enums.SessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
  }

  export type RecordingChunkCreateManyUserInput = {
    id?: string
    sessionId: string
    participantId: string
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionParticipantCreateManyUserInput = {
    id?: string
    sessionId: string
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
  }

  export type PodcastUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PodcastUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PodcastUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ScheduleUpdateparticipantsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ScheduleUpdateparticipantsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: ScheduleUpdateparticipantsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: SessionParticipantUpdateManyWithoutSessionNestedInput
    chunks?: RecordingChunkUpdateManyWithoutSessionNestedInput
  }

  export type RecordingSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: SessionParticipantUncheckedUpdateManyWithoutSessionNestedInput
    chunks?: RecordingChunkUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type RecordingSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomName?: StringFieldUpdateOperationsInput | string
    sessionKey?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordingChunkUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: RecordingSessionUpdateOneRequiredWithoutChunksNestedInput
    participant?: SessionParticipantUpdateOneRequiredWithoutChunksNestedInput
  }

  export type RecordingChunkUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingChunkUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionParticipantUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    session?: RecordingSessionUpdateOneRequiredWithoutParticipantsNestedInput
    chunks?: RecordingChunkUpdateManyWithoutParticipantNestedInput
  }

  export type SessionParticipantUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: RecordingChunkUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type SessionParticipantUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionParticipantCreateManySessionInput = {
    id?: string
    userId: number
    username: string
    joinedAt?: Date | string
    leftAt?: Date | string | null
  }

  export type RecordingChunkCreateManySessionInput = {
    id?: string
    participantId: string
    userId: number
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionParticipantUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutSessionParticipantsNestedInput
    chunks?: RecordingChunkUpdateManyWithoutParticipantNestedInput
  }

  export type SessionParticipantUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: RecordingChunkUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type SessionParticipantUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecordingChunkUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participant?: SessionParticipantUpdateOneRequiredWithoutChunksNestedInput
    user?: UserUpdateOneRequiredWithoutRecordingChunksNestedInput
  }

  export type RecordingChunkUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingChunkUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingChunkCreateManyParticipantInput = {
    id?: string
    sessionId: string
    userId: number
    chunkNumber: number
    s3Key: string
    s3Bucket: string
    fileSize: bigint | number
    duration?: number | null
    mimeType?: string
    uploadStatus?: $Enums.UploadStatus
    uploadedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RecordingChunkUpdateWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: RecordingSessionUpdateOneRequiredWithoutChunksNestedInput
    user?: UserUpdateOneRequiredWithoutRecordingChunksNestedInput
  }

  export type RecordingChunkUncheckedUpdateWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingChunkUncheckedUpdateManyWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    chunkNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Bucket?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadStatus?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
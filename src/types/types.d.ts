export declare enum ValueErrorType {
    ArrayContains = 0,
    ArrayMaxContains = 1,
    ArrayMaxItems = 2,
    ArrayMinContains = 3,
    ArrayMinItems = 4,
    ArrayUniqueItems = 5,
    Array = 6,
    AsyncIterator = 7,
    BigIntExclusiveMaximum = 8,
    BigIntExclusiveMinimum = 9,
    BigIntMaximum = 10,
    BigIntMinimum = 11,
    BigIntMultipleOf = 12,
    BigInt = 13,
    Boolean = 14,
    DateExclusiveMaximumTimestamp = 15,
    DateExclusiveMinimumTimestamp = 16,
    DateMaximumTimestamp = 17,
    DateMinimumTimestamp = 18,
    DateMultipleOfTimestamp = 19,
    Date = 20,
    Function = 21,
    IntegerExclusiveMaximum = 22,
    IntegerExclusiveMinimum = 23,
    IntegerMaximum = 24,
    IntegerMinimum = 25,
    IntegerMultipleOf = 26,
    Integer = 27,
    IntersectUnevaluatedProperties = 28,
    Intersect = 29,
    Iterator = 30,
    Kind = 31,
    Literal = 32,
    Never = 33,
    Not = 34,
    Null = 35,
    NumberExclusiveMaximum = 36,
    NumberExclusiveMinimum = 37,
    NumberMaximum = 38,
    NumberMinimum = 39,
    NumberMultipleOf = 40,
    Number = 41,
    ObjectAdditionalProperties = 42,
    ObjectMaxProperties = 43,
    ObjectMinProperties = 44,
    ObjectRequiredProperty = 45,
    Object = 46,
    Promise = 47,
    RegExp = 48,
    StringFormatUnknown = 49,
    StringFormat = 50,
    StringMaxLength = 51,
    StringMinLength = 52,
    StringPattern = 53,
    String = 54,
    Symbol = 55,
    TupleLength = 56,
    Tuple = 57,
    Uint8ArrayMaxByteLength = 58,
    Uint8ArrayMinByteLength = 59,
    Uint8Array = 60,
    Undefined = 61,
    Union = 62,
    Void = 63
}
export interface ValueError {
    type: ValueErrorType;
    schema: TSchema;
    path: string;
    value: unknown;
    message: string;
}

export interface SchemaOptions {
    error?: string | boolean | number | Object | ((validation: {
        errors: ValueError[];
        type: string;
        validator: TypeCheck<any>;
        value: unknown;
    }) => string | boolean | number | Object | void);
}

export type Yappins = {
    id: number;
    caption: string;
    total_likes: number;
    is_public: string;
    location : string;
    created_at: Date;
    tag_1_id: number;
    tag_1_name: string;
    tag_2_id: number;
    tag_2_name: string;
    tag_3_id: number;
    tag_3_name: string;
    tag_4_id: number;
    tag_4_name: string;
    user_id: number;
    total_comments: number;
    image : Blob
};

export interface TUnsafe<T> extends TSchema {
    [Kind]: string;
    static: T;
}

  
export type ErrorHandlerContext = {
    body: unknown;
    query: Record<string, string | undefined>;
    params: Record<string, string | undefined>;
    headers: Record<string, string | undefined>;
    cookie: Record<string, Cookie<string | undefined>>;
    response: any;  // Define more details based on your framework's response structure
  };
  
export type ErrorHandler = (context: ErrorHandlerContext) => void;
  

export type Reminder = {
    id: number;         
    title : string;         
    content: string;              
    is_finished: boolean ;        
    started_date: Date;         
    finished_date: Date;    
    deadline_date: Date;     
    created_date: Date;
    location : string;    
    is_public: boolean | string;       
    user_id: number;        
  };


  export type User = {
    id: number;
    name?: string | null;     
    username: string;
    email: string;
    password: string;
    country?: string | null;  
    city?: string | null;      
    bio?: string | null;      
    avatar_link?: string | null; 
    googleId?: string | null;    
    created_at: Date;
    updated_at: Date;
    role: ROLE;
    preference_yappin?: PreferenceYappin | null;
  };
  
  export type PreferenceYappin = {
    id: number;
    preference_tag_1: string;
    total_engage_one: number;
    preference_tag_2: string;
    total_engage_two: number;
    preference_tag_3: string;
    total_engage_three: number;
    preference_tag_4: string;
    total_engage_four: number;
    user_id: number; 
    user?: User | null;  
  };
  
  export enum ROLE {
    USER = "USER",
    ADMIN = "ADMIN",
  }
  
  // LOL

  // types.ts

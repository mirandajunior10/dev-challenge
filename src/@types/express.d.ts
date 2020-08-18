// Overload do namespace Express, para uso no middleware de autenticação

declare namespace Express {
  export interface Request {
    employer: {
      employer_code: string;
    };
  }
}

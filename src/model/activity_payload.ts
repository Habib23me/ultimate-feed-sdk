export interface IUFActivityPayload {
    actor: string;
    time: Date;
    foreign_id: string;
    media?: string[];
    caption?: string;
  }
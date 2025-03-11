export interface Poll {
  id: string;
  question: string;
  options: Option[];
  expiresAt: string;
  hideResults: boolean;
  isPrivate: boolean;
  reactions: Reaction;
  comments: Comment[];
}

export interface Option {
  id: string;
  text: string;
  votes: number;
}

export interface Reaction {
  id: string;
  trending: number;
  like: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
} 
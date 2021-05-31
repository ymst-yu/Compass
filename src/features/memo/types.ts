export interface MemoType {
  created_at: string;
  title: string;
  texts: {
    editing: boolean;
    id: string;
    text: string;
  }[];
  tags: string[];
}

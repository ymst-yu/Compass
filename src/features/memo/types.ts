export interface MemoType {
  created_at: string;
  title: string;
  texts: {
    id: string;
    text: string;
  }[];
  tags: string[];
}

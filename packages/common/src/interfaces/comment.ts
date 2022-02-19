export interface Comment {
  id: number;
  node_id: string;
  url: string;
  body?: string | undefined;
  body_text?: string | undefined;
  body_html?: string | undefined;
  html_url: string;
  user: {
    name?: string | null | undefined;
    starred_at?: string | undefined;
  } | null;
}

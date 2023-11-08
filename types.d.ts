export type Event = {
  id?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  date?: string | null;
  duration?: number;
  locations?: [number?];
  symptomes?: [number?];
  medications?: [number?];
  count?: number;
};

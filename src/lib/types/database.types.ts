export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      tickets: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          content: string;
          status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
          user_id: string | null;
        };
        Insert: Omit<
          Database['public']['Tables']['tickets']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['tickets']['Insert']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

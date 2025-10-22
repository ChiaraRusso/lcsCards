import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface WNBACard {
  id?: string;
  player_name: string;
  team: string;
  year: number;
  card_number: string;
  brand: string;
  condition: 'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Fair' | 'Poor';
  price_paid?: number;
  current_value?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}
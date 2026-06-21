import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.error(
    '[Supabase] 缺少环境变量 VITE_SUPABASE_URL 或 VITE_SUPABASE_PUBLISHABLE_KEY。' +
    '请检查项目根目录下的 .env 文件,或 Vercel 项目设置里的 Environment Variables。'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

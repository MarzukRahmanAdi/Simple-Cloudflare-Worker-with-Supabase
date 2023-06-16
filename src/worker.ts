/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { createClient } from '@supabase/supabase-js'



// export default {
//   async fetch(request, env, ctx) {
//     const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    
//     const { data, error } = await supabase.from('Sponser').select('*')

//     if (error) throw error
//     return new Response(JSON.stringify(data), {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   },
// };



export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

    };
    
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');

    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
    if(table === "Members" || table === "Sponser"){
      const { data, error } = await supabase.from(table).select('*')

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: corsHeaders,
      })
    }else{
      return new Response("Table not found")
    }
  },
};
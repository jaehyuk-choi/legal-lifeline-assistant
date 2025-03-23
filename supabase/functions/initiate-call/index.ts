
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Call our Twilio function instead of Flask API
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log('Initiating call with data:', requestData);

    // Forward to our twilio-call function directly
    const twilioFuncUrl = `${Deno.env.get('SUPABASE_URL') || 'https://xndvrjgheguqysltlheg.supabase.co'}/functions/v1/twilio-call`;
    
    console.log(`Forwarding request to: ${twilioFuncUrl}`);
    
    const response = await fetch(twilioFuncUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
      },
      body: JSON.stringify({
        ...requestData,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from Twilio function:', errorText);
      throw new Error(`Failed to initiate call: ${errorText}`);
    }

    const data = await response.json();
    console.log('Call initiated successfully:', data);
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in initiate-call function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

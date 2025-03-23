
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
    const AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
    const FROM_NUMBER = Deno.env.get('TWILIO_FROM_NUMBER');
    
    // Get the phone number from the request
    const { phoneNumber, source, timestamp } = await req.json();
    const TO_NUMBER = phoneNumber || Deno.env.get('TWILIO_TO_NUMBER');
    
    if (!ACCOUNT_SID || !AUTH_TOKEN || !FROM_NUMBER || !TO_NUMBER) {
      throw new Error('Missing required Twilio configuration');
    }

    console.log(`Initiating call to ${TO_NUMBER} from ${FROM_NUMBER}`);

    // Create the auth string for Twilio API
    const auth = btoa(`${ACCOUNT_SID}:${AUTH_TOKEN}`);
    
    // The URL to your webhook that handles the call
    const webhookUrl = Deno.env.get('TWILIO_WEBHOOK_URL') || 'https://92f6-38-113-160-139.ngrok-free.app/lang_select';

    // Make the API call to Twilio to initiate the call
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Calls.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: TO_NUMBER,
          From: FROM_NUMBER,
          Url: webhookUrl,
        }).toString(),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from Twilio API:', errorText);
      throw new Error(`Failed to initiate call: ${errorText}`);
    }

    const data = await response.json();
    console.log('Call initiated successfully:', data);
    
    return new Response(JSON.stringify({ 
      success: true, 
      callSid: data.sid,
      message: "Call initiated successfully"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in twilio-call function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

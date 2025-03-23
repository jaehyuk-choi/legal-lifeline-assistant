
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
    // Get environment variables for Twilio credentials
    const ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
    const AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
    const FROM_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER');
    
    // Get the phone number from the request or use default
    const { phoneNumber, source, timestamp } = await req.json();
    const TO_NUMBER = phoneNumber || Deno.env.get('DEFAULT_TO_NUMBER') || "+14374199290";
    
    if (!ACCOUNT_SID || !AUTH_TOKEN || !FROM_NUMBER) {
      console.error('Missing Twilio credentials:', { 
        hasSID: !!ACCOUNT_SID, 
        hasToken: !!AUTH_TOKEN, 
        hasFromNumber: !!FROM_NUMBER 
      });
      throw new Error('Missing required Twilio configuration');
    }

    console.log(`Initiating call to ${TO_NUMBER} from ${FROM_NUMBER}`);

    // Create the auth string for Twilio API
    const auth = btoa(`${ACCOUNT_SID}:${AUTH_TOKEN}`);
    
    // Use updated webhook URL
    const webhookUrl = Deno.env.get('TWILIO_WEBHOOK_URL') || 
                        "https://0c5e-148-252-133-83.ngrok-free.app/lang_select";

    console.log(`Using webhook URL: ${webhookUrl}`);

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

    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('Error from Twilio API:', responseText);
      throw new Error(`Failed to initiate call: ${responseText}`);
    }

    const data = JSON.parse(responseText);
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

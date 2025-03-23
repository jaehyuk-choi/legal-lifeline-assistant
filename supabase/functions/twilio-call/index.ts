
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
    // Hard-code Twilio credentials for direct testing
    const ACCOUNT_SID = "AC36915b9974948d6e8d75c71023b1d77c";
    const AUTH_TOKEN = "362ec3c6563da1e944188d8848d7d831";
    const FROM_NUMBER = "+19207893459";
    
    // Get the phone number from the request or use default
    const { phoneNumber, source, timestamp } = await req.json();
    const TO_NUMBER = phoneNumber || "+14374199290";
    
    console.log(`Initiating call to ${TO_NUMBER} from ${FROM_NUMBER}`);

    // Create the auth string for Twilio API
    const auth = btoa(`${ACCOUNT_SID}:${AUTH_TOKEN}`);
    
    // Use the correct webhook URL
    const webhookUrl = "http://localhost:5050/initiate_call";

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

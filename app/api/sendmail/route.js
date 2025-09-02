import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Check if session has token errors or expired
  if (session.error === "RefreshAccessTokenError" || session.error === "TokenExpired") {
    return new Response(JSON.stringify({ 
      success: false, 
      error: "❌ Failed: Can't create new access token for user. Please re-login.", 
      needsReauth: true 
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Check if access token exists
  if (!session.accessToken) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: "❌ Failed: No access token available. Please re-login.", 
      needsReauth: true 
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }


  // Convert Web request to Node request
  const nodeReq = Object.assign(Readable.fromWeb(req.body), {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: "", // required by formidable
  });

  const form = formidable({ multiples: true });

  let fields, files;
  try {
    ({ fields, files } = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) {
          console.error("❌ Form parse error:", err);
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    }));
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Invalid form data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const to = fields.to?.[0] || '';
  const subject = fields.subject?.[0] || '';
  const body = fields.body?.[0] || '';

  const fileList = Array.isArray(files.files) ? files.files : [files.files];
  const attachments = fileList
    .filter(Boolean)
    .map((file) => ({
      filename: file.originalFilename,
      path: file.filepath,
    }));


  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oAuth2Client.setCredentials({ 
    access_token: session.accessToken,
    refresh_token: session.refreshToken
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: session.user.email,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessToken: session.accessToken,
    },
  });

  try {
    const result = await transporter.sendMail({
      from: session.user.email,
      to,
      subject,
      text: body,
      attachments,
    });


    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

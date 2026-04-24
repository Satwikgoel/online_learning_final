// import { db } from '@/config/db';
// import { coursesTable } from '@/config/schema';
// import { auth, currentUser } from '@clerk/nextjs/server';
// import {
//     GoogleGenAI,
// } from '@google/genai';
// import axios from 'axios';
// import { eq } from 'drizzle-orm';
// import { NextResponse } from 'next/server';


// const PROMPT = `Genrate Learning Course depends on following details. In which Make sure to add Course Name, 
// Description,Course Banner Image Prompt Depends on Course Topics in 3d illustration.
//   Chapter Name, , Topic under each chapters ,
//    Duration for each chapters etc, in JSON format only

// Schema:

// {
//   "course": {
//     "name": "string",
//     "description": "string",
//     "category": "string",
//     "level": "string",
//     "includeVideo": "boolean",
//     "noOfChapters": "number",
//     "bannerImagePrompt": "string"
//     "chapters": [
//       {
//         "chapterName": "string",
//         "duration": "string",
//         "topics": [
//           "string"
//         ],
       
//       }
//     ]
//   }
// }

// , User Input: 

// `
// export const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });
// export async function POST(req) {
//     const { courseId, ...formData } = await req.json();
//     const user = await currentUser();
//     const { has } = await auth()
//     const hasPremiumAccess = has({ plan: 'starter' })
//     const config = {
//         responseMimeType: 'text/plain',

//     };
//     const model = 'gemini-1.5-flash';
//     const contents = [
//         {
//             role: 'user',
//             parts: [
//                 {
//                     text: PROMPT + JSON.stringify(formData),
//                 },
//             ],
//         },
//     ];

//     //If user already created any course?
//     if (!hasPremiumAccess) {
//         const result = await db.select().from(coursesTable)
//             .where(eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress));

//         if (result?.length >= 1) {
//             return NextResponse.json({ 'resp': 'limit exceed' })
//         }
//     }

//     const response = await ai.models.generateContent({
//         model,
//         config,
//         contents,
//     });

//     console.log(response.candidates[0].content.parts[0].text);
//     const RawResp = response?.candidates[0]?.content?.parts[0]?.text
//     const RawJson = RawResp.replace('```json', '').replace('```', '');
//     const JSONResp = JSON.parse(RawJson);

//     const ImagePrompt = JSONResp.course?.bannerImagePrompt;

//     //generate Image
//     const bannerImageUrl = await GenerateImage(ImagePrompt)
//     // Save to Database
//     const result = await db.insert(coursesTable).values({
//         ...formData,
//         courseJson: JSONResp,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//         cid: courseId,
//         bannerImageUrl: bannerImageUrl
//     });


//     return NextResponse.json({ courseId: courseId });
// }



// const GenerateImage = async (imagePrompt) => {
//     const BASE_URL = 'https://aigurulab.tech';
//     const result = await axios.post(BASE_URL + '/api/generate-image',
//         {
//             width: 1024,
//             height: 1024,
//             input: imagePrompt,
//             model: 'flux',//'flux'
//             aspectRatio: "16:9"//Applicable to Flux model only
//         },
//         {
//             headers: {
//                 'x-api-key': process?.env?.AI_GURU_LAB_API, // Your API Key
//                 'Content-Type': 'application/json', // Content Type
//             },
//         })
//     console.log(result.data.image) //Output Result: Base 64 Image
//     return result.data.image;
// }











// new code for open router with error handling and cleaner structure




// const PROMPT = `
// You are an API that returns STRICT JSON.

// Return ONLY valid JSON.
// Do NOT include:
// - Any explanation
// - Any text like "Based on your input"
// - Markdown or backticks

// Follow this exact schema:

// {
//   "course": {
//     "name": "string",
//     "description": "string",
//     "category": "string",
//     "level": "string",
//     "includeVideo": true,
//     "noOfChapters": number,
//     "bannerImagePrompt": "string",
//     "chapters": [
//       {
//         "chapterName": "string",
//         "duration": "string",
//         "topics": ["string"]
//       }
//     ]
//   }
// }

// User Input:
// `;







import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// 🔥 STRICT PROMPT (VERY IMPORTANT)



const PROMPT = `Genrate Learning Course depends on following details. In which Make sure to add Course Name, 
Description, Course Banner Image Prompt Depends on Course Topics in 3d illustration.
Chapter Name, Topic under each chapters,
Duration for each chapters etc, in JSON format only

Schema:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"]
      }
    ]
  }
}
User Input:
`;

export async function POST(req) {
    try {
        const { courseId, ...formData } = await req.json();

        const user = await currentUser();
        const { has } = await auth();
        const hasPremiumAccess = has({ plan: 'starter' });

        // 🚫 Free user limit
        if (!hasPremiumAccess) {
            const result = await db.select().from(coursesTable)
                .where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress));

            if (result?.length >= 1) {
                return NextResponse.json({ resp: 'limit exceed' });
            }
        }

        // 🧠 AI CALL
        const aiResponse = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mixtral-8x7b-instruct",
                messages: [
                    {
                        role: "user",
                        content: PROMPT + JSON.stringify(formData),
                    },
                ],
                temperature: 0.3, // 🔥 more reliable JSON
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const RawResp = aiResponse.data.choices[0].message.content;

        console.log("AI RAW RESPONSE:", RawResp); // 🧪 debug

        // 🧹 CLEAN RESPONSE
        let cleaned = RawResp
            ?.replace(/```json/g, '')
            ?.replace(/```/g, '')
            ?.trim();

        // 🧠 EXTRACT JSON ONLY
        const match = cleaned.match(/\{[\s\S]*\}/);

        if (!match) {
            console.error("❌ NO JSON FOUND:", RawResp);
            return NextResponse.json(
                { error: "AI did not return valid JSON" },
                { status: 500 }
            );
        }

        let JSONResp;

        try {
            JSONResp = JSON.parse(match[0]);
        } catch (err) {
            console.error("❌ JSON Parse Error:", match[0]);
            return NextResponse.json(
                { error: "Invalid AI JSON" },
                { status: 500 }
            );
        }

        // 🛡️ VALIDATION
        if (!JSONResp?.course) {
            return NextResponse.json(
                { error: "Invalid course structure from AI" },
                { status: 500 }
            );
        }

        const ImagePrompt = JSONResp.course.bannerImagePrompt || "3D learning illustration";

        // 🎨 GENERATE IMAGE
        const bannerImageUrl = await GenerateImage(ImagePrompt);

        // 💾 SAVE TO DB
        await db.insert(coursesTable).values({
            ...formData,
            courseJson: JSONResp,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            cid: courseId,
            bannerImageUrl: bannerImageUrl
        });

        return NextResponse.json({ courseId });

    } catch (error) {
        console.error("🚨 API ERROR:", error?.response?.data || error.message);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


// 🎨 IMAGE GENERATION FUNCTION
const GenerateImage = async (imagePrompt) => {
    try {
        const BASE_URL = 'https://aigurulab.tech';

        const result = await axios.post(
            BASE_URL + '/api/generate-image',
            {
                width: 1024,
                height: 1024,
                input: imagePrompt,
                model: 'flux',
                aspectRatio: "16:9"
            },
            {
                headers: {
                    'x-api-key': process.env.AI_GURU_LAB_API,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("🖼️ Image Generated");

        return result.data.image;

    } catch (err) {
        console.error("❌ Image Generation Failed:", err.message);

        // fallback image (important for stability)
        return "https://via.placeholder.com/1024x576.png?text=Course+Image";
    }
};




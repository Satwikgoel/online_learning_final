// import { NextResponse } from "next/server";
// import { ai } from "../generate-course-layout/route";
// import axios from "axios";
// import { db } from "@/config/db";
// import { coursesTable } from "@/config/schema";
// import { eq } from "drizzle-orm";

// const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML 
// and give response in JSON format. 
// Schema:{
// chapterName:<>,
// {
// topic:<>,
// content:<>
// }
// }
// : User Input:
// `
// export async function POST(req) {
//     const { courseJson, courseTitle, courseId } = await req.json();

//     const promises = courseJson?.chapters?.map(async (chapter) => {
//         const config = {
//             responseMimeType: 'text/plain',
//         };
//         const model = 'gemini-1.5-flash';
//         const contents = [
//             {
//                 role: 'user',
//                 parts: [
//                     {
//                         text: PROMPT + JSON.stringify(chapter),
//                     },
//                 ],
//             },
//         ];

//         const response = await ai.models.generateContent({
//             model,
//             config,
//             contents,
//         });
//         // console.log(response.candidates[0].content.parts[0].text);
//         const RawResp = response.candidates[0].content.parts[0].text
//         const RawJson = RawResp.replace('```json', '').replace('```', '').trim();
//         const JSONResp = JSON.parse(RawJson);

//         // GET Youtube Videos

//         const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
//         console.log({
//             youtubeVideo: youtubeData,
//             courseData: JSONResp
//         })
//         return {
//             youtubeVideo: youtubeData,
//             courseData: JSONResp
//         };
//     })

//     const CourseContent = await Promise.all(promises)

//     //Save to DB
//     const dbResp = await db.update(coursesTable).set({
//         courseContent: CourseContent
//     }).where(eq(coursesTable.cid, courseId));

//     return NextResponse.json({
//         courseName: courseTitle,
//         CourseContent: CourseContent
//     })
// }

// const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

// const GetYoutubeVideo = async (topic) => {
//     const params = {
//         part: 'snippet',
//         q: topic,
//         maxResult: 4,
//         type: 'video',
//         key: process.env.YOUTUBE_API_KEY     //Youtube API KEY
//     }
//     const resp = await axios.get(YOUTUBE_BASE_URL, { params });
//     const youtubeVideoListResp = resp.data.items;
//     const youtubeVideoList = [];
//     youtubeVideoListResp.forEach(item => {
//         const data = {
//             videoId: item.id?.videoId,
//             title: item?.snippet?.title
//         }
//         youtubeVideoList.push(data);
//     })
//     console.log("youtubeVideoList", youtubeVideoList)
//     return youtubeVideoList;
// }














//code for open router








import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

// const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML 
// and give response in JSON format. 
// Schema:{
// chapterName:<>,
// topics:[
// {
// topic:<>,
// content:<>
// }
// ]
// }
// : User Input:
// `;

const PROMPT = `
You are an AI content generator for an online learning platform.

Task:
Based on the given Chapter Name and Topics, generate educational content for each topic.

STRICT RULES:
- Output MUST be in valid JSON format only
- DO NOT include any explanation, markdown, or extra text
- DO NOT include videos, iframes, embeds, links, or media
- ONLY generate clean HTML content (text-based)
- HTML must include proper tags like: <h2>, <p>, <ul>, <li>, <b>, <i>
- Keep content simple, beginner-friendly, and well-structured
- Each topic must have detailed explanation (at least 2–3 paragraphs)

Schema:
{
  "chapterName": "string",
  "topics": [
    {
      "topic": "string",
      "content": "HTML content only (NO video or iframe)"
    }
  ]
}

User Input:
`;

// 🔥 MAIN API
export async function POST(req) {
    try {
        const { courseJson, courseTitle, courseId } = await req.json();

        if (!courseJson || !courseId) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        const promises = courseJson?.chapters?.map(async (chapter) => {

            // 🧠 OpenRouter API call
            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: "mistralai/mixtral-8x7b-instruct", // ✅ free model
                    messages: [
                        {
                            role: "user",
                            content: PROMPT + JSON.stringify(chapter),
                        },
                    ],
                    temperature: 0.7,
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const RawResp = response.data.choices[0].message.content;

            // 🧹 Clean JSON response
            const RawJson = RawResp.replace(/```json|```/g, "").trim();

            let JSONResp;
            try {
                JSONResp = JSON.parse(RawJson);
            } catch (err) {
                console.error("JSON parse error:", err);
                JSONResp = {
                    error: "Invalid JSON from AI",
                    raw: RawResp,
                };
            }

            // 🎥 Fetch YouTube videos
            const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

            return {
                youtubeVideo: youtubeData,
                courseData: JSONResp,
            };
        });

        // ⚡ Run all chapters in parallel
        const CourseContent = await Promise.all(promises);

        // 💾 Save to DB
        await db
            .update(coursesTable)
            .set({
                courseContent: CourseContent,
            })
            .where(eq(coursesTable.cid, courseId));

        return NextResponse.json({
            courseName: courseTitle,
            CourseContent,
        });

    } catch (error) {
        console.error("API ERROR:", error?.response?.data || error.message);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

//
// 🎥 YOUTUBE FUNCTION
//
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const GetYoutubeVideo = async (topic) => {
    try {
        const params = {
            part: "snippet",
            q: topic,
            maxResults: 4, // ✅ FIXED
            type: "video",
            key: process.env.YOUTUBE_API_KEY,
        };

        const resp = await axios.get(YOUTUBE_BASE_URL, { params });

        return resp.data.items.map((item) => ({
            videoId: item.id?.videoId,
            title: item?.snippet?.title,
        }));

    } catch (error) {
        console.error("YouTube API Error:", error.message);
        return [];
    }
};

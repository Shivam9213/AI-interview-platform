const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = {
    type: "object",
    properties: {
        matchScore: { type: "number", description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description" },
        technicalQuestions: {
            type: "array",
            description: "Technical questions that can be asked in the interview",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The technical question" },
                    intention: { type: "string", description: "The intention behind asking this question" },
                    answer: { type: "string", description: "How to answer this question, what points to cover" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "array",
            description: "Behavioral questions that can be asked in the interview",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The behavioral question" },
                    intention: { type: "string", description: "The intention behind asking this question" },
                    answer: { type: "string", description: "How to answer this question, what points to cover" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: "array",
            description: "List of skill gaps in the candidate's profile",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string", description: "The skill the candidate is lacking" },
                    severity: { type: "string", enum: ["low", "medium", "high"], description: "How important this skill gap is" }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            description: "A day-wise preparation plan for the candidate",
            items: {
                type: "object",
                properties: {
                    day: { type: "number", description: "The day number starting from 1" },
                    focus: { type: "string", description: "The main focus of this day" },
                    tasks: { type: "array", items: { type: "string" }, description: "List of tasks for this day" }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: { type: "string", description: "The job title for this interview report" }
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema,
        }
    })

    return JSON.parse(response.text)


}



module.exports = { generateInterviewReport }
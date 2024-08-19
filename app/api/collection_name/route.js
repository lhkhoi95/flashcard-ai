import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a collection name creator, you take in text and create a name for a collection. Make sure to create exactly one name. Collection names should be short and descriptive.
You should return in the following JSON format
{
    "name": str
}
`;

export async function POST(req) {
  try {
    const openai = new OpenAI();
    const data = await req.text();

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data },
      ],
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
    });

    const name = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(name.name);
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error("Error creating flash cards"));
  }
}

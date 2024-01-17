import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request,{params}) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById( params.id).populate('creator')
        if(!prompt)
        return new Response("Prompt not found" ,{status:404})
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 })
    }
} 


export const PATCH = async (request,{params})=>{
    const {prompt ,tag} = await request.json();
    try {
        await connectToDB();

        const existigPrompt = await Prompt.findById(params.id)

        if(!existigPrompt) return new Response("Prompt not found",
        {status:404})

        existigPrompt.prompt = prompt;
        existigPrompt.tag = tag;
        await existigPrompt.save()
        return new Response(JSON.stringify(existigPrompt),
        {status:200})

    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
        
    }

}


export const DELETE = async (request ,{params}) =>{
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id)
        return new Response('Prompt deleted Successfully',
        {status:200})



    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 }) 
    }
}
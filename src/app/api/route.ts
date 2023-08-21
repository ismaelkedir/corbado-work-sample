// Get request to the root of the api
export async function GET(request: Request): Promise<Response> {
    return new Response(JSON.stringify({message: "Hello World"}))
}
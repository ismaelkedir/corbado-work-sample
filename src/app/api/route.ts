/**
 * GET request to the root of the api
 * @param request The request object
 * @returns A sample 'hello world' response
 */
export async function GET(request: Request): Promise<Response> {
    return new Response(JSON.stringify({message: "Hello World"}))
}
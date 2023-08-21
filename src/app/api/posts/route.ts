// Get request to get all posts with filtering and sorting
export async function GET(request: Request): Promise<Response> {
    // Get the query string from the request
    const queryString = request.url.split("?")[1];
    // Parse the query string into an object
    const query = Object.fromEntries(new URLSearchParams(queryString));
    // Get the posts
    const posts = await getPosts(query);
    // Send the posts as a response
    return new Response(JSON.stringify(posts));
}

// Create a dummy array of posts
const posts: Post[] = [
    {
        id: "1",
        title: "Hello World",
        content: "This is my first post",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        title: "Aello World 2",
        content: "This is my second post",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "3",
        title: "Bello World 3",
        content: "This is my third post",
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

async function getPosts(query: {[index: string]: unknown}): Promise<Post[]> {
    // return the posts with the query applied
    return posts.filter(post => {
        // If the title query is present, check if the title matches
        if (query.title) {
            return post.title === query.title;
        }

        // Return post even if part of the query title matches
        if (query.titleLike) {
            return post.title.includes(query.titleLike as string);
        }

        // If the content query is present, check if the content matches
        if (query.content) {
            return post.content === query.content;
        }

        // If no query is present, return true
        return true;
    }).sort((a, b) => {
        // If the sortBy query is present, sort by that
        if (query.sortBy) {
            const sortBy = query.sortBy as keyof Post;
            return a[sortBy] > b[sortBy] ? 1 : -1;
        }
        // If no query is present, return true
        return 0;
    });
}

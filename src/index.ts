function ErrorResponse(status: number, message: string) {
	return new Response(JSON.stringify({ status, message }), {
		status,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
async function handleRequest(request: Request) {
	try {
		// check method
		if (request.method === "GET") {
			return ErrorResponse(405, "Method Not Allowed");
		}
		// check params
		const requestParams = new URL(request.url).searchParams;
		const targetUrl = requestParams.get("url");
		if (!targetUrl) {
			return ErrorResponse(400, "Bad Request");
		}
		// fetch
		const targetResponse = await fetch(targetUrl, {
			method: request.method,
			headers: request.headers,
			body: request.body,
		});
		// response
		const targetResponseHeaders = new Headers(targetResponse.headers);
		targetResponseHeaders.set("Access-Control-Allow-Origin", "*");
		return new Response(targetResponse.body, {
			status: targetResponse.status,
			headers: targetResponseHeaders,
		});
	} catch (error) {
		return ErrorResponse(500, "Internal Server Error");
	}
}

const exportedHandler: ExportedHandler<Env> = {
	async fetch(request: Request): Promise<Response> {
		return handleRequest(request);
	},
};

export default exportedHandler;

import { errorResponse } from "@utils/response";

async function handleRequest(request: Request) {
	try {
		// check method
		if (request.method === "GET") {
			return errorResponse(405);
		}
		// check params
		const requestParams = new URL(request.url).searchParams;
		const targetUrl = requestParams.get("url");
		if (!targetUrl) {
			return errorResponse(400);
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
		return errorResponse(500, error);
	}
}

const exportedHandler: ExportedHandler<Env> = {
	async fetch(request: Request): Promise<Response> {
		return handleRequest(request);
	},
};

export default exportedHandler;

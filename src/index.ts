/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// These initial Types are based on bindings that don't exist in the project yet,
// you can follow the links to learn how to implement them.

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket
}

export const worker = {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);
		// 仅处理 /autodiscover/autodiscover.xml 路径的 POST 请求
		if (url.pathname.toLowerCase() === '/autodiscover/autodiscover.xml') {
			try {
				// 生成 Autodiscover XML 响应
				const xml = `<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
    <Response xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a">
        <Account>
            <AccountType>email</AccountType>
            <Action>settings</Action>
            <Protocol>
                <Type>IMAP</Type>
                <Server>imap.sparkspace.huaweicloud.com</Server>
                <Port>993</Port>
                <DomainRequired>off</DomainRequired>
                <LoginName/>
                <SPA>off</SPA>
                <SSL>on</SSL>
                <AuthRequired>on</AuthRequired>
            </Protocol>
            <Protocol>
                <Type>SMTP</Type>
                <Server>smtp.sparkspace.huaweicloud.com</Server>
                <Port>465</Port>
                <DomainRequired>off</DomainRequired>
                <LoginName/>
                <SPA>off</SPA>
                <Encryption>SSL</Encryption>
                <AuthRequired>on</AuthRequired>
                <UsePOPAuth>off</UsePOPAuth>
                <SMTPLast>off</SMTPLast>
            </Protocol>
        </Account>
    </Response>
</Autodiscover>`;
				return new Response(xml, {
					headers: {
						'Content-Type': 'application/xml; charset=utf-8',
						'Access-Control-Allow-Origin': '*',
					},
					status: 200
				});
			} catch (error) {
				return new Response('Error processing request', { status: 500 });
			}
		}
		// 非目标请求返回404
		return new Response('Not Found', { status: 404 });
	},
};

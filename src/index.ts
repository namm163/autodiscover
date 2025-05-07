export interface Env {
	DOMAIN: string;
}
const xmlTemplate = `<?xml version="1.0" encoding="utf-8"?>
<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
  <Response xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a">
    <Account>
      <AccountType>email</AccountType>
      <Action>settings</Action>
      <Protocol>
        <Type>IMAP</Type>
        <Server>imap.{{DOMAIN}}</Server>
        <Port>993</Port>
        <LoginName>%EMAILADDRESS%</LoginName>
        <SSL>on</SSL>
      </Protocol>
      <Protocol>
        <Type>SMTP</Type>
        <Server>smtp.{{DOMAIN}}</Server>
        <Port>587</Port>
        <LoginName>%EMAILADDRESS%</LoginName>
        <SSL>on</SSL>
      </Protocol>
    </Account>
  </Response>
</Autodiscover>`;
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);

		// 只响应 /autodiscover/autodiscover.xml 路径
		if (!url.pathname.toLowerCase().endsWith("/autodiscover/autodiscover.xml")) {
			return new Response("Not Found", { status: 404 });
		}
		// 处理GET和POST请求
		if (["GET", "POST"].includes(request.method)) {
			const xml = xmlTemplate.replace(/{{DOMAIN}}/g, env.DOMAIN);
			return new Response(xml, {
				headers: {
					"Content-Type": "application/xml; charset=utf-8",
					"Access-Control-Allow-Origin": "*"
				}
			});
		}
		return new Response("Method Not Allowed", { status: 405 });
	},
};

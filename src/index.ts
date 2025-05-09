export default {
	async fetch(request) {
		const url = new URL(request.url);
		// 仅处理 /autodiscover/autodiscover.xml 路径的 POST 请求
		if (url.pathname.toLowerCase() === '/autodiscover/autodiscover.xml') {
			try {
				// 生成 Autodiscover XML 响应
				const xml = `<?xml version="1.0" encoding="utf-8"?><Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
  <Response xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a">
    <Account>
      <AccountType>email</AccountType>
      <Action>settings</Action>
      <Protocol>
        <Type>IMAP</Type>
        <Server>imap.sparkspace.huaweicloud.com</Server>
        <Port>993</Port>
        <DomainRequired>off</DomainRequired>
        <LoginName>bob@197955.xyz</LoginName>
        <SPA>off</SPA>
        <SSL>on</SSL>
        <AuthRequired>off</AuthRequired>
      </Protocol>
      <Protocol>
        <Type>POP3</Type>
        <Server>pop.sparkspace.huaweicloud.com</Server>
        <Port>995</Port>
        <DomainRequired>off</DomainRequired>
        <LoginName>bob@197955.xyz</LoginName>
        <SPA>off</SPA>
        <SSL>on</SSL>
        <AuthRequired>off</AuthRequired>
      </Protocol>
      <Protocol>
        <Type>SMTP</Type>
        <Server>smtp.sparkspace.huaweicloud.com</Server>
        <Port>465</Port>
        <DomainRequired>off</DomainRequired>
        <LoginName>bob@197955.xyz</LoginName>
        <SPA>off</SPA>
        <SSL>on</SSL>
        <AuthRequired>off</AuthRequired>
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
	}
};

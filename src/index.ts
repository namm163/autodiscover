export default {
	async fetch(request) {
		const url = new URL(request.url);
		// 仅处理 /autodiscover/autodiscover.xml 路径的 POST 请求
		if (url.pathname.toLowerCase() === '/autodiscover/autodiscover.xml') {
			try {
				// 生成 Autodiscover XML 响应
				const xml = `<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
  <Response xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a">
    <User>
      <DisplayName>users</DisplayName>
      <LegacyDN>
        /o=example.com/ou=Exchange/cn=Recipients/cn=a55be5ac09bb4734812572b46bfc57d4-users</LegacyDN>
      <AutoDiscoverSMTPAddress>boby@534820.xyz</AutoDiscoverSMTPAddress>
      <DeploymentId>7d3020ab-d683-4dd2-b5bd-2a82b8e716b4</DeploymentId>
    </User>
    <Account>
      <AccountType>email</AccountType>
      <Action>settings</Action>
      <MicrosoftOnline>False</MicrosoftOnline>
      <ConsumerMailbox>False</ConsumerMailbox>
      <Protocol>
        <Type>SMTP</Type>
        <Server>smtp.sparkspace.huaweicloud.com</Server>
        <Port>465</Port>
        <LoginName>bob@534820.xyz</LoginName>
        <DomainRequired>On</DomainRequired>
        <DomainName>534820.xyz</DomainName>
        <SPA>Off</SPA>
        <SSL>On</SSL>
        <AuthRequired>On</AuthRequired>
      </Protocol>
      <Protocol>
        <Type>IMAP</Type>
        <Server>imap.sparkspace.huaweicloud.com</Server>
        <Port>993</Port>
        <LoginName>bob@534820.xyz</LoginName>
        <DomainRequired>On</DomainRequired>
        <DomainName>534820.xyz</DomainName>
        <SPA>Off</SPA>
        <SSL>On</SSL>
        <AuthRequired>On</AuthRequired>
      </Protocol>
      <Protocol>
        <Type>POP3</Type>
        <Server>pop3.sparkspace.huaweicloud.com</Server>
        <Port>995</Port>
        <LoginName>bob@534820.xyz</LoginName>
        <DomainRequired>On</DomainRequired>
        <DomainName>534820.xyz</DomainName>
        <SPA>Off</SPA>
        <SSL>On</SSL>
        <AuthRequired>On</AuthRequired>
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

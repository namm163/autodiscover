export default {
	async fetch(request) {
		const url = new URL(request.url);
		// 仅处理 /autodiscover/autodiscover.xml 路径的 POST 请求
		if (url.pathname.toLowerCase() === '/autodiscover/autodiscover.xml') {
			try {
				// 生成 Autodiscover XML 响应
				const xml = `<?xml version="1.0" encoding="utf-8"?>
<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
  <Response xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a">
    <User>
      <DisplayName>Qiuyueqiong</DisplayName>
      <LegacyDN>/o=Huawei Exchange Org/ou=Exchange Administrative Group (FYDIBOHF23SPDLT)/cn=Recipients/cn=qiuyueqiong 00197955</LegacyDN>
      <AutoDiscoverSMTPAddress>qiuyueqiong@huawei.com</AutoDiscoverSMTPAddress>
      <DeploymentId>7de81945-e49f-484b-89c9-a54a0f52b858</DeploymentId>
    </User>
    <Account>
      <AccountType>email</AccountType>
      <Action>settings</Action>
      <MicrosoftOnline>False</MicrosoftOnline>
      <ConsumerMailbox>False</ConsumerMailbox>
      <Protocol Type="mapiHttp" Version="1">
        <MailStore>
          <InternalUrl>https://imailcn57.email.huawei.com/mapi/emsmdb/?MailboxId=71a274a5-adc5-46a7-8592-08fa5d3088d0@huawei.com</InternalUrl>
        </MailStore>
        <AddressBook>
          <InternalUrl>https://imailcn57.email.huawei.com/mapi/nspi/?MailboxId=71a274a5-adc5-46a7-8592-08fa5d3088d0@huawei.com</InternalUrl>
        </AddressBook>
      </Protocol>
      <Protocol>
        <Type>WEB</Type>
        <Internal>
          <OWAUrl AuthenticationMethod="Basic, Fba">https://cn57.email.huawei.com/owa/</OWAUrl>
          <Protocol>
            <Type>EXCH</Type>
            <ASUrl>https://imailcn57.email.huawei.com/ews/exchange.asmx</ASUrl>
          </Protocol>
        </Internal>
        <External>
          <OWAUrl AuthenticationMethod="Fba">https://cn57.email.huawei.com/owa/</OWAUrl>
          <Protocol>
            <Type>EXPR</Type>
            <ASUrl>https://imailcn57.email.huawei.com/ews/exchange.asmx</ASUrl>
          </Protocol>
        </External>
      </Protocol>
      <Protocol>
        <Type>EXHTTP</Type>
        <Server>imailcn57.email.huawei.com</Server>
        <SSL>On</SSL>
        <AuthPackage>Negotiate</AuthPackage>
        <ASUrl>https://imailcn57.email.huawei.com/ews/exchange.asmx</ASUrl>
        <EwsUrl>https://imailcn57.email.huawei.com/ews/exchange.asmx</EwsUrl>
        <EmwsUrl>https://imailcn57.email.huawei.com/ews/exchange.asmx</EmwsUrl>
        <EcpUrl>https://cn57.email.huawei.com/owa/</EcpUrl>
        <EcpUrl-um>?path=/options/callanswering</EcpUrl-um>
        <EcpUrl-aggr>?path=/options/connectedaccounts</EcpUrl-aggr>
        <EcpUrl-mt>options/ecp/PersonalSettings/DeliveryReport.aspx?rfr=olk&amp;exsvurl=1&amp;IsOWA=&lt;IsOWA&gt;&amp;MsgID=&lt;MsgID&gt;&amp;Mbx=&lt;Mbx&gt;&amp;realm=china.huawei.com</EcpUrl-mt>
        <EcpUrl-ret>?path=/options/retentionpolicies</EcpUrl-ret>
        <EcpUrl-sms>?path=/options/textmessaging</EcpUrl-sms>
        <EcpUrl-photo>?path=/options/myaccount/action/photo</EcpUrl-photo>
        <EcpUrl-tm>options/ecp/?rfr=olk&amp;ftr=TeamMailbox&amp;exsvurl=1&amp;realm=china.huawei.com</EcpUrl-tm>
        <EcpUrl-tmCreating>options/ecp/?rfr=olk&amp;ftr=TeamMailboxCreating&amp;SPUrl=&lt;SPUrl&gt;&amp;Title=&lt;Title&gt;&amp;SPTMAppUrl=&lt;SPTMAppUrl&gt;&amp;exsvurl=1&amp;realm=china.huawei.com</EcpUrl-tmCreating>
        <EcpUrl-tmEditing>options/ecp/?rfr=olk&amp;ftr=TeamMailboxEditing&amp;Id=&lt;Id&gt;&amp;exsvurl=1&amp;realm=china.huawei.com</EcpUrl-tmEditing>
        <EcpUrl-extinstall>?path=/options/manageapps</EcpUrl-extinstall>
        <OOFUrl>https://imailcn57.email.huawei.com/ews/exchange.asmx</OOFUrl>
        <UMUrl>https://imailcn57.email.huawei.com/ews/UM2007Legacy.asmx</UMUrl>
        <ServerExclusiveConnect>On</ServerExclusiveConnect>
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

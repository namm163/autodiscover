export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // 验证请求路径
        if (!url.pathname.endsWith('/autodiscover/autodiscover.xml')) {
            return new Response('Not Found', { status: 404 });
        }
        // 验证HTTP方法
        if (!['GET', 'POST'].includes(request.method)) {
            return new Response('Method Not Allowed', { status: 405 });
        }
        // 生成动态XML
        const xmlResponse = generateAutodiscoverXML({
            hostname: env.AUTODISCOVER_HOST || 'mail.example.com',
            protocol: env.AUTODISCOVER_PROTOCOL || 'Autodiscoverv1',
            domain: new URL(request.url).hostname
        });
        return new Response(xmlResponse, {
            headers: { 'Content-Type': 'application/xml; charset=utf-8' }
        });
    }
};
function generateAutodiscoverXML(config) {
    return `<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
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
}
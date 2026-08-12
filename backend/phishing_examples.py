examples = [
    {
        "id": "1",
        "text": """
                From: support@paypa1.com 
                Subject: Urgent your account will be suspended click here to verify
                Body: Dear customer, your PayPal account has been limited. Click here immediately to restore access or your account will be permanently suspended within 24 hours.
                URLs: http://paypal-secure-login.ru/verify
                Domains: paypa1.com
                SPF: none
                DMARC: fail
                DKIM: no signature
        """,
        "verdict": "suspicious",
        "type": "account_suspension",
        "brand": "paypal",
        "indicators": ["domain_spoofing", "urgency", "suspicious_url", "spf_none", "dkim_signature_fail"]
    },
    {
        "id": "2",
        "text": """
                From: banco.bradesco@atendimento.com.br
                Subject: CLIENTE PRIME - BRADESCO LIVELO: Seu cartão tem 92.990 pontos LIVELO expirando hoje!
                Body: Você possui Pontos Livelo com seu cartão Banco do Bradesco disponíveis para resgate que expiram HOJE, evite a perda destes pontos realizando agora mesmo o resgate da sua Pontuação Visa Infinite. Você Clientes Banco do Bradesco acumulam pontos livelo todas as vezes que utilizam seus cartões na função débito ou crédito, é rápido e fácil de acumular.
                URLs: https://blog1seguimentmydomaine2bra.me/
                Domains: [
                    blog1seguimentmydomaine2bra.me,
                    fonts.googleapis.com,
                    92.990,
                ]
                SPF: none
                DMARC: fail
                DKIM: no signature
        """,
        "verdict": "suspicious",
        "type": "redeem_points",
        "brand": "banco",
        "indicators": ["domain_spoofing", "urgency", "suspicious_url", "spf_none", "dkim_signature_fail"]
    },
    {
        "id": "3",
        "text": """
                From: mail@em.sweatco.in
                Subject: Your Sweatcoin earnings are still paused
                Body: Your Sweatcoin earnings are currently paused — but nothing is lost. The good news is: you can reactivate them anytime and continue exactly where you left off. It only takes a few seconds to turn them back on. Once reactivated, you'll start earning again through your daily activity as usual.
                URLs: [
                    https://sweatco.in/app/path-screen,
                    https://click.sweatco.in/CI0/0110019eabac3ad3-c820be26-8601-4990-a024-11e0860d84db-000000/lV3_0SQCtbSf4RcG9qXTAbEfMUw6hUhldEdECbL24rw=258,
                    https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/tiktok@2x.png,
                    https://click.sweatco.in/CL0/https:%2F%2Fmoe_65aa.api-02.moengage.com%2Fv1%2Femailclick%3Fq=iCAOeYwu8uHcUjBuZXTNdjomZsOpdYOCqG1zyrkG7txJmrWHZmvarg-RumbG7YSetTbtPQ3P2xr_pnrWg.dycLif8jcxQHTleIPjd2Z_goFGD_NivkXvtouufE0KrbDTSiyvV9uAYmJHLp61.1QWQ7hRPjCv4veBdz1ygub56ZCdLPy8SfHWf.zNxJqU7LCQTz8PkeAnN22ZPCyktRsEBE2IAQUNtcqO06xGv3vxOqB2iA-xmXeAGfm7zM.GnbFeE9gXUQmRn9Apn1gmvQoduPnSuRnX2OY,
                    https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/facebook@2x.png,
                    https://d314e77m1bz5zy.cloudfront.net/bee/Images/bmsx/nyucxrz2/ofi/x61/mau/swc_logo_whitebg.png,
                    https://click.sweatco.in/CL0/https:%2F%2Fmoe_65aa.api-02.moengage.com%2Fv1%2Femailclick%3Fq=kn5CMqX400Fg4qViE4wrKR,
                    https://click.sweatco.in/CL0/https:%2F%2Fmoe_65aa.api-02.moengage.com%2Fv1%2Femailclick%3Fq=IC.0CWNYCNWWqzT7cfySruH0kMd3rO_8vsMutkK8HMI8ZscmzTwklw-xJ61qf1bTaRGMS.wuYEwMzO16wSh.LXKdP1ODqvDUk_5I6nWXEjVUFX9twfkMY9QPJ24Jm2YEYcFakg7c0NnbjDMhfjXwyfo0CrT3VqTmIL8ScCdmS3gOB3r3aba3xsGl87zXax03feLHloC.3Z3vdI.daZyBgkIkYWSHqdATlwMTMOxpuqhcRs-xmXeAGfm7zM.GnbFeE9,
                    https://moe_65aa.api-02.moengage.com/v1/emailopen?q=ICly_xSipKqw9NQqn9afYn.YKWDUoHt_KHs81sNpPxZH6lrtNcq4Bw-.scwXD35TbxNvtUQYFt75d.nUdJqBRwHmO5_EyVZHLi,
                    https://click.sweatco.in/CL0/https:%2F%2Fmoe_65aa.api-02.moengage.com%2Fv1%2Femailunsubscribe%3Fq=HwwQ1tpgK0gIF.J2IbEqjausw0L.pGCngiJ20etpLjn9_8a0kcU54A-dXBsu2MyPcvl4P0VjHhrYoWp7iPIncFmSCunOExrSwHtNg6bcz85oC24atZnZ7oz8RpkuDQWmR.rnjMMcjZjyM6Uz_NiriArJKmJCYT7Q.aVnDTeFzNimuGHLJu9G5ytq5A4uUpNnnA2mhm32LkCEW_AozcHAYzc2_DRvRxLDsH6oQ9Hv83aA0U-xmXeAGfm7zM.GnbFeE9gXUQmRn9Apn1gmvQoduPnSuRnX2OYs1_CNEcfZfBz78Oj8Ka,
                    https://click.sweatco.in/CL0/ttps:%2F%2Fapi-02.moengage.com%2Fv1%2Femailresubscribe/1/0110019eabac3ad3-c820be26-8601-4990-a024-11e0860d84db-000000/1HgA9DnnDp7Y32wQf2YBJoP3g3iOmVvnm6L,
                    https://click.sweatco.in/CL0/https:%2F%2Fmoe_65aa.api-02.moengage.com%2Fv1%2Femailclick%3Fq=jcTHs7iw96NdlMdRrOADDoIlMEZiE5JADX5akyd8UotQIzEjxea5.g-iN5EwLqdsiUybPRqXWnJsgbF1DyIj0PJSgOe3t4QmlN6x0LJP_1h2MomfaJkp7ISup6haJB14BGfslmjrUcfMtz.6HjurT09_c23Z1C4kohg7W_rY1Lw4AoNyIaLl3QA7Bb9LjW84QB3C3KCP0.wKXceK,
                    https://click.sweatco.in/CL0/https:%2F%2Fmoe_65aa.api-02.moengage.com%2Fv1%2Femailclick%3Fq=z7UT7OVbhjuNxcrLIs6FltzcUizJvxPFQvBb3kHAhq2KHuJHUZqzhg-qymPMo_BFLkR6tJ8Nf2MHkkdl9eunW_xMgw8.a9V4KkWvsrhB7JG7QmDolhFi2iHty85r4BPCAn_.TbPmezv.XbQWdQ8yBKU0xP9BL1e51MKeCnTmjSCq3pYqOVIdA9zN_.DImkdqASxENiefWtmMfZycat7LRXy5H3ghMlZZ2uH99tQyv0NAVQ-xmXeAGfm7zM.GnbFeE9gXUQmRn9Apn1gmvQod,
                    https://click.sweatco.in/CL0/https:%2F%2Fmoe_65aa.api-02.moengage.com%2Fv1%2Femailclick%3Fq=1PkTnVJwXSuFmElN0Cs_sy2CrR.hokAWlkRj9SqgakKVM_.WFbAEaA-DZMMTriVJVhwZ7Ifov4GATp3TzXkv98sTCtbA_kTd_6xpWk6TgOH8NevK2NvFlTFwe0bjItzQWvbsxI5qRgutVcf6k3x3eVrZQvV4zatf6CbPDT5ZhUZoQ2zeTDHPbamotLjpOzgWwJOSiSGpaYxAVmXLLb6_lFcZux8LShTBf8F1nFke.vQ.aw-xmXeAGfm7zM.GnbFeE9gXUQmRn9Apn1gmvQoduPnSuRnX2OYs1_CNEcfZfBz78Oj8KakLyXK3Q-EhDIvo1jTsNGXfes1kwFa_staTrLm5NP6ofTeeHf.tldBVMhi_XPV1RR6dAJ.XDYy6Mp47ig3E0-Eo8TGeFmgWAbvU.dyPn.BRBvJU3MrACeaYpU9N,
                    https://click.sweatco.in/CL0/https:%2F%2Fmoe_65aa.api-02.moengage.com%2Fv1%2Femailclick%3Fq=zy7rv36jv8ibWnpnCR8Q4XZQ92rO8ItZtStdzV6EbxIwio.AUdv.wg-EDP4RokaytqBzufhLNh05UXmjdHjM3sZ1HyZzVxY6icaH_PYNbStIO1s3mu3xYQ2DFJM14VUMElSutZivWd4DBkKSCfODJnFh6X3.vwXBWsTjHR0L07BmZSf7zQcSv9q53tijz2vvmaT2xXwcTFDGh6ZTH1dHr9_xxk8Z9KLB4Fv2v_DhYG1L5I-xmXeAGfm7zM.GnbFeE9gXUQmRn9Apn1gmvQoduPnSuRnX2OYs1_CNEcfZfBz78Oj8Kak,
                    https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/instagram@2x.png,
                    https://click.sweatco.in/CL0/https:%2F%2Fmoe_65aa.api-02.moengage.com%2Fv1%2Femailclick%3Fq=CFaBOqiwdQj.uJQotIBQ9xxJsCz0xqKYZEyWUJxK6A_pub8lYZw0EA-7kyELn9xPuhrvhTUgqmubgudOxVQq5rism82_KsByZUhWVRMcGQoLozbbnVnM1WECpUF13fQPsPhSWL0vBS3w9sZ8zpttsuAF_2fyTCgizaQ4VNEbz537SY3qnDTI41mtp_u8lh5c6TX3rQFmJRK3H1GWsIIs6a5N75SfQtSOV__xa14FcMDPC8-xmXeAGfm7zM.GnbFeE9gXUQmRn9Apn1gmvQoduPnSuRnX2OYs1_CNEcfZfBz78Oj8KakLyXK3Q-EhDIvo1j,
                    https://d314e77m1bz5zy.cloudfront.net/bee/Images/bmsx/nyucxrz2/t0z/0rw/mxf/redditicon.png,
                    https://d314e77m1bz5zy.cloudfront.net/bee/Images/bmsx/nyucxrz2/szf/8o2/g8g/gradientbg1.jpg,
                ]
                Domains: [
                    td.pad,
                    click.sweatco.in,
                    d314e77m1bz5zy.cloudfront.net,
                    sweatco.in,
                    gradientbg1.jpg,
                    app-rsrc.getbee.io,
                ]
                SPF: pass
                DMARC: pass
                DKIM: pass
        """,
        "verdict": "graymail",
        "type": "points_reminder",
        "brand": "sweatcoin",
        "indicators": ["points_reminder, spf_pass, dkim_pass, dmarc_pass"]
    },
    {
        "id": "4",
        "text": """
                From: service@stayfriends.de
                Subject: Sie wurden ausgewhält!
                Body: empty
                URLs: http://easilett.com/cl/567_md/2010/1/64/23/2459859
                Domains: easilett.com
                SPF: pass
                DMARC: fail
                DKIM: no signature
        """,
        "verdict": "malicious",
        "type": "redirect_attack",
        "brand": "unknown",
        "indicators": ["suspicious_url", "dkim_signature_fail", "empty_body"]
    }
]
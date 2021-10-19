const axios = require('axios').default;

const corpId = 'ww034456aeba339b24';
const corpSecret = 'fSIi-qy-zHBYIRI979pVwZiMyQj5nx7miJml57vokGk';

const accessTokenUrl = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpId}&corpsecret=${corpSecret}`;

const getFileList = async (accessToken) => {
    const url = `https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_list?access_token=${accessToken}`;
    const res = await axios.post(url);
    console.log(res)
}

const getAccessToken = async (accessTokenUrl) => {
    const res = await axios.get(accessTokenUrl);
    return res.data.access_token;
}

const main = () => {
    const accessToken = getAccessToken(accessTokenUrl);
    getFileList(accessToken);
}

main();
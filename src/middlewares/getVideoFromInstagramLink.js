const axios = require('axios');

async function getVideoFromInstagramLink(req, _, next) {
    const { url: instagramLink } = req.body
    
    const igLink = 'https://www.instagram.com/graphql/query/?';
    const queryHash = process.env.QUERY_HASH
    const igShortCode = instagramLink.split('/')[4]

    const url = encodeURI(`${igLink}query_hash=${queryHash}&variables={"shortcode": "${igShortCode}"}`)

    const { data: { data: { shortcode_media: res } } } = await axios.get(url)

    const videoInfo = {
        has_audio: res.has_audio,
        owner: {
            full_name: res.owner.full_name,
            profile_pic_url: res.owner.profile_pic_url,
            username: res.owner.username,
        },
        thumbnail: res.thumbnail_src,
        url: res.video_url
    }

    req.videoInfo = videoInfo
    next();
}

module.exports = getVideoFromInstagramLink;
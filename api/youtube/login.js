export default (req, res) => {
    const params = {
        client_id:youtube_client_id,
        redirect_uri:youtube_redirect_uri,
        response_type:"code",
        scope:"https://www.googleapis.com/auth/youtube.force-ssl"//TODO change scope to use incremental auth
        //https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps#incrementalAuth
    };
    res.redirect("https://accounts.google.com/o/oauth2/v2/auth?"+new URLSearchParams(params).toString());
}
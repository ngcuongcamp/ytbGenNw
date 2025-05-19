const ytFrame = document.getElementById("yt_frame");
const searchField = document.getElementById("search_field");
const searchButton = document.getElementById("search_button");
const defaultButton = document.getElementById("default_button");
const saveDfButton = document.getElementById("save_df");
const embedUrl = "https://www.youtube-nocookie.com/embed/"
const ytb_default_url = "https://www.youtube.com/watch?v="


let videoID = "PaQX0pktLnw"
let defaultVideoID = "PaQX0pktLnw"
const handle_init = () => {

    const paramsRedirect = new URLSearchParams(window.location.search);
    const videoIdRedirect = paramsRedirect.get('videoId');
    let videoID = null;
    let idDefault = null;

    if (videoIdRedirect) {
        videoID = videoIdRedirect;
        localStorage.setItem('ngcuongzth_ytb', videoIdRedirect);
    } else {
        const { videoID: localVideoID, idDefault: localIdDefault } = init_localStorage();
        videoID = localVideoID;
        idDefault = localIdDefault;
    }


    if (videoID) {
        const videoUrl = `${embedUrl}` + `${videoID}` + "?controls=1&autoplay=1&loop=1"
        ytFrame.src = videoUrl;
    }

    const WindowWidth = document.documentElement.clientWidth;
    const WindowHeight = document.documentElement.clientHeight - 30 - 20;

    ytFrame.style.width = `${WindowWidth}px`;
    ytFrame.style.height = `${WindowHeight}px`;


    if (!videoIdRedirect && idDefault) {
        defaultVideoID = idDefault;
    }

    if (searchField) {
        searchField.value = `${ytb_default_url}${videoID}`;
    }
};

const handle_resize = () => {
    const WindowWidth = document.documentElement.clientWidth;
    const WindowHeight = document.documentElement.clientHeight - 30 - 20;

    ytFrame.style.width = `${WindowWidth}px`;
    ytFrame.style.height = `${WindowHeight}px`;
}
const init_localStorage = () => {
    let local_variable = window.localStorage.getItem('ngcuongzth_ytb');
    local_variable ? localStorage.setItem('ngcuongzth_ytb', local_variable) : localStorage.setItem('ngcuongzth_ytb', videoID);
    videoID = localStorage.getItem('ngcuongzth_ytb');


    let idDefault = window.localStorage.getItem('ngcuongzth_ytb_df_id');
    idDefault ? localStorage.setItem('ngcuongzth_ytb_df_id', idDefault) : localStorage.setItem('ngcuongzth_ytb_df_id', videoID);
    return { videoID, idDefault }
}


const handle_save_df = () => {
    const vdId = window.localStorage.getItem('ngcuongzth_ytb')
    localStorage.setItem('ngcuongzth_ytb_df_id', vdId)
    console.log('set to default ')
}



const handle_get_id_video = () => {
    const searchValue = searchField.value;
    let videoId = "";

    if (searchValue.includes("genyt")) {
        videoId = searchValue.split("/").pop()
        console.log('videoId: ', videoId)
    }
    else if (searchValue.includes("www.youtube.com") && !searchValue.includes("watch")) {
        // https://www.youtube.com/watch?v=VPvVD8t02U8
        videoId = searchValue.split("?v=")[1];
    }
    else if (searchValue.includes("www.youtube.com/watch?")) {
        videoId = searchValue.split("v=")[1].split("&")[0];

    }
    else if (searchValue.includes("m.youtube.com")) {
        const parts = searchValue.split("&");
        const vParam = parts.find(part => part.includes("v="));
        videoId = vParam.split("v=")[1];
    }

    else if (searchValue.includes("//youtu.be/")) {
        videoId = searchValue.split("youtu.be/")[1].split("?")[0];
    }

    else {
        alert("Wrong url format!");
        return;
    }


    if (videoId === undefined) {
        alert("Not found or link is incorrect!");
    }
    else {
        window.localStorage.setItem('ngcuongzth_ytb', videoId);
        const newUrl = embedUrl + videoId + "?controls=1&autoplay=1&loop=1";
        ytFrame.src = newUrl;
        handle_resize();
    }


}

const handle_set_default = () => {
    const urlBase = 'https://www.youtube.com/watch?v='
    const url_default = urlBase + defaultVideoID
    console.log(url_default);
    searchField.value = url_default;
    searchButton.click();
}


window.addEventListener("DOMContentLoaded", handle_init);
window.addEventListener("resize", handle_resize);
searchButton.addEventListener("click", handle_get_id_video)
defaultButton.addEventListener("click", handle_set_default)
saveDfButton.addEventListener("click", handle_save_df)


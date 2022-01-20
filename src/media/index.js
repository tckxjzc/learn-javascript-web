function getVideo() {
    return fetch('./test2.mp4',
        {
            // headers: {'Range': 'bytes=0-' + (3 * 1024 * 1024)}
        }
    ).then(res => res.arrayBuffer())
}
let tmpdata;
// const tmp =getVideo();
// var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
// var mimeCodec = 'video/mp4; codecs="avc1.640020, mp4a.40.5"';
var mimeCodec = 'video/mp4; codecs="avc1.42C00D, mp4a.40.2"';
const video = document.querySelector('video');

async function sourceOpen() {
    console.log('sourceOpen--');
    var mediaSource = this;
    let sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    // let data = await getVideo();
    let data = tmpdata;
    console.log(data);
    console.log('mediaSource.readyState');
    console.log(mediaSource.readyState);
    sourceBuffer.addEventListener('error', (e) => {
        console.log(e.target.buffered)
    })
    sourceBuffer.addEventListener('updateend', function (_) {
        console.log('updateend---');
        console.log(mediaSource.readyState);
        console.log(mediaSource);
        mediaSource.endOfStream();
        video.play();
        //console.log(mediaSource.readyState); // ended
    });
    sourceBuffer.appendBuffer(data);
    console.log('sourceBuffer')
    console.log(sourceBuffer)
}

function init() {

    var mediaSource = new MediaSource();

    console.log(mimeCodec);
    console.log(MediaSource.isTypeSupported(mimeCodec));
    video.src = URL.createObjectURL(mediaSource);
    console.log(video);
    mediaSource.addEventListener('sourceopen', sourceOpen);
    mediaSource.addEventListener('sourceended', (e)=>{
        console.log('sourceended');
        console.log(e);
    });
}

// init();
getVideo().then((data)=>{
    tmpdata=data;
    init();
})
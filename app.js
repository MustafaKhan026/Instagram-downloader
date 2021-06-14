const _ = e => document.querySelector(e)

const render = _('.result')

// create video
// rendering video in the browser
const createVideo = data =>{
    let video = document.createElement('video')
    video.id = 'instaVideo'
    // data is the data of the video which we will get by fetch()
    video.src = data.content
    video.controls = true
    video.autoplay = true

    // create Info 

    let info = document.createElement('p')
    info.textContent = 'Click on right button on video and select save as.'

    render.innerHTML = ''
    render.appendChild(video)
    render.appendChild(info)
}

// create image
// rendering image in the browser
const createImage = data =>{
    // create image
    let img = document.createElement('img')
    img.id = 'instaImg'
    img.src = data.content

    // create info
    let info = document.createElement('p')
    info.textContent = 'Click on right button on image and select save as.'

    render.innerHTML = ''
    render.appendChild(img)
    render.appendChild(info)
}


// extract html

const getMedia = () =>{
    render.innerHTML = '<div class="image-placeholder"></div>'
    // get input value
    let url = _('input').value

    if(url){
        // api call
        fetch(url)
        .then(response => response.text())
        .then(response =>{
            // render html
            render.innerHTML = response
            // wait, find meta and create video or image
            let wait = setTimeout(()=>{
                let video = _('meta[property="og:video"]')
                if(video){
                    createVideo(video)
                }else{
                    let img = _('meta[property="og:image"]')
                    if(img){
                        createImage(img)
                    }else{
                        document.body.innerHTML = body
                        alert('error extracting')
                    }
                }
                clearTimeout(wait)
            },2000)
        })
    }else{
        _('input').setAttribute('placeholder','invlidAddress link')
    }
}





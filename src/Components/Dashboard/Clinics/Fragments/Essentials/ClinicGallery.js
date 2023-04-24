import React, {useEffect, useState} from 'react'

function ClinicGallery({formRef}) {
    const [images, setImages] = useState([]);

    const handleDeleteClick = (e, key) => {
        e.preventDefault();
        setImages((prevState)=>{
            delete prevState[key]
            return Object.values(prevState);
        })


    }
    useEffect(() => {
        formRef?.current?.setFieldsValue({
            gallery: images.map(e=>e.file)
        })
    }, [images])
    const preview = (file, type) => {
        const fr = new FileReader();
        fr.onload = () => {
            setImages((prevState) => ([
                ...prevState,
                {
                    file: file,
                    src: fr.result
                }
            ]))


        };
        fr.readAsDataURL(file);
    }
    const handleFileUploaded = (e, type) => {
        [...e.target.files].forEach((e) => preview(e, type))


    }
    return (<div className={'clinic-gallery'}>
        <h1>Photos</h1>
        <div className={'images-cnt'}>
            <input type={'file'} id='gallery' onChange={handleFileUploaded}/>
            <label htmlFor="gallery">
                <div className={'upload-btn'}>

                </div>
            </label>
            {images.map((e,key)=>  <div style={{width: '120px', height: '80px', backgroundImage: "url('" + e.src + "')"}}
                                        className={'im-bg'}>  {e.src ? <div className={'delete-button'} onClick={(e)=>handleDeleteClick(e,key)}></div> : null}</div>)}

        </div>

    </div>)


}

export default ClinicGallery
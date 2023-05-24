import React, {useEffect, useState} from 'react'
import upload_photos_icon from "../../../../../dist/icons/upload_photos_icon.png";
import delete_icon from "../../../../../dist/icons/delete_icon.png";

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

        <div className={'images-cnt'}>

            <input type={'file'} id='gallery' onChange={handleFileUploaded}/>
            <label htmlFor="gallery">
                <div className={'upload-btn'}>
                    <img alt={'upload_photos_icon'} src={upload_photos_icon}/>
                </div>
            </label>
            {images.map((e,key)=>  <div style={{width: '274px', height: '240px', backgroundImage: "url('" + e.src + "')"}}
                                        className={'im-bg'}>  {e.src ? <div className={'delete-button'} onClick={(e)=>handleDeleteClick(e,key)}><img alt={'delete_icon'} src={delete_icon}/></div> : null}</div>)}

        </div>

    </div>)


}

export default ClinicGallery
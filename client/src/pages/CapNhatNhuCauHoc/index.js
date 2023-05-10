import React, { useState } from 'react';
import axios from 'axios';
function CapNhatNhuCauHoc() {
    const [file, setFile] = useState();
    const [src, setSrc] = useState('');

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append('image', file);
        console.log(formData);
        try {
            await axios.post('http://localhost:3000/v1/api/users/upload/11', formData).then((res) => {
                setSrc(res.data.src);
            });
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <div className="files">
            <input type="file" onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
            <img src={src} alt="" />
        </div>
    );
}

export default CapNhatNhuCauHoc;

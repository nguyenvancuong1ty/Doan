import React from 'react';

function Upload() {
    const handleDrop = (event) => {
        event.preventDefault();
        const formData = new FormData();
        const files = event.dataTransfer.files;
        formData.append('image', files);
        console.log(formData);
    };

    return (
        <>
            <h2>Upload</h2>
            <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className={`file-uploader dragging`}>
                <p>Drag and drop files image</p>
            </div>
        </>
    );
}

export default Upload;

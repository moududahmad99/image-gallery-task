import React, { useState } from 'react';
import './App.css';

import { RiGalleryLine } from 'react-icons/ri'

function App() {

  const [GalleryDragImages, setGalleryDragImages] = useState([

    { id: 8, selected: false },
    { id: 9, selected: false },
    { id: 4, selected: false },
    { id: 3, selected: false },
    { id: 1, selected: false },
    { id: 5, selected: false },
    { id: 2, selected: false },
    { id: 11, selected: false },
    { id: 7, selected: false },
    { id: 6, selected: false },
    { id: 10, selected: false }

  ]);

  // Start Dragging
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  }

  // Drag Over Image
  const handleDragOver = (e) => {
    e.preventDefault();
  }

  // handle Dropping an Image
  const handleDropImgesImges = (e, targetId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');

    if (id !== targetId) {
      setGalleryDragImages((prevImages) => {
        const updatedImages = [...prevImages];
        const sourceIndex = updatedImages.findIndex((img) => img.id === parseInt(id, 10));
        const targetIndex = updatedImages.findIndex((img) => img.id === parseInt(targetId, 10));

        if (sourceIndex !== -1 && targetIndex !== -1) {
          [updatedImages[sourceIndex], updatedImages[targetIndex]] = [updatedImages[targetIndex], updatedImages[sourceIndex]];
        }

        return updatedImages;
      });
    }
  }

  // handling Selecting and Unselecting Images
  const handleImageSelect = (id) => {
    setGalleryDragImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id === id) {
          return { ...image, selected: !image.selected };
        }
        return image;
      });
    });
  }

  // Remove Selected Images
  const deleteSelectedImages = () => {
    const updatedImages = GalleryDragImages.filter((image) => !image.selected);
    setGalleryDragImages(updatedImages);
  }

  // Counting the number of selected Image
  const countSelectedImages = () => {
    return GalleryDragImages.filter((image) => image.selected).length;
  }


  return (
    <div className="App bg-[#F5F7F8] py-10">
      <div className="container mx-auto">

        <div className="imageGalleryWrapper p-8 bg-[#FFFFFF]">

          {/* Navbar Area Start */}
          <div className='navbar mx-2 flex items-center justify-between py-2'>
            {countSelectedImages() === 0 ? (
              <h2 className='font-semibold text-4xl'>Gallery</h2>
            ) : (
              <>
                <p className='text-lg font-medium'>{countSelectedImages()} Files Selected</p>
                <button onClick={deleteSelectedImages} className='text-lg font-medium'>
                  Delete Images
                </button>
              </>
            )}
          </div>
          {/* Navbar Area End */}


          {/* Image Gallery Area Start */}
          <div className='image-gellary'>
            {GalleryDragImages.map((image, index) => (
              <div
                key={image.id}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDropImgesImges(e, image.id)}
              >
                <div
                  className={`draggable-image border ${index === 0 ? 'first-image' : ''} ${image.selected ? 'selected-image' : ''} cursor-pointer transition-opacity duration-300`}
                  id={image.id}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, image.id)}
                >
                  <img src={`/assets/image-${image.id}.webp`} alt="" />
                  <div className="hoverTransition opacity-0 transition-opacity hover:opacity-100 duration-300"></div>
                  <input
                    type="checkbox"
                    checked={image.selected}
                    onChange={() => handleImageSelect(image.id)}
                  />
                </div>

              </div>
            ))}
          </div>
          {/* Image Gallery Area End */}


          {/* Add Image Button Area Start */}
          <div className="add-image-button">
            <button className='mt-4'>
              <RiGalleryLine size={30} />
              <p>Add Image</p>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
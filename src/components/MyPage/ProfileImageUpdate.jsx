// Based on the example on https://www.npmjs.com/package/react-easy-crop
// https://codesandbox.io/s/y09komm059
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';

import useInput from '../../utils/useInput';

import { currentUserInfoState } from '../../state/atom';

import { getCroppedImg } from './canvasUtils';

const ProfileImageUpdate = () => {
  // const [currentUserInfo, setCurrentUserInfo] =
  //   useRecoilState(currentUserInfoState);

  const currentUserInfo = useRecoilState(currentUserInfoState)[0];
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useInput(1.0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(currentUserInfo.image);
  const [imageTitle, setImageTitle] = useState(null);

  // 파일 업로드 창 숨기기 위함
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);
  const onCropComplete = useCallback((croppedArea, onCroppedAreaPixels) => {
    setCroppedAreaPixels(onCroppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const [toSave, blobURL] = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
      );
      // console.log('donee', { blobURL });
      setCroppedImage(blobURL);
      const croppedImageFile = await fetch(toSave)
        .then((r) => r.blob())
        .then(
          (blobFile) => new File([blobFile], imageTitle, { type: 'image/png' }),
        );

      console.log(croppedImageFile);

      // dispatch({
      //   type: SET_CURRENT_IMAGE,
      //   data: croppedImageFile,
      // });
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, imageTitle]);

  const resetCroppedImage = useCallback(() => {
    setCroppedImage(null);
    // dispatch({
    //   type: SET_CURRENT_IMAGE,
    //   data: null,
    // });
  }, []);

  // useEffect(() =>{
  //     setCroppedImage(currentCat.photo);
  //     dispatch({
  //         type: SET_CURRENT_IMAGE,
  //         data: currentCat.photo,
  //     });
  // }, []);
  const readFile = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageTitle(file.name);
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const headerStyle = useMemo(
    () => ({ fontWeight: 'bold', paddingTop: '30px', lineHeight: '1.5' }),
    [],
  );

  return (
    <>
      <h2 style={headerStyle}>
        고양님에 대해
        <br />
        수정할까요?
      </h2>
      <div>
        {!croppedImage ? (
          <div>
            <CropperContainer>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </CropperContainer>
            <InnerGlobal>
              <SliderContainer>
                {/* <label htmlFor="zoom">ZOOM </label>    */}
                <input
                  type="range"
                  name="zoom"
                  value={zoom}
                  min="1.0"
                  max="3.0"
                  step="0.1"
                  aria-labelledby="Zoom"
                  onChange={setZoom}
                />
              </SliderContainer>
              <input
                hidden
                ref={imageInput}
                type="file"
                name="cat-image"
                onChange={onFileChange}
                accept="image/*"
              />
              <CenterWrapper>
                <ImageUploadButtons onClick={onClickImageUpload}>
                  upload
                </ImageUploadButtons>
                <ImageUploadButtons onClick={showCroppedImage}>
                  check
                </ImageUploadButtons>
              </CenterWrapper>
            </InnerGlobal>
          </div>
        ) : (
          <div>
            <div
              style={{
                borderRadius: '10px',
                width: '200px',
                height: '200px',
                backgroundSize: 'cover',
                backgroundImage: `url(${croppedImage})`,
                margin: '0 auto',
                marginTop: '1rem',
              }}
            />
            <InnerGlobal>
              <ImageUploadButtons onClick={resetCroppedImage}>
                undo
              </ImageUploadButtons>
            </InnerGlobal>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileImageUpdate;
const InnerGlobal = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: space-between;
`;

const ImageUploadButtons = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.orange};
  border: none;
  cursor: pointer;
  color: white;
  margin-top: 0.5rem;
  & + & {
    margin-left: 0.5rem;
  }
  &:hover,
  &:focus {
    background: darkred;
  }
`;

const CenterWrapper = styled.div`
  width: 50%;
  display: flex;
  position: relative;
  justify-content: center;
`;

const CropperContainer = styled.div`
  margin-top: 1rem;
  height: 200px;
  position: relative;
`;

const SliderContainer = styled.div`
  input[type='range'] {
    max-width: 50%;
    padding: 1rem;
    margin: 0.5rem;
  }
`;

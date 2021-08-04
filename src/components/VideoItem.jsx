import React, { useRef, useEffect } from 'react';
import { objectOf } from 'prop-types';

const VideoItem = ({ stream }) => {
  const viewRef = useRef();

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = stream || null;
  }, [stream]);

  console.log(stream);
  return <video ref={viewRef} muted autoPlay controls />;
};
VideoItem.propTypes = {
  stream: objectOf(MediaStream),
};

VideoItem.defaultProps = {
  stream: null,
};

export default VideoItem;

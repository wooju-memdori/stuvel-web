import React, { useRef, useEffect } from 'react';
import { objectOf } from 'prop-types';

const VideoItem = ({ stream, key }) => {
  const viewRef = useRef();

  useEffect(() => {
    console.log(stream);

    if (!viewRef.current) return;
    viewRef.current.srcObject = stream || null;
  }, [stream]);

  return <video key={key} ref={viewRef} muted autoPlay controls />;
};

VideoItem.propTypes = {
  stream: objectOf(MediaStream),
};

VideoItem.defaultProps = {
  stream: null,
};

export default VideoItem;

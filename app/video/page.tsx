import React from 'react';

type LivestreamProps = {
	width?: number;
	height?: number;
	autoPlay?: boolean;
	mute?: boolean;
};

const Livestream: React.FC<LivestreamProps> = ({
	width = 3824,
	height = 2160,
	autoPlay = true,
	mute = true,
}) => {
	const src = `https://livestream.com/accounts/89344/events/8528180/player?width=${width}&height=${height}&enableInfoAndActivity=true&defaultDrawer=feed&autoPlay=${autoPlay}&mute=${mute}`;

	return (
		<iframe
			id="ls_embed_1700317585"
			src={src}
			width={width}
			height={height}
			frameBorder="0"
			scrolling="no"
			allowFullScreen
		></iframe>
	);
};

export default Livestream;
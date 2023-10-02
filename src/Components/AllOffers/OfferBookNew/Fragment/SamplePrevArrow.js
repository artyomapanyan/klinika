function SamplePrevArrow(props) {
	const {
		className,
		style,
		onClick,
		width,
		height,
		background,
		left,
		right,
		top,
		bottom,
		borderRadius,
		paddingRight
	} = props
	return (
		<div
			className={className}
			style={{
				...style,
				height: height,
				width: width,
				backgroundColor: background,
				position: 'absolute',
				top: top,
				left: left,
				right: right,
				bottom: bottom,
				borderRadius: borderRadius,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				paddingRight: paddingRight
			}}
			onClick={onClick}
		/>
	)
}

export default SamplePrevArrow

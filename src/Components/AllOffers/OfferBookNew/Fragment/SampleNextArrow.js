function SampleNextArrow(props) {
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
				display: 'absolute',
				height: height,
				width: width,
				backgroundColor: background,
				top: top,
				left: left,
				right: right,
				bottom: bottom,
				borderRadius: borderRadius,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: paddingRight,
				marginLeft: '30px',
				color:'white',
				fontFamily:'monospace'
			}}
			onClick={onClick}
		/>
	)
}

export default SampleNextArrow

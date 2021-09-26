import { VictoryThemeDefinition } from "victory";

const assign = Object.assign;

export const colors = ["8321A3", "1EB392", "e34f2d", "12694d", "51e1b4"].map(
	(v) => `#${v}`
);
export const greys = ["#000000", "#454545", "#cccccc", "#eeeeee"];

// Colors

export const colorsForScale = [colors[3], colors[4]];

// HACK names from original victory theme
const blueGrey300 = greys[2];
const blueGrey700 = greys[1];

// Typography
export const sansSerif = "'Roboto', sans-serif";
const letterSpacing = "normal";
export const fontSize = 20;
export const chartTitleSize = 30;
export const questionSize = 45;

export const chartBasePadding = 20;
const axisLabelExtra = 15;
export const chartTitleY = chartTitleSize / 2 + chartBasePadding;
export const defaultChartPadding = {
	top: chartTitleY + chartTitleSize / 2 + chartBasePadding,
	right: chartBasePadding,
	bottom: fontSize + axisLabelExtra + chartBasePadding,
	left: chartBasePadding,
};
export const chartTopPaddingNoTitle = chartBasePadding;
export const chartBottomPaddingNoAxis = chartBasePadding;
export const chartLeftPaddingMeasuredExtra = axisLabelExtra + chartBasePadding;

export const dotsBackgroundStyle = { fill: "url(#dots)", fillOpacity: 0.2 };
export const dotsBackgroundDefs = (
	<>
		<defs>
			<pattern
				id="dots"
				x="0"
				y="0"
				width="20"
				height="20"
				patternUnits="userSpaceOnUse"
			>
				<circle fill="black" cx="10" cy="10" r="1.5"></circle>
			</pattern>
		</defs>
	</>
);

// Layout
const padding = 8;
const baseProps = {
	width: 350,
	height: 350,
	padding: defaultChartPadding,
};

// * Labels
const baseLabelStyles = {
	fontFamily: sansSerif,
	fontSize,
	letterSpacing,
	padding,
	fill: blueGrey700,
	stroke: "transparent",
	strokeWidth: 0,
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);

// Strokes
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Put it all together...
export const customTheme: VictoryThemeDefinition = {
	area: assign(
		{
			style: {
				data: {
					fill: greys[2],
				},
				labels: baseLabelStyles,
			},
		},
		baseProps
	),
	axis: assign(
		{
			style: {
				axis: {
					fill: "transparent",
					stroke: blueGrey300,
					strokeWidth: 2,
					strokeLinecap,
					strokeLinejoin,
				},
				axisLabel: assign({}, centeredLabelStyles, {
					padding,
					stroke: "transparent",
				}),
				grid: {
					fill: "none",
					stroke: "none",
				},
				ticks: {
					fill: "transparent",
					size: 5,
					stroke: blueGrey300,
					strokeWidth: 2,
					strokeLinecap,
					strokeLinejoin,
				},
				tickLabels: assign({}, baseLabelStyles, {
					fill: blueGrey700,
				}),
			},
		},
		baseProps
	),
	polarDependentAxis: assign({
		style: {
			ticks: {
				fill: "transparent",
				size: 1,
				stroke: "transparent",
			},
		},
	}),
	bar: assign(
		{
			style: {
				data: {
					fill: colors[1],
					padding,
					strokeWidth: 0,
				},
				labels: baseLabelStyles,
			},
		},
		baseProps
	),
	boxplot: assign(
		{
			style: {
				max: { padding, stroke: blueGrey700, strokeWidth: 1 },
				maxLabels: assign({}, baseLabelStyles, { padding: 3 }),
				median: { padding, stroke: blueGrey700, strokeWidth: 1 },
				medianLabels: assign({}, baseLabelStyles, { padding: 3 }),
				min: { padding, stroke: blueGrey700, strokeWidth: 1 },
				minLabels: assign({}, baseLabelStyles, { padding: 3 }),
				q1: { padding, fill: blueGrey700 },
				q1Labels: assign({}, baseLabelStyles, { padding: 3 }),
				q3: { padding, fill: blueGrey700 },
				q3Labels: assign({}, baseLabelStyles, { padding: 3 }),
			},
			boxWidth: 20,
		},
		baseProps
	),
	candlestick: assign(
		{
			style: {
				data: {
					stroke: blueGrey700,
				},
				labels: assign({}, baseLabelStyles, { padding: 5 }),
			},
			candleColors: {
				positive: "#ffffff",
				negative: blueGrey700,
			},
		},
		baseProps
	),
	chart: baseProps,
	errorbar: assign(
		{
			borderWidth: 8,
			style: {
				data: {
					fill: "transparent",
					opacity: 1,
					stroke: blueGrey700,
					strokeWidth: 2,
				},
				labels: baseLabelStyles,
			},
		},
		baseProps
	),
	group: assign(
		{
			colorScale: colorsForScale,
		},
		baseProps
	),
	histogram: assign(
		{
			style: {
				data: {
					fill: colorsForScale[0],
				},
				labels: baseLabelStyles,
			},
		},
		baseProps
	),
	legend: {
		colorScale: colorsForScale,
		gutter: 10,
		orientation: "vertical",
		titleOrientation: "top",
		style: {
			data: {
				type: "circle",
			},
			labels: baseLabelStyles,
			title: assign({}, baseLabelStyles, { padding: 5 }),
		},
	},
	line: assign(
		{
			style: {
				data: {
					fill: "transparent",
					opacity: 1,
					stroke: colors[1],
					strokeWidth: 5,
				},
				labels: baseLabelStyles,
			},
		},
		baseProps
	),
	pie: assign(
		{
			colorScale: colorsForScale,
			style: {
				data: {
					padding,
				},
				labels: assign({}, baseLabelStyles, { padding: 20 }),
			},
		},
		baseProps
	),
	scatter: assign(
		{
			style: {
				data: {
					fill: blueGrey700,
					opacity: 1,
					stroke: "transparent",
					strokeWidth: 0,
				},
				labels: baseLabelStyles,
			},
		},
		baseProps
	),
	stack: assign(
		{
			colorScale: colorsForScale,
		},
		baseProps
	),
	tooltip: {
		style: assign({}, baseLabelStyles, { padding: 0, pointerEvents: "none" }),
		flyoutStyle: {
			fill: "#f0f0f0",
			pointerEvents: "none",
		},
		flyoutPadding: 5,
		cornerRadius: 5,
		pointerLength: 10,
	},
};

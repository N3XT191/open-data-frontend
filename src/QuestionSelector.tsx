import { Question } from "./Interfaces";
import Autosuggest from "react-autosuggest";
import Fuse from "fuse.js";

import { useState } from "react";

const fuseOptions = {
	// isCaseSensitive: false,
	// includeScore: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	threshold: 0.6,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	keys: ["text"],
};

const theme = {
	container: { width: "500px" },
	input: {
		width: "458px",
		height: 30,
		padding: "10px 20px",
		fontFamily: "Helvetica, sans-serif",
		fontWeight: 300,
		fontSize: 16,
		border: "1px solid black",
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: "none",
	},
	suggestion: {
		cursor: "pointer",
		padding: "10px 20px",
		marginTop: 10,
		border: "1px solid black",
		borderRadius: 10,
	},
	suggestionHighlighted: {
		backgroundColor: "orange",
	},
};

interface Props {
	questions: Question[];
	onSelect: (id: number | undefined) => void;
}
const QuestionSelector: React.FC<Props> = ({ questions, onSelect }) => {
	const [searchValue, setSearchValue] = useState("");
	const [suggestions, setSuggestions] = useState<Question[]>([]);

	const fuse = new Fuse(questions, fuseOptions);

	const onChange = (event: any, { newValue }: { newValue: string }) => {
		setSearchValue(newValue);
	};

	const getSuggestions = (value: string) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0
			? questions
			: fuse.search(value).map((v) => v.item);
	};

	const getSuggestionValue = (question: Question) => question.text;

	const renderQuestion = (question: Question) => <div>{question.text}</div>;

	const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
		setSuggestions(getSuggestions(value));
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	const onSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const onSuggestionSelected = (
		event: any,
		{ suggestion }: { suggestion: any }
	) => {
		onSelect(suggestion.id);
	};

	const inputProps = {
		placeholder: "Ask your question...",
		value: searchValue,
		onChange: onChange,
	};
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				marginTop: 300,
			}}
		>
			<div style={{ width: "500px", position: "relative" }}>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={onSuggestionsFetchRequested}
					onSuggestionsClearRequested={onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderQuestion}
					inputProps={inputProps}
					onSuggestionSelected={onSuggestionSelected}
					theme={theme}
					highlightFirstSuggestion={true}
					alwaysRenderSuggestions={true}
				/>
				<button
					style={{
						position: "absolute",
						top: 10,
						right: 20,
						height: 30,
						width: 30,
					}}
					onClick={() => {
						setSearchValue("");
						setSuggestions([]);
						onSelect(undefined);
					}}
				>
					x
				</button>
			</div>
		</div>
	);
};
export default QuestionSelector;

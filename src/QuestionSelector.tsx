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
	input: {
		width: 400,
		height: 30,
		padding: "10px 20px",
		fontFamily: "Helvetica, sans-serif",
		fontWeight: 300,
		fontSize: 16,
		border: "1px solid #aaa",
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
	},

	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: "none",
		border: "1px solid black",
	},
	suggestion: {
		cursor: "pointer",
		padding: "10px 20px",
		border: "1px solid red",
	},
	suggestionHighlighted: {
		backgroundColor: "#ddd",
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
		placeholder: "Type a programming language",
		value: searchValue,
		onChange: onChange,
	};
	return (
		<div style={{ width: "400px", display: "flex" }}>
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={onSuggestionsFetchRequested}
				onSuggestionsClearRequested={onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderQuestion}
				inputProps={inputProps}
				onSuggestionSelected={onSuggestionSelected}
				theme={theme}
			/>
			<button
				onClick={() => {
					setSearchValue("");
					setSuggestions([]);
					onSelect(undefined);
				}}
			>
				clear
			</button>
		</div>
	);
};
export default QuestionSelector;

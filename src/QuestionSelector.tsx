import { css } from "@emotion/css";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { getSearchResults } from "./api";
import { Question } from "./Interfaces";

const styles = {
	wrapper: css`
		max-width: 800px;
		margin: 0 auto;
		margin-top: 300px;
	`,
	questionInput: css`
		border: none;
		padding: 0 10px;
		margin: 0;
		margin-bottom: 30px;
		width: 240px;
		background: none;
		font-size: 45px;
		font-weight: 500;
		width: 100%;
		box-sizing: border-box;
	`,
	suggestion: css`
		position: relative;
		font-size: 45px;
		width: 100%;
		padding: 5px 20px;
		box-sizing: border-box;
		background: #eeeeee;
	`,
	activeSuggestion: css`
		color: white;
		background: #743fca !important;
	`,
	enterHint: css`
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		left: calc(100% + 10px);
		height: 100%;
		background: #743fca;
		font-size: 20px;
		text-align: center;
		padding: 0 10px;
	`,
};

const maxSuggestions = 3;

interface Props {
	questions: Question[];
	onSelect: (id: number | undefined) => void;
}

interface SearchResult {
	id: number;
	rank: number;
}

const QuestionSelector: React.FC<Props> = ({ questions, onSelect }) => {
	const [searchValue, setSearchValue] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [searchResults, setSearchResults] = useState<SearchResult[]>();

	const hasSearchValue = !!searchValue.trim();

	useEffect(() => {
		if (!hasSearchValue) {
			setSearchResults([]);
		}

		let shouldIgnore = false;

		getSearchResults(searchValue)
			.then((res) => {
				if (!shouldIgnore) {
					setSearchResults(res);
				}
			})
			.catch((err) => console.error("search failed", err));

		return () => {
			shouldIgnore = true;
		};
	}, [hasSearchValue, searchValue]);

	const suggestions = useMemo(() => {
		if (!hasSearchValue) {
			// TODO random suggested questions go here
			return [];
		}
		if (hasSearchValue && !searchResults) {
			return [];
		}
		return (searchResults || [])
			.map((r) => ({ r, q: questions.find((q) => q.id === r.id) }))
			.filter(({ r, q }) => q)
			.map(({ r, q }) => ({ rank: r, item: q! }));
	}, [hasSearchValue, searchResults, questions]);

	useEffect(() => {
		setSelectedIndex(0);
	}, [suggestions]);

	useEffect(() => {
		const onKeyDown = (ev: KeyboardEvent) => {
			if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
				ev.preventDefault();
				ev.stopPropagation();
				const offset = ev.key === "ArrowUp" ? -1 : 1;
				setSelectedIndex((i) =>
					Math.max(
						0,
						Math.min(suggestions.length - 1, maxSuggestions - 1, i + offset)
					)
				);
			}
		};

		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	});

	return (
		<div className={styles.wrapper}>
			<form
				onSubmit={(ev) => {
					ev.preventDefault();
					if (suggestions.length) {
						const s = suggestions[selectedIndex];
						if (s) {
							onSelect(s.item.id);
						}
					}
				}}
			>
				<input
					className={styles.questionInput}
					placeholder="Type your question..."
					value={searchValue}
					onChange={(ev) => setSearchValue(ev.target.value)}
					autoFocus
				/>
			</form>
			{suggestions.map((s, i) => {
				const active = i === selectedIndex;
				return (
					<div
						key={s.item.id}
						className={[styles.suggestion, active && styles.activeSuggestion]
							.filter((v) => v)
							.join(" ")}
						onClick={() => onSelect(s.item.id)}
						onMouseEnter={() => setSelectedIndex(i)}
					>
						{s.item.text}
						{active && <div className={styles.enterHint}>Press enter</div>}
					</div>
				);
			})}
		</div>
	);
};
export default QuestionSelector;

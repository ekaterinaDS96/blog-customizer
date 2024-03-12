import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	function convertToStyles(newStyles: ArticleStateType) {
		return {
			'--font-family': newStyles.fontFamilyOption.value,
			'--font-size': newStyles.fontSizeOption.value,
			'--font-color': newStyles.fontColor.value,
			'--container-width': newStyles.contentWidth.value,
			'--bg-color': newStyles.backgroundColor.value,
		};
	}
	const [open, setOpen] = useState(false);
	const [state, setState] = useState(convertToStyles(defaultArticleState));

	function onClick() {
		setOpen(!open);
	}

	function applyNewStyles(newStyles: ArticleStateType) {
		setState(convertToStyles(newStyles));
	}

	return (
		<div
			className={clsx(styles.main)}
			style={state as CSSProperties}>
			<ArticleParamsForm isOpen={open} applyNewStyles={applyNewStyles} onClick={onClick} />
			<Article/>
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

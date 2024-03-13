import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import clsx from 'clsx';
import { useState } from 'react';

const defaultState = {
	fontFamilyOption: defaultArticleState.fontFamilyOption,
	fontColor: defaultArticleState.fontColor,
	backgroundColor: defaultArticleState.backgroundColor,
	contentWidth: defaultArticleState.contentWidth,
	fontSizeOption: defaultArticleState.fontSizeOption
};

type ArticleParamsFormProps = {
	isOpen: boolean;
	applyNewStyles: (newStyles: ArticleStateType) => void;
	onClick: () => void;
};

export const ArticleParamsForm = ({isOpen, applyNewStyles, onClick}: ArticleParamsFormProps) => {
	const [state, setState] = useState(defaultState);

	const articleStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		applyNewStyles(state);
	}

	function onReset(e:React.FormEvent) {
		e.preventDefault();
		setState(defaultState);
		applyNewStyles(defaultState);
	}

	function handleFontFamilyChange(selected: OptionType) {
		setState({ ...state, fontFamilyOption: selected });
	}

	function handleFontSizeChange(selected: OptionType) {
		setState({ ...state, fontSizeOption: selected });
	}

	function handleFontColorChange(selected: OptionType) {
		setState({ ...state, fontColor: selected });
	}

	function handleBackgroundColorChange(selected: OptionType) {
		setState({ ...state, backgroundColor: selected });
	}

	function handleContentWidthChange(selected: OptionType) {
		setState({ ...state, contentWidth: selected });
	}


	return (
		<>
			<ArrowButton onClick={onClick} isOpen={isOpen}/>
			<aside className={articleStyle}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text as='h2' size={31} weight={800} align='left' family='open-sans'>
						Задайте параметры
					</Text>
					<Select options={fontFamilyOptions} selected={state.fontFamilyOption}
						onChange={handleFontFamilyChange} title='Шрифт' />
					<RadioGroup name='radio' options={fontSizeOptions} selected={state.fontSizeOption}
						onChange={handleFontSizeChange} title='Размер шрифта' />
					<Select options={fontColors} selected={state.fontColor}
						onChange={handleFontColorChange} title='Цвет шрифта' />
					<Select options={backgroundColors} selected={state.backgroundColor}
						onChange={handleBackgroundColorChange} title='Цвет фона' />
					<Select options={contentWidthArr} selected={state.contentWidth}
						onChange={handleContentWidthChange} title='Ширина контента' />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

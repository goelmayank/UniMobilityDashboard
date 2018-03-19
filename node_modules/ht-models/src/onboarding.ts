export interface IOnBoardingStep {
  label: string;
  subSteps: IOnBoardingSubStep[];
  id?: string;
}

export interface IOnBoardingSubStep {
  label: string;
  leftPane: string;
  rightPane: IOnBoardingRightPane;
  showSignupBox?: boolean;
  id?: string;
}

export interface IOnBoardingRightPane {
  type: string;
  data: IOnBoardingCodeData | any;
  selectedOptionId?: string;
}

export interface IOnBoardingCodeData {
  fileURL: string;
  lines: IOnBoardingCodeLines[];
  fileName: string;
  fileContent?: string;
  language: string;
  optionId: string;
  optionLabel: string;
}

export interface IOnBoardingCodeLines {
  start: number;
  end: number;
}

export interface IOnBoardingSubStepCode {
  fileName: string;
  snippets: IOnBoardingCodeSnippet[];
  language: string;
}

export interface IOnBoardingCodeSnippet {
  type: string;
  content: string;
}

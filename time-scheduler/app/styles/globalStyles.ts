import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.primary};
    min-height: 100vh;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: ${theme.typography.lineHeight.tight};
    margin-bottom: ${theme.spacing[4]};
  }

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
  }

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  h4 {
    font-size: ${theme.typography.fontSize.xl};
  }

  h5 {
    font-size: ${theme.typography.fontSize.lg};
  }

  h6 {
    font-size: ${theme.typography.fontSize.base};
  }

  p {
    margin-bottom: ${theme.spacing[4]};
  }

  /* Links */
  a {
    color: ${theme.colors.primary[600]};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.primary[700]};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${theme.colors.primary[500]};
      outline-offset: 2px;
    }
  }

  /* Lists */
  ul, ol {
    margin-bottom: ${theme.spacing[4]};
    padding-left: ${theme.spacing[6]};
  }

  li {
    margin-bottom: ${theme.spacing[2]};
  }

  /* Forms */
  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  input,
  select,
  textarea {
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.base};
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
    transition: border-color ${theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
    }

    &:disabled {
      background-color: ${theme.colors.gray[100]};
      color: ${theme.colors.gray[500]};
      cursor: not-allowed;
    }
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Tables */
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: ${theme.spacing[4]};
  }

  th,
  td {
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
    text-align: left;
    border-bottom: 1px solid ${theme.colors.gray[200]};
  }

  th {
    font-weight: ${theme.typography.fontWeight.semibold};
    background-color: ${theme.colors.gray[50]};
  }

  /* Code */
  code {
    font-family: ${theme.typography.fontFamily.mono};
    font-size: 0.875em;
    background-color: ${theme.colors.gray[100]};
    padding: ${theme.spacing[1]} ${theme.spacing[2]};
    border-radius: ${theme.borderRadius.sm};
  }

  pre {
    font-family: ${theme.typography.fontFamily.mono};
    background-color: ${theme.colors.gray[900]};
    color: ${theme.colors.gray[100]};
    padding: ${theme.spacing[4]};
    border-radius: ${theme.borderRadius.lg};
    overflow-x: auto;
    margin-bottom: ${theme.spacing[4]};
  }

  /* Accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.full};

    &:hover {
      background: ${theme.colors.gray[400]};
    }
  }

  /* Selection */
  ::selection {
    background-color: ${theme.colors.primary[200]};
    color: ${theme.colors.text.primary};
  }
`; 
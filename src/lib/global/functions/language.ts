export function mapLanguageToString(language: number): string {
    const languageMap: { [key: number]: string } = {
        0: 'python',
        1: 'csharp',
        2: 'nextjs',
        3: 'java',
        4: 'cpp',
        5: 'c'
    };
    return languageMap[language] || 'unknown';
}
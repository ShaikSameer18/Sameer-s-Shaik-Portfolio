export interface ResumeAnalysis {
  overallScore: number;
  sections: {
    contact: SectionAnalysis;
    summary: SectionAnalysis;
    experience: SectionAnalysis;
    skills: SectionAnalysis;
    education: SectionAnalysis;
    format: SectionAnalysis;
  };
  suggestions: Suggestion[];
  keywords: string[];
  wordCount: number;
}

export interface SectionAnalysis {
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'missing';
  feedback: string[];
  suggestions: string[];
}

export interface Suggestion {
  type: 'critical' | 'important' | 'minor';
  section: string;
  title: string;
  description: string;
  before?: string;
  after?: string;
}